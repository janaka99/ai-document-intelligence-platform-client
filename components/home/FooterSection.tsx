import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function FooterSection() {
  return (
    <footer className="py-8 px-6 md:px-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="font-mono text-sm text-muted-foreground">
        <span className="text-primary">doc</span>ai · built with FastAPI + Next.js
      </p>
      <div className="flex gap-6">
        <Link href={siteConfig.githubUrl} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          github
        </Link>
        <Link href={siteConfig.docsUrl} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          docs
        </Link>
        <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          license
        </Link>
      </div>
    </footer>
  );
}
