import api from './api';

// Serviço para gerenciar autenticação
const authService = {
  // Login do usuário
  login: async (email, password) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // Por enquanto, simulamos uma resposta de sucesso
      
      // const response = await api.post('/auth/login', { email, password });
      // return response.data;
      
      // Mock para demonstração
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simular resposta
      const userData = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'student',
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
        token: 'fake_token_' + Math.random().toString(36).substr(2, 16)
      };
      
      // Armazenar token e dados do usuário
      localStorage.setItem('quantumToken', userData.token);
      localStorage.setItem('quantumUser', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Registrar novo usuário
  register: async (name, email, password) => {
    try {
      // Em um ambiente real, isso seria uma chamada API
      // const response = await api.post('/auth/register', { name, email, password });
      // return response.data;
      
      // Mock para demonstração
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular resposta
      const userData = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'student',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        token: 'fake_token_' + Math.random().toString(36).substr(2, 16)
      };
      
      // Armazenar token e dados do usuário
      localStorage.setItem('quantumToken', userData.token);
      localStorage.setItem('quantumUser', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  
  // Logout do usuário
  logout: () => {
    localStorage.removeItem('quantumToken');
    localStorage.removeItem('quantumUser');
    // Em um ambiente real, poderia ter uma chamada API para invalidar o token
    // api.post('/auth/logout');
  },
  
  // Verificar se o usuário está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('quantumToken');
  },
  
  // Obter dados do usuário atual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('quantumUser');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default authService;