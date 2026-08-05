import React from "react";
import { useAllProgress } from "@/hooks/use-progress";
import ChapterCard from "@/components/ChapterCard";
import { chapters } from "@/data/chapters";
import { ChapterData } from "@/data/types";

const ChapterCardList = () => {
  const { getCompletedCount } = useAllProgress();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {chapters.map((chapter: ChapterData) => (
        <ChapterCard 
          key={chapter.id} 
          chapterId={chapter.id} 
          title={chapter.title} 
          description={chapter.description}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const { getCompletedCount } = useAllProgress();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">Study App</h1>
        <p className="text-lg text-gray-600 mb-12">Learn with audio, video, and PDF content</p>
        
        <ChapterCardList />
        
        <div className="mt-16">
          <p className="text-lg text-gray-500 mb-4">
            {getCompletedCount()} chapters completed
          </p>
          <p className="text-lg text-gray-500">
            Track your progress and continue where you left off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;