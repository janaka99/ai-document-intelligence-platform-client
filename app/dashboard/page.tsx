"use client";
import { DocumentCard } from "@/components/document-card";
import { StatsSection } from "@/components/stats-section";
import { UploadSection } from "@/components/upload-section";
import { getTotalDocumentsSize } from "@/lib/utils";
import { IDocument } from "@/types/types";
import { fetchAPI } from "@/utils/api";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const [documentsLoading, setDocumentLoading] = useState(true);
  const [totalDocumentsSize, setTotalDocumentsSize] = useState("0");

  async function fetchDocuments() {
    setDocumentLoading(true);
    await fetchDocumentsasync();
    setDocumentLoading(false);
  }

  async function fetchDocumentsasync() {
    try {
      const res = await fetchAPI("/api/v1/document");
      const data = await res.json();
      const totalSize = getTotalDocumentsSize(data);
      setTotalDocumentsSize(totalSize);
      setDocuments(data);
    } catch (error) {
      toast.error("Failed to fetch documents");
    }
  }

  const [documents, setDocuments] = useState<IDocument[]>([]);
  // Filter documents by status
  const trainedDocs = documents.filter((d) => d.status === "trained" || d.status === "training");
  const chunkedDocs = documents.filter((d) => d.status === "chunked" || d.status === "chunking");
  const untrainedDocs = documents.filter((d) => d.status === "untrained");

  function handleDelete(id: string) {
    setDocuments(documents.filter((d) => d.id !== id));
  }
  function handleChat(id: string) {
    const doc = documents.find((d) => d.id === id);
    const title = doc?.filename || "Chat Session";
    router.push(`/dashboard/chat/${id}?title=${encodeURIComponent(title)}`);
  }

  async function handleChunk(id: string) {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "chunking", training_progress: 0 } : d)),
    );

    try {
      const response = await fetchAPI(`/api/v1/document/chunk/${id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr) {
              try {
                const data = JSON.parse(dataStr);
                
                if (data.error) {
                  console.error("Chunking failed:", data.error);
                  toast.error(`Chunking failed: ${data.error}`);
                  setDocuments((prev) =>
                    prev.map((d) =>
                      d.id === id ? { ...d, status: "untrained" } : d
                    )
                  );
                } else if (data.progress !== undefined) {
                  setDocuments((prev) =>
                    prev.map((d) => {
                      if (d.id === id) {
                        return {
                          ...d,
                          training_progress: data.progress,
                          status: data.progress === 100 ? "chunked" : d.status,
                        };
                      }
                      return d;
                    })
                  );
                }
              } catch (err) {
                console.error("Error parsing stream data:", err);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to start chunking:", error);
      toast.error("Failed to start chunking");
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "untrained" } : d)),
      );
    }
  }

  async function handleTrain(id: string) {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "training", training_progress: 0 } : d)),
    );

    try {
      const response = await fetchAPI(`/api/v1/document/train/${id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr) {
              try {
                const data = JSON.parse(dataStr);
                
                if (data.error) {
                  console.error("Training failed:", data.error);
                  toast.error(`Training failed: ${data.error}`);
                  setDocuments((prev) =>
                    prev.map((d) =>
                      d.id === id ? { ...d, status: "chunked" } : d
                    )
                  );
                } else if (data.progress !== undefined) {
                  setDocuments((prev) =>
                    prev.map((d) => {
                      if (d.id === id) {
                        return {
                          ...d,
                          training_progress: data.progress,
                          status: data.progress === 100 ? "trained" : d.status,
                        };
                      }
                      return d;
                    })
                  );
                }
              } catch (err) {
                console.error("Error parsing stream data:", err);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to start training:", error);
      toast.error("Failed to start training");
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "chunked" } : d)),
      );
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);
  return (
    <div className=" max-w-screen-2xl mx-auto space-y-6 p-5">
      <StatsSection
        totalDocuments={documents.length}
        trainedDocuments={trainedDocs.filter(d => d.status === 'trained').length}
        trainingInProgress={trainedDocs.filter(d => d.status === 'training').length}
        totalSize={totalDocumentsSize}
      />
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Add Documents
        </h3>
        <UploadSection onUploadSuccess={fetchDocumentsasync} />
      </div>
      {trainedDocs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Ready for Chat ({trainedDocs.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainedDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onDelete={handleDelete}
                onChat={handleChat}
                onTrain={handleTrain}
                onChunk={handleChunk}
              />
            ))}
          </div>
        </div>
      )}

      {chunkedDocs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Ready to Train ({chunkedDocs.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chunkedDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onDelete={handleDelete}
                onChat={handleChat}
                onTrain={handleTrain}
                onChunk={handleChunk}
              />
            ))}
          </div>
        </div>
      )}

      {untrainedDocs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Ready to Process ({untrainedDocs.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {untrainedDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onDelete={handleDelete}
                onChat={handleChat}
                onTrain={handleTrain}
                onChunk={handleChunk}
              />
            ))}
          </div>
        </div>
      )}

      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No documents yet
          </h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Upload your first document to get started. You can train and chat
            with your documents.
          </p>
        </div>
      )}
    </div>
  );
}
