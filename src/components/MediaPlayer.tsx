import React, { useEffect, useRef } from "react";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";

interface MediaPlayerProps {
  chapterId: number;
  mediaType: "audio" | "video";
  audioUrl?: string;
  videoUrl?: string;
}

const MediaPlayer = ({ chapterId, mediaType, audioUrl, videoUrl }: MediaPlayerProps) => {
  const { progress, updateMediaPosition } = useProgress(chapterId);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaElement = mediaType === "audio" ? audioRef.current : videoRef.current;
    if (!mediaElement) return;

    // Initialize media element
    if (mediaType === "audio") {
      mediaElement.src = audioUrl || "";
    } else {
      mediaElement.src = videoUrl || "";
    }

    // Update progress on media state changes
    const handleTimeUpdate = () => {
      updateMediaPosition(mediaType, mediaElement.currentTime);
    };

    mediaElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => mediaElement.removeEventListener("timeupdate", handleTimeUpdate);
  }, [chapterId, audioUrl, videoUrl, mediaType]);

  return (
      <div className="relative w-full max-w-md mx-auto p-4">
        <div className="relative w-full h-16 mb-4">
          <Progress
            value={progress[mediaType + "Position"] || 0}
            max={100}
            className="w-full h-2 border border-gray-300 rounded"
          />
        </div>
        {/* Audio player - sin aspect ratio forzado, tamaño natural */}
        {mediaType === "audio" && (
          <div className="relative w-full">
            <audio ref={audioRef} className="w-full" controls>
              Your browser does not support the audio element
            </audio>
          </div>
        )}
        {/* YouTube Video iframe - con aspect-4/3 específico */}
        {mediaType === "video" && videoUrl?.includes("youtube.com/embed/") && (
          <div className="relative w-full aspect-4/3">
            <iframe
              ref={videoRef}
              width="100%"
              height="100%"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {/* Video local - sin aspect ratio forzado */}
        {mediaType === "video" && !videoUrl?.includes("youtube.com/embed/") && (
          <video ref={videoRef} className="w-full" controls>
            Your browser does not support the video element
          </video>
        )}
      </div>
    );
};

export default MediaPlayer;