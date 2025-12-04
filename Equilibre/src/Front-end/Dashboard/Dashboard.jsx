import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Header from "../TelaInicial/components/Header";
import Footer from "../TelaInicial/components/Footer";


export default function Dashboard() {
  const [entries, setEntries] = useState([]);

  // ✅ Carrega os dados do Diário
  useEffect(() => {
    const saved = localStorage.getItem("diaryEntries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const totalRegistros = entries.length;
  const humorPredominante = getMostFrequentMood(entries);
  const sequenciaDias = calculateStreak(entries);

  return (
    <>
      <Header/>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Bem-vindo!</h1>
        <p className="dashboard-subtitle">
          Aqui está um resumo da sua semana de bem-estar.
        </p>

        {/* ✅ CARDS SUPERIORES */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <p className="card-label">Registros da Semana</p>
            <p className="card-value">{totalRegistros}</p>
          </div>

          <div className="dashboard-card">
            <p className="card-label">Humor Predominante</p>
            <p className="card-value">{humorPredominante || "—"}</p>
          </div>

          <div className="dashboard-card">
            <p className="card-label">Sequência de Dias</p>
            <p className="card-value">{sequenciaDias}</p>
          </div>
        </div>

        {/* ✅ ATIVIDADE RECENTE */}
        <div className="dashboard-content">
          <div className="dashboard-box">
            <h2>Atividade Recente</h2>

            {entries.length > 0 ? (
              entries.slice(0, 3).map((entry) => (
                <div
                  key={entry.id}
                  className="recent-item"
                  style={{ borderLeft: `4px solid ${entry.moodColor}` }}
                >
                  <strong>{entry.mood}</strong>
                  <p>Intensidade: {entry.intensity}/10</p>
                  <small>
                    {new Date(entry.createdAt).toLocaleDateString("pt-BR")}
                  </small>
                </div>
              ))
            ) : (
              <p>Nenhum registro ainda.</p>
            )}

            <Link to="/diario" className="link-ver-todos">
              Ver Todos os Registros
            </Link>
          </div>

          {/* ✅ AÇÕES RÁPIDAS */}
          <div className="dashboard-actions">
            <Link to="/diario" className="dashboard-btn">
              Registrar Humor
            </Link>

            <Link to="/chat" className="dashboard-btn secondary">
              Chat de Apoio
            </Link>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}






// ✅ CALCULA HUMOR MAIS FREQUENTE
function getMostFrequentMood(entries) {
  if (!entries.length) return null;

  const count = {};
  entries.forEach((e) => {
    count[e.mood] = (count[e.mood] || 0) + 1;
  });

  return Object.keys(count).sort((a, b) => count[b] - count[a])[0];
}

// ✅ CALCULA SEQUÊNCIA DE DIAS
function calculateStreak(entries) {
  if (!entries.length) return 0;

  const sorted = [...entries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let streak = 1;
  let current = new Date(sorted[0].createdAt);
  current.setHours(0, 0, 0, 0);

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i].createdAt);
    prev.setHours(0, 0, 0, 0);

    const diff =
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
      current = prev;
    } else {
      break;
    }
  }

  return streak;
}
