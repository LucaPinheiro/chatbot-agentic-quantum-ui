import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useProgress from '../../../hooks/useProgress';
import useChat from '../../../hooks/useChat';

const Profile = () => {
  const { currentUser } = useAuth();
  const { getOverallProgress, getCompletedLessonsCount } = useProgress();
  const { getLessons, getAllConversations, clearConversation } = useChat();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    notifications: true,
    theme: 'light'
  });
  
  const lessons = getLessons();
  const conversations = getAllConversations();
  const overallProgress = getOverallProgress();
  const completedLessons = getCompletedLessonsCount();
  
  // Handle profile form submission
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    // For now, just toggle editing mode
    setIsEditing(false);
  };
  
  // Handle profile field changes
  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle clearing conversation for a lesson
  const handleClearConversation = (lessonId) => {
    if (window.confirm('Tem certeza que deseja limpar esta conversa? Esta ação não pode ser desfeita.')) {
      clearConversation(lessonId);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Seu Perfil</h1>
      
      {/* Profile tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-quantum-DEFAULT text-quantum-DEFAULT'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Informações Pessoais
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'progress'
                ? 'border-quantum-DEFAULT text-quantum-DEFAULT'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('progress')}
          >
            Progresso de Aprendizado
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-quantum-DEFAULT text-quantum-DEFAULT'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Configurações
          </button>
        </div>
      </div>
      
      {/* Profile tab content */}
      {activeTab === 'profile' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <img
                  src={currentUser?.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-900">{currentUser?.name}</h2>
                  <p className="text-gray-600">{currentUser?.email}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Membro desde {new Date().toLocaleDateString('pt-BR', {
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmitProfile} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="input mt-1"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="input mt-1"
                  />
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="btn btn-primary">
                    Salvar Alterações
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Progresso Total</dt>
                    <dd className="mt-1 text-sm text-gray-900">{overallProgress}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Aulas Completadas</dt>
                    <dd className="mt-1 text-sm text-gray-900">{completedLessons} de 10</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Progress tab content */}
      {activeTab === 'progress' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Seu Progresso nas Aulas</h2>
            
            <div className="space-y-4">
              {lessons.map(lesson => {
                const hasConversation = conversations[lesson.id]?.length > 0;
                
                return (
                  <div 
                    key={lesson.id} 
                    className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-10 h-10 ${lesson.color} rounded-full flex items-center justify-center text-xl`}>
                        {lesson.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{lesson.title}</h3>
                        <div className="flex items-center mt-1">
                          <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                            <div
                              className="h-2 bg-quantum-DEFAULT rounded-full"
                              style={{ width: `${hasConversation ? Math.max(10, Math.min(conversations[lesson.id].length * 5, 100)) : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {hasConversation ? 
                              `${conversations[lesson.id].length} interações` : 
                              'Não iniciado'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {hasConversation && (
                      <button
                        className="text-xs text-gray-500 hover:text-red-500"
                        onClick={() => handleClearConversation(lesson.id)}
                      >
                        Limpar Conversa
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Settings tab content */}
      {activeTab === 'settings' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Configurações</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Preferências</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="notifications"
                      name="notifications"
                      type="checkbox"
                      checked={profileData.notifications}
                      onChange={handleProfileChange}
                      className="h-4 w-4 text-quantum-DEFAULT border-gray-300 rounded focus:ring-quantum-light"
                    />
                    <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                      Receber notificações por email
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="theme" className="block text-sm text-gray-700 mb-1">
                      Tema da interface
                    </label>
                    <select
                      id="theme"
                      name="theme"
                      value={profileData.theme}
                      onChange={handleProfileChange}
                      className="input"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Escuro</option>
                      <option value="system">Sistema</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Conta</h3>
                <div className="space-y-4">
                  <button className="text-sm text-quantum-DEFAULT hover:underline">
                    Alterar senha
                  </button>
                  <div>
                    <button className="text-sm text-red-600 hover:underline">
                      Excluir minha conta
                    </button>
                    <p className="mt-1 text-xs text-gray-500">
                      Todos os seus dados serão excluídos permanentemente.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="btn btn-primary">
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;