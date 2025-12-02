import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.js";
// import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
// import { toast } from "sonner";

// Importe o CSS que criamos (ajuste o caminho conforme necessário)
import "./Diario.css";

const MOODS = [
  { emoji: "😊", label: "Feliz", value: "happy", color: "#10B981" },
  { emoji: "😢", label: "Triste", value: "sad", color: "#3B82F6" },
  { emoji: "😰", label: "Ansioso", value: "anxious", color: "#F59E0B" },
  { emoji: "😌", label: "Calmo", value: "calm", color: "#8B5CF6" },
  { emoji: "😠", label: "Irritado", value: "angry", color: "#EF4444" },
  { emoji: "😐", label: "Neutro", value: "neutral", color: "#6B7280" },
];

export default function Diario() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [intensity, setIntensity] = useState(5);

  // Redireciona se não estiver autenticado
  if (!user) {
    navigate("/");
    return null;
  }

  const utils = trpc.useUtils();

  const createEntryMutation = trpc.diary.createEntry.useMutation({
    onSuccess: () => {
      toast.success("Registro de humor salvo com sucesso!");
      setSelectedMood(null);
      setNotes("");
      setIntensity(5);
      // Atualiza a lista recente
      utils.diary.getRecent.invalidate();
    },
    onError: () => {
      toast.error("Erro ao salvar o registro. Tente novamente.");
    },
  });

  const { data: recentEntries, isLoading } = trpc.diary.getRecent.useQuery({ limit: 10 });

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error("Selecione um humor antes de salvar");
      return;
    }

    const moodData = MOODS.find((m) => m.value === selectedMood);
    if (!moodData) return;

    createEntryMutation.mutate({
      mood: selectedMood,
      moodColor: moodData.color,
      notes: notes || undefined,
      intensity,
    });
  };

  const selectedMoodData = MOODS.find((m) => m.value === selectedMood);
  // Fundo dinâmico com opacidade
  const backgroundColor = selectedMoodData ? selectedMoodData.color : "#FFFFFF";

  return (
    <div
      className="diary-wrapper"
      style={{ backgroundColor: `${backgroundColor}20` }} // 20 é hex para opacidade baixa
    >
      <div className="container">
        <h1 className="page-title">Diário Emocional</h1>
        <p className="page-subtitle">
          Registre seu humor e acompanhe suas emoções ao longo do tempo.
        </p>

        <div className="main-grid">
          {/* Formulário de Entrada */}
          <div className="form-section">
            <div className="card">
              <h2 className="section-title">Como você está se sentindo?</h2>

              {/* Seleção de Humor */}
              <div className="input-group">
                <p className="label">Selecione seu humor:</p>
                <div className="mood-grid">
                  {MOODS.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      type="button"
                      className={`mood-button ${
                        selectedMood === mood.value ? "active" : ""
                      }`}
                    >
                      <div className="mood-emoji">{mood.emoji}</div>
                      <div className="mood-label">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider de Intensidade */}
              <div className="input-group">
                <label className="label">
                  Intensidade: {intensity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="input-range"
                />
              </div>

              {/* Notas */}
              <div className="input-group">
                <label className="label">
                  Notas (opcional)
                </label>
                <textarea
                  placeholder="Escreva como você se sente, o que aconteceu hoje..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="textarea"
                />
              </div>

              {/* Botão de Envio */}
              <button
                onClick={handleSubmit}
                disabled={!selectedMood || createEntryMutation.isPending}
                className="btn-primary"
              >
                {createEntryMutation.isPending ? "Salvando..." : "Salvar Registro"}
              </button>
            </div>
          </div>

          {/* Histórico Recente */}
          <div className="history-section">
            <div className="card">
              <h2 className="section-title">Histórico Recente</h2>

              {isLoading ? (
                <div className="history-list">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="loading-skeleton" />
                  ))}
                </div>
              ) : recentEntries && recentEntries.length > 0 ? (
                <div className="history-list">
                  {recentEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="history-item"
                      style={{ borderLeft: `4px solid ${entry.moodColor}` }}
                    >
                      <div className="history-header">
                        <span className="history-mood-name">
                          {entry.mood}
                        </span>
                        <span className="history-date">
                          {new Date(entry.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <div className="history-intensity">
                        Intensidade: {entry.intensity}/10
                      </div>
                      {entry.notes && (
                        <p className="history-notes">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="history-date">Nenhum registro ainda.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}