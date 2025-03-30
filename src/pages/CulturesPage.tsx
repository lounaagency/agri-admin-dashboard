import React from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";

interface CultureData {
  id: string;
  name: string;
  type: "riz" | "mais" | "manioc" | "haricot";
  surface: number;
  location: string;
  progress: number;
  startDate: string;
  endDate: string;
}

const CulturesPage: React.FC = () => {
  const cultures: CultureData[] = [
    {
      id: "1",
      name: "Champ de riz Anosy",
      type: "riz",
      surface: 5,
      location: "Anosy",
      progress: 75,
      startDate: "2023-06-01",
      endDate: "2023-12-01",
    },
    {
      id: "2",
      name: "Plantation de maïs Itasy",
      type: "mais",
      surface: 3,
      location: "Itasy",
      progress: 30,
      startDate: "2023-07-15",
      endDate: "2024-01-15",
    },
    {
      id: "3",
      name: "Culture de manioc Amoron'i Mania",
      type: "manioc",
      surface: 8,
      location: "Amoron'i Mania",
      progress: 90,
      startDate: "2023-05-10",
      endDate: "2023-11-10",
    },
    {
      id: "4",
      name: "Champs de haricots Atsimo-Andrefana",
      type: "haricot",
      surface: 4,
      location: "Atsimo-Andrefana",
      progress: 50,
      startDate: "2023-08-01",
      endDate: "2024-02-01",
    },
    {
      id: "5",
      name: "Riziculture Haute Matsiatra",
      type: "riz",
      surface: 6,
      location: "Haute Matsiatra",
      progress: 20,
      startDate: "2023-09-01",
      endDate: "2024-03-01",
    },
    {
      id: "6",
      name: "Maïsiculture Analanjirofo",
      type: "mais",
      surface: 2,
      location: "Analanjirofo",
      progress: 60,
      startDate: "2023-06-20",
      endDate: "2023-12-20",
    },
    {
      id: "7",
      name: "Manioc près de Menabe",
      type: "manioc",
      surface: 7,
      location: "Menabe",
      progress: 80,
      startDate: "2023-07-01",
      endDate: "2024-01-01",
    },
    {
      id: "8",
      name: "Haricot dans le Vakinankaratra",
      type: "haricot",
      surface: 3,
      location: "Vakinankaratra",
      progress: 40,
      startDate: "2023-08-15",
      endDate: "2024-02-15",
    },
    {
      id: "9",
      name: "Rizières de Betsiboka",
      type: "riz",
      surface: 5,
      location: "Betsiboka",
      progress: 100,
      startDate: "2023-05-25",
      endDate: "2023-11-25",
    },
    {
      id: "10",
      name: "Champs de maïs Sofia",
      type: "mais",
      surface: 4,
      location: "Sofia",
      progress: 10,
      startDate: "2023-09-10",
      endDate: "2024-03-10",
    },
  ];

  const cultureColumns: ColumnDef<CultureData>[] = [
    {
      accessorKey: "name",
      header: "Nom de la culture",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;

        const typeConfig = {
          riz: {
            label: "Riz",
            class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
          },
          mais: {
            label: "Maïs",
            class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          },
          manioc: {
            label: "Manioc",
            class: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
          },
          haricot: {
            label: "Haricot",
            class: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
          },
        };

        const config = typeConfig[type as keyof typeof typeConfig];

        return (
          <Badge variant="outline" className={cn("font-medium", config.class)}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "surface",
      header: "Surface (ha)",
    },
    {
      accessorKey: "location",
      header: "Localisation",
    },
    {
      accessorKey: "progress",
      header: "Progression",
      cell: ({ row }) => {
        const data = row.original;

        const getProgressIndicatorClass = (progress: number) => {
          if (progress < 25) {
            return "bg-red-500";
          } else if (progress < 75) {
            return "bg-amber-500";
          } else {
            return "bg-green-500";
          }
        };

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
      accessorKey: "startDate",
      header: "Date de début",
      cell: ({ row }) => {
        const date = new Date(row.getValue("startDate") as string);
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
      accessorKey: "endDate",
      header: "Date de fin",
      cell: ({ row }) => {
        const date = new Date(row.getValue("endDate") as string);
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
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Gestion des cultures"
        description="Suivez l'état de vos différentes cultures"
        action={{
          label: "Ajouter une culture",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => console.log("Ajouter une culture"),
        }}
      />

      <DataTable columns={cultureColumns} data={cultures} searchKey="name" searchPlaceholder="Rechercher une culture..." />
    </div>
  );
};

export default CulturesPage;
