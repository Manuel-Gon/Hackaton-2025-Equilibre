import { useState } from "react";
// import { Link } from "react-router-dom";   
import useAuth from "../../../hooks/useAuth";
// import { getLoginUrl } from "@/const"
import { LogOut, Menu, X } from "lucide-react";
import { Link } from "wouter";
import "./Header.css"; 

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="cabecalho">
      <div className="container-cabecalho">

        {/* Logo */}
        <Link href="/" className="logo-cabecalho">
          <div className="logo-circulo-cabecalho">
            <img className="imagem-logo-real" src="Equilibre.png" alt="" />
          </div>
          <span className="texto-logo-cabecalho">Equilibre</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="nav-desktop-cabecalho">
          <Link href="/" className="nav-link-cabecalho">Início</Link>

          {isAuthenticated && (
            <>
          <Link href="/" className="nav-link-cabecalho">Início</Link>
              <Link href="/dashboard" className="nav-link-cabecalho">Dashboard</Link>
              <Link href="/diary" className="nav-link-cabecalho">Diário</Link>
              <Link href="/chat" className="nav-link-cabecalho">Chat</Link>
              <Link href="/resources" className="nav-link-cabecalho">Recursos</Link>
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
            <Link href="/CadastroUsuario" className="boton-primario-cabecalho"> 
              Entrar
            </Link>
            ) }

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
          <Link href="/" className="link-celular-cabecalho">Início</Link>

          {isAuthenticated && (
            <>
              <Link href="/dashboard" className="mobile-link">Dashboard</Link>
              <Link href="/diary" className="mobile-link">Diário</Link>
              <Link href="/chat" className="mobile-link">Chat</Link>
              <Link href="/resources" className="mobile-link">Recursos</Link>
            </>
          )}

          <div className="rodape-celular">
            {isAuthenticated ? (
              <button className="btn-ghost full" onClick={logout}>
                <LogOut size={16} />
                Sair
              </button>
            ) : (
              <a className="btn-primary full" >
                Entrar
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

//href={getLoginUrl()}