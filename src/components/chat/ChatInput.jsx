import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, disabled, placeholder }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2">
      <div className="flex-grow relative">
        <textarea
          className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-quantum-light focus:border-transparent"
          placeholder={placeholder || "Digite sua mensagem..."}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          style={{ minHeight: '2.5rem', maxHeight: '6rem' }}
        />
        <div className="absolute bottom-2 right-2 text-gray-400 text-xs">
          {message.length > 0 && (
            <span>Enter ⏎</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-quantum-DEFAULT text-white rounded-lg p-2 h-10 w-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!message.trim() || disabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;