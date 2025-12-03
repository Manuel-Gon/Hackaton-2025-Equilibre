import React, { useState } from "react";
// Importa o arquivo CSS (certifique-se que está na mesma pasta)
import "./Diario.css";

const MOODS = [
  { emoji: "😊", label: "Feliz", value: "happy", color: "#10B981" },
  { emoji: "😢", label: "Triste", value: "sad", color: "#3B82F6" },
  { emoji: "😰", label: "Ansioso", value: "anxious", color: "#F59E0B" },
  { emoji: "😌", label: "Calmo", value: "calm", color: "#8B5CF6" },
  { emoji: "😠", label: "Irritado", value: "angry", color: "#EF4444" },
  { emoji: "😐", label: "Neutro", value: "neutral", color: "#6B7280" },
];

export default function Diary() {
  // --- Estados do Formulário ---
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Mock de Dados (Simulando o Banco de Dados) ---
  const [recentEntries, setRecentEntries] = useState([
    {
      id: 1,
      mood: "happy",
      moodColor: "#10B981",
      intensity: 8,
      notes: "Testando o visual da aplicação!",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      mood: "neutral",
      moodColor: "#6B7280",
      intensity: 5,
      notes: "Apenas um dia comum de testes.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ]);

  // --- Função de Salvar (Simulada) ---
  const handleSubmit = () => {
    // Validação
    if (!selectedMood) {
      alert("Por favor, selecione um humor.");
      return;
    }

    const moodData = MOODS.find((m) => m.value === selectedMood);
    if (!moodData) return;

    // Ativa loading falso
    setIsSubmitting(true);

    // Espera 0.8 segundos para parecer real
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        mood: selectedMood,
        moodColor: moodData.color,
        notes: notes,
        intensity: intensity,
        createdAt: new Date().toISOString(),
      };

      // Atualiza a lista
      setRecentEntries([newEntry, ...recentEntries]);
      
      // Feedback e Limpeza
      alert("Registro salvo com sucesso! (Simulação)");
      setSelectedMood(null);
      setNotes("");
      setIntensity(5);
      setIsSubmitting(false);
    }, 800);
  };

  const selectedMoodData = MOODS.find((m) => m.value === selectedMood);
  // Calcula cor de fundo com 20% de opacidade (hex 33)
  const backgroundColor = selectedMoodData ? selectedMoodData.color : "#FFFFFF";

  return (
    <div
      className="pagina-diario"
      style={{ backgroundColor: `${backgroundColor}33` }}
    >
      <div className="container">
        <h1 className="titulo-principal">Diário Emocional </h1>
        <p className="subtitulo">
          Registre seu humor e acompanhe suas emoções.
        </p>

        <div className="grid-layout">
          {/* Coluna da Esquerda: Formulário */}
          <div>
            <div className="cartao">
              <h2 className="titulo-card">Como você está se sentindo?</h2>

              {/* Grid de Emojis */}
              <div style={{ marginBottom: "2rem" }}>
                <p className="label">Selecione seu humor:</p>
                <div className="grid-emojis">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`btn-humor ${
                        selectedMood === mood.value ? "selecionado" : ""
                      }`}
                      type="button"
                    >
                      <div className="emoji-icone">{mood.emoji}</div>
                      <div className="label" style={{ marginBottom: 0 }}>
                        {mood.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div style={{ marginBottom: "2rem" }}>
                <label className="label">
                  Intensidade: {intensity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="input-slider"
                />
              </div>

              {/* Textarea */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="label">
                  Notas (opcional)
                </label>
                <textarea
                  placeholder="Escreva como você se sente..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-textarea"
                />
              </div>

              {/* Botão de Salvar */}
              <button
                onClick={handleSubmit}
                disabled={!selectedMood || isSubmitting}
                className="btn-primario"
              >
                {isSubmitting ? "Salvando..." : "Salvar Registro"}
              </button>
            </div>
          </div>

          {/* Coluna da Direita: Histórico */}
          <div>
            <div className="cartao">
              <h2 className="titulo-historico">Histórico Recente</h2>

              <div className="lista-historico">
                {recentEntries.length > 0 ? (
                  recentEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="item-historico"
                      style={{ borderLeft: `4px solid ${entry.moodColor}` }}
                    >
                      <div className="historico-topo">
                        <span style={{ fontWeight: 600, textTransform: "capitalize", fontSize: "0.875rem" }}>
                           {/* Encontra o Label correto ou usa o valor cru */}
                           {MOODS.find(m => m.value === entry.mood)?.label || entry.mood}
                        </span>
                        <span className="texto-pequeno">
                          {new Date(entry.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="texto-pequeno">
                        Intensidade: {entry.intensity}/10
                      </div>
                      {entry.notes && (
                        <p className="texto-pequeno" style={{ marginTop: "0.5rem" }}>
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="texto-pequeno">Nenhum registro ainda.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}