'use client';
import { useState, useRef, useEffect } from 'react';
import './AIChat.css';
import { FaPaperPlane } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { BsRobot } from 'react-icons/bs';
import axios from 'axios';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      console.log('API Key:', apiKey);
      
      if (!apiKey) {
        throw new Error('Gemini API key is not configured');
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          contents: [{
            parts: [{
              text: `You are a helpful health and baby growth assistant. Please provide a clear, concise, and informative response to this question: ${userMessage}. 
              Format your response in a friendly, easy-to-understand way. Include relevant tips or recommendations when appropriate.
              Remember to emphasize that this is general advice and users should consult healthcare professionals for specific medical concerns.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.candidates && response.data.candidates[0]?.content?.parts?.[0]?.text) {
        const generatedText = response.data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: 'assistant', content: generatedText }]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I apologize, but I encountered an error: ${error.message}. Please make sure the API key is properly configured and try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-chat-container">
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          <BsRobot />
          <span>Ask about Health & Baby Growth</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window" ref={chatContainerRef}>
          <div className="chat-header">
            <h3>Health & Baby Growth Assistant</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <IoMdClose />
            </button>
          </div>

          <div className="messages-container">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>👋 Hello! I'm your health and baby growth assistant.</p>
                <p>Feel free to ask me questions about:</p>
                <ul>
                  <li>Baby development milestones</li>
                  <li>Health and nutrition</li>
                  <li>Common health concerns</li>
                  <li>Growth patterns</li>
                </ul>
                <p>Remember, I provide general information only. Always consult healthcare professionals for specific medical advice.</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about health or baby growth..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat; 