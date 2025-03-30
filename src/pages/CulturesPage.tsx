
import React, { useState } from "react";
import { Plus, Pencil, Trash2, CalendarRange, Clock } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CultureData {
  id: string;
  name: string;
  duration: number;
  season: "pluie" | "sèche" | "toute-année";
  milestones: number;
  profitability: "faible" | "moyenne" | "élevée";
  icon: string;
}

interface MilestoneData {
  id: string;
  name: string;
  culture: string;
  durationDays: number;
  order: number;
}

const CulturesPage: React.FC = () => {
  const [cultures, setCultures] = useState<CultureData[]>([
    {
      id: "1",
      name: "Riz",
      duration: 120,
      season: "pluie",
      milestones: 6,
      profitability: "élevée",
      icon: "🌾",
    },
    {
      id: "2",
      name: "Maïs",
      duration: 90,
      season: "toute-année",
      milestones: 5,
      profitability: "moyenne",
      icon: "🌽",
    },
    {
      id: "3",
      name: "Manioc",
      duration: 270,
      season: "toute-année",
      milestones: 4,
      profitability: "moyenne",
      icon: "🥔",
    },
    {
      id: "4",
      name: "Haricot",
      duration: 75,
      season: "sèche",
      milestones: 4,
      profitability: "moyenne",
      icon: "🌱",
    },
    {
      id: "5",
      name: "Tomate",
      duration: 100,
      season: "toute-année",
      milestones: 5,
      profitability: "élevée",
      icon: "🍅",
    },
    {
      id: "6",
      name: "Oignon",
      duration: 150,
      season: "sèche",
      milestones: 4,
      profitability: "élevée",
      icon: "🧅",
    },
    {
      id: "7",
      name: "Patate douce",
      duration: 120,
      season: "toute-année",
      milestones: 3,
      profitability: "faible",
      icon: "🍠",
    },
    {
      id: "8",
      name: "Arachide",
      duration: 130,
      season: "pluie",
      milestones: 4,
      profitability: "moyenne",
      icon: "🥜",
    },
  ]);

  const [milestones, setMilestones] = useState<MilestoneData[]>([
    {
      id: "1",
      name: "Préparation du sol",
      culture: "Riz",
      durationDays: 15,
      order: 1,
    },
    {
      id: "2",
      name: "Semis",
      culture: "Riz",
      durationDays: 10,
      order: 2,
    },
    {
      id: "3",
      name: "Premier sarclage",
      culture: "Riz",
      durationDays: 20,
      order: 3,
    },
    {
      id: "4",
      name: "Deuxième sarclage",
      culture: "Riz",
      durationDays: 20,
      order: 4,
    },
    {
      id: "5",
      name: "Épiaison",
      culture: "Riz",
      durationDays: 30,
      order: 5,
    },
    {
      id: "6",
      name: "Récolte",
      culture: "Riz",
      durationDays: 25,
      order: 6,
    },
    {
      id: "7",
      name: "Préparation du sol",
      culture: "Maïs",
      durationDays: 12,
      order: 1,
    },
    {
      id: "8",
      name: "Semis",
      culture: "Maïs",
      durationDays: 8,
      order: 2,
    },
  ]);

  const cultureColumns: ColumnDef<CultureData>[] = [
    {
      accessorKey: "name",
      header: "Culture",
      cell: ({ row }) => {
        const culture = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent">
              <span className="text-lg">{culture.icon}</span>
            </div>
            <div>
              <p className="font-medium">{culture.name}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "duration",
      header: "Durée (jours)",
      cell: ({ row }) => {
        const duration = row.getValue("duration") as number;
        return (
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{duration} jours</span>
          </div>
        );
      },
    },
    {
      accessorKey: "season",
      header: "Saison",
      cell: ({ row }) => {
        const season = row.getValue("season") as string;
        
        const seasonConfig = {
          pluie: {
            label: "Saison des pluies",
            class: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          },
          sèche: {
            label: "Saison sèche",
            class: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
          },
          "toute-année": {
            label: "Toute l'année",
            class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          },
        };
        
        const config = seasonConfig[season as keyof typeof seasonConfig];
        
        return (
          <Badge variant="outline" className={cn("font-medium", config.class)}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "milestones",
      header: "Jalons",
      cell: ({ row }) => {
        return <span>{row.getValue("milestones")} étapes</span>;
      },
    },
    {
      accessorKey: "profitability",
      header: "Rentabilité",
      cell: ({ row }) => {
        const profitability = row.getValue("profitability") as string;
        
        const profitConfig = {
          faible: {
            label: "Faible",
            class: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            progress: 33,
          },
          moyenne: {
            label: "Moyenne",
            class: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
            progress: 66,
          },
          élevée: {
            label: "Élevée",
            class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            progress: 100,
          },
        };
        
        const config = profitConfig[profitability as keyof typeof profitConfig];
        
        return (
          <div className="flex w-full max-w-[150px] flex-col gap-1">
            <Badge variant="outline" className={cn("font-medium", config.class)}>
              {config.label}
            </Badge>
            <Progress
              value={config.progress}
              className="h-2"
              indicatorClassName={cn({
                "bg-red-500": config.progress <= 33,
                "bg-amber-500": config.progress > 33 && config.progress <= 66,
                "bg-green-500": config.progress > 66,
              })}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const culture = row.original;
        
        return (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => console.log("Voir jalons", culture.id)}
                >
                  <CalendarRange className="mr-2 h-4 w-4" />
                  Voir jalons
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => console.log("Éditer", culture.id)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Éditer
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-red-600 focus:text-red-600"
                  onClick={() => console.log("Supprimer", culture.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Gestion des cultures" 
        description="Gérez les types de cultures et leurs jalons"
        action={{
          label: "Ajouter une culture",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => console.log("Ajouter une culture"),
        }}
      />
      
      <DataTable 
        columns={cultureColumns} 
        data={cultures}
        searchKey="name"
        searchPlaceholder="Rechercher une culture..."
      />
    </div>
  );
};

export default CulturesPage;
