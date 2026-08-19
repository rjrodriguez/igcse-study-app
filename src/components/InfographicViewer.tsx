import { useState, useRef, useCallback, useEffect } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  X,
  Move,
  Info,
} from "lucide-react";

interface InfographicViewerProps {
  jpgUrl: string;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.25;

const InfographicViewer = ({ jpgUrl }: InfographicViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetView = useCallback(() => {
    setScale(1);
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(MAX_SCALE, prev + ZOOM_STEP));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(MIN_SCALE, prev - ZOOM_STEP));
  }, []);

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
        onClick={() => {
          resetView();
          setIsOpen(true);
        }}
        className="relative w-full group cursor-zoom-in rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
      >
        <img
          src={jpgUrl}
          alt="Infographic thumbnail"
          className="w-full h-auto object-contain max-h-64"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="bg-black/60 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col select-none"
        >
          <div
            ref={containerRef}
            className="flex-1 overflow-auto flex items-center justify-center"
            style={{ touchAction: "pan-zoom" }}
          >
            <img
              src={jpgUrl}
              alt="Infographic"
              className="max-w-none"
              draggable={false}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                width: "fit-content",
                height: "fit-content",
              }}
            />
          </div>

          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-white text-sm font-medium">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {showInstructions && (
            <div className="absolute top-12 left-3 right-3 sm:left-auto sm:right-3 sm:w-72 bg-black/70 rounded-lg p-3 text-white text-xs space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">How to use</span>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-white/60 hover:text-white"
                  aria-label="Dismiss instructions"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="flex items-center gap-2">
                <Move className="w-3.5 h-3.5 shrink-0" />
                Drag to pan and zoom
              </p>
              <p className="flex items-center gap-2">
                <ZoomIn className="w-3.5 h-3.5 shrink-0" />
                Use buttons for additional zoom
              </p>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={handleZoomOut}
                disabled={scale <= MIN_SCALE}
                className="text-white/80 hover:text-white disabled:text-white/30 p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <span className="text-white text-xs w-12 text-center tabular-nums">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={handleZoomIn}
                disabled={scale >= MAX_SCALE}
                className="text-white/80 hover:text-white disabled:text-white/30 p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <div className="w-px h-5 bg-white/20 mx-1" />

              <button
                onClick={resetView}
                disabled={scale === 1}
                className="text-white/80 hover:text-white disabled:text-white/30 p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <div className="w-px h-5 bg-white/20 mx-1" />

              <button
                onClick={handleDownload}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Download image"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfographicViewer;