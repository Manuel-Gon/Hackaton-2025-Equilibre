import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import Header from "../TelaInicial/components/Header";
import Footer from "../TelaInicial/components/Footer";
import { analyzeTextEmotion } from "./EmocoesRisco";

let idCounter = 0;
const uid = () => ++idCounter;

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: uid(),
      author: "bot",
      text: "Olá! Eu sou o Assistente da Equilibre. Como você está se sentindo hoje?",
      time: Date.now()
    }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mood, setMood] = useState("neutral");
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function pushMessage(msg) {
    setMessages(prev => [...prev, { ...msg, id: uid(), time: Date.now() }]);
  }

  function sendMessage(text, author = "user") {
    if (!text || !text.trim()) return;

    const trimmed = text.trim();
    pushMessage({ author, text: trimmed });
    setInput("");
    setShowEmojiMenu(false);

    if (author === "user") {
      const analysis = analyzeTextEmotion(trimmed);

      if (analysis.risk) {
        window.location.href = "https://www.cvv.org.br";
        return;
      }

      respondToUser(trimmed);
    }
  }

  function respondToUser(userText) {
    setTyping(true);

    const analysis = analyzeTextEmotion(userText);

    setTimeout(() => {
      setTyping(false);

      let reply =
        "Obrigado por compartilhar. Quer tentar uma técnica rápida agora?";

      if (analysis.emotion === "anxious")
        reply = "Percebo ansiedade. Posso te guiar em uma respiração 4-7-8 agora?";

      if (analysis.emotion === "sad")
        reply =
          "Sinto que você está triste. Que tal um grounding 5-4-3-2-1 para te ajudar a acalmar?";

      if (analysis.emotion === "happy")
        reply = "Que bom saber! Quer registrar esse momento no diário?";

      pushMessage({ author: "bot", text: reply });
    }, 800);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function pickMood(newMood) {
    setMood(newMood);
    pushMessage({
      author: "bot",
      text: `Registro de humor: ${newMood}. Obrigado por compartilhar.`
    });
  }

  function handleAttach(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setAttachments(prev => [...prev, ...files]);
    const names = files.map(f => f.name).join(", ");

    pushMessage({ author: "user", text: `📎 Arquivos: ${names}` });

    e.target.value = null;
  }

  function quickButton(action) {
    if (action === "crisis") {
      pushMessage({
        author: "bot",
        text:
          "Se você está em crise, procure ajuda imediata. Deseja que eu mostre contatos agora?"
      });
      return;
    }

    if (action === "pause") {
      pushMessage({
        author: "bot",
        text: "Pausa guiada: respire 4s, segure 7s, solte em 8s. Repita 3x."
      });
      return;
    }

    if (action === "anxious") {
      sendMessage("Estou me sentindo ansioso(a)", "user");
      return;
    }
  }

  return (
    <div className="eq-chat-root">
      <main className="eq-main">
        <aside className="eq-left">
          <div className="mood-card">
            <h4>Registro Rápido</h4>
            <div className="mood-row">
              <button
                className={`mood-btn ${mood === "happy" ? "active" : ""}`}
                onClick={() => pickMood("happy")}
              >
                😊
              </button>

              <button
                className={`mood-btn ${mood === "neutral" ? "active" : ""}`}
                onClick={() => pickMood("neutral")}
              >
                😐
              </button>

              <button
                className={`mood-btn ${mood === "sad" ? "active" : ""}`}
                onClick={() => pickMood("sad")}
              >
                😢
              </button>

              <button
                className={`mood-btn ${mood === "anxious" ? "active" : ""}`}
                onClick={() => pickMood("anxious")}
              >
                😰
              </button>
            </div>

            <div className="mood-help">Diário emocional — toque para registrar</div>
          </div>

          <div className="quick-card">
            <h4>Técnicas Rápidas</h4>
            <button
              onClick={() => quickButton("anxious")}
              className="quick"
            >
              Respiração 4-7-8
            </button>

            <button
              onClick={() =>
                pushMessage({
                  author: "bot",
                  text:
                    "Grounding 5-4-3-2-1: veja 5 coisas, toque 4, ouça 3, cheire 2, sinta 1."
                })
              }
              className="quick"
            >
              Grounding 5-4-3-2-1
            </button>

            <button onClick={() => quickButton("pause")} className="quick">
              Pausa guiada 30s
            </button>

            <button onClick={() => quickButton("crisis")} className="danger">
              Estou em crise
            </button>
          </div>

          <div className="resources-card">
            <h4>Recursos</h4>
            <ul>
              <li>Áudios calmantes</li>
              <li>Informações sobre ansiedade</li>
              <li>Contato de emergência</li>
            </ul>
          </div>
        </aside>

        <section className={`eq-chat-area ${mood === "sad" ? "bg-blue" : ""}`}>
          <div className="messages" aria-live="polite">
            {messages.map(m => (
              <div
                key={m.id}
                className={`msg ${m.author === "bot" ? "bot" : "user"}`}
              >
                <div className="msg-body">
                  <div className="msg-text">{m.text}</div>
                  <div className="msg-time">
                    {new Date(m.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="msg bot typing">
                <div className="msg-body">
                  <span className="typing-dot" />{" "}
                  <span className="typing-dot" />{" "}
                  <span className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="composer">
            <div className="composer-controls">
              <button
                className="emoji-btn"
                onClick={() => setShowEmojiMenu(v => !v)}
              >
                😊
              </button>

              {showEmojiMenu && (
                <div className="emoji-menu">
                  {["😊", "😐", "😢", "😰", "❤️", "👍"].map(e => (
                    <button
                      key={e}
                      onClick={() => {
                        setInput(i => i + e);
                        setShowEmojiMenu(false);
                        inputRef.current?.focus();
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}

              <label className="attach">
                <input type="file" onChange={handleAttach} multiple />
                📎
              </label>
            </div>

            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="composer-input"
              rows={1}
            />

            <div className="composer-send">
              <button onClick={() => sendMessage(input)} aria-label="Enviar">
                ✈️
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
