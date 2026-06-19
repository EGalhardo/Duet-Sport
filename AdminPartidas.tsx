import React, { useState } from 'react';
import { Bot, Search, Calendar, Trophy, Check, ArrowRight } from 'lucide-react';

export default function AdminPartidas() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMatches, setGeneratedMatches] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/admin/generate-matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        // Add random IDs to array items if missing
        const matchesWithIds = result.data.map((m: any, i: number) => ({
          ...m,
          id: m.id || Date.now() + i
        }));
        setGeneratedMatches(matchesWithIds);
      }
    } catch (error) {
      console.error("Erro ao comunicar com a IA:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#091747] uppercase italic tracking-tight">Gerar Partidas (IA)</h1>
        <p className="text-sm font-bold text-gray-500">Cria novas rodadas automaticamente usando o Google Gemini.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 md:p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Bot className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Procura os próximos 5 jogos mais importantes da La Liga..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-[#091747] outline-none focus:border-purple-400 transition-all"
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Pesquisar (IA)
              </span>
            )}
          </button>
        </div>
      </div>

      {generatedMatches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-[#091747] text-lg uppercase italic">Resultados Encontrados</h3>
            <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase">Pronto a Publicar</span>
          </div>

          <div className="grid gap-4">
            {generatedMatches.map((match) => (
              <div key={match.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <img src={match.teamA?.logo || "https://i.postimg.cc/qRvHdhGG/Angola-Girabola-54.gif"} className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 object-contain shadow-sm" alt="A" />
                    <img src={match.teamB?.logo || "https://i.postimg.cc/qRvHdhGG/Angola-Girabola-54.gif"} className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 object-contain shadow-sm" alt="B" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-[#091747] uppercase text-sm md:text-base">
                        {typeof match.teamA === 'string' ? match.teamA : match.teamA?.name} 
                        <span className="text-gray-400 mx-1">VS</span> 
                        {typeof match.teamB === 'string' ? match.teamB : match.teamB?.name}
                      </h4>
                      <span className="bg-purple-100 text-purple-700 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{match.confidence} Match IA</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs font-bold text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {match.date}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{match.league}</span>
                      {match.odds && (
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB10A] ml-2">
                           Odds: {match.odds.winA} / {match.odds.draw} / {match.odds.winB}
                         </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 md:flex-none bg-[#FFB10A] hover:bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <Check className="w-4 h-4" />
                    Aprovar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-[#091747] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-opacity-90 transition-all">
              Aprovar Todos
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}