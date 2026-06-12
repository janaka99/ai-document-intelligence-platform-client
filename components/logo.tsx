"use client";
import { useSidebar } from "@/contexts/sidebarContext";
import { BookOpen } from "lucide-react";

export function Logo() {
  const { isSidebarOpen } = useSidebar();
  return (
    <div className="flex items-center gap-3 py-4 px-5 border-b border-border">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
        <BookOpen className="w-6 h-6 text-white" />
      </div>
      {isSidebarOpen && (
        <div>
          <h1 className="text-lg font-bold text-primary">DocIntel</h1>
          <p className="text-xs text-muted-primary">Smart AI</p>
        </div>
      )}
    </div>
  );
}
