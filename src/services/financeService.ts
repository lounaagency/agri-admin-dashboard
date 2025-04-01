
import { supabase } from '@/integrations/supabase/client';

export interface CostData {
  id_cout_projet: number;
  id_projet: number;
  id_jalon_projet: number;
  type_depense: string;
  montant_par_hectare: number;
  montant_total: number;
  statut_paiement: 'Non engagé' | 'En cours' | 'Payé' | 'Annulé';
  created_by: string;
  created_at: string;
  modified_at?: string;
}

export interface PaymentData {
  id_paiement: number;
  id_cout_projet: number;
  date_paiement: string;
  montant: number;
  methode_paiement: string;
  reference_transaction?: string;
  created_by: string;
  created_at: string;
  modified_at?: string;
}

export interface FinancialSummary {
  totalBudget: number;
  totalCommitted: number;
  totalPaid: number;
  remaining: number;
}

export const fetchProjectCosts = async (projectId: number): Promise<CostData[]> => {
  try {
    const { data, error } = await supabase
      .from('cout_jalon_projet')
      .select('*')
      .eq('id_projet', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching costs for project ${projectId}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Unexpected error fetching costs for project ${projectId}:`, error);
    return [];
  }
};

export const fetchPayments = async (costId: number): Promise<PaymentData[]> => {
  try {
    const { data, error } = await supabase
      .from('historique_paiement')
      .select('*')
      .eq('id_cout_projet', costId)
      .order('date_paiement', { ascending: false });

    if (error) {
      console.error(`Error fetching payments for cost ${costId}:`, error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Unexpected error fetching payments for cost ${costId}:`, error);
    return [];
  }
};

export const createPayment = async (payment: Omit<PaymentData, 'id_paiement' | 'created_at' | 'modified_at'>): Promise<PaymentData | null> => {
  try {
    const { data, error } = await supabase
      .from('historique_paiement')
      .insert([payment])
      .select()
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      return null;
    }

    // Update the payment status if needed
    await updateCostPaymentStatus(payment.id_cout_projet);

    return data;
  } catch (error) {
    console.error('Unexpected error creating payment:', error);
    return null;
  }
};

export const updateCostPaymentStatus = async (costId: number): Promise<boolean> => {
  try {
    // Get the cost details
    const { data: costData, error: costError } = await supabase
      .from('cout_jalon_projet')
      .select('montant_total')
      .eq('id_cout_projet', costId)
      .single();

    if (costError) {
      console.error(`Error fetching cost ${costId}:`, costError);
      return false;
    }

    // Get total payments
    const { data: payments, error: paymentsError } = await supabase
      .from('historique_paiement')
      .select('montant')
      .eq('id_cout_projet', costId);

    if (paymentsError) {
      console.error(`Error fetching payments for cost ${costId}:`, paymentsError);
      return false;
    }

    const totalPaid = payments.reduce((sum, payment) => sum + Number(payment.montant), 0);
    const totalCost = Number(costData.montant_total);

    let newStatus = 'Non engagé';
    if (totalPaid >= totalCost) {
      newStatus = 'Payé';
    } else if (totalPaid > 0) {
      newStatus = 'En cours';
    }

    const { error: updateError } = await supabase
      .from('cout_jalon_projet')
      .update({ statut_paiement: newStatus })
      .eq('id_cout_projet', costId);

    if (updateError) {
      console.error(`Error updating cost status for cost ${costId}:`, updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Unexpected error updating cost status for cost ${costId}:`, error);
    return false;
  }
};

export const getFinancialSummary = async (projectId: number): Promise<FinancialSummary> => {
  try {
    // Get project budget
    const { data: projectData, error: projectError } = await supabase
      .from('projet')
      .select('budget_total')
      .eq('id_projet', projectId)
      .single();

    if (projectError) {
      console.error(`Error fetching budget for project ${projectId}:`, projectError);
      return { totalBudget: 0, totalCommitted: 0, totalPaid: 0, remaining: 0 };
    }

    // Get all costs
    const { data: costs, error: costsError } = await supabase
      .from('cout_jalon_projet')
      .select('id_cout_projet, montant_total, statut_paiement')
      .eq('id_projet', projectId);

    if (costsError) {
      console.error(`Error fetching costs for project ${projectId}:`, costsError);
      return { totalBudget: 0, totalCommitted: 0, totalPaid: 0, remaining: 0 };
    }

    // Get all payments
    const { data: payments, error: paymentsError } = await supabase
      .from('historique_paiement')
      .select('id_cout_projet, montant')
      .in('id_cout_projet', costs.map(cost => cost.id_cout_projet));

    if (paymentsError && costs.length > 0) {
      console.error(`Error fetching payments for project ${projectId}:`, paymentsError);
      return { totalBudget: 0, totalCommitted: 0, totalPaid: 0, remaining: 0 };
    }

    const totalBudget = Number(projectData.budget_total) || 0;
    const totalCommitted = costs.reduce((sum, cost) => sum + Number(cost.montant_total), 0);
    const totalPaid = payments ? payments.reduce((sum, payment) => sum + Number(payment.montant), 0) : 0;
    const remaining = totalBudget - totalPaid;

    return {
      totalBudget,
      totalCommitted,
      totalPaid,
      remaining
    };
  } catch (error) {
    console.error(`Unexpected error getting financial summary for project ${projectId}:`, error);
    return { totalBudget: 0, totalCommitted: 0, totalPaid: 0, remaining: 0 };
  }
};
