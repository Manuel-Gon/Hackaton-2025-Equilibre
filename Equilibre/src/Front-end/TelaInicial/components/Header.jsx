import { useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Header.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Carrega o usuário diretamente do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  function logout() {
    localStorage.removeItem("currentUser"); // ✅ Remove apenas isso
    setUser(null);
    navigate("/");
    window.location.reload(); // ✅ Atualiza Header automaticamente
  }

  return (
    <header className="cabecalho">
      <div className="container-cabecalho">

        {/* Logo */}
        <Link to="/" className="logo-cabecalho">
          <div className="logo-circulo-cabecalho">
            <img className="imagem-logo-real" src="logo equlibre.png" alt="" />
          </div>
          <span className="texto-logo-cabecalho">Equilibre</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="nav-desktop-cabecalho">
          <Link to="/" className="nav-link-cabecalho">Início</Link>

          {user && (
            <>
              <Link to="/dashboard" className="nav-link-cabecalho">Dashboard</Link>
              <Link to="/Diario" className="nav-link-cabecalho">Diário</Link>
              <Link to="/chat" className="nav-link-cabecalho">Chat</Link>
            </>
          )}
        </nav>

        {/* Botões Desktop */}
        <div className="auth-desktop-cabecalho">
          {user ? (
            <>
             <span className="nome-usuario-cabecalho">
  {user?.name || user?.nome || "Usuário"}
</span>
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

          {user && (
            <>
              <Link to="/dashboard" className="mobile-link">Dashboard</Link>
              <Link to="/Diario" className="mobile-link">Diário</Link>
              <Link to="/chat" className="mobile-link">Chat</Link>
            </>
          )}

          <div className="rodape-celular">
            {user ? (
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
