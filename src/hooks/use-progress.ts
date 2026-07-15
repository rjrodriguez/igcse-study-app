import { useState, useEffect, useCallback } from "react";
import { ChapterProgress, UserProgress } from "@/data/types";

const STORAGE_KEY = "study_app_progress";

const defaultProgress: ChapterProgress = {
  completed: false,
  audioPosition: 0,
  videoPosition: 0,
  lastAccessed: new Date().toISOString(),
};

export function useProgress(chapterId: number) {
  const [progress, setProgress] = useState<ChapterProgress>(() => {
    if (typeof window === "undefined") return defaultProgress;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allProgress: UserProgress = JSON.parse(stored);
        return allProgress[chapterId] || defaultProgress;
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage:", e);
    }
    return defaultProgress;
  });

  const saveProgress = useCallback((newProgress: ChapterProgress) => {
    setProgress(newProgress);
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const allProgress: UserProgress = stored ? JSON.parse(stored) : {};
      allProgress[chapterId] = newProgress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } catch (e) {
      console.error("Failed to save progress to localStorage:", e);
    }
  }, [chapterId]);

  const markCompleted = useCallback(() => {
    saveProgress({
      ...progress,
      completed: true,
      lastAccessed: new Date().toISOString(),
    });
  }, [progress, saveProgress]);

  const updateMediaPosition = useCallback(
    (type: "audio" | "video", position: number) => {
      saveProgress({
        ...progress,
        [type + "Position"]: position,
        lastAccessed: new Date().toISOString(),
      });
    },
    [progress, saveProgress]
  );

  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, [saveProgress]);

  return {
    progress,
    saveProgress,
    markCompleted,
    updateMediaPosition,
    resetProgress,
  };
}

export function useAllProgress() {
  const [allProgress, setAllProgress] = useState<UserProgress>(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to load progress from localStorage:", e);
      return {};
    }
  });

  const getProgress = useCallback((chapterId: number): ChapterProgress => {
    return allProgress[chapterId] || defaultProgress;
  }, [allProgress]);

  const isCompleted = useCallback(
    (chapterId: number): boolean => {
      return getProgress(chapterId).completed;
    },
    [getProgress]
  );

  const getCompletedCount = useCallback((): number => {
    return Object.values(allProgress).filter((p) => p.completed).length;
  }, [allProgress]);

  return {
    allProgress,
    getProgress,
    isCompleted,
    getCompletedCount,
  };
}