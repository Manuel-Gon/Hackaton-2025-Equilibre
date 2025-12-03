import { useState } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginUsuario.css";

export default function LoginUsuario({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    const fakeUser = {
      name: email.split("@")[0],
      email,
    };

    localStorage.setItem("auth", "true");
    localStorage.setItem("user", JSON.stringify(fakeUser));

    onClose();       // fecha o modal
    navigate("/");  // redireciona sem travar
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-circle"></div>
          <h2>Bem-vindo de volta</h2>
          <p>Entre para continuar cuidando do seu equilíbrio.</p>
        </div>

        <form className="modal-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="modal-btn">
            Entrar
          </button>
        </form>

        {/* ✅ LINK USANDO react-router-dom */}
        <p className="modal-footer">
          Ainda não tem conta?{" "}
          <Link to="/CadastroUsuario" onClick={onClose}>
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
