
import React, { useState } from "react";
import { Plus, Pencil, Trash2, CheckCircle, XCircle, User } from "lucide-react";
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

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superviseur" | "technicien" | "investisseur";
  status: "actif" | "en_attente" | "inactif";
  createdAt: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      name: "Rakoto Jean",
      email: "rakoto.jean@example.com",
      role: "technicien",
      status: "actif",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      name: "Rabe Marie",
      email: "rabe.marie@example.com",
      role: "superviseur",
      status: "actif",
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      name: "Razafy Pierre",
      email: "razafy.pierre@example.com",
      role: "investisseur",
      status: "en_attente",
      createdAt: "2023-03-05",
    },
    {
      id: "4",
      name: "Randria Sophie",
      email: "randria.sophie@example.com",
      role: "admin",
      status: "actif",
      createdAt: "2023-01-10",
    },
    {
      id: "5",
      name: "Rakotobe Michel",
      email: "rakotobe.michel@example.com",
      role: "technicien",
      status: "inactif",
      createdAt: "2023-04-12",
    },
    {
      id: "6",
      name: "Ravalomanana Luc",
      email: "ravalomanana.luc@example.com",
      role: "investisseur",
      status: "actif",
      createdAt: "2023-03-28",
    },
    {
      id: "7",
      name: "Rasoamanarivo Claude",
      email: "rasoamanarivo.claude@example.com",
      role: "technicien",
      status: "en_attente",
      createdAt: "2023-05-05",
    },
    {
      id: "8",
      name: "Rabemananjara Nicole",
      email: "rabemananjara.nicole@example.com",
      role: "superviseur",
      status: "actif",
      createdAt: "2023-02-15",
    },
    {
      id: "9",
      name: "Razafindrakoto Paul",
      email: "razafindrakoto.paul@example.com",
      role: "investisseur",
      status: "inactif",
      createdAt: "2023-04-30",
    },
    {
      id: "10",
      name: "Raharisoa Hélène",
      email: "raharisoa.helene@example.com",
      role: "technicien",
      status: "actif",
      createdAt: "2023-05-20",
    },
  ]);

  const userColumns: ColumnDef<UserData>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${user.id}`} alt={user.name} />
              <AvatarFallback>
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Rôle",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        
        const roleConfig = {
          admin: {
            label: "Administrateur",
            class: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
          },
          superviseur: {
            label: "Superviseur",
            class: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          },
          technicien: {
            label: "Technicien",
            class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          },
          investisseur: {
            label: "Investisseur",
            class: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
          },
        };
        
        const config = roleConfig[role as keyof typeof roleConfig];
        
        return (
          <Badge variant="outline" className={cn("font-medium", config.class)}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        
        const statusConfig = {
          actif: {
            label: "Actif",
            class: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            icon: CheckCircle,
          },
          en_attente: {
            label: "En attente",
            class: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
            icon: User,
          },
          inactif: {
            label: "Inactif",
            class: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
            icon: XCircle,
          },
        };
        
        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;
        
        return (
          <div className="flex items-center">
            <Badge variant="outline" className={cn("font-medium", config.class)}>
              <Icon className="mr-1 h-3 w-3" />
              {config.label}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date d'inscription",
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
        const user = row.original;
        
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
                  onClick={() => console.log("Éditer", user.id)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Éditer
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-red-600 focus:text-red-600"
                  onClick={() => console.log("Supprimer", user.id)}
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
        title="Gestion des utilisateurs" 
        description="Gérez les comptes utilisateurs de la plateforme"
        action={{
          label: "Ajouter un utilisateur",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => console.log("Ajouter un utilisateur"),
        }}
      />
      
      <DataTable 
        columns={userColumns} 
        data={users}
        searchKey="name"
        searchPlaceholder="Rechercher un utilisateur..."
      />
    </div>
  );
};

export default UsersPage;
