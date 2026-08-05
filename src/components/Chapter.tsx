import React from "react";
import { useParams } from "react-router-dom";
import { useProgress } from "@/hooks/use-progress";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MediaPlayer from "@/components/MediaPlayer";
import PDFViewer from "@/components/PDFViewer";
import { chapters } from "@/data/chapters";

const Chapter = () => {
  const { id } = useParams<{ id: string }>();
  const chapterId = parseInt(id || "1", 10);
  const chapter = chapters.find((c) => c.id === chapterId);
  const { progress, markCompleted } = useProgress(chapterId);
  const isCompleted = progress.completed;

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Chapter Not Found</h1>
          <a href="/" className="text-indigo-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <a href="/" className="text-indigo-600 hover:underline mb-4 inline-block">
          ← Back to Chapters
        </a>
        
        <Card className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2 text-center">{chapter.title}</h1>
            <p className="text-gray-600 text-lg">{chapter.description}</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Audio Content</h2>
              <MediaPlayer 
                chapterId={chapterId} 
                mediaType="audio" 
                audioUrl={chapter.audioUrl} 
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Video Content</h2>
              <MediaPlayer 
                chapterId={chapterId} 
                mediaType="video" 
                videoUrl={chapter.videoUrl} 
              />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Reading Material</h2>
              <PDFViewer chapterId={chapterId} pdfUrl={chapter.pdfUrl} />
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm text-gray-500">
                {isCompleted ? "Completed ✓" : "In Progress"}
              </span>
              <button
                onClick={markCompleted}
                className="text-sm rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                {isCompleted ? "Completed" : "Mark Complete"}
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chapter;