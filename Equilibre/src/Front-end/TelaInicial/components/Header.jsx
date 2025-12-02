import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">Equilibre</Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span>Olá, {user?.name}</span>
              <button onClick={logout}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/cadastro" className="btn-register">Cadastrar</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;