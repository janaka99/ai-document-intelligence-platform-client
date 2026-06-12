import Link from "next/link";
import { ArrowRight, Bot, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-grid-zinc-200/50 dark:bg-grid-zinc-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] -z-10" />
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            AI-Powered Document Intelligence
          </div>
          
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Talk to your documents like <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              never before.
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            Upload, analyze, and extract insights from your documents instantly. Our advanced AI understands context, finds exact answers, and saves you hours of reading.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-8 text-base font-semibold group rounded-full shadow-lg hover:shadow-primary/25 transition-all">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Floating UI Elements / Mockup representation */}
          <div className="relative w-full max-w-4xl mx-auto mt-16 pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full -z-10" />
            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-md shadow-2xl p-2 md:p-4">
              <div className="rounded-xl overflow-hidden bg-background border border-border/50 flex flex-col md:flex-row gap-0">
                <div className="hidden md:flex flex-col w-64 border-r border-border p-4 gap-4 bg-muted/20">
                  <div className="h-8 rounded bg-muted/50 w-full animate-pulse" />
                  <div className="h-8 rounded bg-muted/30 w-3/4 animate-pulse" />
                  <div className="h-8 rounded bg-muted/30 w-5/6 animate-pulse" />
                </div>
                <div className="flex-1 p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
