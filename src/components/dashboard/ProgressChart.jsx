import React from 'react';
import useProgress from '../../hooks/useProgress';
import useChat from '../../hooks/useChat';

const ProgressChart = () => {
  const { getLessons } = useChat();
  const { getLessonProgress } = useProgress();
  
  const lessons = getLessons();
  
  // Create data for bar chart
  const getChartData = () => {
    return lessons.map(lesson => {
      const progress = getLessonProgress(lesson.id);
      return {
        id: lesson.id,
        title: lesson.title,
        progress: progress.progressPercentage,
        color: lesson.color.replace('bg-', 'text-')
      };
    });
  };
  
  const chartData = getChartData();
  
  return (
    <div className="mt-2">
      <div className="flex items-end space-x-2">
        {chartData.map((item) => (
          <div key={item.id} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-600 mb-1">{item.progress}%</div>
            <div 
              className="w-full bg-gray-100 rounded-t-sm" 
              style={{ height: `${Math.max(4, item.progress)}px` }}
            >
              <div 
                className="h-full bg-quantum-DEFAULT rounded-t-sm" 
                style={{ width: '100%' }}
              ></div>
            </div>
            <div className="w-full text-center mt-2">
              <span className="text-xl">{item.id}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 text-center mt-4">
        <div className="flex justify-between">
          <span>Aula 1</span>
          <span>Aula 10</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;