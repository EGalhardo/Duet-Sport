import React, { useState } from 'react';
import { Gavel, CheckCircle2, AlertCircle, Clock, Search, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminResultados() {
  const [scanningId, setScanningId] = useState<number | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<any | null>(null);

  const [pendingValidations, setPendingValidations] = useState([
    { id: 1, match: 'Petro de Luanda vs 1º de Agosto', status: 'pending_ai', date: 'Hoje, 17:00' },
    { id: 2, match: 'Max Verstappen (Pole)', status: 'pending_ai', date: 'Hoje, 15:00', league: 'F1' },
    { id: 5, match: 'Benfica vs Real Sociedad', status: 'pending_ai', date: 'Ontem, 20:00' },
  ]);

  const [recentValidations, setRecentValidations] = useState([
    { id: 3, match: 'Real Madrid vs Barcelona', result: '3 - 1', aiConfidence: '100%', payout: '450.000 Kz', status: 'resolved' },
    { id: 4, match: 'Sagrada vs Interclube', result: '0 - 0', aiConfidence: '99%', payout: '12.500 Kz', status: 'resolved' },
  ]);

  const handleForceScan = (item: any) => {
    setScanningId(item.id);
    
    // Simulate AI scanning and resolving
    setTimeout(() => {
      setPendingValidations(prev => prev.filter(v => v.id !== item.id));
      setRecentValidations(prev => [
        { 
          id: item.id, 
          match: item.match, 
          result: item.league === 'F1' ? 'M. Verstappen' : '2 - 1', 
          aiConfidence: '97%', 
          payout: '150.000 Kz', 
          status: 'resolved' 
        },
        ...prev
      ]);
      setScanningId(null);
    }, 2500);
  };

  const handleAuditSave = () => {
    if (!selectedAudit) return;
    // In a real app, this would call the backend to correct the payout/result
    setSelectedAudit(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto relative">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-[#091747] uppercase italic tracking-tight">Árbitro IA (Resultados)</h1>
        <p className="text-sm font-bold text-gray-500">Validação automática de resultados desportivos e distribuição de prémios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Validations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[#091747] text-sm md:text-base uppercase italic flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              A Aguardar Fim do Jogo
            </h3>
            <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">{pendingValidations.length} Na Fila</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {pendingValidations.length > 0 ? pendingValidations.map(val => (
                <motion.div 
                  key={val.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                  className="p-3 md:p-4 rounded-xl border border-gray-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 overflow-hidden"
                >
                  <div>
                    <h4 className="font-black text-[#091747] text-sm uppercase">{val.match}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Fim previsto: {val.date}</p>
                  </div>
                  
                  {scanningId === val.id ? (
                    <div className="flex items-center justify-center gap-2 text-xs font-black text-purple-600 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200 uppercase tracking-widest min-w-[160px]">
                      <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      Analisando Web...
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleForceScan(val)}
                      className="flex items-center justify-center gap-2 text-xs font-black text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 uppercase tracking-widest hover:border-purple-300 hover:text-purple-600 transition-colors min-w-[160px]"
                    >
                      <Search className="w-3.5 h-3.5" />
                      Forçar Pesquisa IA
                    </button>
                  )}
                </motion.div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 mt-4">
                  <Clock className="w-8 h-8 text-slate-300 mb-3" />
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nenhum Jogo Pendente</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Resolved Validations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-[#091747] text-sm md:text-base uppercase italic flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Resolvidos Recentes
            </h3>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {recentValidations.map(val => (
                <motion.div 
                  key={val.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 md:p-4 rounded-xl border border-green-100 bg-green-50/30 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-[#091747] text-sm uppercase">{val.match}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase">RES: {val.result}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confiança IA: {val.aiConfidence}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedAudit(val)}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-transparent hover:border-purple-100" 
                      title="Auditoria Manual"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-green-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Prémios Distribuidos</span>
                    <span className="text-xs font-black text-[#FFB10A]">{val.payout}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Manual Audit Modal */}
      <AnimatePresence>
        {selectedAudit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#091747]/80 backdrop-blur-sm"
              onClick={() => setSelectedAudit(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-3xl p-6 relative z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-black text-[#091747] text-lg uppercase italic flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-purple-600" />
                    Auditoria Manual
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Sobrescrever Decisão da IA</p>
                </div>
                <button onClick={() => setSelectedAudit(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Jogo Selecionado</p>
                <p className="font-black text-[#091747] uppercase">{selectedAudit.match}</p>
                <div className="flex gap-4 mt-3">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Resultado IA</p>
                    <p className="text-sm font-black text-green-600">{selectedAudit.result}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pagamento IA</p>
                    <p className="text-sm font-black text-[#FFB10A]">{selectedAudit.payout}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-[#091747] uppercase tracking-widest mb-2 block">Resultado Correto</label>
                  <input type="text" defaultValue={selectedAudit.result} className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 font-bold text-sm outline-none focus:border-purple-500 transition-colors" />
                </div>
                
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-bold text-orange-800 leading-relaxed uppercase">
                    Aviso: Alterar o resultado irá reverter os {selectedAudit.payout} distribuídos e recalcular os vencedores desta sala/desafio. Esta ação será registada no log de auditoria.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setSelectedAudit(null)} className="flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleAuditSave} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-500/30">
                  <Check className="w-4 h-4" />
                  Confirmar Correção
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}