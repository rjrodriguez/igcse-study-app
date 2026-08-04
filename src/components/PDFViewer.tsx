import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    pdfjsLib?: {
      GlobalWorkerOptions: { workerSrc: string };
      getDocument: (src: string) => { promise: Promise<any> };
    };
  }
}

const PDF_WORKER_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface PDFViewerProps {
  chapterId: number;
  pdfUrl: string;
}

const PDFViewer = ({ chapterId, pdfUrl }: PDFViewerProps) => {
  const { progress } = useProgress(chapterId);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<any>(null);

  // Load the document once when the URL changes
  useEffect(() => {
    if (!pdfUrl) return;
    const pdfjsLib = window.pdfjsLib;
    if (!pdfjsLib) {
      setError("PDF.js failed to load. Check your connection and reload.");
      setIsLoading(false);
      return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
    setIsLoading(true);
    setError(null);

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise
      .then((pdf: any) => {
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        setCurrentPage(1);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.error("PDF load error:", err);
        setError("Unable to load this PDF.");
        setIsLoading(false);
      });
  }, [pdfUrl]);

  // Render the current page whenever it (or the doc) changes
  useEffect(() => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas || isLoading) return;

    pdf.getPage(currentPage).then((page: any) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const viewport = page.getViewport({ scale: 1.2 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext: ctx, viewport });
    });
  }, [currentPage, isLoading]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <Progress value={progress.audioPosition || 0} max={100} className="h-2 w-full" />
      </div>

      {isLoading && (
        <p className="text-center text-sm text-gray-500 py-8">Loading PDF…</p>
      )}
      {error && (
        <p className="text-center text-sm text-red-500 py-8">{error}</p>
      )}

      {!isLoading && !error && (
        <div className="flex flex-col items-center gap-3">
          <canvas ref={canvasRef} className="border rounded-lg max-w-full shadow-sm" />

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {numPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
              disabled={currentPage >= numPages}
            >
              Next
            </Button>
          </div>

          <a
            href={pdfUrl}
            download
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;