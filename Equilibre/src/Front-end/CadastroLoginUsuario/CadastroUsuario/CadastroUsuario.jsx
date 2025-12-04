import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CadastroUsuario.css";

export default function CadastroUsuario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    // ✅ Busca usuários existentes
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // ✅ Verifica se email já existe
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      alert("Este email já está cadastrado!");
      return;
    }

    const newUser = { name, email, password };

    // ✅ Salva na lista de usuários
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // ✅ Loga automaticamente após cadastro
    localStorage.setItem(
      "user",
      JSON.stringify({ name, email })
    );
    localStorage.setItem("auth", "true");

    alert("Cadastro realizado com sucesso!");
    navigate("/");
  }

  return (
    <div className="pagina-cadastro">
      <div className="card-cadastro">
        <div className="logo-area">
          <div className="logo-circulo">
            <img className="logo-real-cadastro" src="logo equlibre.png" alt="" />
          </div>
          <h1 className="titulo">Equilibre</h1>
        </div>

        <h2 className="subtitulo">Criar Conta</h2>
        <p className="descricao">
          Preencha seus dados para começar sua jornada.
        </p>

        <form onSubmit={handleSubmit} className="formulario">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="seuemail@email.com"
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

          <button type="submit" className="botao-cadastrar">
            Criar Conta
          </button>
        </form>

        <p className="texto-login">
          Já tem conta?{" "}
          <Link to="/LoginUsuario">Entrar pelo botão do topo</Link>
        </p>
      </div>
    </div>
  );
}
