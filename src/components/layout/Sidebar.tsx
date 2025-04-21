
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

interface NavItemProps {
  icon: React.ElementType;
  href: string;
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, href, title, isActive, onClick }: NavItemProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        isActive 
          ? "bg-sidebar-accent text-sidebar-primary font-medium" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Check user role from token
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        if (payload && payload.role) {
          setUserRole(payload.role);
        }
      } catch (error) {
        console.error("Error parsing token:", error);
        setUserRole(null);
      }
    }
  }, []);

  const closeMenu = () => {
    setIsMobileSidebarOpen(false);
  };

  const toggleMenu = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  };

  // Define navigation items - only show admin link if user has superadmin role
  const navItems = [
    { icon: Home, href: "/dashboard", title: t("dashboard") },
    { icon: Users, href: "/referrals", title: t("referrals") },
    { icon: Settings, href: "/profile", title: t("profile") },
  ];
  
  // Add super admin link only for superadmin role
  if (userRole === "superadmin") {
    navItems.push({ icon: ShieldAlert, href: "/admin", title: "Süper Admin" });
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 md:hidden"
      >
        {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-sidebar-background border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">{t("forwarderPanel")}</h1>
          <LanguageSelector />
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              href={item.href}
              title={item.title}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>{t("logout")}</span>
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-sidebar-background border-r border-sidebar-border shadow-lg">
            <div className="p-4 border-b border-sidebar-border flex justify-between items-center">
              <h1 className="text-xl font-bold text-primary">{t("forwarderPanel")}</h1>
              <div className="flex items-center">
                <LanguageSelector />
                <Button variant="ghost" size="icon" onClick={closeMenu} className="ml-2">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                  isActive={location.pathname === item.href}
                  onClick={closeMenu}
                />
              ))}
            </nav>
            
            <div className="p-4 border-t border-sidebar-border">
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>{t("logout")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
