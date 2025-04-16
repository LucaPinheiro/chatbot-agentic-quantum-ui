// Formatador de data e hora
export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Formatador de data
  export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Formatador de hora
  export const formatTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Formatador de número para porcentagem
  export const formatPercentage = (value) => {
    if (typeof value !== 'number') return '0%';
    return `${Math.round(value)}%`;
  };
  
  // Formatador de duração (minutos para horas e minutos)
  export const formatDuration = (minutes) => {
    if (typeof minutes !== 'number' || minutes <= 0) return '0m';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };
  
  // Formatador de nome (primeira letra maiúscula)
  export const formatName = (name) => {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  };
  
  // Formatar texto truncado
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    
    return text.slice(0, maxLength) + '...';
  };
  
  export default {
    formatDateTime,
    formatDate,
    formatTime,
    formatPercentage,
    formatDuration,
    formatName,
    truncateText
  };