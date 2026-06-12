export type DocumentStatus = "untrained" | "chunking" | "chunked" | "training" | "trained";

export interface IDocument {
  id: string;
  filename: string;
  file_path: string; // Or you could map this to 'filePath' depending on your frontend conventions
  size: number;
  created_at: string; // ISO 8601 string from Python's datetime
  training_progress: number;
  status: DocumentStatus;
}
