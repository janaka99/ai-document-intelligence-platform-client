"use client";

import { useState, useRef } from "react";
import { Upload, File, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/utils/api";
import { toast } from "sonner";

interface UploadFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

interface UploadSectionProps {
  onFilesSelected?: (files: File[]) => void;
  onUploadSuccess: () => {};
}

export function UploadSection({
  onFilesSelected,
  onUploadSuccess,
}: UploadSectionProps) {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const isValid =
        file.type === "application/pdf" || file.name.endsWith(".pdf");
      return isValid;
    });

    if (validFiles.length === 0) {
      return;
    }

    const newUploads = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: "pending" as const,
    }));

    setUploads((prev) => [...prev, ...newUploads]);
    onFilesSelected?.(validFiles);

    // Start actual upload
    newUploads.forEach((upload) => {
      uploadFile(upload.id, upload.file);
    });
  };

  const uploadFile = async (uploadId: string, file: File) => {
    setUploads((prev) =>
      prev.map((u) => (u.id === uploadId ? { ...u, status: "uploading" } : u)),
    );

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetchAPI("/api/v1/document/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      setUploads((prev) =>
        prev.map((u) => (u.id === uploadId ? { ...u, status: "success" } : u)),
      );
      onUploadSuccess();
      toast.success("Document uploaded successfully");
    } catch (error) {
      toast.error("Upload failed");
      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId
            ? { ...u, status: "error", error: "Upload failed" }
            : u,
        ),
      );
    }
  };

  const removeUpload = (uploadId: string) => {
    setUploads((prev) => prev.filter((u) => u.id !== uploadId));
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:bg-muted/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleFiles(Array.from(e.target.files))
          }
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold text-foreground">
              Drop your documents here
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary font-medium transition-colors cursor-pointer"
              >
                click to browse
              </button>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supports PDF files up to 50MB
            </p>
          </div>
        </div>
      </div>

      {/* Upload List */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Uploading
          </h4>
          <div className="space-y-2">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="bg-card border border-border rounded-lg p-4 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="w-4 h-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {upload.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {upload.status === "success" && (
                    <div className="text-xs font-medium text-green-400">
                      Done
                    </div>
                  )}
                  {upload.status === "error" && (
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  )}
                  {upload.status !== "success" && (
                    <button
                      onClick={() => removeUpload(upload.id)}
                      className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {upload.status === "uploading" && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <p className="text-xs text-muted-foreground animate-pulse">
                      Processing...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
