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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const clampPosition = useCallback(
    (x: number, y: number, s: number) => {
      if (s <= 1) return { x: 0, y: 0 };
      const container = containerRef.current;
      if (!container) return { x, y };
      const { width, height } = container.getBoundingClientRect();
      const maxX = (width * (s - 1)) / 2;
      const maxY = (height * (s - 1)) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [],
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setScale((prev) => {
        const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev + delta));
        setPosition((pos) => clampPosition(pos.x, pos.y, next));
        return next;
      });
    },
    [clampPosition],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    },
    [scale, position],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition(clampPosition(newX, newY, scale));
    },
    [isDragging, dragStart, scale, clampPosition],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      resetView();
    } else {
      setScale(2.5);
    }
  }, [scale, resetView]);

  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getTouchCenter = (touches: React.TouchList) => ({
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  });

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        lastTouchDistance.current = getTouchDistance(e.touches);
        lastTouchCenter.current = getTouchCenter(e.touches);
      } else if (e.touches.length === 1) {
        const now = Date.now();
        if (now - lastTap < 300) {
          if (scale > 1) {
            resetView();
          } else {
            setScale(2.5);
          }
          setLastTap(0);
          return;
        }
        setLastTap(now);
        if (scale > 1) {
          setIsDragging(true);
          setDragStart({
            x: e.touches[0].clientX - position.x,
            y: e.touches[0].clientY - position.y,
          });
        }
      }
    },
    [scale, position, lastTap, resetView],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2 && lastTouchDistance.current !== null) {
        const newDist = getTouchDistance(e.touches);
        const ratio = newDist / lastTouchDistance.current;
        lastTouchDistance.current = newDist;
        setScale((prev) => {
          const next = Math.max(
            MIN_SCALE,
            Math.min(MAX_SCALE, prev * ratio),
          );
          if (lastTouchCenter.current && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const cx = lastTouchCenter.current.x - rect.left - rect.width / 2;
            const cy = lastTouchCenter.current.y - rect.top - rect.height / 2;
            const scaleChange = next / prev;
            setPosition((pos) =>
              clampPosition(
                cx - (cx - pos.x) * scaleChange,
                cy - (cy - pos.y) * scaleChange,
                next,
              ),
            );
          }
          lastTouchCenter.current = getTouchCenter(e.touches);
          return next;
        });
      } else if (e.touches.length === 1 && isDragging) {
        const newX = e.touches[0].clientX - dragStart.x;
        const newY = e.touches[0].clientY - dragStart.y;
        setPosition(clampPosition(newX, newY, scale));
      }
    },
    [isDragging, dragStart, scale, clampPosition],
  );

  const handleTouchEnd = useCallback(() => {
    lastTouchDistance.current = null;
    lastTouchCenter.current = null;
    setIsDragging(false);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "+" || e.key === "=")
        setScale((p) => Math.min(MAX_SCALE, p + ZOOM_STEP));
      if (e.key === "-") setScale((p) => Math.max(MIN_SCALE, p - ZOOM_STEP));
      if (e.key === "0") resetView();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, resetView]);

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
          className="fixed inset-0 z-[100] bg-black flex flex-col"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "none" }}
        >
          <div
            ref={containerRef}
            className="flex-1 overflow-hidden flex items-center justify-center"
            style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
          >
            <img
              src={jpgUrl}
              alt="Infographic"
              className="max-w-none select-none"
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
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
                <ZoomIn className="w-3.5 h-3.5 shrink-0" />
                Pinch to zoom in/out
              </p>
              <p className="flex items-center gap-2">
                <Move className="w-3.5 h-3.5 shrink-0" />
                Drag to pan when zoomed
              </p>
              <p className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 shrink-0" />
                Double-tap to toggle zoom
              </p>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() =>
                  setScale((p) => Math.max(MIN_SCALE, p - ZOOM_STEP))
                }
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
                onClick={() =>
                  setScale((p) => Math.min(MAX_SCALE, p + ZOOM_STEP))
                }
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
