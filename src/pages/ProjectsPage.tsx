
import React, { useState } from "react";
import { Plus, Pencil, Trash2, Eye, Users } from "lucide-react";
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

interface ProjectData {
  id: string;
  code: string;
  title: string;
  culture: string;
  status: "en_cours" | "en_attente" | "terminé" | "annulé";
  progress: number;
  startDate: string;
  endDate: string;
  area: number;
  technician: {
    id: string;
    name: string;
  };
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "1",
      code: "RIZ-2023-56",
      title: "Riziculture Analamanga",
      culture: "Riz",
      status: "en_cours",
      progress: 75,
      startDate: "2023-01-15",
      endDate: "2023-05-15",
      area: 5,
      technician: {
        id: "1",
        name: "Rakoto Jean",
      },
    },
    {
      id: "2",
      code: "MAIS-2023-31",
      title: "Culture de maïs Alaotra",
      culture: "Maïs",
      status: "en_cours",
      progress: 50,
      startDate: "2023-02-01",
      endDate: "2023-05-01",
      area: 3,
      technician: {
        id: "5",
        name: "Rakotobe Michel",
      },
    },
    {
      id: "3",
      code: "MANIOC-2023-08",
      title: "Plantation de manioc Itasy",
      culture: "Manioc",
      status: "en_attente",
      progress: 0,
      startDate: "2023-03-10",
      endDate: "2023-12-10",
      area: 2,
      technician: {
        id: "7",
        name: "Rasoamanarivo Claude",
      },
    },
    {
      id: "4",
      code: "HARICOT-2023-12",
      title: "Culture haricot Antsiranana",
      culture: "Haricot",
      status: "en_cours",
      progress: 25,
      startDate: "2023-03-01",
      endDate: "2023-05-15",
      area: 1.5,
      technician: {
        id: "10",
        name: "Raharisoa Hélène",
      },
    },
    {
      id: "5",
      code: "RIZ-2023-42",
      title: "Riziculture Fianarantsoa",
      culture: "Riz",
      status: "terminé",
      progress: 100,
      startDate: "2023-01-01",
      endDate: "2023-04-30",
      area: 4,
      technician: {
        id: "1",
        name: "Rakoto Jean",
      },
    },
    {
      id: "6",
      code: "TOMATE-2023-17",
      title: "Culture de tomates Toamasina",
      culture: "Tomate",
      status: "en_cours",
      progress: 85,
      startDate: "2023-02-15",
      endDate: "2023-05-25",
      area: 0.8,
      technician: {
        id: "5",
        name: "Rakotobe Michel",
      },
    },
    {
      id: "7",
      code: "ARACHIDE-2023-05",
      title: "Plantation d'arachides Mahajanga",
      culture: "Arachide",
      status: "annulé",
      progress: 30,
      startDate: "2023-02-01",
      endDate: "2023-06-10",
      area: 2.5,
      technician: {
        id: "10",
        name: "Raharisoa Hélène",
      },
    },
    {
      id: "8",
      code: "OIGNON-2023-09",
      title: "Culture d'oignons Antananarivo",
      culture: "Oignon",
      status: "en_cours",
      progress: 40,
      startDate: "2023-03-15",
      endDate: "2023-08-15",
      area: 1.2,
      technician: {
        id: "7",
        name: "Rasoamanarivo Claude",
      },
    },
  ]);

  const projectColumns: ColumnDef<ProjectData>[] = [
    {
      accessorKey: "code",
      header: "Référence",
      cell: ({ row }) => {
        return (
          <div className="font-medium">{row.getValue("code")}</div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Projet",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div>
            <p className="font-medium">{project.title}</p>
            <p className="text-xs text-muted-foreground">Culture: {project.culture}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        
        const statusConfig = {
          en_cours: {
            label: "En cours",
            class: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          },
          en_attente: {
            label: "En attente",
            class: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
          },
          terminé: {
            label: "Terminé",
            class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          },
          annulé: {
            label: "Annulé",
            class: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
          },
        };
        
        const config = statusConfig[status as keyof typeof statusConfig];
        
        return (
          <Badge variant="outline" className={cn("font-medium", config.class)}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "progress",
      header: "Progression",
      cell: ({ row }) => {
        const progress = row.getValue("progress") as number;
        return (
          <div className="flex w-full max-w-[150px] flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span>Progression</span>
              <span>{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2"
              indicatorClassName={cn({
                "bg-red-500": progress < 30,
                "bg-amber-500": progress >= 30 && progress < 70,
                "bg-green-500": progress >= 70,
              })}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "technician",
      header: "Technicien",
      cell: ({ row }) => {
        const technician = row.getValue("technician") as { id: string; name: string };
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://avatar.vercel.sh/${technician.id}`} alt={technician.name} />
              <AvatarFallback>
                {technician.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span>{technician.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "area",
      header: "Surface (ha)",
      cell: ({ row }) => {
        return <span>{row.getValue("area")} ha</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const project = row.original;
        
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
                  onClick={() => console.log("Voir détails", project.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => console.log("Éditer", project.id)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Éditer
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center"
                  onClick={() => console.log("Assigner", project.id)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Assigner
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-red-600 focus:text-red-600"
                  onClick={() => console.log("Supprimer", project.id)}
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
        title="Gestion des projets agricoles" 
        description="Gérez les projets agricoles et leur progression"
        action={{
          label: "Ajouter un projet",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => console.log("Ajouter un projet"),
        }}
      />
      
      <DataTable 
        columns={projectColumns} 
        data={projects}
        searchKey="title"
        searchPlaceholder="Rechercher un projet..."
      />
    </div>
  );
};

export default ProjectsPage;
