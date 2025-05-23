// src/components/Chatbot.js
import React, { useState , useRef , useEffect } from 'react';
import axios from 'axios';
import Styles from '../Styles/ChatGbt.module.css';


const ChatGbt = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { role: 'user', content: input }];
    setChat([...newChat, { role: 'bot', content: 'Loading...' }]);


    setInput('');
     setLoading(true);

    try {
      const response = await axios.post('https://my-express-app-clean.onrender.com/ChatGbt', {
        message: input,
      });

      setChat([...newChat, { role: 'bot', content: response.data.reply }]);

      
    } catch (err) {
      console.error('Error:', err);
      setChat([...newChat, { role: 'bot', content: 'Error getting response' }]);
    } finally{
        setLoading(false);
    }
  };

  return (
    <div className={Styles.maincontainer}>
      <h2>Gemini AI Assistant 🤖</h2>
<div className={Styles.chatArea}>
  {chat.map((msg, idx) => (
    <div key={idx} style={{ 
      textAlign: msg.role === 'user' ? 'right' : 'left', 
      background: msg.role === 'user' ? 'cyan' : '#f0f0f0',
      width: "fit-content",
      maxWidth: "100%",
      borderRadius: '15px',
      padding: '10px 15px',
      marginTop: '20px',
      lineHeight: '20px',
      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
    }}>
      {msg.content.split('\n').map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  ))}
</div>

    <div>
      <input
        type="text"
        value={input}
        disabled={loading}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key==='Enter'){
            sendMessage();
          }
        }}
        placeholder="Ask Suggestion on your Resume"
        style={{ width: '80%', padding: '10px' }}
      />
      <button 
        onClick={sendMessage} 
        className={Styles.chat_btn}
        disabled={loading}>
            Send
      </button>
    </div>
    <div ref={bottomRef} />
    </div>
  );
};

export default ChatGbt;
