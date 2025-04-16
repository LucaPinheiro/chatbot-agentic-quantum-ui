import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from './AuthContext';

// Create Progress Context
export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load progress from localStorage on mount or when user changes
  useEffect(() => {
    if (currentUser) {
      const storedProgress = localStorage.getItem(`quantum_progress_${currentUser.id}`);
      if (storedProgress) {
        setUserProgress(JSON.parse(storedProgress));
      } else {
        // Initialize empty progress for all 10 lessons
        const initialProgress = {};
        for (let i = 1; i <= 10; i++) {
          initialProgress[i] = {
            started: false,
            completed: false,
            interactions: 0,
            lastActive: null,
            conceptsExplored: [],
            progressPercentage: 0
          };
        }
        setUserProgress(initialProgress);
        localStorage.setItem(`quantum_progress_${currentUser.id}`, JSON.stringify(initialProgress));
      }
    }
  }, [currentUser]);

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (currentUser && Object.keys(userProgress).length > 0) {
      localStorage.setItem(
        `quantum_progress_${currentUser.id}`,
        JSON.stringify(userProgress)
      );
    }
  }, [userProgress, currentUser]);

  // Update progress when user interacts with a lesson
  const updateLessonProgress = useCallback((lessonId, interaction) => {
    if (!currentUser) return;
    
    setUserProgress(prev => {
      const currentLessonProgress = prev[lessonId] || {
        started: false,
        completed: false,
        interactions: 0,
        lastActive: null,
        conceptsExplored: [],
        progressPercentage: 0
      };
      
      // Process the interaction type
      let updatedProgress = { ...currentLessonProgress };
      
      switch(interaction.type) {
        case 'start':
          updatedProgress.started = true;
          updatedProgress.lastActive = new Date().toISOString();
          break;
          
        case 'message':
          updatedProgress.interactions += 1;
          updatedProgress.lastActive = new Date().toISOString();
          
          // Check if the message contains any new concepts
          if (interaction.concepts && interaction.concepts.length > 0) {
            const newConcepts = interaction.concepts.filter(
              concept => !updatedProgress.conceptsExplored.includes(concept)
            );
            
            if (newConcepts.length > 0) {
              updatedProgress.conceptsExplored = [
                ...updatedProgress.conceptsExplored,
                ...newConcepts
              ];
            }
          }
          
          // Update progress percentage based on interactions and concepts
          const maxInteractions = 20; // Arbitrary max for progress calculation
          const interactionsProgress = Math.min(updatedProgress.interactions / maxInteractions, 0.7);
          const conceptsProgress = updatedProgress.conceptsExplored.length > 0 
            ? (updatedProgress.conceptsExplored.length / 5) * 0.3 // Assume 5 key concepts per lesson
            : 0;
            
          updatedProgress.progressPercentage = Math.min(
            Math.floor((interactionsProgress + conceptsProgress) * 100),
            100
          );
          
          // Mark as completed if progress is at 100%
          if (updatedProgress.progressPercentage >= 100) {
            updatedProgress.completed = true;
          }
          
          break;
          
        case 'complete':
          updatedProgress.completed = true;
          updatedProgress.progressPercentage = 100;
          updatedProgress.lastActive = new Date().toISOString();
          break;
          
        default:
          break;
      }
      
      return {
        ...prev,
        [lessonId]: updatedProgress
      };
    });
  }, [currentUser]);

  // Get progress for a specific lesson
  const getLessonProgress = useCallback((lessonId) => {
    return userProgress[lessonId] || {
      started: false,
      completed: false,
      interactions: 0,
      lastActive: null,
      conceptsExplored: [],
      progressPercentage: 0
    };
  }, [userProgress]);

  // Get overall progress across all lessons
  const getOverallProgress = useCallback(() => {
    if (Object.keys(userProgress).length === 0) return 0;
    
    const totalPercentage = Object.values(userProgress).reduce(
      (sum, lesson) => sum + lesson.progressPercentage,
      0
    );
    
    return Math.floor(totalPercentage / 10); // 10 lessons
  }, [userProgress]);

  // Get completed lessons count
  const getCompletedLessonsCount = useCallback(() => {
    return Object.values(userProgress).filter(lesson => lesson.completed).length;
  }, [userProgress]);

  // Get started but not completed lessons
  const getInProgressLessons = useCallback(() => {
    return Object.entries(userProgress)
      .filter(([_, lesson]) => lesson.started && !lesson.completed)
      .map(([id, _]) => Number(id));
  }, [userProgress]);

  // Get all user progress data (for admin use)
  const getAllUsersProgress = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to get all users' progress
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demo purposes
      const mockUsers = [
        {
          id: 'usr_1',
          name: 'João Silva',
          email: 'joao@example.com',
          progress: {
            overall: 65,
            completedLessons: 4,
            lastActive: '2025-04-13T14:30:00Z'
          }
        },
        {
          id: 'usr_2',
          name: 'Maria Souza',
          email: 'maria@example.com',
          progress: {
            overall: 42,
            completedLessons: 2,
            lastActive: '2025-04-12T09:15:00Z'
          }
        },
        {
          id: 'usr_3',
          name: 'Pedro Santos',
          email: 'pedro@example.com',
          progress: {
            overall: 90,
            completedLessons: 8,
            lastActive: '2025-04-14T10:45:00Z'
          }
        }
      ];
      
      return mockUsers;
    } catch (err) {
      setError(err.message || 'Erro ao buscar progresso dos usuários');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Context value
  const value = {
    userProgress,
    loading,
    error,
    updateLessonProgress,
    getLessonProgress,
    getOverallProgress,
    getCompletedLessonsCount,
    getInProgressLessons,
    getAllUsersProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;