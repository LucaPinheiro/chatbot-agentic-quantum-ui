import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-quantum-light via-quantum-DEFAULT to-quantum-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Quantum animation particles */}
        <div className="relative">
          <div className="quantum-particle left-10 top-10"></div>
          <div className="quantum-particle right-10 top-20"></div>
          <div className="quantum-particle left-20 bottom-10"></div>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-quantum-DEFAULT">
                <span className="inline-block mr-2">⚛️</span>
                Quantum Tutor
              </h1>
              <p className="text-gray-600 mt-2">
                Seu assistente de aprendizado em Computação Quântica
              </p>
            </div>
            
            {/* Render child routes */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;