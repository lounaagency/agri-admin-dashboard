
import React from "react";
import { BarChart3, Leaf, Repeat, Users, CreditCard, Sprout, TrendingUp, FolderKanban } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const Dashboard: React.FC = () => {
  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Fév", value: 5000 },
    { name: "Mar", value: 4500 },
    { name: "Avr", value: 6000 },
    { name: "Mai", value: 7000 },
    { name: "Juin", value: 8000 },
  ];

  const projectData = [
    { name: "Riz", value: 35 },
    { name: "Maïs", value: 25 },
    { name: "Manioc", value: 20 },
    { name: "Haricots", value: 15 },
    { name: "Autres", value: 5 },
  ];

  const COLORS = ["#68A63D", "#8ABD49", "#A8D175", "#C7E3A8", "#E2F1D2"];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Tableau de bord" 
        description="Bienvenue sur la plateforme d'administration de Maintso Vola"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Utilisateurs" 
          value="1,248"
          description="32 nouveaux cette semaine"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Projets Actifs" 
          value="64"
          description="8 en attente de validation"
          icon={FolderKanban}
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard 
          title="Types de Cultures" 
          value="16"
          icon={Leaf}
        />
        <StatsCard 
          title="Chiffre d'affaires" 
          value="28,000,000 Ar"
          description="Ce mois-ci"
          icon={CreditCard}
          trend={{ value: 8, isPositive: true }}
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
                    formatter={(value) => `${value}%`}
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
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "Nouveau projet soumis", 
                  desc: "Un projet de riziculture a été soumis pour validation",
                  time: "Il y a 30 minutes",
                  icon: FolderKanban
                },
                { 
                  title: "Utilisateur inscrit", 
                  desc: "Rakoto Jean s'est inscrit comme agriculteur",
                  time: "Il y a 2 heures",
                  icon: Users
                },
                { 
                  title: "Jalon complété", 
                  desc: "La phase de semis a été complétée pour le projet RIZ-2023-42",
                  time: "Il y a 5 heures",
                  icon: Leaf
                },
                { 
                  title: "Paiement reçu", 
                  desc: "500,000 Ar reçus pour l'investissement dans le projet MAIS-2023-15",
                  time: "Il y a 1 jour",
                  icon: CreditCard
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="mr-3 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-maintso-100 text-maintso-600 dark:bg-maintso-900/50 dark:text-maintso-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Jalons à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  project: "RIZ-2023-56", 
                  milestone: "Récolte",
                  date: "Dans 3 jours",
                  progress: 92,
                },
                { 
                  project: "MAIS-2023-31", 
                  milestone: "Irrigation",
                  date: "Dans 5 jours",
                  progress: 75,
                },
                { 
                  project: "HARICOT-2023-12", 
                  milestone: "Traitement anti-parasitaire",
                  date: "Dans 1 semaine",
                  progress: 50,
                },
                { 
                  project: "MANIOC-2023-08", 
                  milestone: "Sarclage",
                  date: "Dans 2 semaines",
                  progress: 30,
                },
              ].map((item, i) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
