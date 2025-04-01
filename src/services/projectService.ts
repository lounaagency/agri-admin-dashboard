
import { supabase } from '@/integrations/supabase/client';

export interface ProjectData {
  id_projet: number;
  titre: string;
  description?: string;
  date_lancement?: string;
  date_fin_prevue?: string;
  surface_ha?: number;
  localisation?: string;
  statut: 'planifié' | 'en cours' | 'terminé' | 'annulé';
  budget_total?: number;
  created_by: string;
  created_at: string;
  modified_at?: string;
}

export interface ProjectCultureData {
  id: number;
  id_projet: number;
  id_culture: number;
  culture?: {
    nom: string;
  };
}

export const fetchProjects = async (): Promise<ProjectData[]> => {
  try {
    const { data, error } = await supabase
      .from('projet')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching projects:', error);
    return [];
  }
};

export const fetchProjectById = async (id: number): Promise<ProjectData | null> => {
  try {
    const { data, error } = await supabase
      .from('projet')
      .select('*')
      .eq('id_projet', id)
      .single();

    if (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error fetching project with id ${id}:`, error);
    return null;
  }
};

export const fetchProjectCultures = async (projectId: number): Promise<ProjectCultureData[]> => {
  try {
    const { data, error } = await supabase
      .from('projet_culture')
      .select(`
        id,
        id_projet,
        id_culture,
        culture:culture(nom)
      `)
      .eq('id_projet', projectId);

    if (error) {
      console.error(`Error fetching cultures for project with id ${projectId}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Unexpected error fetching cultures for project with id ${projectId}:`, error);
    return [];
  }
};

export const createProject = async (
  project: Omit<ProjectData, 'id_projet' | 'created_at' | 'modified_at'>,
  cultureIds: number[]
): Promise<ProjectData | null> => {
  try {
    // Start a transaction using supabase
    const { data: projectData, error: projectError } = await supabase
      .from('projet')
      .insert([project])
      .select()
      .single();

    if (projectError) {
      console.error('Error creating project:', projectError);
      return null;
    }

    if (cultureIds.length > 0) {
      const projectCultureData = cultureIds.map(cultureId => ({
        id_projet: projectData.id_projet,
        id_culture: cultureId,
        created_by: project.created_by
      }));

      const { error: cultureError } = await supabase
        .from('projet_culture')
        .insert(projectCultureData);

      if (cultureError) {
        console.error('Error associating cultures with project:', cultureError);
        // We might consider a rollback here if needed
      }
    }

    return projectData;
  } catch (error) {
    console.error('Unexpected error creating project:', error);
    return null;
  }
};

export const updateProject = async (
  id: number,
  project: Partial<Omit<ProjectData, 'id_projet' | 'created_at' | 'modified_at'>>
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('projet')
      .update(project)
      .eq('id_projet', id);

    if (error) {
      console.error(`Error updating project with id ${id}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Unexpected error updating project with id ${id}:`, error);
    return false;
  }
};

export const updateProjectCultures = async (
  projectId: number,
  cultureIds: number[],
  userId: string
): Promise<boolean> => {
  try {
    // First delete all existing culture associations
    const { error: deleteError } = await supabase
      .from('projet_culture')
      .delete()
      .eq('id_projet', projectId);

    if (deleteError) {
      console.error(`Error removing existing cultures for project ${projectId}:`, deleteError);
      return false;
    }

    // Then add the new ones
    if (cultureIds.length > 0) {
      const projectCultureData = cultureIds.map(cultureId => ({
        id_projet: projectId,
        id_culture: cultureId,
        created_by: userId
      }));

      const { error: insertError } = await supabase
        .from('projet_culture')
        .insert(projectCultureData);

      if (insertError) {
        console.error(`Error associating new cultures with project ${projectId}:`, insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error(`Unexpected error updating cultures for project ${projectId}:`, error);
    return false;
  }
};

export const deleteProject = async (id: number): Promise<boolean> => {
  try {
    // First delete all culture associations
    const { error: cultureError } = await supabase
      .from('projet_culture')
      .delete()
      .eq('id_projet', id);

    if (cultureError) {
      console.error(`Error removing cultures for project ${id}:`, cultureError);
      return false;
    }

    // Then delete the project
    const { error: projectError } = await supabase
      .from('projet')
      .delete()
      .eq('id_projet', id);

    if (projectError) {
      console.error(`Error deleting project with id ${id}:`, projectError);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Unexpected error deleting project with id ${id}:`, error);
    return false;
  }
};

export const getProjectStatsByStatus = async (): Promise<Record<string, number>> => {
  try {
    const { data, error } = await supabase
      .from('projet')
      .select('statut');

    if (error) {
      console.error('Error fetching project stats:', error);
      return {};
    }

    const stats: Record<string, number> = {
      'planifié': 0,
      'en cours': 0,
      'terminé': 0,
      'annulé': 0
    };

    data.forEach(project => {
      const status = project.statut;
      if (stats[status] !== undefined) {
        stats[status]++;
      }
    });

    return stats;
  } catch (error) {
    console.error('Unexpected error fetching project stats:', error);
    return {};
  }
};
