import React, { useState } from 'react';

const StudentList = ({ students, selectedStudentId, onSelectStudent, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="h-full">
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar estudantes..."
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-quantum-light focus:border-quantum-light text-sm"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="pb-2 px-2 text-xs text-gray-500">
        {filteredStudents.length} estudantes encontrados
      </div>
      
      <div className="overflow-y-auto h-[calc(100vh-340px)]">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="quantum-loading">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="space-y-1 px-2">
            {filteredStudents.map(student => (
              <button
                key={student.id}
                className={`w-full flex items-center p-3 rounded-md text-left transition-colors ${
                  selectedStudentId === student.id
                    ? 'bg-quantum-light text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => onSelectStudent(student)}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${student.name}&background=random`}
                  alt={student.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-gray-500">Progresso: {student.progress.overall}%</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            Nenhum estudante encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;