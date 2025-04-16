import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ChatMessage = ({ message, isUser }) => {
  // Format timestamp for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'bg-quantum-DEFAULT text-white' : 'bg-white border border-gray-200'} rounded-lg px-4 py-3 shadow-sm`}>
        <div className={`flex items-center mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-center ${isUser ? 'order-2' : 'order-1'}`}>
            {!isUser && (
              <span className="text-xl mr-2">⚛️</span>
            )}
            <span className={`font-medium text-sm ${isUser ? 'text-white' : 'text-gray-900'}`}>
              {isUser ? 'Você' : 'Quantum Tutor'}
            </span>
          </div>
          <span className={`text-xs ${isUser ? 'text-white/70 mr-2' : 'text-gray-500 ml-2'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        <div className={`prose ${isUser ? 'prose-invert' : ''} max-w-none`}>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomOneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;