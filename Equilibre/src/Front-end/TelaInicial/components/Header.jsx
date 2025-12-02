import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
// import { getLoginUrl } from "@/const"
import { LogOut, Menu, X } from "lucide-react";
import { Link } from "wouter";
import "./Header.css"; 

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-circle">E</div>
          <span className="logo-text">Equilibre</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="nav-desktop">
          <Link href="/" className="nav-link">Início</Link>

          {isAuthenticated && (
            <>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/diary" className="nav-link">Diário</Link>
              <Link href="/chat" className="nav-link">Chat</Link>
              <Link href="/resources" className="nav-link">Recursos</Link>
            </>
          )}
        </nav>

        {/* Botões Desktop */}
        <div className="auth-desktop">
          {isAuthenticated ? (
            <>
              <span className="user-name">{user?.name}</span>
              <button className="btn-ghost" onClick={logout}>
                <LogOut size={16} />
                Sair
              </button>
            </>
          ) : (
            <a className="btn-primary"> 
              Entrar
            </a>
          )}
        </div>


        {/* Botão Mobile */}
        <button
          className="menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="nav-mobile">
          <Link href="/" className="mobile-link">Início</Link>

          {isAuthenticated && (
            <>
              <Link href="/dashboard" className="mobile-link">Dashboard</Link>
              <Link href="/diary" className="mobile-link">Diário</Link>
              <Link href="/chat" className="mobile-link">Chat</Link>
              <Link href="/resources" className="mobile-link">Recursos</Link>
            </>
          )}

          <div className="mobile-footer">
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