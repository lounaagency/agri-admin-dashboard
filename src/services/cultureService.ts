
import { supabase } from '@/integrations/supabase/client';

export interface CultureData {
  id_culture: number;
  nom: string;
  description?: string;
  surface?: number;
  unite_surface?: string;
  created_at: string;
  modified_at?: string;
}

export const fetchCultures = async (): Promise<CultureData[]> => {
  try {
    const { data, error } = await supabase
      .from('culture')
      .select('*')
      .order('nom');

    if (error) {
      console.error('Error fetching cultures:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching cultures:', error);
    return [];
  }
};

export const fetchCultureById = async (id: number): Promise<CultureData | null> => {
  try {
    const { data, error } = await supabase
      .from('culture')
      .select('*')
      .eq('id_culture', id)
      .single();

    if (error) {
      console.error(`Error fetching culture with id ${id}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error fetching culture with id ${id}:`, error);
    return null;
  }
};

export const createCulture = async (culture: Omit<CultureData, 'id_culture' | 'created_at' | 'modified_at'>): Promise<CultureData | null> => {
  try {
    const { data, error } = await supabase
      .from('culture')
      .insert([culture])
      .select()
      .single();

    if (error) {
      console.error('Error creating culture:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating culture:', error);
    return null;
  }
};

export const updateCulture = async (id: number, culture: Partial<Omit<CultureData, 'id_culture' | 'created_at' | 'modified_at'>>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('culture')
      .update(culture)
      .eq('id_culture', id);

    if (error) {
      console.error(`Error updating culture with id ${id}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Unexpected error updating culture with id ${id}:`, error);
    return false;
  }
};

export const deleteCulture = async (id: number): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('culture')
      .delete()
      .eq('id_culture', id);

    if (error) {
      console.error(`Error deleting culture with id ${id}:`, error);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Unexpected error deleting culture with id ${id}:`, error);
    return false;
  }
};
