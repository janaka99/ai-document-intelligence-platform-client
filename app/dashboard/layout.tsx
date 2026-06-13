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
    <div className="flex h-[100dvh] w-full overflow-hidden bg-background">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-[100dvh] bg-card border-r border-border transition-all duration-300 z-40 overflow-hidden flex flex-col ${
          isSidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full w-64 md:translate-x-0 md:w-20"
        }`}
      >
        <Logo />
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-all duration-300 whitespace-nowrap overflow-hidden">
            <Upload className="w-5 h-5 flex-shrink-0" />
            <span className={!isSidebarOpen ? "md:hidden" : "block"}>Dashboard</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-300 whitespace-nowrap overflow-hidden">
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className={!isSidebarOpen ? "md:hidden" : "block"}>Settings</span>
          </button>
        </nav>

        {isSidebarOpen && <ChatSidebar />}

        {/* Footer */}
        <div className="mt-auto p-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-all duration-300 whitespace-nowrap overflow-hidden"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={!isSidebarOpen ? "md:hidden" : "block"}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-[100dvh] overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Top Bar */}
        <div className="flex-shrink-0 z-20 bg-card border-b border-border">
          <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                Help
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold hover:bg-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
                      {user?.email?.charAt(0).toUpperCase() || "A"}
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
        <div className="flex-1 overflow-hidden relative flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
