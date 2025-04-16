import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProgress from '../hooks/useProgress';

// Icons (simplified version using emoji for this MVP)
const DashboardIcon = () => <span className="text-xl">📊</span>;
const ChatIcon = () => <span className="text-xl">💬</span>;
const ProfileIcon = () => <span className="text-xl">👤</span>;
const LogoutIcon = () => <span className="text-xl">🚪</span>;

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const { getOverallProgress } = useProgress();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const overallProgress = getOverallProgress();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                <span className="text-2xl mr-1">⚛️</span>
                <span className="font-bold text-quantum-DEFAULT text-xl">Quantum Tutor</span>
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {currentUser && (
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-700 mr-2">
                    Progresso: <span className="font-medium">{overallProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full w-24">
                    <div 
                      className="h-2 bg-quantum-DEFAULT rounded-full" 
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="relative ml-3">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                    alt="User avatar"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {currentUser?.name || 'Usuário'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-quantum-DEFAULT hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-quantum-light"
              >
                <span className="sr-only">Abrir menu</span>
                {isMobileMenuOpen ? (
                  <span className="text-xl">✕</span>
                ) : (
                  <span className="text-xl">☰</span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className={`${
                  location.pathname === '/dashboard'
                    ? 'bg-quantum-light text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/chat"
                className={`${
                  location.pathname.includes('/chat')
                    ? 'bg-quantum-light text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Chat
              </Link>
              <Link
                to="/profile"
                className={`${
                  location.pathname === '/profile'
                    ? 'bg-quantum-light text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Perfil
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              >
                Sair
              </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={currentUser?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                    alt="User avatar"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{currentUser?.name || 'Usuário'}</div>
                  <div className="text-sm font-medium text-gray-500">{currentUser?.email || 'usuario@example.com'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      
      {/* Sidebar and Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar */}
        <nav className="hidden md:block w-64 bg-white border-r border-gray-200 pt-5">
          <div className="px-4 space-y-1">
            <Link
              to="/dashboard"
              className={`${
                location.pathname === '/dashboard'
                  ? 'bg-quantum-light text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <DashboardIcon />
              <span className="ml-3">Dashboard</span>
            </Link>
            <Link
              to="/chat"
              className={`${
                location.pathname.includes('/chat')
                  ? 'bg-quantum-light text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <ChatIcon />
              <span className="ml-3">Chat</span>
            </Link>
            <Link
              to="/profile"
              className={`${
                location.pathname === '/profile'
                  ? 'bg-quantum-light text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <ProfileIcon />
              <span className="ml-3">Perfil</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-gray-700 hover:bg-gray-100 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
            >
              <LogoutIcon />
              <span className="ml-3">Sair</span>
            </button>
          </div>
        </nav>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;