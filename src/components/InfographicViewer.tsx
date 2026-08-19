import { useState, useRef, useCallback, useEffect } from "react";
import { Download, X, Move, Info } from "lucide-react";

interface InfographicViewerProps {
  jpgUrl: string;
}

const InfographicViewer = ({ jpgUrl }: InfographicViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(jpgUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = jpgUrl.split("/").pop() || "infographic.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(jpgUrl, "_blank");
    }
  }, [jpgUrl]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Infografía</h2>

      <button
        onClick={() => setIsOpen(true)}
        className="relative w-full group cursor-zoom-in rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
      >
        <img
          src={jpgUrl}
          alt="Infografía"
          className="w-full h-auto object-contain max-h-64"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="bg-black/60 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </button>

      <div className="mt-2 flex justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Descargar
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col select-none">
          <div
            ref={containerRef}
            className="flex-1 overflow-auto flex items-center justify-center"
          >
            <img
              src={jpgUrl}
              alt="Infografía"
              className="max-w-none"
              draggable={false}
            />
          </div>

          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Cerrar visor"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {showInstructions && (
            <div className="absolute top-12 left-3 right-3 sm:left-auto sm:right-3 sm:w-72 bg-black/70 rounded-lg p-3 text-white text-xs space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">Cómo usar</span>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-white/60 hover:text-white"
                  aria-label="Cerrar instrucciones"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="flex items-center gap-2">
                <Move className="w-3.5 h-3.5 shrink-0" />
                Arrastra para panear y hacer zoom
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
                Haz clic para ampliar
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfographicViewer;