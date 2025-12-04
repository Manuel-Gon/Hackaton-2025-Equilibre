import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Picker from "emoji-picker-react";               // <-- biblioteca de emojis
import { analyzeTextEmotion } from "./EmocoesRisco";

let idCounter = 0;
const uid = () => ++idCounter;

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: uid(),
      author: "bot",
      text: "Olá! Eu sou o Assistente da Equilibre. Como você está se sentindo hoje?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);

  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      id: uid(),
      author: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }]);

    analyzeTextEmotion(input);   // mantém função ativa
    setInput("");
  }

  function addEmoji(e) {
    setInput(prev => prev + e.emoji);
  }

  return (
    <div className="chat-container">

      {/* HEADER */}
      <header className="chat-header">
        <div className="logo-area">
          <img className="logo-png-chat" src="logo equlibre.png" alt="Equilibre" />   {/* Puxa direto do public */}
          <span className="container-texto">Equilibre</span>
        </div>
        <button className="btn-enter">Entrar</button>
      </header>

      {/* CHAT */}
      <main className="chat-box">
  {messages.map(msg => (
    <div
      key={msg.id}
      className={`message ${msg.author === "user" ? "sent" : "received"}`}
    >
      <p>{msg.text}</p>
    </div>
  ))}
  <div ref={messagesEndRef}/>
</main>

      <div className="chat-input-area">

        <button className="emoji-btn" onClick={() => setShowEmoji(v=>!v)}>
         <img className="emoji-btn" src="/IconChat.png" alt="emoji"/>
        </button>

        {showEmoji && (
          <div className="emoji-container">
            <Picker onEmojiClick={addEmoji}/>
          </div>
        )}

        <input
          type="text"
          placeholder="Digite aqui a sua mensagem"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=> e.key==="Enter" && sendMessage()}
        />

        <button className="send-button" onClick={sendMessage}>
           <img className="send-btn" src="/EnvioChat.png" alt="enviar"/>
        </button>

      </div>

      <footer className="help-box">
        <div className="card">
          <h4>Técnicas Rápidas</h4>
          <p>Peça técnicas de respiração, grounding (5-4-3-2-1) ou mindfulness.</p>
        </div>
        <div className="card">
          <h4>Compartilhe Seus Sentimentos</h4>
          <p>Sem julgamentos. Diga como se sente e receba apoio.</p>
        </div>
      </footer>

    </div>
  );
}