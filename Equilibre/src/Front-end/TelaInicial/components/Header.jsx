import { useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ AQUI MUDA
import "./Header.css";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Carrega dados do localStorage ao iniciar
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const savedUser = localStorage.getItem("user");

    if (auth === "true") {
      setIsAuthenticated(true);
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <header className="cabecalho">
      <div className="container-cabecalho">

        {/* Logo */}
        <Link to="/" className="logo-cabecalho">
          <div className="logo-circulo-cabecalho">
            <img className="imagem-logo-real" src="Equilibre.png" alt="" />
          </div>
          <span className="texto-logo-cabecalho">Equilibre</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="nav-desktop-cabecalho">
          <Link to="/" className="nav-link-cabecalho">Início</Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="nav-link-cabecalho">Dashboard</Link>
              <Link to="/Diario" className="nav-link-cabecalho">Diário</Link>
              <Link to="/chat" className="nav-link-cabecalho">Chat</Link>
            </>
          )}
        </nav>

        {/* Botões Desktop */}
        <div className="auth-desktop-cabecalho">
          {isAuthenticated ? (
            <>
              <span className="nome-usuario-cabecalho">{user?.name}</span>
              <button className="boton-fantaminho-cabecalho" onClick={logout}>
                <LogOut size={16} />
                Sair
              </button>
            </>
          ) : (
            <Link to="/CadastroUsuario" className="boton-primario-cabecalho">
              Entrar
            </Link>
          )}
        </div>

        {/* Botão Mobile */}
        <button
          className="boton-menu-cabecalho"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="nav-celular-cabecalho">
          <Link to="/" className="link-celular-cabecalho">Início</Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="mobile-link">Dashboard</Link>
              <Link to="/Diario" className="mobile-link">Diário</Link>
              <Link to="/chat" className="mobile-link">Chat</Link>
            </>
          )}

          <div className="rodape-celular">
            {isAuthenticated ? (
              <button className="btn-ghost full" onClick={logout}>
                <LogOut size={16} />
                Sair
              </button>
            ) : (
              <Link to="/CadastroUsuario" className="btn-primary full">
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
