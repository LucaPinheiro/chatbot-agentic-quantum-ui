import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useChat from '../../../hooks/useChat';
import useProgress from '../../../hooks/useProgress';

// Chat components
import ChatInterface from '../../components/chat/ChatInterface';
import ChatMessage from '../../components/chat/ChatMessage';
import ChatInput from '../../components/chat/ChatInput';
import LessonSelector from '../../components/chat/LessonSelector';

const ChatPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { 
    lessons, 
    activeLesson, 
    selectLesson, 
    getCurrentConversation, 
    sendMessage, 
    loading 
  } = useChat();
  const { updateLessonProgress, getLessonProgress } = useProgress();
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const chatContainerRef = useRef(null);
  
  // Effect to handle lesson selection from URL param
  useEffect(() => {
    if (lessonId) {
      selectLesson(Number(lessonId));
      setSelectedLessonId(Number(lessonId));
    } else if (lessons.length > 0) {
      // If no lesson ID in URL, default to first lesson
      navigate(`/chat/${lessons[0].id}`);
    }
  }, [lessonId, lessons, navigate, selectLesson]);
  
  // Effect to scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [getCurrentConversation()]);
  
  // Effect to update progress when lesson changes
  useEffect(() => {
    if (activeLesson) {
      updateLessonProgress(activeLesson.id, { type: 'start' });
    }
  }, [activeLesson, updateLessonProgress]);
  
  // Handle lesson change
  const handleLessonChange = (newLessonId) => {
    navigate(`/chat/${newLessonId}`);
  };
  
  // Handle message send
  const handleSendMessage = async (message) => {
    if (!activeLesson || !message.trim()) return;
    
    await sendMessage(message);
    
    // Update lesson progress
    updateLessonProgress(activeLesson.id, { 
      type: 'message',
      // In a real app, you'd analyze message for concepts
      concepts: [] 
    });
  };
  
  // Get current conversation
  const conversation = getCurrentConversation();
  const currentLessonProgress = activeLesson ? getLessonProgress(activeLesson.id) : null;
  
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">
      <div className="flex flex-col md:flex-row h-full">
        {/* Lesson selector sidebar */}
        <div className="w-full md:w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <LessonSelector
            lessons={lessons}
            selectedLessonId={selectedLessonId}
            onLessonSelect={handleLessonChange}
          />
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Lesson header */}
          {activeLesson && (
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 w-10 h-10 ${activeLesson.color} rounded-full flex items-center justify-center text-2xl`}>
                    {activeLesson.icon}
                  </div>
                  <div className="ml-3">
                    <h2 className="text-lg font-medium text-gray-900">{activeLesson.title}</h2>
                    <p className="text-sm text-gray-500">{activeLesson.description}</p>
                  </div>
                </div>
                {currentLessonProgress && (
                  <div className="flex items-center">
                    <div className="text-sm text-gray-600 mr-2">
                      {currentLessonProgress.progressPercentage}%
                    </div>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-quantum-DEFAULT rounded-full" 
                        style={{ width: `${currentLessonProgress.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto bg-gray-50"
          >
            <ChatInterface>
              {conversation.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">👋</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Bem-vindo à aula!</h3>
                  <p className="text-gray-600 mb-4">
                    {activeLesson ? activeLesson.description : "Selecione uma aula para começar"}
                  </p>
                  {activeLesson && (
                    <p className="text-gray-600">
                      Faça perguntas sobre o conteúdo da aula e interaja com o tutor quântico para aprender mais.
                    </p>
                  )}
                </div>
              ) : (
                conversation.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isUser={message.sender === 'user'}
                  />
                ))
              )}
              
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="quantum-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </ChatInterface>
          </div>
          
          {/* Message input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={!activeLesson || loading}
              placeholder={activeLesson ? "Digite sua pergunta sobre a aula..." : "Selecione uma aula para começar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;