import React from "react";
import { Plus } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: "en_cours" | "termine" | "en_attente";
  progress: number;
  createdAt: string;
}

const ProjectsPage: React.FC = () => {
  const projectsData: ProjectData[] = [
    {
      id: "1",
      name: "Projet Riziculture Améliorée",
      description: "Amélioration des techniques de riziculture dans la région d'Alaotra-Mangoro.",
      status: "en_cours",
      progress: 60,
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Projet Vanille Durable",
      description: "Promotion de la culture durable de la vanille dans la région de Sava.",
      status: "termine",
      progress: 100,
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Projet Agroforesterie",
      description: "Mise en place de systèmes agroforestiers pour la conservation des sols.",
      status: "en_attente",
      progress: 20,
      createdAt: "2023-03-05",
    },
    {
      id: "4",
      name: "Projet Irrigation",
      description: "Amélioration des systèmes d'irrigation pour augmenter les rendements agricoles.",
      status: "en_cours",
      progress: 80,
      createdAt: "2023-01-10",
    },
    {
      id: "5",
      name: "Projet Formation Agricole",
      description: "Formation des agriculteurs aux nouvelles technologies agricoles.",
      status: "termine",
      progress: 100,
      createdAt: "2023-04-12",
    },
    {
      id: "6",
      name: "Projet Elevage Caprin",
      description: "Développement de l'élevage caprin pour améliorer les revenus des familles.",
      status: "en_cours",
      progress: 40,
      createdAt: "2023-03-28",
    },
    {
      id: "7",
      name: "Projet Apiculture",
      description: "Promotion de l'apiculture pour la production de miel et la pollinisation.",
      status: "en_attente",
      progress: 10,
      createdAt: "2023-05-05",
    },
    {
      id: "8",
      name: "Projet Maraîchage",
      description: "Développement du maraîchage pour assurer la sécurité alimentaire.",
      status: "en_cours",
      progress: 70,
      createdAt: "2023-02-15",
    },
    {
      id: "9",
      name: "Projet Pisciculture",
      description: "Introduction de la pisciculture pour diversifier les sources de protéines.",
      status: "en_attente",
      progress: 30,
      createdAt: "2023-04-30",
    },
    {
      id: "10",
      name: "Projet Transformation Agricole",
      description: "Mise en place d'unités de transformation des produits agricoles.",
      status: "en_cours",
      progress: 50,
      createdAt: "2023-05-20",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "en_cours":
        return {
          label: "En cours",
          class: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        };
      case "termine":
        return {
          label: "Terminé",
          class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        };
      case "en_attente":
        return {
          label: "En attente",
          class: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
        };
      default:
        return {
          label: "Inconnu",
          class: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
        };
    }
  };

  const getProgressIndicatorClass = (progress: number) => {
    if (progress < 30) {
      return "bg-red-500";
    } else if (progress < 70) {
      return "bg-amber-500";
    } else {
      return "bg-green-500";
    }
  };

  const projectColumns: ColumnDef<ProjectData>[] = [
    {
      accessorKey: "name",
      header: "Nom du projet",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${project.id}`} alt={project.name} />
              <AvatarFallback>
                {project.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{project.name}</p>
              <p className="text-xs text-muted-foreground">{project.description}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const config = getStatusConfig(status);
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
        const data = row.original;
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium">{data.progress}%</p>
            <Progress 
              value={data.progress}
              className={`h-2 ${getProgressIndicatorClass(data.progress)}`}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date de création",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt") as string);
        return (
          <span>
            {date.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        );
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
                  onClick={() => console.log("Éditer", project.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                  Éditer
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-red-600 focus:text-red-600"
                  onClick={() => console.log("Supprimer", project.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6" />
                    <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
                  </svg>
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
        title="Gestion des projets" 
        description="Gérez les projets de la plateforme"
        action={{
          label: "Ajouter un projet",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => console.log("Ajouter un projet"),
        }}
      />
      
      <DataTable 
        columns={projectColumns} 
        data={projectsData}
        searchKey="name"
        searchPlaceholder="Rechercher un projet..."
      />
    </div>
  );
};

export default ProjectsPage;
