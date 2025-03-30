
import { supabase } from '@/integrations/supabase/client';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superviseur" | "technicien" | "investisseur";
  status: "actif" | "en_attente" | "inactif";
  createdAt: string;
}

export const fetchUsers = async (): Promise<UserData[]> => {
  try {
    // Exemple d'utilisation de la requête Supabase
    const { data, error } = await supabase
      .from('utilisateur')
      .select(`
        id,
        nom as name,
        email,
        status,
        created_at as createdAt,
        utilisateurs_par_role (
          role (
            name as roleName
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    // Transformer les données pour correspondre à l'interface UserData
    const transformedData = data.map(user => {
      return {
        id: user.id,
        name: user.name || 'Sans nom',
        email: user.email || 'email@exemple.com',
        role: (user.utilisateurs_par_role?.[0]?.role?.roleName || 'technicien') as "admin" | "superviseur" | "technicien" | "investisseur",
        status: (user.status || 'en_attente') as "actif" | "en_attente" | "inactif",
        createdAt: user.createdAt || new Date().toISOString()
      };
    });

    return transformedData;
  } catch (error) {
    console.error('Unexpected error fetching users:', error);
    return [];
  }
};

export const createUser = async (userData: Omit<UserData, 'id' | 'createdAt'>): Promise<UserData | null> => {
  try {
    // Créer un nouvel utilisateur
    const { data: newUser, error: userError } = await supabase
      .from('utilisateur')
      .insert([
        { 
          nom: userData.name,
          email: userData.email,
          status: userData.status 
        }
      ])
      .select()
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return null;
    }

    // Récupérer l'ID du rôle
    const { data: roleData, error: roleError } = await supabase
      .from('role')
      .select('id')
      .eq('name', userData.role)
      .single();

    if (roleError || !roleData) {
      console.error('Error getting role ID:', roleError);
      return null;
    }

    // Associer l'utilisateur au rôle
    const { error: roleAssignError } = await supabase
      .from('utilisateurs_par_role')
      .insert([
        { 
          utilisateur_id: newUser.id,
          role_id: roleData.id 
        }
      ]);

    if (roleAssignError) {
      console.error('Error assigning role:', roleAssignError);
      return null;
    }

    return {
      id: newUser.id,
      name: newUser.nom,
      email: newUser.email,
      role: userData.role,
      status: newUser.status,
      createdAt: newUser.created_at
    };
    
  } catch (error) {
    console.error('Unexpected error creating user:', error);
    return null;
  }
};

export const updateUser = async (id: string, userData: Partial<Omit<UserData, 'id' | 'createdAt'>>): Promise<boolean> => {
  try {
    // Mettre à jour les informations de l'utilisateur
    if (userData.name || userData.email || userData.status) {
      const updateData: any = {};
      if (userData.name) updateData.nom = userData.name;
      if (userData.email) updateData.email = userData.email;
      if (userData.status) updateData.status = userData.status;

      const { error: userError } = await supabase
        .from('utilisateur')
        .update(updateData)
        .eq('id', id);

      if (userError) {
        console.error('Error updating user:', userError);
        return false;
      }
    }

    // Mettre à jour le rôle si nécessaire
    if (userData.role) {
      // Récupérer l'ID du rôle
      const { data: roleData, error: roleError } = await supabase
        .from('role')
        .select('id')
        .eq('name', userData.role)
        .single();

      if (roleError || !roleData) {
        console.error('Error getting role ID:', roleError);
        return false;
      }

      // Récupérer l'entrée dans utilisateurs_par_role
      const { data: roleAssignData, error: fetchError } = await supabase
        .from('utilisateurs_par_role')
        .select('id')
        .eq('utilisateur_id', id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error fetching role assignment:', fetchError);
        return false;
      }

      if (roleAssignData) {
        // Mettre à jour le rôle existant
        const { error: updateError } = await supabase
          .from('utilisateurs_par_role')
          .update({ role_id: roleData.id })
          .eq('id', roleAssignData.id);

        if (updateError) {
          console.error('Error updating role assignment:', updateError);
          return false;
        }
      } else {
        // Créer une nouvelle affectation de rôle
        const { error: insertError } = await supabase
          .from('utilisateurs_par_role')
          .insert([{ utilisateur_id: id, role_id: roleData.id }]);

        if (insertError) {
          console.error('Error creating role assignment:', insertError);
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Unexpected error updating user:', error);
    return false;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    // Supprimer d'abord les affectations de rôles
    const { error: roleError } = await supabase
      .from('utilisateurs_par_role')
      .delete()
      .eq('utilisateur_id', id);

    if (roleError) {
      console.error('Error deleting user roles:', roleError);
      return false;
    }

    // Puis supprimer l'utilisateur
    const { error: userError } = await supabase
      .from('utilisateur')
      .delete()
      .eq('id', id);

    if (userError) {
      console.error('Error deleting user:', userError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting user:', error);
    return false;
  }
};
