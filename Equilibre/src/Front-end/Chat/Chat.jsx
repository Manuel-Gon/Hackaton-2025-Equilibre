import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Picker from "emoji-picker-react";
import { analyzeTextEmotion } from "./EmocoesRisco";
import { useNavigate } from "react-router-dom";

let idCounter = 0;
const uid = () => ++idCounter;

export default function Chat() {
  const navigate = useNavigate();

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
  const [user, setUser] = useState(null);

  const messagesEndRef = useRef(null);

  // 🔹 CARREGA USUÁRIO LOGADO
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const auth = localStorage.getItem("auth");

    if (savedUser && auth === "true") {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  // 🔹 AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 ENVIO DE MENSAGEM
  const sendMessage = () => {
    if (!input.trim()) return;

    const analysis = analyzeTextEmotion(input);

    if (analysis.risk) {
      alert(
        "Percebi que você pode estar em sofrimento. Você não está sozinho. Se puder, procure ajuda profissional."
      );
    }

    const userMessage = {
      id: uid(),
      author: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      emotion: analysis.emotion
    };

    setMessages(prev => [...prev, userMessage]);

    // Limpa input antes de chamar a IA
    const messageToSend = input;
    setInput("");

    // Chama a IA de forma assíncrona
    handleBotResponse(messageToSend);
  };

  // 🔹 CHAMADA ASSÍNCRONA PARA IA
  const handleBotResponse = async (message) => {
    // Adiciona "digitando..." na tela
    const typingId = uid();
    setMessages(prev => [
      ...prev,
      {
        id: typingId,
        author: "bot",
        text: "Digitando...",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        loading: true
      }
    ]);

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      // Substitui a mensagem "digitando..." pela resposta real
      setMessages(prev =>
        prev.map(msg =>
          msg.id === typingId
            ? { id: uid(), author: "bot", text: data.reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
            : msg
        )
      );
    } catch (error) {
      console.error("Erro ao falar com a IA:", error);

      setMessages(prev =>
        prev.map(msg =>
          msg.id === typingId
            ? { id: uid(), author: "bot", text: "⚠️ Desculpe, não consegui responder agora.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
            : msg
        )
      );
    }
  };

  // 🔹 EMOJI
  const addEmoji = (e) => {
    setInput(prev => prev + e.emoji);
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    navigate("/LoginUsuario");
  };

  return (
    <div className="chat-container">
      {/* HEADER */}
      <header className="chat-header">
        <div className="logo-area">
          <img className="logo-png-chat" src="/logo equlibre.png" alt="Equilibre" />
          <span className="container-texto">Equilibre</span>
        </div>

        <div className="user-area-chat">
          {user ? (
            <>
              <span className="nome-user-chat">{user.name || user.nome || "Usuário"}</span>
              <button className="btn-sair-chat" onClick={logout}>Sair</button>
            </>
          ) : (
            <button className="btn-enter" onClick={() => navigate("/LoginUsuario")}>Entrar</button>
          )}
        </div>
      </header>

      {/* CHAT */}
      <main className="chat-box">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.author === "user" ? "sent" : "received"}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* INPUT */}
      <div className="chat-input-area">
        <button className="emoji-btn" onClick={() => setShowEmoji(v => !v)}>
          <img className="emoji-btn" src="/IconChat.png" alt="emoji" />
        </button>

        {showEmoji && (
          <div className="emoji-container">
            <Picker onEmojiClick={addEmoji} />
          </div>
        )}

        <input
          type="text"
          placeholder="Digite aqui a sua mensagem"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />

        <button className="send-button" onClick={sendMessage}>
          <img className="send-btn" src="/EnvioChat.png" alt="enviar" />
        </button>
      </div>

      {/* RODAPÉ */}
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
