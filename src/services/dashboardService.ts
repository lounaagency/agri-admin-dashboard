
import { supabase } from '@/integrations/supabase/client';

export interface DashboardStats {
  userCount: number;
  newUserCount: number;
  activeProjects: number;
  pendingProjects: number;
  cultureCount: number;
  totalRevenue: number;
  revenueIncrease: number;
}

export interface RevenueData {
  name: string;
  value: number;
}

export interface ProjectByType {
  name: string;
  value: number;
}

export interface Activity {
  title: string;
  desc: string;
  time: string;
  icon: string;
}

export interface Milestone {
  project: string;
  milestone: string;
  date: string;
  progress: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Nombre d'utilisateurs
    const { count: userCount, error: userError } = await supabase
      .from('utilisateur')
      .select('*', { count: 'exact', head: true });

    // Nouveaux utilisateurs cette semaine
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const { count: newUserCount, error: newUserError } = await supabase
      .from('utilisateur')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', lastWeek.toISOString());

    // Projets actifs
    const { count: activeProjects, error: activeProjectsError } = await supabase
      .from('projet')
      .select('*', { count: 'exact', head: true })
      .eq('statut', 'actif');

    // Projets en attente
    const { count: pendingProjects, error: pendingProjectsError } = await supabase
      .from('projet')
      .select('*', { count: 'exact', head: true })
      .eq('statut', 'en attente');

    // Nombre de types de cultures
    const { count: cultureCount, error: cultureError } = await supabase
      .from('culture')
      .select('*', { count: 'exact', head: true });

    // Revenus (somme des investissements)
    const { data: investData, error: investError } = await supabase
      .from('investissement')
      .select('montant');
    
    const totalRevenue = investData
      ? investData.reduce((sum, item) => sum + (item.montant || 0), 0)
      : 0;

    // Augmentation des revenus (simulation)
    const revenueIncrease = 8; // Pour l'instant fixe, à remplacer par un calcul réel

    return {
      userCount: userCount || 0,
      newUserCount: newUserCount || 0,
      activeProjects: activeProjects || 0,
      pendingProjects: pendingProjects || 0,
      cultureCount: cultureCount || 0,
      totalRevenue,
      revenueIncrease
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      userCount: 0,
      newUserCount: 0,
      activeProjects: 0,
      pendingProjects: 0,
      cultureCount: 0,
      totalRevenue: 0,
      revenueIncrease: 0
    };
  }
};

export const fetchMonthlyRevenue = async (): Promise<RevenueData[]> => {
  try {
    const { data, error } = await supabase
      .from('investissement')
      .select('montant, date_paiement');

    if (error) throw error;

    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const currentYear = new Date().getFullYear();
    
    // Initialiser les données mensuelles
    const monthlyData: { [key: string]: number } = {};
    months.forEach(month => {
      monthlyData[month] = 0;
    });
    
    // Remplir avec les données réelles
    if (data) {
      data.forEach(item => {
        if (item.date_paiement) {
          const date = new Date(item.date_paiement);
          if (date.getFullYear() === currentYear) {
            const month = months[date.getMonth()];
            monthlyData[month] += item.montant || 0;
          }
        }
      });
    }
    
    // Convertir en format pour le graphique
    return Object.keys(monthlyData).map(month => ({
      name: month,
      value: monthlyData[month]
    }));
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
    return [];
  }
};

export const fetchProjectsByType = async (): Promise<ProjectByType[]> => {
  try {
    const { data: projectsData, error } = await supabase
      .from('projet_culture')
      .select(`
        id_culture,
        culture(nom_culture)
      `);

    if (error) throw error;

    const typeCounts: { [key: string]: number } = {};
    
    projectsData.forEach(project => {
      const cultureName = project.culture?.nom_culture || 'Autre';
      typeCounts[cultureName] = (typeCounts[cultureName] || 0) + 1;
    });
    
    // Convertir en format pour le graphique et trier par valeur décroissante
    let result = Object.keys(typeCounts).map(name => ({
      name,
      value: typeCounts[name]
    })).sort((a, b) => b.value - a.value);
    
    // Si on a plus de 4 types, regrouper les moins importants dans "Autres"
    if (result.length > 4) {
      const mainTypes = result.slice(0, 4);
      const otherTypes = result.slice(4);
      const otherValue = otherTypes.reduce((sum, item) => sum + item.value, 0);
      
      result = [
        ...mainTypes,
        { name: 'Autres', value: otherValue }
      ];
    }
    
    return result;
  } catch (error) {
    console.error('Error fetching projects by type:', error);
    return [];
  }
};

export const fetchRecentActivities = async (): Promise<Activity[]> => {
  try {
    // Récupération des activités récentes (projets, utilisateurs, jalons)
    const { data: recentProjects } = await supabase
      .from('projet')
      .select('titre, created_at')
      .order('created_at', { ascending: false })
      .limit(2);
      
    const { data: recentUsers } = await supabase
      .from('utilisateur')
      .select('nom, prenoms, created_at')
      .order('created_at', { ascending: false })
      .limit(2);
      
    const { data: recentJalons } = await supabase
      .from('jalon_projet')
      .select(`
        statut,
        date_reelle_execution,
        id_projet,
        jalon_agricole(nom_jalon),
        projet(titre)
      `)
      .eq('statut', 'Terminé')
      .order('date_reelle_execution', { ascending: false })
      .limit(2);

    // Combiner et trier par date
    const activities: Activity[] = [];
    
    if (recentProjects) {
      recentProjects.forEach(project => {
        activities.push({
          title: "Nouveau projet soumis",
          desc: `Le projet ${project.titre || 'Sans titre'} a été soumis pour validation`,
          time: formatTimeAgo(new Date(project.created_at)),
          icon: "FolderKanban"
        });
      });
    }
    
    if (recentUsers) {
      recentUsers.forEach(user => {
        activities.push({
          title: "Utilisateur inscrit",
          desc: `${user.nom} ${user.prenoms || ''} s'est inscrit`,
          time: formatTimeAgo(new Date(user.created_at)),
          icon: "Users"
        });
      });
    }
    
    if (recentJalons) {
      recentJalons.forEach(jalon => {
        activities.push({
          title: "Jalon complété",
          desc: `La phase "${jalon.jalon_agricole?.nom_jalon || 'inconnue'}" a été complétée pour le projet ${jalon.projet?.titre || jalon.id_projet}`,
          time: formatTimeAgo(new Date(jalon.date_reelle_execution)),
          icon: "Leaf"
        });
      });
    }
    
    // Trier par date (plus récent en premier) et limiter à 4
    return activities
      .sort((a, b) => getTimeAgoSeconds(a.time) - getTimeAgoSeconds(b.time))
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return [];
  }
};

export const fetchUpcomingMilestones = async (): Promise<Milestone[]> => {
  try {
    const { data, error } = await supabase
      .from('jalon_projet')
      .select(`
        id_jalon_projet,
        id_projet,
        date_prev_planifiee,
        statut,
        jalon_agricole(nom_jalon),
        projet(titre)
      `)
      .eq('statut', 'Prévu')
      .order('date_prev_planifiee', { ascending: true })
      .limit(4);

    if (error) throw error;
    
    return data.map(item => {
      const today = new Date();
      const plannedDate = new Date(item.date_prev_planifiee);
      const diffTime = plannedDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Calculer le pourcentage de progression
      let progress = 0;
      if (diffDays <= 0) {
        progress = 100;
      } else if (diffDays <= 30) {
        progress = 100 - Math.round((diffDays / 30) * 100);
      } else {
        progress = 10; // minimum progress for far future milestones
      }
      
      return {
        project: item.projet?.titre || `Projet ${item.id_projet}`,
        milestone: item.jalon_agricole?.nom_jalon || 'Jalon',
        date: formatDaysUntil(diffDays),
        progress: progress
      };
    });
  } catch (error) {
    console.error('Error fetching upcoming milestones:', error);
    return [];
  }
};

// Helpers
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else if (diffHours > 0) {
    return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  } else if (diffMins > 0) {
    return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
  } else {
    return 'À l\'instant';
  }
}

function getTimeAgoSeconds(timeAgo: string): number {
  if (timeAgo.includes('jour')) {
    return parseInt(timeAgo.match(/\d+/)?.[0] || '0') * 86400;
  } else if (timeAgo.includes('heure')) {
    return parseInt(timeAgo.match(/\d+/)?.[0] || '0') * 3600;
  } else if (timeAgo.includes('minute')) {
    return parseInt(timeAgo.match(/\d+/)?.[0] || '0') * 60;
  }
  return 0;
}

function formatDaysUntil(days: number): string {
  if (days < 0) {
    return 'En retard';
  } else if (days === 0) {
    return 'Aujourd\'hui';
  } else if (days === 1) {
    return 'Demain';
  } else if (days < 7) {
    return `Dans ${days} jours`;
  } else if (days < 30) {
    const weeks = Math.ceil(days / 7);
    return `Dans ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  } else {
    const months = Math.ceil(days / 30);
    return `Dans ${months} mois`;
  }
}
