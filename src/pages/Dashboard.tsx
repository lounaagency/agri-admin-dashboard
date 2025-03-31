
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Leaf, Users, CreditCard, Sprout, TrendingUp, FolderKanban } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { fetchDashboardStats, fetchMonthlyRevenue, fetchProjectsByType, fetchRecentActivities, fetchUpcomingMilestones } from "@/services/dashboardService";
import { useToast } from "@/components/ui/use-toast";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Récupérer les statistiques du tableau de bord depuis Supabase
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  // Récupérer les données de revenus mensuels
  const { data: revenueData = [], isLoading: revenueLoading } = useQuery({
    queryKey: ['monthlyRevenue'],
    queryFn: fetchMonthlyRevenue,
  });

  // Récupérer la répartition des projets par type de culture
  const { data: projectData = [], isLoading: projectLoading } = useQuery({
    queryKey: ['projectsByType'],
    queryFn: fetchProjectsByType,
  });

  // Récupérer les activités récentes
  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ['recentActivities'],
    queryFn: fetchRecentActivities,
  });

  // Récupérer les jalons à venir
  const { data: milestones = [], isLoading: milestonesLoading } = useQuery({
    queryKey: ['upcomingMilestones'],
    queryFn: fetchUpcomingMilestones,
  });

  // Afficher un toast d'erreur si la requête échoue
  useEffect(() => {
    if (statsError) {
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les données du tableau de bord",
        variant: "destructive",
      });
    }
  }, [statsError, toast]);

  // Couleurs pour le graphique en camembert
  const COLORS = ["#68A63D", "#8ABD49", "#A8D175", "#C7E3A8", "#E2F1D2"];

  // Gérer la navigation vers les pages détaillées
  const handleNavigateToUsers = () => navigate("/users");
  const handleNavigateToProjects = () => navigate("/projects");
  const handleNavigateToCultures = () => navigate("/cultures");
  const handleNavigateToFinances = () => navigate("/finances");

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Tableau de bord" 
        description="Bienvenue sur la plateforme d'administration de Maintso Vola"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Utilisateurs" 
          value={statsLoading ? "..." : stats?.userCount.toLocaleString()}
          description={statsLoading ? "Chargement..." : `${stats?.newUserCount} nouveaux cette semaine`}
          icon={Users}
          trend={statsLoading ? undefined : { value: stats?.newUserCount > 0 ? Math.round((stats?.newUserCount / Math.max(stats?.userCount - stats?.newUserCount, 1)) * 100) : 0, isPositive: true }}
          className="cursor-pointer hover:border-maintso-500 transition-colors"
          onClick={handleNavigateToUsers}
        />
        <StatsCard 
          title="Projets Actifs" 
          value={statsLoading ? "..." : stats?.activeProjects.toLocaleString()}
          description={statsLoading ? "Chargement..." : `${stats?.pendingProjects} en attente de validation`}
          icon={FolderKanban}
          trend={statsLoading ? undefined : { value: 4, isPositive: true }}
          className="cursor-pointer hover:border-maintso-500 transition-colors"
          onClick={handleNavigateToProjects}
        />
        <StatsCard 
          title="Types de Cultures" 
          value={statsLoading ? "..." : stats?.cultureCount.toLocaleString()}
          icon={Leaf}
          className="cursor-pointer hover:border-maintso-500 transition-colors"
          onClick={handleNavigateToCultures}
        />
        <StatsCard 
          title="Chiffre d'affaires" 
          value={statsLoading ? "..." : `${stats?.totalRevenue.toLocaleString()} Ar`}
          description="Ce mois-ci"
          icon={CreditCard}
          trend={statsLoading ? undefined : { value: stats?.revenueIncrease || 0, isPositive: true }}
          className="cursor-pointer hover:border-maintso-500 transition-colors"
          onClick={handleNavigateToFinances}
        />
      </div>
      
      <div className="mt-4 grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenus mensuels</CardTitle>
                <CardDescription>Évolution du chiffre d'affaires (Ar)</CardDescription>
              </div>
              <TrendingUp className="h-4 w-4 text-maintso-600" />
            </div>
          </CardHeader>
          <CardContent>
            {revenueLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maintso-600"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => new Intl.NumberFormat('fr').format(value as number) + ' Ar'}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{
                      color: 'hsl(var(--card-foreground))',
                    }}
                  />
                  <Bar dataKey="value" fill="#68A63D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Répartition des projets</CardTitle>
                <CardDescription>Par type de culture</CardDescription>
              </div>
              <Sprout className="h-4 w-4 text-maintso-600" />
            </div>
          </CardHeader>
          <CardContent>
            {projectLoading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maintso-600"></div>
              </div>
            ) : (
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                      }}
                      labelStyle={{
                        color: 'hsl(var(--card-foreground))',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maintso-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((item, i) => {
                  // Sélectionner l'icône en fonction de la chaîne
                  const IconComponent = item.icon === "FolderKanban" 
                    ? FolderKanban 
                    : item.icon === "Users" 
                    ? Users 
                    : item.icon === "Leaf" 
                    ? Leaf 
                    : item.icon === "CreditCard" 
                    ? CreditCard 
                    : FolderKanban;
                    
                  return (
                    <div key={i} className="flex items-start">
                      <div className="mr-3 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-maintso-100 text-maintso-600 dark:bg-maintso-900/50 dark:text-maintso-400">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Jalons à venir</CardTitle>
          </CardHeader>
          <CardContent>
            {milestonesLoading ? (
              <div className="flex items-center justify-center h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maintso-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {milestones.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.project}</p>
                        <p className="text-sm text-muted-foreground">{item.milestone} - {item.date}</p>
                      </div>
                      <span className="text-sm font-medium">{item.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="h-full bg-maintso-500" 
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
