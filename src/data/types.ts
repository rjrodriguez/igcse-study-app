export interface ChapterData {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  videoUrl: string;
  pdfUrl: string;
}

export interface ChapterProgress {
  completed: boolean;
  audioPosition: number;
  videoPosition: number;
  lastAccessed: string;
}

export interface UserProgress {
  [key: number]: ChapterProgress;
}