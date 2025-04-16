import React from 'react';
import { Link } from 'react-router-dom';
import useProgress from '../../hooks/useProgress';

const LessonCard = ({ lesson }) => {
  const { getLessonProgress } = useProgress();
  
  const progress = getLessonProgress(lesson.id);
  
  // Determine card status and styling
  const getCardStatus = () => {
    if (progress.completed) {
      return {
        label: 'Concluído',
        statusClass: 'bg-green-100 text-green-800'
      };
    } else if (progress.started) {
      return {
        label: 'Em progresso',
        statusClass: 'bg-blue-100 text-blue-800'
      };
    } else {
      return {
        label: 'Não iniciado',
        statusClass: 'bg-gray-100 text-gray-800'
      };
    }
  };
  
  const status = getCardStatus();
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className={`h-2 ${progress.completed ? 'bg-green-500' : progress.started ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
      
      <div className="p-4">
        <div className="flex items-start mb-3">
          <div className={`flex-shrink-0 w-10 h-10 ${lesson.color} rounded-full flex items-center justify-center text-xl`}>
            {lesson.icon}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-base font-medium text-gray-900">{lesson.title}</h3>
            <span className={`inline-block text-xs px-2 py-1 rounded-full ${status.statusClass} mt-1`}>
              {status.label}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {lesson.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span>Progresso:</span>
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-1.5 bg-quantum-DEFAULT"
                style={{ width: `${progress.progressPercentage}%` }}
              ></div>
            </div>
            <span>{progress.progressPercentage}%</span>
          </div>
          
          <Link
            to={`/chat/${lesson.id}`}
            className="text-sm font-medium text-quantum-DEFAULT hover:text-quantum-dark"
          >
            {progress.started ? 'Continuar' : 'Iniciar'} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;