
import React, { useState, useEffect } from "react";
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserData, fetchUsers, createUser, updateUser, deleteUser } from "@/services/userService";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'technicien' as "admin" | "superviseur" | "technicien" | "investisseur",
    status: 'en_attente' as "actif" | "en_attente" | "inactif"
  });
  
  const { toast } = useToast();

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenCreateDialog = () => {
    setFormData({
      name: '',
      email: '',
      role: 'technicien',
      status: 'en_attente'
    });
    setDialogMode('create');
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (user: UserData) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (user: UserData) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser(formData);
      if (newUser) {
        setUsers(prev => [...prev, newUser]);
        setDialogOpen(false);
        toast({
          title: "Succès",
          description: "Utilisateur créé avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de créer l'utilisateur",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création de l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      const success = await updateUser(selectedUser.id, formData);
      if (success) {
        setUsers(prev => prev.map(user => 
          user.id === selectedUser.id 
            ? { ...user, ...formData } 
            : user
        ));
        setDialogOpen(false);
        toast({
          title: "Succès",
          description: "Utilisateur mis à jour avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour l'utilisateur",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour de l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      const success = await deleteUser(selectedUser.id);
      if (success) {
        setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
        setDeleteDialogOpen(false);
        toast({
          title: "Succès",
          description: "Utilisateur supprimé avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'utilisateur",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression de l'utilisateur",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = () => {
    if (dialogMode === 'create') {
      handleCreateUser();
    } else {
      handleUpdateUser();
    }
  };

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
                  onClick={() => handleOpenEditDialog(user)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Éditer
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center text-red-600 focus:text-red-600"
                  onClick={() => handleOpenDeleteDialog(user)}
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
          onClick: handleOpenCreateDialog,
        }}
      />
      
      <DataTable 
        columns={userColumns} 
        data={users}
        searchKey="name"
        searchPlaceholder="Rechercher un utilisateur..."
      />

      {/* Dialog for creating/editing users */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'create' ? 'Créer un utilisateur' : 'Modifier l\'utilisateur'}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === 'create' 
                ? 'Remplissez les informations ci-dessous pour créer un nouvel utilisateur.' 
                : 'Modifiez les informations de l\'utilisateur.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                placeholder="Nom complet" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="exemple@email.com" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({
                  ...formData, 
                  role: value as "admin" | "superviseur" | "technicien" | "investisseur"
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="superviseur">Superviseur</SelectItem>
                  <SelectItem value="technicien">Technicien</SelectItem>
                  <SelectItem value="investisseur">Investisseur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({
                  ...formData, 
                  status: value as "actif" | "en_attente" | "inactif"
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              {dialogMode === 'create' ? 'Créer' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog for user deletion */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur {selectedUser?.name} ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
