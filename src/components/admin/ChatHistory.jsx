import React, { useState } from 'react';
import useChat from '../../hooks/useChat';

const ChatHistory = ({ studentId }) => {
  const { getLessons } = useChat();
  const [selectedLesson, setSelectedLesson] = useState(null);
  
  const lessons = getLessons();
  
  // In a real app, this would fetch the student's chat history
  const getMockChatHistory = (lessonId) => {
    // Generate mock chat data based on student ID and lesson ID
    const seed = parseInt(studentId.replace('usr_', '')) + lessonId;
    const messageCount = (seed % 10) + 2; // 2-11 messages
    
    const messages = [];
    const baseTime = new Date();
    baseTime.setHours(baseTime.getHours() - messageCount);
    
    for (let i = 0; i < messageCount; i++) {
      const isUser = i % 2 === 0;
      const time = new Date(baseTime);
      time.setMinutes(time.getMinutes() + i * 5);
      
      messages.push({
        id: `msg_${lessonId}_${i}`,
        sender: isUser ? 'user' : 'bot',
        text: isUser 
          ? getMockUserMessage(lessonId, i)
          : getMockBotMessage(lessonId, i),
        timestamp: time.toISOString()
      });
    }
    
    return messages;
  };
  
  // Helper to generate mock user messages
  const getMockUserMessage = (lessonId, index) => {
    const questions = [
      "O que é superposição quântica?",
      "Como funciona o algoritmo de Shor?",
      "Pode explicar o que é emaranhamento quântico?",
      "Quais são as aplicações práticas da computação quântica?",
      "Como funciona uma porta quântica?",
      "Qual a diferença entre bits clássicos e qubits?",
      "O que é decoerência quântica?",
      "Quais são os desafios atuais da computação quântica?"
    ];
    
    return questions[(lessonId + index) % questions.length];
  };
  
  // Helper to generate mock bot messages
  const getMockBotMessage = (lessonId, index) => {
    const responses = [
      "Superposição quântica é um princípio fundamental da mecânica quântica onde os qubits podem existir em múltiplos estados simultaneamente, diferente dos bits clássicos que só podem ser 0 ou 1.",
      "O algoritmo de Shor é um algoritmo quântico usado para fatorar números inteiros em seus fatores primos. Sua importância reside no fato de que pode fatorar números grandes muito mais rapidamente que os melhores algoritmos clássicos conhecidos.",
      "Emaranhamento quântico é um fenômeno onde dois ou mais qubits se tornam correlacionados de tal forma que o estado quântico de cada partícula não pode ser descrito independentemente, mesmo quando separados por grandes distâncias.",
      "As aplicações práticas da computação quântica incluem criptografia, otimização de problemas complexos, simulação de sistemas quânticos, e machine learning avançado, entre outras.",
      "Portas quânticas são as unidades básicas de computação quântica, análogas às portas lógicas em computadores clássicos. Elas realizam operações em qubits, transformando seus estados de acordo com os princípios da mecânica quântica.",
      "A principal diferença é que bits clássicos só podem estar em um estado (0 ou 1), enquanto qubits podem existir em uma superposição de estados, permitindo uma capacidade de processamento paralelo inerente aos sistemas quânticos.",
      "Decoerência quântica é o processo pelo qual sistemas quânticos perdem suas propriedades quânticas (como superposição) devido à interação com o ambiente. É um dos principais desafios para construir computadores quânticos estáveis.",
      "Os principais desafios da computação quântica incluem a decoerência, controle preciso de qubits, escalabilidade dos sistemas, correção de erros quânticos e desenvolvimento de algoritmos quânticos mais eficientes."
    ];
    
    return responses[(lessonId + index) % responses.length];
  };
  
  // Format timestamp for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get the chat history for the selected lesson
  const chatHistory = selectedLesson ? getMockChatHistory(selectedLesson.id) : [];
  
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Histórico de Conversas</h3>
      
      <div className="mb-4">
        <label htmlFor="lesson-select" className="block text-sm font-medium text-gray-700 mb-1">
          Selecione uma aula
        </label>
        <select
          id="lesson-select"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-quantum-light focus:border-quantum-light"
          value={selectedLesson?.id || ''}
          onChange={(e) => {
            const lessonId = parseInt(e.target.value);
            const lesson = lessons.find(l => l.id === lessonId);
            setSelectedLesson(lesson || null);
          }}
        >
          <option value="">Selecione uma aula</option>
          {lessons.map(lesson => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>
      
      {selectedLesson ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200">
          <div className="p-3 border-b border-gray-200 bg-white rounded-t-lg">
            <div className="flex items-center">
              <div className={`w-8 h-8 ${selectedLesson.color} rounded-full flex items-center justify-center text-lg mr-3`}>
                {selectedLesson.icon}
              </div>
              <h4 className="font-medium">{selectedLesson.title}</h4>
            </div>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            {chatHistory.length > 0 ? (
              <div className="space-y-4">
                {chatHistory.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-quantum-light text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {message.sender === 'user' ? 'Estudante' : 'Quantum Tutor'} • {formatTime(message.timestamp)}
                      </div>
                      <div className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                        {message.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhuma mensagem encontrada
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">Selecione uma aula para ver o histórico de conversas</p>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;