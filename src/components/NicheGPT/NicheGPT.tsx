import React, { useState } from 'react';
import FloatingButton from './FloatingButton';
import ChatInterface from './ChatInterface';

const NicheGPT: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <ChatInterface onClose={toggleChat} />}
      <FloatingButton onClick={toggleChat} isOpen={isOpen} />
    </>
  );
};

export default NicheGPT; 