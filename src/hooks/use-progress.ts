import { useState, useEffect } from "react";
import { ChapterProgress, UserProgress } from "@/data/types";

const STORAGE_KEY = "study_app_progress";

export function useProgress(chapterId: number) {
  const [progress, setProgress] = useState<ChapterProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed[chapterId] || { completed: false, audioPosition: 0, videoPosition: 0, lastAccessed: new Date().toISOString() };
    }
    return { completed: false, audioPosition: 0, videoPosition: 0, lastAccessed: new Date().toISOString() };
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: UserProgress = JSON.parse(saved);
      if (parsed[chapterId]) {
        setProgress(parsed[chapterId]);
      }
    }
  }, [chapterId]);

  const updateProgress = (newProgress: Partial<ChapterProgress>) => {
    const updated = {...progress,...newProgress, lastAccessed: new Date().toISOString() };
    setProgress(updated);

    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed: UserProgress = saved? JSON.parse(saved) : {};
    parsed[chapterId] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  };

  return { progress, updateProgress };
}

export function useAllProgress() {
  const [allProgress, setAllProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved? JSON.parse(saved) : {};
  });

  const getCompletedCount = () => {
    return Object.values(allProgress).filter(p => p.completed).length;
  };

  return { allProgress, getCompletedCount };
}