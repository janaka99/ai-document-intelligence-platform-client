export function TechStackSection() {
  const backend = [
    { name: "FastAPI", badge: "bg-primary/10 text-primary border-primary/30", title: "async Python API", desc: "High-throughput async endpoints with SSE streaming support and clean dependency injection." },
    { name: "LangGraph", badge: "bg-primary/10 text-primary border-primary/30", title: "agent orchestration", desc: "Stateful graph defines the reasoning loop — evaluate, optimize, search, generate." },
    { name: "MongoDB Atlas", badge: "bg-muted/30 text-muted-foreground border-border", title: "vector + document store", desc: "Stores embeddings and full documents in one place with native vector search indexes." },
    { name: "OpenAI", badge: "bg-muted/30 text-muted-foreground border-border", title: "embeddings + generation", desc: "text-embedding-3-small for vectors, gpt-4o for answers, gpt-4o-mini for memory compression." },
  ];

  const frontend = [
    { name: "Next.js 14", badge: "bg-secondary text-secondary-foreground border-secondary-foreground/30", title: "app router + React", desc: "Server components where static, client components for the live chat interface." },
    { name: "Tailwind CSS", badge: "bg-secondary text-secondary-foreground border-secondary-foreground/30", title: "utility-first styling", desc: "Consistent dark theme across dashboard, document viewer, and chat UI." },
    { name: "react-markdown", badge: "bg-muted/30 text-muted-foreground border-border", title: "dynamic rendering", desc: "Custom component map renders agent output as rich formatted content, not raw strings." },
    { name: "SSE client", badge: "bg-muted/30 text-muted-foreground border-border", title: "real-time event parsing", desc: "Interprets tool call events and text deltas to drive live UI states and streaming text." },
  ];

  return (
    <div id="architecture" className="bg-card border-y border-border">
      <div className="max-w-5xl mx-auto py-20 px-6 md:px-10">
        <div className="font-mono text-xs text-secondary-foreground tracking-widest mb-3 uppercase">under the hood</div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight mb-3">
          production-grade stack
        </h2>
        <p className="text-muted-foreground text-base max-w-xl leading-relaxed mb-12">
          Every layer chosen for reliability and performance at scale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-sm text-muted-foreground font-mono mb-5">backend</h3>
            <div className="flex flex-col gap-0">
              {backend.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-4 py-4 ${idx !== backend.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded border whitespace-nowrap mt-0.5 ${item.badge}`}>
                    {item.name}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground font-mono mb-5">frontend</h3>
            <div className="flex flex-col gap-0">
              {frontend.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-4 py-4 ${idx !== frontend.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded border whitespace-nowrap mt-0.5 ${item.badge}`}>
                    {item.name}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
