import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'https://api.quantumtutor.example/v1', // Exemplo de URL base (substitua pela URL real no futuro)
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('quantumToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Lidar com erros de autenticação (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('quantumToken');
      localStorage.removeItem('quantumUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;