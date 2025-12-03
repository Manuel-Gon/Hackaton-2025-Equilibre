export const KEYWORDS_RISK = [
  "suicid",
  "me matar",
  "não aguento",
  "nao aguento",
  "morrer",
  "tirar minha vida"
];

export const KEYWORDS = {
  anxious: ["ansioso", "ansiosa", "pânico", "panico", "preocupado", "tenso"],
  sad: ["triste", "tristeza", "chorando", "deprimido"],
  happy: ["feliz", "animado", "contente", "alegre"]
};

export function analyzeTextEmotion(text) {
  if (!text) return { emotion: "neutral", risk: false };

  const t = text.toLowerCase();

  const risk = KEYWORDS_RISK.some(k => t.includes(k));
  if (risk) return { emotion: "neutral", risk: true };

  if (KEYWORDS.anxious.some(k => t.includes(k)))
    return { emotion: "anxious", risk: false };

  if (KEYWORDS.sad.some(k => t.includes(k)))
    return { emotion: "sad", risk: false };

  if (KEYWORDS.happy.some(k => t.includes(k)))
    return { emotion: "happy", risk: false };

  return { emotion: "neutral", risk: false };
}
