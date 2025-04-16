import api from './api';

// Serviço para gerenciar o progresso dos estudantes
const progressService = {
  // Obter progresso do usuário
  getUserProgress: async (userId) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.get(`/progress/user/${userId}`);
      // return response.data;
      
      // Mock para demonstração
      const progress = {};
      // Inicializar progresso para 10 aulas
      for (let i = 1; i <= 10; i++) {
        progress[i] = {
          started: Math.random() > 0.3,
          completed: Math.random() > 0.7,
          interactions: Math.floor(Math.random() * 25),
          lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          conceptsExplored: [],
          progressPercentage: Math.floor(Math.random() * 101)
        };
      }
      return progress;
    } catch (error) {
      console.error(`Error fetching progress for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Obter progresso de uma aula específica
  getLessonProgress: async (userId, lessonId) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.get(`/progress/user/${userId}/lesson/${lessonId}`);
      // return response.data;
      
      // Mock para demonstração
      return {
        started: Math.random() > 0.3,
        completed: Math.random() > 0.7,
        interactions: Math.floor(Math.random() * 25),
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        conceptsExplored: [],
        progressPercentage: Math.floor(Math.random() * 101)
      };
    } catch (error) {
      console.error(`Error fetching progress for user ${userId} and lesson ${lessonId}:`, error);
      throw error;
    }
  },
  
  // Atualizar progresso de uma aula
  updateLessonProgress: async (userId, lessonId, progressData) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.post(`/progress/user/${userId}/lesson/${lessonId}`, progressData);
      // return response.data;
      
      // Mock para demonstração
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        ...progressData,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error updating progress for user ${userId} and lesson ${lessonId}:`, error);
      throw error;
    }
  },
  
  // Obter progresso geral do usuário (todas as aulas)
  getOverallProgress: async (userId) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.get(`/progress/user/${userId}/overall`);
      // return response.data;
      
      // Mock para demonstração
      return {
        overallPercentage: Math.floor(Math.random() * 101),
        completedLessons: Math.floor(Math.random() * 11),
        inProgressLessons: Math.floor(Math.random() * 5),
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      };
    } catch (error) {
      console.error(`Error fetching overall progress for user ${userId}:`, error);
      throw error;
    }
  },
  
  // Para administradores: obter progresso de todos os usuários
  getAllUsersProgress: async () => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.get('/progress/admin/all-users');
      // return response.data;
      
      // Mock para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        },
        {
          id: 'usr_4',
          name: 'Ana Oliveira',
          email: 'ana@example.com',
          progress: {
            overall: 78,
            completedLessons: 6,
            lastActive: '2025-04-10T16:20:00Z'
          }
        },
        {
          id: 'usr_5',
          name: 'Lucas Martins',
          email: 'lucas@example.com',
          progress: {
            overall: 10,
            completedLessons: 0,
            lastActive: '2025-04-13T08:45:00Z'
          }
        }
      ];
      
      return mockUsers;
    } catch (error) {
      console.error('Error fetching all users progress:', error);
      throw error;
    }
  }
};

export default progressService;