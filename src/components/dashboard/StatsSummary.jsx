import React from 'react';

const StatsSummary = ({ completedLessons, inProgressLessons, totalLessons }) => {
  // Calculate remaining lessons
  const remainingLessons = totalLessons - completedLessons - inProgressLessons;
  
  // Estimate time to completion (just a rough estimate for demonstration)
  const estimateTimeToCompletion = () => {
    // Assume each lesson takes about 1 hour
    const remainingTime = remainingLessons * 60; // in minutes
    
    if (remainingTime <= 0) {
      return 'Concluído!';
    } else if (remainingTime < 60) {
      return `~${remainingTime} minutos`;
    } else {
      const hours = Math.floor(remainingTime / 60);
      const minutes = remainingTime % 60;
      return `~${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Concluídas</span>
          <span className="text-sm font-semibold">{completedLessons} de {totalLessons}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Em progresso</span>
          <span className="text-sm font-semibold">{inProgressLessons} de {totalLessons}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${(inProgressLessons / totalLessons) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Não iniciadas</span>
          <span className="text-sm font-semibold">{remainingLessons} de {totalLessons}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-gray-500 rounded-full"
            style={{ width: `${(remainingLessons / totalLessons) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="rounded-full bg-quantum-light p-2 mr-3">
            <span className="text-white text-lg">⏱️</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tempo estimado para conclusão</p>
            <p className="font-medium">{estimateTimeToCompletion()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;