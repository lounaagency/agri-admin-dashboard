
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/dashboard/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { Calendar, CreditCard, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { cn } from "@/lib/utils";

const FinancesPage: React.FC = () => {
  const revenueData = [
    { month: "Jan", revenu: 18000000, dépense: 12000000 },
    { month: "Fév", revenu: 22000000, dépense: 14000000 },
    { month: "Mar", revenu: 25000000, dépense: 15000000 },
    { month: "Avr", revenu: 28000000, dépense: 16000000 },
    { month: "Mai", revenu: 32000000, dépense: 18000000 },
    { month: "Juin", revenu: 38000000, dépense: 22000000 },
  ];

  const projectFinanceData = [
    { name: "Riziculture Analamanga", financé: 75, montant: 15000000 },
    { name: "Culture de maïs Alaotra", financé: 90, montant: 8000000 },
    { name: "Plantation de manioc Itasy", financé: 40, montant: 6000000 },
    { name: "Culture haricot Antsiranana", financé: 60, montant: 4000000 },
    { name: "Culture d'oignons Antananarivo", financé: 85, montant: 7000000 },
  ];

  const investmentData = [
    { name: "Cultures vivrières", value: 45 },
    { name: "Cultures maraîchères", value: 30 },
    { name: "Cultures fruitières", value: 15 },
    { name: "Autres cultures", value: 10 },
  ];

  const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'];

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('fr-MG', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value) + ' Ar';
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Finances" 
        description="Gestion financière et suivi des investissements"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Revenus totaux" 
          value={formatMoney(170000000)}
          description="Cette année"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Dépenses totales" 
          value={formatMoney(98000000)}
          description="Cette année"
          icon={TrendingDown}
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard 
          title="Financement collecté" 
          value={formatMoney(45000000)}
          description="En cours"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard 
          title="Marge bénéficiaire" 
          value="42.3%"
          description="Cette année"
          icon={CreditCard}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
      
      <div className="mt-4 grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Évolution des revenus et dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => (value / 1000000) + 'M'} />
                <Tooltip 
                  formatter={(value) => formatMoney(value as number)}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenu" 
                  name="Revenus" 
                  stroke="#4CAF50" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="dépense" 
                  name="Dépenses" 
                  stroke="#FF5252" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Répartition des investissements</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={investmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {investmentData.map((entry, index) => (
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
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Statut de financement des projets</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={projectFinanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, 'Financé']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                  labelStyle={{
                    color: 'hsl(var(--card-foreground))',
                  }}
                />
                <Bar 
                  dataKey="financé" 
                  fill="#4CAF50" 
                  radius={[0, 4, 4, 0]}
                  label={{ 
                    position: 'right', 
                    formatter: (value) => `${value}% (${formatMoney(
                      projectFinanceData.find(item => item.financé === value)?.montant || 0
                    )})`,
                    fill: 'hsl(var(--card-foreground))',
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Prévisions financières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "Q3 2023 - Prévision de revenus", 
                  amount: formatMoney(210000000),
                  change: "+15%",
                  isPositive: true
                },
                { 
                  title: "Q3 2023 - Prévision de dépenses", 
                  amount: formatMoney(120000000),
                  change: "+5%",
                  isPositive: false
                },
                { 
                  title: "2023 - Marge bénéficiaire prévue", 
                  amount: "45.2%",
                  change: "+3%",
                  isPositive: true
                },
                { 
                  title: "2023 - Retour sur investissement", 
                  amount: "27.5%",
                  change: "+2.5%",
                  isPositive: true
                },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.amount}</p>
                    <p className={cn(
                      "text-sm",
                      item.isPositive ? "text-green-600" : "text-red-600"
                    )}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prochains paiements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: "Rémunération des techniciens", 
                  amount: formatMoney(12000000),
                  date: "15 Juillet 2023",
                },
                { 
                  title: "Achat de semences", 
                  amount: formatMoney(8500000),
                  date: "20 Juillet 2023",
                },
                { 
                  title: "Paiement des fournisseurs", 
                  amount: formatMoney(5300000),
                  date: "25 Juillet 2023",
                },
                { 
                  title: "Distribution des revenus", 
                  amount: formatMoney(35000000),
                  date: "30 Juillet 2023",
                },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {item.date}
                    </p>
                  </div>
                  <div className="font-bold">
                    {item.amount}
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

export default FinancesPage;
