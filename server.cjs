var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  const ai = process.env.GEMINI_API_KEY ? new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;
  app.use(import_express.default.json());
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.post("/api/admin/generate-matches", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    try {
      if (ai) {
        const systemPrompt = `
          \xC9s um agente especialista em desporto para a aplica\xE7\xE3o "DUET".
          A tua tarefa \xE9 extrair e organizar os pr\xF3ximos jogos reais de acordo com a pesquisa do administrador.
          Tens tamb\xE9m de tentar inferir log\xF3tipos das equipas pesquisando pelo nome oficial em PNG. Se n\xE3o souberes, deixa em branco "".
          Responde EXATAMENTE com um array JSON de objetos no seguinte formato, sem formata\xE7\xF5es Markdown (apenas o JSON bruto):
          [
            {
              "teamA": { "name": "Nome Equip A", "logo": "url_do_logo" },
              "teamB": { "name": "Nome Equip B", "logo": "url_do_logo" },
              "date": "S\xE1b, 20:00",
              "league": "Nome Liga",
              "category": "futebol|basket|f1",
              "confidence": "98%",
              "odds": { "winA": 2.15, "draw": 3.10, "winB": 1.85 }
            }
          ]
        `;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `${systemPrompt}

Pesquisa do Admin: ${prompt}`
        });
        let jsonRaw = response.text || "[]";
        jsonRaw = jsonRaw.replace(/```json/g, "").replace(/```/g, "").trim();
        const matches = JSON.parse(jsonRaw);
        res.json({ success: true, data: matches });
      } else {
        console.log("[AI Simulador] A gerar partidas de forma mock.");
        res.json({
          success: true,
          data: [
            { id: 1, teamA: "Real Madrid (AI)", teamB: "Barcelona (AI)", date: "S\xE1b, 20:00", league: "La Liga", category: "futebol", confidence: "98%" },
            { id: 2, teamA: "Atl\xE9tico Madrid (AI)", teamB: "Sevilla (AI)", date: "Dom, 18:30", league: "La Liga", category: "futebol", confidence: "95%" },
            { id: 3, teamA: "Girona (AI)", teamB: "Valencia (AI)", date: "Dom, 14:00", league: "La Liga", category: "futebol", confidence: "90%" }
          ]
        });
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      res.status(500).json({ error: "Falha ao gerar partidas com IA." });
    }
  });
  app.post("/api/admin/resolve-matches", async (req, res) => {
    res.json({ success: true, message: "Resultados validados e pr\xE9mios distribu\xEDdos." });
  });
  app.get("/api/admin/stats", async (req, res) => {
    res.json({
      success: true,
      data: {
        revenue: 145e3,
        activeBets: 342,
        onlineUsers: 1024,
        fraudAlerts: 3
      }
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
