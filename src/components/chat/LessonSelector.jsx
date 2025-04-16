import React from 'react';
import useProgress from '../../../hooks/useProgress';

const LessonSelector = ({ lessons, selectedLessonId, onLessonSelect }) => {
  const { getLessonProgress } = useProgress();
  
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Aulas</h2>
      
      <div className="space-y-2">
        {lessons.map((lesson) => {
          const progress = getLessonProgress(lesson.id);
          const isSelected = selectedLessonId === lesson.id;
          
          return (
            <button
              key={lesson.id}
              className={`w-full flex items-center p-3 rounded-md transition-colors ${
                isSelected
                  ? 'bg-quantum-light text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => onLessonSelect(lesson.id)}
            >
              <div className={`flex-shrink-0 w-8 h-8 ${isSelected ? 'bg-white/20' : lesson.color} rounded-full flex items-center justify-center`}>
                <span className="text-lg">{lesson.icon}</span>
              </div>
              <div className="ml-3 flex-1 text-left">
                <div className="font-medium text-sm">{lesson.title}</div>
                
                {!isSelected && (
                  <div className="mt-1 flex items-center">
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-1 bg-quantum-DEFAULT"
                        style={{ width: `${progress.progressPercentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500 min-w-[32px]">
                      {progress.progressPercentage}%
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonSelector;