"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    const delays = [300, 700, 1100, 1500, 1900, 2400, 2900, 3500];

    // Show lines
    const showTimers = delays.map((d, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, d),
    );

    // Reset and repeat after 12 seconds
    const loopTimer = setInterval(() => {
      setVisibleLines([]);
      delays.forEach((d, i) => {
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
        }, d + 400); // Small offset for repeat
      });
    }, 12000);

    return () => {
      showTimers.forEach(clearTimeout);
      clearInterval(loopTimer);
    };
  }, []);

  return (
    <div className="py-20 px-6 md:px-10 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 font-mono text-xs text-primary tracking-wide mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        agentic rag · production ready
      </div>

      <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-foreground mb-5">
        your documents,
        <br />
        <em className="not-italic text-primary">intelligently</em> answered
      </h1>

      <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-9 leading-relaxed">
        Upload any document and ask anything. An autonomous agent reasons about
        your question, optimizes its search, and returns precise answers —
        strictly grounded in your files.
      </p>

      <div className="flex gap-4 justify-center flex-wrap mb-14">
        <Button size="lg" className="rounded-lg text-sm font-medium">
          <Link href="/auth/register">start for free</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-lg text-sm font-medium bg-transparent border-border hover:bg-muted"
        >
          <Link href={siteConfig.githubUrl}>view on github</Link>
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden max-w-2xl mx-auto text-left shadow-sm">
        <div className="bg-muted/30 px-4 py-3 flex items-center gap-2 border-b border-border">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="font-mono text-xs text-muted-foreground mx-auto pr-8">
            agent · live trace
          </div>
        </div>

        <div className="p-5 font-mono text-xs leading-relaxed min-h-[200px] text-foreground">
          <TerminalLine
            show={visibleLines.includes(0)}
            prefix="›"
            prefixColor="text-primary"
          >
            user:{" "}
            <span className="text-muted-foreground">
              "what are the payment terms in section 4?"
            </span>
          </TerminalLine>
          <TerminalLine
            show={visibleLines.includes(1)}
            prefix="$"
            prefixColor="text-muted-foreground"
          >
            <span className="text-muted-foreground">
              evaluating query complexity...
            </span>
          </TerminalLine>
          <TerminalLine
            show={visibleLines.includes(2)}
            prefix="›"
            prefixColor="text-primary"
          >
            tool_call:{" "}
            <span className="text-primary">generate_search_query</span>
          </TerminalLine>
          <TerminalLine
            show={visibleLines.includes(3)}
            prefix="←"
            prefixColor="text-muted-foreground"
          >
            <span className="text-muted-foreground">
              optimized:{" "}
              <span className="text-primary">
                "payment terms conditions section 4 contract"
              </span>
            </span>
          </TerminalLine>
          <TerminalLine
            show={visibleLines.includes(4)}
            prefix="›"
            prefixColor="text-primary"
          >
            tool_call: <span className="text-primary">search_documents</span>{" "}
            <span className="text-muted-foreground">k=6, semantic=true</span>
          </TerminalLine>
          <TerminalLine
            show={visibleLines.includes(5)}
            prefix="←"
            prefixColor="text-secondary-foreground"
          >
            <span className="text-secondary-foreground">
              6 chunks retrieved
            </span>{" "}
            <span className="text-muted-foreground">· top score 0.94</span>
          </TerminalLine>
          <TerminalLine
            show={visibleLines.includes(6)}
            prefix="$"
            prefixColor="text-muted-foreground"
          >
            <span className="text-muted-foreground">
              compressing memory · window=8 messages
            </span>
          </TerminalLine>
          <TerminalLine
            show={visibleLines.includes(7)}
            prefix="›"
            prefixColor="text-secondary-foreground"
          >
            <span className="text-secondary-foreground">streaming answer</span>
            <span className="inline-block w-1.5 h-3.5 bg-primary ml-1 align-middle animate-pulse" />
          </TerminalLine>
        </div>
      </div>
    </div>
  );
}

function TerminalLine({
  children,
  show,
  prefix,
  prefixColor,
}: {
  children: React.ReactNode;
  show: boolean;
  prefix: string;
  prefixColor: string;
}) {
  return (
    <div
      className={`flex gap-3 transition-all duration-400 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
    >
      <span className={`${prefixColor} shrink-0`}>{prefix}</span>
      <span>{children}</span>
    </div>
  );
}
