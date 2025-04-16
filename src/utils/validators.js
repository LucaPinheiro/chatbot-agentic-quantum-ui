// Validar email
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Validar senha (mínimo 6 caracteres)
  export const isValidPassword = (password) => {
    return password && password.length >= 6;
  };
  
  // Validar se o campo não está vazio
  export const isNotEmpty = (value) => {
    return value && value.trim() !== '';
  };
  
  // Validar se o valor é um número
  export const isNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  
  // Validar se o tamanho mínimo é satisfeito
  export const minLength = (value, min) => {
    return value && value.length >= min;
  };
  
  // Validar se o tamanho máximo não é excedido
  export const maxLength = (value, max) => {
    return value && value.length <= max;
  };
  
  // Validar forma de formulário
  export const validateForm = (values, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const fieldRules = rules[field];
      const value = values[field];
      
      if (fieldRules.required && !isNotEmpty(value)) {
        errors[field] = fieldRules.requiredMessage || 'Este campo é obrigatório';
      } else if (fieldRules.email && !isValidEmail(value)) {
        errors[field] = fieldRules.emailMessage || 'Email inválido';
      } else if (fieldRules.minLength && !minLength(value, fieldRules.minLength)) {
        errors[field] = fieldRules.minLengthMessage || 
          `Deve ter pelo menos ${fieldRules.minLength} caracteres`;
      } else if (fieldRules.maxLength && !maxLength(value, fieldRules.maxLength)) {
        errors[field] = fieldRules.maxLengthMessage || 
          `Deve ter no máximo ${fieldRules.maxLength} caracteres`;
      } else if (fieldRules.pattern && !new RegExp(fieldRules.pattern).test(value)) {
        errors[field] = fieldRules.patternMessage || 'Formato inválido';
      } else if (fieldRules.match && value !== values[fieldRules.match]) {
        errors[field] = fieldRules.matchMessage || 'Os valores não coincidem';
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  export default {
    isValidEmail,
    isValidPassword,
    isNotEmpty,
    isNumber,
    minLength,
    maxLength,
    validateForm
  };