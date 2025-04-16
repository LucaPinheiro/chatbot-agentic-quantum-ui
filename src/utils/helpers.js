// Gerar ID único
export const generateId = (prefix = 'id') => {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
  };
  
  // Calcular tempo decorrido desde uma data
  export const timeAgo = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000); // diferença em segundos
    
    if (diff < 60) {
      return 'agora mesmo';
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (diff < 2592000) {
      const days = Math.floor(diff / 86400);
      return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;
    } else {
      const years = Math.floor(diff / 31536000);
      return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
  };
  
  // Agrupar array por propriedade
  export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
      const keyValue = item[key];
      (result[keyValue] = result[keyValue] || []).push(item);
      return result;
    }, {});
  };
  
  // Debounce para limitar a frequência de chamadas de funções
  export const debounce = (func, wait) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Função para verificar se é dispositivo móvel
  export const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  };
  
  // Gerar cores para gráficos
  export const generateChartColors = (count) => {
    const colors = [
      '#4f46e5', // quantum
      '#3b82f6', // blue
      '#8b5cf6', // violet
      '#ec4899', // pink
      '#f97316', // orange
      '#10b981', // emerald
      '#6366f1', // indigo
      '#f43f5e', // rose
      '#14b8a6', // teal
      '#eab308'  // yellow
    ];
    
    if (count <= colors.length) {
      return colors.slice(0, count);
    }
    
    // Se precisar de mais cores, repete a paleta
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(colors[i % colors.length]);
    }
    
    return result;
  };
  
  export default {
    generateId,
    timeAgo,
    groupBy,
    debounce,
    isMobile,
    generateChartColors
  };