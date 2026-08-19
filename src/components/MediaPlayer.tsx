import React, { useEffect, useRef, useMemo } from "react";
import { useProgress } from "@/hooks/use-progress";
import { Progress } from "@/components/ui/progress";

const YOUTUBE_EMBED_REGEX =
  /^https:\/\/(?:www\.)?youtube\.com\/embed\/([A-Za-z0-9_-]{11})(?:\?.*)?$/;

function sanitizeMediaUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    if (/^https?:\/\//i.test(url)) {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
      return parsed.href;
    }
    if (/^[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/.test(url)) return url;
    return null;
  } catch {
    return null;
  }
}

function sanitizeYouTubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.match(YOUTUBE_EMBED_REGEX);
  if (!match) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

interface MediaPlayerProps {
  chapterId: number;
  mediaType: "audio" | "video";
  audioUrl?: string;
  videoUrl?: string;
}

const MediaPlayer = ({ chapterId, mediaType, audioUrl, videoUrl }: MediaPlayerProps) => {
  const safeVideoUrl = useMemo(() => sanitizeYouTubeEmbedUrl(videoUrl), [videoUrl]);
  const safeAudioUrl = useMemo(() => sanitizeMediaUrl(audioUrl), [audioUrl]);
  const { progress, updateMediaPosition } = useProgress(chapterId);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaElement = mediaType === "audio" ? audioRef.current : videoRef.current;
    if (!mediaElement) return;

    // Initialize media element
    if (mediaType === "audio" && safeAudioUrl) {
      mediaElement.src = safeAudioUrl;
    } else if (safeVideoUrl) {
      mediaElement.src = safeVideoUrl;
    }

    // Update progress on media state changes
    const handleTimeUpdate = () => {
      updateMediaPosition(mediaType, mediaElement.currentTime);
    };

    mediaElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => mediaElement.removeEventListener("timeupdate", handleTimeUpdate);
  }, [chapterId, safeAudioUrl, safeVideoUrl, mediaType]);

  return (
      <div className="relative w-full max-w-md mx-auto p-4">
        <div className="relative w-full h-16 mb-2">
          <Progress
            value={progress[mediaType + "Position"] || 0}
            max={100}
            className="w-full h-2 border border-gray-300 rounded"
          />
        </div>
        {/* Audio player - sin aspect ratio forzado, tamaño natural */}
        {mediaType === "audio" && safeAudioUrl && (
          <div className="relative w-full">
            <audio ref={audioRef} className="w-full" controls>
              Your browser does not support the audio element
            </audio>
          </div>
        )}
        {/* YouTube Video iframe - con aspect-4/3 específico */}
        {mediaType === "video" && safeVideoUrl && (
          <div className="relative w-full aspect-4/3">
            <iframe
              ref={videoRef}
              width="100%"
              height="100%"
              src={safeVideoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {/* Video local - sin aspect ratio forzado */}
        {mediaType === "video" && !safeVideoUrl && (
          <video ref={videoRef} className="w-full" controls>
            Your browser does not support the video element
          </video>
        )}
      </div>
    );
};

export default MediaPlayer;