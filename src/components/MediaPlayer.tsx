import { useState, useRef, useEffect } from 'react';

interface MediaPlayerProps {
  type: 'audio' | 'video';
  src: string;
  title: string;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
}

export default function MediaPlayer({ type, src, title, onPlay, onPause, onComplete }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateProgress = () => {
      if (media.duration) {
        setProgress((media.currentTime / media.duration) * 100);
        setCurrentTime(media.currentTime);
      }
    };

    const setMediaDuration = () => {
      setDuration(media.duration);
    };

    media.addEventListener('timeupdate', updateProgress);
    media.addEventListener('loadedmetadata', setMediaDuration);
    media.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(100);
      onComplete?.();
    });

    return () => {
      media.removeEventListener('timeupdate', updateProgress);
      media.removeEventListener('loadedmetadata', setMediaDuration);
      media.removeEventListener('ended', () => {});
    };
  }, [onComplete]);

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
      onPause?.();
    } else {
      media.play();
      onPlay?.();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const media = mediaRef.current;
    if (!media) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    media.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
          <span className="text-gray-400 text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div 
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-lg transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 9.172l-4.799 2.74a1 1 0 00-1 0l-4.799-2.74a1 1 0 00-1 1.732l4.799 2.74a1 1 0 001 0l4.799-2.74a1 1 0 00-1-1.732z" />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden">
          {type === 'audio' ? (
            <audio ref={mediaRef} src={src} preload="metadata" />
          ) : (
            <video ref={mediaRef} src={src} preload="metadata" className="w-full rounded-lg" />
          )}
        </div>
      </div>
    </div>
  );
}