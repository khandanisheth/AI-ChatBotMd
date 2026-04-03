import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

app.get("/api/health", (req, res) => res.json({ ok: true, model: modelName }));

app.post("/api/chat", async (req, res) => {
  try {
    if (!genAI) {
      return res.status(500).json({
        error: "Missing API key. Set GEMINI_API_KEY or OPENAI_API_KEY in Server/.env",
      });
    }

    const { messages = [] } = req.body;
    const input = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(input);

    res.json({ text: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, model: modelName });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT} using ${modelName}`));
