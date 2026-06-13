import { Brain, Search, Network, MessageSquare, Zap, Table } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-5 h-5 text-primary" />,
      title: "agentic workflow",
      description: "LangGraph powers a multi-step agent loop. The AI decides when to refine a query, when to search, and when it has enough context to answer.",
      color: "bg-primary/10"
    },
    {
      icon: <Search className="w-5 h-5 text-primary" />,
      title: "query optimization",
      description: "Before touching your vectors, the agent rewrites ambiguous or complex questions into precise search queries that surface the right chunks.",
      color: "bg-primary/10"
    },
    {
      icon: <Network className="w-5 h-5 text-secondary-foreground" />,
      title: "semantic vector search",
      description: "OpenAI embeddings + MongoDB Atlas vector search. Finds conceptually similar content, not just keyword matches.",
      color: "bg-secondary"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-secondary-foreground" />,
      title: "memory management",
      description: "A sliding window keeps recent messages verbatim. Older turns are compressed by a cheap LLM — long conversations without ballooning token costs.",
      color: "bg-secondary"
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: "streaming via SSE",
      description: "Server-Sent Events stream every token — including live tool call events — so users see the agent thinking in real time.",
      color: "bg-primary/10"
    },
    {
      icon: <Table className="w-5 h-5 text-secondary-foreground" />,
      title: "rich markdown output",
      description: "Responses render as tables, code blocks, bullet lists, and clickable links — structured for readability, not raw text dumps.",
      color: "bg-secondary"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 md:px-10 max-w-5xl mx-auto">
      <div className="font-mono text-xs text-primary tracking-widest mb-3 uppercase">core capabilities</div>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight mb-3">
        not just search.<br />
        genuine reasoning.
      </h2>
      <p className="text-muted-foreground text-base max-w-xl leading-relaxed mb-11">
        Most RAG systems do one dumb vector lookup. This one thinks before it searches.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
        {features.map((feat, idx) => (
          <div key={idx} className="bg-card p-7 transition-colors hover:bg-muted/50">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${feat.color}`}>
              {feat.icon}
            </div>
            <h3 className="text-sm font-medium text-foreground mb-2">{feat.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
