import { useRouter } from "next/navigation";
import { useTrainedDocuments } from "@/hooks/useTrainedDocuments";
import { FileText, Loader2, MessageSquare } from "lucide-react";

export function ChatSidebar() {
  const router = useRouter();
  const { documents, isLoading } = useTrainedDocuments();

  const handleDocumentClick = (documentId: string, title: string) => {
    router.push(`/dashboard/chat/${documentId}?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden mt-4">
      <div className="px-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Ready to Chat
      </div>
      
      <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        ) : documents.length === 0 ? (
          <div className="px-4 py-3 text-sm text-muted-foreground text-center bg-muted/30 rounded-lg mx-2 border border-border/50">
            No trained documents
          </div>
        ) : (
          <ul className="space-y-1">
            {documents.map((doc) => (
              <li key={doc.id}>
                <button
                  onClick={() => handleDocumentClick(doc.id, doc.filename || "Untitled")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-foreground hover:bg-muted transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{doc.filename || "Untitled Document"}</p>
                    <p className="text-[10px] text-green-500 font-medium tracking-wide uppercase">Ready</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
