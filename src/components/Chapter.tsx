import { useState } from 'react';
import { useLocalStorage } from '../hooks/use-progress';
import MediaPlayer from './MediaPlayer';
import PDFViewer from './PDFViewer';

interface ChapterProps {
  chapterNumber: number;
  title: string;
  audioUrl: string;
  videoUrl: string;
  pdfUrl: string;
}

export default function Chapter({ chapterNumber, title, audioUrl, videoUrl, pdfUrl }: ChapterProps) {
  const [activeTab, setActiveTab] = useState<'audio' | 'video' | 'pdf'>('audio');
  const [progress, setProgress] = useLocalStorage(`chapter-${chapterNumber}-progress`, 0);
  const [completed, setCompleted] = useLocalStorage(`chapter-${chapterNumber}-completed`, false);

  const handleMediaComplete = () => {
    setCompleted(true);
    setProgress(100);
  };

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
    if (newProgress >= 90) {
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Chapter {chapterNumber}
            </span>
            {completed && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Completed
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['audio', 'video', 'pdf'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'audio' | 'video' | 'pdf')}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Panels */}
        <div className="bg-white rounded-b-lg rounded-t-none shadow-sm overflow-hidden">
          {activeTab === 'audio' && (
            <div className="p-6">
              <MediaPlayer
                type="audio"
                src={audioUrl}
                title={`${title} - Audio`}
                onComplete={handleMediaComplete}
              />
            </div>
          )}

          {activeTab === 'video' && (
            <div className="p-6">
              <MediaPlayer
                type="video"
                src={videoUrl}
                title={`${title} - Video`}
                onComplete={handleMediaComplete}
              />
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="p-6">
              <PDFViewer
                url={pdfUrl}
                title={`${title} - Reading Material`}
              />
            </div>
          )}
        </div>

        {/* Chapter Navigation */}
        <div className="flex justify-between mt-8">
          {chapterNumber > 1 && (
            <a 
              href={`/chapter/${chapterNumber - 1}`}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous Chapter
            </a>
          )}
          {chapterNumber < 10 && (
            <a 
              href={`/chapter/${chapterNumber + 1}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Next Chapter
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}