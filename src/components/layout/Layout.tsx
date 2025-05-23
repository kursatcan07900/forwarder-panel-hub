
import { Sidebar } from "./Sidebar";
import { useLocation } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  
  if (isLoginPage) {
    return (
      <div className="h-screen bg-background">
        <div className="fixed top-4 right-4 z-50">
          <LanguageSelector />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <LanguageSelector />
        </div>
        {children}
      </main>
    </div>
  );
}
