import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Olá, {user?.name}!</h1>
          <p className="dashboard-subtitle">Bem-vindo ao seu espaço de bem-estar</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card welcome">
            <div className="card-icon">👋</div>
            <h3 className="card-title">Bem-vindo ao Equilibre</h3>
            <p className="card-text">
              Estamos felizes em tê-lo aqui. Comece sua jornada de autocuidado hoje mesmo.
            </p>
          </div>

          <div className="dashboard-card quick-actions">
            <h3 className="card-title">Ações Rápidas</h3>
            <div className="actions-grid">
              <button className="action-button">
                <span className="action-icon">📝</span>
                <span className="action-text">Registrar Humor</span>
              </button>
              <button className="action-button">
                <span className="action-icon">🧘</span>
                <span className="action-text">Exercícios</span>
              </button>
              <button className="action-button">
                <span className="action-icon">💬</span>
                <span className="action-text">Chat de Apoio</span>
              </button>
              <button className="action-button">
                <span className="action-icon">🎯</span>
                <span className="action-text">Metas</span>
              </button>
            </div>
          </div>

          <div className="dashboard-card stats">
            <h3 className="card-title">Seu Progresso</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Dias seguidos</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Registros</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Exercícios</div>
              </div>
            </div>
          </div>

          <div className="dashboard-card resources">
            <h3 className="card-title">Recursos para Você</h3>
            <ul className="resources-list">
              <li className="resource-item">
                <span className="resource-icon">📖</span>
                <span className="resource-text">Guia de Saúde Mental</span>
              </li>
              <li className="resource-item">
                <span className="resource-icon">🎧</span>
                <span className="resource-text">Meditações Guiadas</span>
              </li>
              <li className="resource-item">
                <span className="resource-icon">📊</span>
                <span className="resource-text">Relatórios de Humor</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
