import React from 'react';
import useChat from '../../hooks/useChat';

const ProgressOverview = ({ studentId }) => {
  const { getLessons } = useChat();
  const lessons = getLessons();
  
  // In a real app, this would fetch the student's progress for each lesson
  const getMockLessonProgress = (lessonId) => {
    // Generate mock progress data based on student ID and lesson ID
    const seed = parseInt(studentId.replace('usr_', '')) + lessonId;
    const progress = Math.min(100, (seed % 20) * 5);
    
    return {
      lessonId,
      progress,
      started: progress > 0,
      completed: progress === 100,
      lastActive: new Date(Date.now() - (seed % 10) * 86400000).toISOString(),
      interactions: seed % 30
    };
  };
  
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Progresso nas Aulas</h3>
      
      <div className="space-y-4">
        {lessons.map(lesson => {
          const progress = getMockLessonProgress(lesson.id);
          
          return (
            <div key={lesson.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className={`w-8 h-8 ${lesson.color} rounded-full flex items-center justify-center text-lg mr-3`}>
                    {lesson.icon}
                  </div>
                  <h4 className="font-medium">{lesson.title}</h4>
                </div>
                <div className="text-sm text-gray-600">
                  {progress.completed ? (
                    <span className="text-green-600 font-medium">Concluído</span>
                  ) : progress.started ? (
                    <span className="text-blue-600 font-medium">Em progresso</span>
                  ) : (
                    <span className="text-gray-500">Não iniciado</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="w-full h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className={`h-2 rounded-full ${progress.completed ? 'bg-green-500' : 'bg-quantum-DEFAULT'}`}
                    style={{ width: `${progress.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-12 text-right">{progress.progress}%</span>
              </div>
              
              <div className="flex flex-wrap text-xs text-gray-600 mt-2">
                <div className="w-1/2 mb-1">
                  <span className="font-medium">Interações:</span> {progress.interactions}
                </div>
                <div className="w-1/2 mb-1">
                  <span className="font-medium">Última atividade:</span> {new Date(progress.lastActive).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressOverview;