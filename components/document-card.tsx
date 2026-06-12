"use client";

import { useState } from "react";
import {
  MessageSquare,
  Trash2,
  CheckCircle,
  Clock,
  FileText,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IDocument } from "@/types/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { fetchAPI } from "@/utils/api";
import { toast } from "sonner";

interface DocumentCardProps {
  document: IDocument;
  onDelete: (id: string) => void;
  onChat?: (id: string) => void;
  onTrain?: (id: string) => void;
  onChunk?: (id: string) => void;
}

export function DocumentCard({
  document,
  onDelete,
  onChat,
  onTrain,
  onChunk,
}: DocumentCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const performDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetchAPI(`/api/v1/document/${document.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete document");
      }
      toast.success("Document deleted successfully");
      setIsDialogOpen(false);
      onDelete(document.id);
    } catch (error) {
      toast.error("Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  const statusConfig = {
    trained: {
      icon: <CheckCircle className="w-4 h-4 text-green-400" />,
      label: "Trained",
      color: "bg-green-500/10 border-green-500/30",
    },
    training: {
      icon: <Clock className="w-4 h-4 text-blue-400" />,
      label: "Training...",
      color: "bg-blue-500/10 border-blue-500/30",
    },
    chunked: {
      icon: <CheckCircle className="w-4 h-4 text-purple-400" />,
      label: "Chunked",
      color: "bg-purple-500/10 border-purple-500/30",
    },
    chunking: {
      icon: <Clock className="w-4 h-4 text-yellow-400" />,
      label: "Chunking...",
      color: "bg-yellow-500/10 border-yellow-500/30",
    },
    untrained: {
      icon: <FileText className="w-4 h-4 text-gray-400" />,
      label: "Ready to process",
      color: "bg-gray-500/10 border-gray-500/30",
    },
  };

  const config = statusConfig[document.status];

  return (
    <div
      className="relative group bg-card border border-border rounded-lg p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-primary/20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Status Badge */}
      <div
        className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1 rounded-full border ${config.color} text-xs font-medium bg-background`}
      >
        {config.icon}
        {config.label}
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4 pr-24">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {document.filename}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{document.size}</p>
        </div>
      </div>

      {/* Training / Chunking Progress */}
      {(document.status === "training" || document.status === "chunking") && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">
              {document.status === "training" ? "Training" : "Chunking"} progress
            </span>
            <span className="text-xs font-medium text-foreground">
              {document.training_progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${document.status === 'training' ? 'bg-gradient-to-r from-primary to-accent' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}`}
              style={{ width: `${document.training_progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="text-xs text-muted-foreground mb-4">
        Uploaded {document.created_at}
      </div>

      {/* Actions */}
      <div
        className={`flex gap-2 transition-all duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}
      >
        {document.status === "untrained" && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs"
            onClick={() => onChunk?.(document.id)}
          >
            <Play className="w-3 h-3 mr-1" />
            Chunk
          </Button>
        )}
        {document.status === "chunked" && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
            onClick={() => onTrain?.(document.id)}
          >
            <Play className="w-3 h-3 mr-1" />
            Train
          </Button>
        )}
        {document.status === "trained" && (
          <Button
            size="sm"
            className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
            onClick={() => onChat?.(document.id)}
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Chat
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="flex-1 h-8 text-xs text-white hover:bg-destructive hover:text-destructive"
          onClick={() => setIsDialogOpen(true)}
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={(open) => {
        if (!isDeleting) setIsDialogOpen(open);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete <b>{document.filename}</b> from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={performDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
