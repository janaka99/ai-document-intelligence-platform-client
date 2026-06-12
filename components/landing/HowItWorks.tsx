import { UploadCloud, Sparkles, MessageSquare } from "lucide-react";

const steps = [
  {
    title: "Upload",
    description: "Securely upload your documents to your private workspace.",
    icon: UploadCloud,
  },
  {
    title: "Analyze",
    description: "Our AI processes, chunks, and creates vector embeddings instantly.",
    icon: Sparkles,
  },
  {
    title: "Chat",
    description: "Start asking questions and get source-backed answers.",
    icon: MessageSquare,
  },
];

export function HowItWorks() {
  return (
    <section className="w-full py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your static files into an interactive knowledge base.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-background border-4 border-background flex items-center justify-center relative z-10 shadow-xl mb-6">
                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                    <Icon className="w-8 h-8 text-primary relative z-20" />
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-bold text-sm mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
