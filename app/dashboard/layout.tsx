"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingPage } from "@/components/LoadingPage";
import { SidebarProvider } from "@/contexts/sidebarContext";
import { useSidebar } from "@/contexts/sidebarContext";
import { Logo } from "@/components/logo";
import { Upload, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "@/components/chat-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  // If loading, show loading page
  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 overflow-hidden flex flex-col ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <Logo />
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-all duration-300 whitespace-nowrap">
            <Upload className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Dashboard</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-300 whitespace-nowrap">
            <Settings className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        {isSidebarOpen && <ChatSidebar />}

        {/* Footer */}
        <div className="mt-auto p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-300 whitespace-nowrap">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
      <div
        className={`flex-1  flex flex-col  transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-card border-b border-border py-1 ">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Help
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold hover:bg-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
                      A
                    </button>
                  }
                />

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/* content  */}
        <div className="flex-grow w-full">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
