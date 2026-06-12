import { MessageSquare, Search, Zap, Lock, Database, Layout } from "lucide-react";

const features = [
  {
    title: "Conversational Intelligence",
    description: "Chat directly with your documents. Ask complex questions and get accurate answers instantly.",
    icon: MessageSquare,
  },
  {
    title: "Semantic Search",
    description: "Go beyond keyword matching. Our AI understands the context and intent behind your search.",
    icon: Search,
  },
  {
    title: "Lightning Fast Analysis",
    description: "Process massive documents in seconds. Get insights without reading hundreds of pages.",
    icon: Zap,
  },
  {
    title: "Private & Secure",
    description: "Your documents are encrypted and never used to train public models. Enterprise-grade security.",
    icon: Lock,
  },
  {
    title: "Format Agnostic",
    description: "Support for PDF, Word, TXT, and more. Upload your data and let the AI do the parsing.",
    icon: Database,
  },
  {
    title: "Intuitive Dashboard",
    description: "A beautifully designed workspace to manage, organize, and interact with all your knowledge.",
    icon: Layout,
  },
];

export function Features() {
  return (
    <section className="w-full py-24 bg-muted/30 relative">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to master your documents
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive suite of tools designed to make interacting with large volumes of text effortless and intelligent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col items-start p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:-translate-y-4 group-hover:translate-x-4 duration-500 pointer-events-none">
                  <Icon className="w-32 h-32" />
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
