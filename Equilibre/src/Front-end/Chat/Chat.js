export const KEYWORDS = {
  anxious: ['ansioso', 'ansiedade', 'tenso', 'preocup', 'apavor', 'pânico', 'panico'],
  sad: ['triste', 'tristeza', 'deprimido', 'sem forças', 'desanimado', 'chorei', 'chorando'],
  happy: ['feliz', 'animado', 'bem', 'ótimo', 'otimo', 'alegre', 'grato']
};


export const KEYWORDS_RISK = [
  'crise',
  'nao aguento',
  'não aguento',
  'suicid',
  'matar',
  'me machucar',
  'me machuco',
  'tirar a vida',
  'panico'
];

export function analyzeTextEmotion(text) {
  if (!text) return { emotion: 'neutral', risk: false };

  const t = text.toLowerCase();


  const risk = KEYWORDS_RISK.some(k => t.includes(k));
  if (risk) return { emotion: 'neutral', risk: true };

 
  if (KEYWORDS.anxious.some(k => t.includes(k))) return { emotion: 'anxious', risk: false };
  if (KEYWORDS.sad.some(k => t.includes(k))) return { emotion: 'sad', risk: false };
  if (KEYWORDS.happy.some(k => t.includes(k))) return { emotion: 'happy', risk: false };

  return { emotion: 'neutral', risk: false };
}


export default function Chat() {
  return (
    <div>
      Chat carregado!
    </div>
  );
}