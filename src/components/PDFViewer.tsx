import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";

interface PDFViewerProps {
  chapterId: number;
  pdfUrl: string;
}

const PDFViewer = ({ chapterId, pdfUrl }: PDFViewerProps) => {
  const { progress } = useProgress(chapterId);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    // Initialize PDF.js viewer
    const pdfjsLib = window['pdfjsLib'];
    const loadingTask = pdfjsLib.getDocument(pdfUrl).promise;

    loadingTask.then((pdf: { numPages: number }) => {
      setPageCount(pdf.numPages);
      setIsLoading(false);
    });
  }, [pdfUrl]);

  return (
    <div className="relative w-full max-w-md mx-auto p-4">
      <div className="relative w-full h-16 mb-4">
        <Progress
          value={progress.audioPosition || 0}
          max={100}
          className="w-full h-2 border border-gray-300 rounded"
        />
      </div>
      <div className="relative w-full h-auto">
        {!isLoading && (
          <div className="relative w-full h-96">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-gray-500 opacity-50">
              {isLoading && "Loading PDF..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;