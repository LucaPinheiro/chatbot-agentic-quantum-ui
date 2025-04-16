import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validations
    if (!email.trim()) return setError('Email é obrigatório');
    if (!password.trim()) return setError('Senha é obrigatória');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="seu.email@exemplo.com"
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="********"
            disabled={loading}
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="quantum-loading">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              'Entrar'
            )}
          </button>
        </div>
        
        <div className="text-center text-sm">
          <div className="text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-quantum-DEFAULT hover:underline">
              Registre-se
            </Link>
          </div>
          
          <div className="mt-2 text-gray-600">
            <a href="#" className="text-quantum-DEFAULT hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </form>
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="text-xs text-gray-500 text-center">
          Ao entrar, você concorda com nossos{' '}
          <a href="#" className="text-quantum-DEFAULT hover:underline">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="text-quantum-DEFAULT hover:underline">
            Política de Privacidade
          </a>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          <span className="block">⚛️ Quantum Tutor - 2025</span>
          <span>Sua jornada pela física quântica começa aqui</span>
        </div>
      </div>
    </div>
  );
};

export default Login;