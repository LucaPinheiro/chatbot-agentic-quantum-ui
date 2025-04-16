import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('quantumUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response - in real app, this would come from backend
      const userData = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'student',
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
      };
      
      // Store user in localStorage
      localStorage.setItem('quantumUser', JSON.stringify(userData));
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Falha ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - in real app, this would come from backend
      const userData = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'student',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
      };
      
      // Store user in localStorage
      localStorage.setItem('quantumUser', JSON.stringify(userData));
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Falha ao registrar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('quantumUser');
    setCurrentUser(null);
  }, []);

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;