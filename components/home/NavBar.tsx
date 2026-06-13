import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { Logo } from "../logo";
import { BookOpen } from "lucide-react";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-10 border-b border-border bg-background">
      <div className="flex items-center gap-3 ">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-primary">DocIntel</h1>
          <p className="text-xs text-muted-primary">Smart AI</p>
        </div>
      </div>
      <div className="hidden md:flex gap-6 items-center">
        <Link
          href="#features"
          className="text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          features
        </Link>
        <Link
          href="#architecture"
          className="text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          architecture
        </Link>
        <Link
          href={siteConfig.docsUrl}
          className="text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          docs
        </Link>
        <Button className="ml-4">
          <Link href="/auth/register">get started</Link>
        </Button>
      </div>
    </nav>
  );
}
