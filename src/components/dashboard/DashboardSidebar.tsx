
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Leaf, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface DashboardSidebarProps {
  open: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ open }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { title: "Tableau de bord", icon: LayoutDashboard, path: "/" },
    { title: "Utilisateurs", icon: Users, path: "/users" },
    { title: "Cultures", icon: Leaf, path: "/cultures" },
    { title: "Projets", icon: FolderKanban, path: "/projects" },
    { title: "Finances", icon: BarChart3, path: "/finances" },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <Sidebar className={cn("border-r border-border transition-all", 
      open ? "w-64" : "w-16 sm:w-20"
    )}>
      <SidebarHeader className={cn("h-16 flex items-center px-4", 
        open ? "justify-start gap-2" : "justify-center"
      )}>
        {open ? (
          <>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-maintso-600" />
              <span className="font-bold text-lg">Maintso Vola</span>
            </div>
          </>
        ) : (
          <Leaf className="h-6 w-6 text-maintso-600" />
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = item.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(item.path);
                  
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                          isActive ? "bg-maintso-100 text-maintso-700 dark:bg-maintso-900 dark:text-maintso-300" 
                                   : "hover:bg-muted",
                          !open && "justify-center px-0"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", open ? "mr-2" : "mr-0")} />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className={cn("flex", open ? "justify-between" : "justify-center")}>
          <ThemeToggle />
          {open && (
            <button 
              className="flex items-center text-muted-foreground hover:text-red-500 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Déconnexion</span>
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
