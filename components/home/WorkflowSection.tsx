import { Upload, MessageSquare, Brain, Zap } from "lucide-react";

export function WorkflowSection() {
  const steps = [
    {
      num: "01",
      icon: <Upload className="w-6 h-6 text-primary mb-3 mx-auto" />,
      title: "upload",
      desc: "Drop any PDF or document. It's chunked, embedded, and indexed in MongoDB Atlas."
    },
    {
      num: "02",
      icon: <MessageSquare className="w-6 h-6 text-primary mb-3 mx-auto" />,
      title: "ask",
      desc: "Type a question in natural language — vague, detailed, or multi-part."
    },
    {
      num: "03",
      icon: <Brain className="w-6 h-6 text-secondary-foreground mb-3 mx-auto" />,
      title: "agent reasons",
      desc: "The LangGraph agent evaluates complexity, refines the query, and searches your vectors."
    },
    {
      num: "04",
      icon: <Zap className="w-6 h-6 text-secondary-foreground mb-3 mx-auto" />,
      title: "streams back",
      desc: "The grounded answer streams token-by-token with live tool call visibility."
    }
  ];

  return (
    <div className="py-20 px-6 md:px-10 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="font-mono text-xs text-primary tracking-widest mb-3 uppercase inline-block">how it works</div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-tight">
          from question to answer
        </h2>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="p-6 md:p-8 text-center relative group">
              {idx !== steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 w-px h-2/5 bg-border -translate-y-1/2" />
              )}
              {idx !== steps.length - 1 && idx % 2 === 0 && (
                <div className="hidden sm:block md:hidden absolute right-0 top-1/2 w-px h-2/5 bg-border -translate-y-1/2" />
              )}
              {idx > 1 && (
                <div className="hidden sm:block md:hidden absolute top-0 left-1/2 w-2/5 h-px bg-border -translate-x-1/2" />
              )}
              {idx > 0 && (
                <div className="block sm:hidden absolute top-0 left-1/2 w-2/5 h-px bg-border -translate-x-1/2" />
              )}
              
              <div className="font-mono text-xs text-primary mb-4">{step.num}</div>
              {step.icon}
              <h4 className="text-sm font-medium text-foreground mb-2">{step.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
