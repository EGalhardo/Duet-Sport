import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai"; // New GenAI SDK

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Gemini if API key is present
  const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

  // Use JSON body parser for API routes
  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // --- ADMIN AI API ROUTES (MODULE 1, 2, 3 FOUNDATION) ---

  // Module 1: AI Match Generator
  app.post("/api/admin/generate-matches", async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      if (ai) {
        // Step 3: Prompt Engineering do Gemini
        const systemPrompt = `
          És um agente especialista em desporto para a aplicação "DUET".
          A tua tarefa é extrair e organizar os próximos jogos reais de acordo com a pesquisa do administrador.
          Tens também de tentar inferir logótipos das equipas pesquisando pelo nome oficial em PNG. Se não souberes, deixa em branco "".
          Responde EXATAMENTE com um array JSON de objetos no seguinte formato, sem formatações Markdown (apenas o JSON bruto):
          [
            {
              "teamA": { "name": "Nome Equip A", "logo": "url_do_logo" },
              "teamB": { "name": "Nome Equip B", "logo": "url_do_logo" },
              "date": "Sáb, 20:00",
              "league": "Nome Liga",
              "category": "futebol|basket|f1",
              "confidence": "98%",
              "odds": { "winA": 2.15, "draw": 3.10, "winB": 1.85 }
            }
          ]
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemPrompt}\n\nPesquisa do Admin: ${prompt}`,
        });

        let jsonRaw = response.text || "[]";
        // Limpar blocos markdown caso a IA os inclua (e.g. ```json ... ```)
        jsonRaw = jsonRaw.replace(/```json/g, "").replace(/```/g, "").trim();
        
        const matches = JSON.parse(jsonRaw);
        res.json({ success: true, data: matches });
      } else {
        // Fallback Simulador (se não houver API Key no momento)
        console.log("[AI Simulador] A gerar partidas de forma mock.");
        res.json({
          success: true,
          data: [
            { id: 1, teamA: 'Real Madrid (AI)', teamB: 'Barcelona (AI)', date: 'Sáb, 20:00', league: 'La Liga', category: 'futebol', confidence: '98%' },
            { id: 2, teamA: 'Atlético Madrid (AI)', teamB: 'Sevilla (AI)', date: 'Dom, 18:30', league: 'La Liga', category: 'futebol', confidence: '95%' },
            { id: 3, teamA: 'Girona (AI)', teamB: 'Valencia (AI)', date: 'Dom, 14:00', league: 'La Liga', category: 'futebol', confidence: '90%' },
          ]
        });
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      res.status(500).json({ error: "Falha ao gerar partidas com IA." });
    }
  });

  // Module 2: AI Referee (Resolution API)
  app.post("/api/admin/resolve-matches", async (req, res) => {
    // Aqui a lógica ligar-se-á aos dados em memória / BD real
    res.json({ success: true, message: "Resultados validados e prémios distribuídos." });
  });

  // Module 3: Analytics API
  app.get("/api/admin/stats", async (req, res) => {
    res.json({
      success: true,
      data: {
        revenue: 145000,
        activeBets: 342,
        onlineUsers: 1024,
        fraudAlerts: 3
      }
    });
  });

  // --- END ADMIN API ---

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from 'dist' in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Fallback for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();