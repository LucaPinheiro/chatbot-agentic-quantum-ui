import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useChat from '../../../hooks/useChat';
import useProgress from '../../../hooks/useProgress';

// Dashboard components
import LessonCard from '../../components/dashboard/LessonCard';
import ProgressChart from './ProgressChart.tsx';
import StatsSummary from './StatsSummary.jsx/index.ts';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getLessons } = useChat();
  const { 
    getOverallProgress, 
    getCompletedLessonsCount, 
    getInProgressLessons 
  } = useProgress();
  
  const lessons = getLessons();
  const overallProgress = getOverallProgress();
  const completedLessons = getCompletedLessonsCount();
  const inProgressLessons = getInProgressLessons();
  
  // Get the next recommended lesson
  const getNextRecommendedLesson = () => {
    // If there are lessons in progress, recommend the first one
    if (inProgressLessons.length > 0) {
      return lessons.find(lesson => lesson.id === inProgressLessons[0]);
    }
    
    // Otherwise, recommend the next lesson after completed ones
    const nextLessonId = completedLessons + 1;
    if (nextLessonId <= 10) {
      return lessons.find(lesson => lesson.id === nextLessonId);
    }
    
    // If all lessons are completed, recommend the first one
    return lessons[0];
  };
  
  const nextLesson = getNextRecommendedLesson();
  
  // Calculate recent activity
  const getRecentActivity = () => {
    // In a real app, this would fetch actual recent activity
    // For now, just return some mock data
    return [
      {
        id: 1,
        type: 'chat',
        lessonId: inProgressLessons[0] || nextLesson.id,
        timestamp: new Date().toISOString(),
        description: 'Você continuou a aula sobre ' + 
          (inProgressLessons.length > 0 
            ? lessons.find(l => l.id === inProgressLessons[0])?.title 
            : nextLesson.title)
      },
      {
        id: 2,
        type: 'achievement',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        description: 'Você completou a aula sobre ' + 
          (completedLessons > 0 
            ? lessons.find(l => l.id === completedLessons)?.title 
            : 'Introdução à Computação Quântica')
      }
    ];
  };
  
  const recentActivity = getRecentActivity();
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Olá, {currentUser?.name || 'Estudante'}! 👋
        </h1>
        <p className="text-gray-600">
          Bem-vindo ao seu painel de aprendizado em Computação Quântica.
        </p>
      </div>
      
      {/* Progress overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Seu progresso</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-4 flex-grow bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-4 bg-quantum-DEFAULT"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <span className="text-xl font-semibold">{overallProgress}%</span>
          </div>
          <ProgressChart />
        </div>
        
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Estatísticas</h2>
          <StatsSummary
            completedLessons={completedLessons}
            inProgressLessons={inProgressLessons.length}
            totalLessons={10}
          />
        </div>
      </div>
      
      {/* Next recommended lesson */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Continuar aprendendo</h2>
        <div className="bg-gradient-to-r from-quantum-light to-quantum-dark text-white rounded-lg p-6 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm font-medium text-white/80">Recomendado para você</span>
              <h3 className="text-xl font-bold mb-2">{nextLesson.title}</h3>
              <p className="mb-4 text-white/90">{nextLesson.description}</p>
              <Link 
                to={`/chat/${nextLesson.id}`}
                className="inline-flex items-center bg-white text-quantum-DEFAULT px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Continuar 
                <span className="ml-1">→</span>
              </Link>
            </div>
            <div className="text-5xl">{nextLesson.icon}</div>
          </div>
        </div>
      </div>
      
      {/* All lessons */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Todas as aulas</h2>
          <Link 
            to="/chat"
            className="text-sm text-quantum-DEFAULT hover:underline"
          >
            Ver todas
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.slice(0, 6).map(lesson => (
            <LessonCard 
              key={lesson.id}
              lesson={lesson}
            />
          ))}
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Atividade recente</h2>
        <div className="card divide-y divide-gray-200">
          {recentActivity.map(activity => (
            <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  {activity.type === 'chat' ? (
                    <span className="text-xl">💬</span>
                  ) : (
                    <span className="text-xl">🏆</span>
                  )}
                </div>
                <div>
                  <p className="text-gray-800">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;