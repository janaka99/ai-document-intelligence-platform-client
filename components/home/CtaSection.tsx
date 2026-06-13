import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function CtaSection() {
  return (
    <div className="text-center py-20 px-6 md:px-10 border-t border-border">
      <div className="font-mono text-xs text-primary tracking-widest mb-4 uppercase inline-block">
        open source
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight mb-4">
        start building today
      </h2>
      <p className="text-muted-foreground text-base max-w-lg mx-auto mb-8 leading-relaxed">
        Full-stack, production-ready, and free to self-host. Clone the repo and
        have it running in minutes.
      </p>

      <div className="flex gap-4 justify-center flex-wrap">
        <Button size="lg" className="rounded-lg text-sm font-medium">
          <Link href="/auth/register">get started free</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-lg text-sm font-medium bg-transparent border-border hover:bg-muted"
        >
          <Link href={siteConfig.docsUrl}>read the docs</Link>
        </Button>
      </div>
    </div>
  );
}
