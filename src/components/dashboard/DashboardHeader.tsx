
import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="border-b bg-background py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <div className="text-sm hidden md:block mr-2">
          {user?.email}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleSignOut}
          aria-label="Déconnexion"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
