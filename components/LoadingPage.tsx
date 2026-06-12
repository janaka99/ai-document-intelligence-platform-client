import { Loader2 } from "lucide-react";

interface LoadingPageProps {
  text?: string;
  fullScreen?: boolean;
}

export function LoadingPage({ text = "", fullScreen = true }: LoadingPageProps) {
  return (
    <div className={`${fullScreen ? 'min-h-screen' : 'h-full w-full'} flex flex-col items-center justify-center bg-background text-muted-foreground`}>
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <p className="text-lg font-medium animate-pulse">{text}</p>
    </div>
  );
}
