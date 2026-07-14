import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  title: string;
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setIsLoading(true);
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load PDF');
        setIsLoading(false);
      }
    };

    loadPDF();
  }, [url]);

  const renderPage = async (pageNum: number) => {
    if (!pdfRef.current || !containerRef.current) return;

    try {
      const page = await pdfRef.current.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(canvas);

      const renderContext = {
        canvasContext: context!,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
    }
  };

  useEffect(() => {
    if (currentPage > 0) {
      renderPage(currentPage);
    }
  }, [currentPage, scale]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Loading PDF...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-gray-800 truncate">{title}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <span className="text-sm text-gray-600 w-16 text-center">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(s => Math.min(2, s + 0.1))}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-600 w-20 text-center">
              Page {currentPage} of {numPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
              disabled={currentPage === numPages}
              className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Download
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="bg-gray-100 rounded-lg overflow-hidden shadow-inner min-h-[500px] flex items-center justify-center"
      >
        <div className="w-full max-w-prose mx-auto"></div>
      </div>
    </div>
  );
}