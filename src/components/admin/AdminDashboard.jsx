import React, { useState, useEffect } from 'react';
import useProgress from '../../../hooks/useProgress';

// Admin components
import StudentList from '../../components/admin/StudentList';
import ProgressOverview from '../../components/admin/ProgressOverview';
import ChatHistory from '../../components/admin/ChatHistory';

const AdminDashboard = () => {
  const { getAllUsersProgress, loading } = useProgress();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  
  // Fetch students data
  useEffect(() => {
    const fetchData = async () => {
      const usersProgress = await getAllUsersProgress();
      setStudents(usersProgress);
      
      // Set first student as selected by default
      if (usersProgress.length > 0 && !selectedStudent) {
        setSelectedStudent(usersProgress[0]);
      }
    };
    
    fetchData();
  }, [getAllUsersProgress, selectedStudent]);
  
  // Summary stats for the dashboard
  const getStats = () => {
    if (students.length === 0) return {};
    
    const totalStudents = students.length;
    const averageProgress = students.reduce((sum, student) => sum + student.progress.overall, 0) / totalStudents;
    const activeLastWeek = students.filter(student => {
      const lastActive = new Date(student.progress.lastActive);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return lastActive >= weekAgo;
    }).length;
    
    return {
      totalStudents,
      averageProgress: Math.round(averageProgress),
      activeLastWeek,
      completionRate: Math.round((students.filter(s => s.progress.completedLessons === 10).length / totalStudents) * 100)
    };
  };
  
  const stats = getStats();
  
  // Handle student selection
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setActiveSection('student');
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
        <p className="text-gray-600">
          Gerencie estudantes e acompanhe o progresso no curso de Computação Quântica.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total de Estudantes</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Progresso Médio</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageProgress || 0}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ativos (7 dias)</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeLastWeek || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <span className="text-2xl">🏆</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Taxa de Conclusão</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completionRate || 0}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Students list */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Estudantes</h2>
            </div>
            <div className="p-2">
              <StudentList 
                students={students}
                selectedStudentId={selectedStudent?.id}
                onSelectStudent={handleSelectStudent}
                loading={loading}
              />
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    className={`px-4 py-4 text-sm font-medium ${
                      activeSection === 'student'
                        ? 'text-quantum-DEFAULT border-b-2 border-quantum-DEFAULT'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveSection('student')}
                  >
                    Perfil do Estudante
                  </button>
                  <button
                    className={`px-4 py-4 text-sm font-medium ${
                      activeSection === 'progress'
                        ? 'text-quantum-DEFAULT border-b-2 border-quantum-DEFAULT'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveSection('progress')}
                  >
                    Detalhes de Progresso
                  </button>
                  <button
                    className={`px-4 py-4 text-sm font-medium ${
                      activeSection === 'chat'
                        ? 'text-quantum-DEFAULT border-b-2 border-quantum-DEFAULT'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveSection('chat')}
                  >
                    Histórico de Conversas
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeSection === 'student' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <img
                        src={`https://ui-avatars.com/api/?name=${selectedStudent.name}&background=random`}
                        alt={selectedStudent.name}
                        className="h-16 w-16 rounded-full"
                      />
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold text-gray-900">{selectedStudent.name}</h2>
                        <p className="text-gray-600">{selectedStudent.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Progresso Geral</h3>
                        <div className="flex items-center">
                          <div className="w-full h-4 bg-gray-200 rounded-full mr-2">
                            <div
                              className="h-4 bg-quantum-DEFAULT rounded-full"
                              style={{ width: `${selectedStudent.progress.overall}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{selectedStudent.progress.overall}%</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Aulas Completadas</h3>
                        <p className="text-2xl font-semibold">{selectedStudent.progress.completedLessons} / 10</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Última Atividade</h3>
                        <p className="text-sm">
                          {new Date(selectedStudent.progress.lastActive).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Ativo
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'progress' && (
                  <ProgressOverview studentId={selectedStudent.id} />
                )}
                
                {activeSection === 'chat' && (
                  <ChatHistory studentId={selectedStudent.id} />
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">Selecione um estudante para ver detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;