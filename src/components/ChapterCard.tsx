import React from "react";
import { useProgress } from "@/hooks/use-progress";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface ChapterCardProps {
  chapterId: number;
  title: string;
  description: string;
}

const ChapterCard = ({ chapterId, title, description }: ChapterCardProps) => {
  const { progress } = useProgress(chapterId);
  const isCompleted = progress.completed;

  return (
    <Link to={`/chapter/${chapterId}`} className="text-decoration-none">
      <Card className="bg-white rounded-xl shadow-sm p-4 h-full transition-transform hover:scale-105">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2 text-center">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Progress
              </span>
              <Progress
                value={isCompleted ? 100 : 0}
                max={100}
                className="h-2 w-full"
              />
            </div>
            <div className="text-center">
              <span className={`text-xs font-medium ${isCompleted ? "text-green-600" : "text-gray-500"}`}>
                {isCompleted ? "Completed" : "Not Started"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ChapterCard;