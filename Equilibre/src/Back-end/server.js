import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("http://127.0.0.1:11434/api/generate", {
      model: "llama3",
      prompt: message,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (error) {
    console.error("Erro no Ollama:", error.message);
    res.status(500).json({ error: "Erro ao gerar resposta da IA" });
  }
});

app.listen(3001, () => {
  console.log("✅ Servidor IA rodando em http://localhost:3001");
});
