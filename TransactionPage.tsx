import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, HandCoins, Users, ShieldCheck, ChevronDown, Coins, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { storageService } from '../services/storageService';
import { duetStore } from '../services/store';

export default function TransactionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('mcx_express');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iban, setIban] = useState('');
  const [destTarget, setDestTarget] = useState('');

  const type = location.pathname.split('/').pop() || 'depositar';

  const config = {
    depositar: { title: 'Depositar', icon: CreditCard, color: 'text-green-600' },
    levantar: { title: 'Levantar', icon: HandCoins, color: 'text-blue-600' },
    transferir: { title: 'Transferir', icon: Users, color: 'text-orange-600' },
  }[type as 'depositar' | 'levantar' | 'transferir'] || { title: 'Transação', icon: CreditCard, color: 'text-gray-600' };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-8">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 border-2 border-green-200">
          <ShieldCheck className="w-10 h-10 stroke-[2.5px]" />
        </div>
        <h2 className="text-2xl font-black text-[#091747] mb-2 uppercase tracking-tighter italic text-center">
          Operação Registada!
        </h2>
        <p className="text-xs text-slate-500 text-center mb-10 max-w-xs uppercase tracking-widest font-bold leading-relaxed">
          O teu pedido de {config.title.toLowerCase()} de {parseFloat(amount).toLocaleString()} Kz foi processado com sucesso!
        </p>
        <button 
          onClick={() => navigate('/carteira')}
          className="w-full max-w-xs bg-[#FFB10A] hover:bg-[#FFC000] text-white font-black py-5 rounded-[1.5rem] uppercase tracking-widest text-xs shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
        >
          Voltar à Carteira
        </button>
      </div>
    );
  }

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const numericAmount = parseFloat(amount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Por favor, introduz um valor válido.');
      return;
    }

    const wallet = storageService.getWallet();

    if (type === 'levantar') {
      if (!iban.toUpperCase().startsWith('AO06') || iban.replace(/\s/g, '').length !== 21) {
        setError('IBAN de Angola inválido. Deve começar por "AO06" e conter exactamente 21 caracteres no total.');
        return;
      }
      if (wallet.balance < numericAmount) {
        setError('Saldo insuficiente para realizar este levantamento.');
        return;
      }
    } else if (type === 'transferir') {
      if (!destTarget.trim()) {
        setError('Por favor, introduz o ID do Jogador ou Telemóvel de destino.');
        return;
      }
      if (wallet.balance < numericAmount) {
        setError('Saldo insuficiente para realizar esta transferência.');
        return;
      }
    }

    setLoading(true);
    // Simular o spinner por 1.5s
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    if (type === 'depositar') {
      storageService.updateWallet({ balance: wallet.balance + numericAmount });
      
      storageService.addNotification({
        id: `notif_dep_${Date.now()}`,
        type: 'Performance',
        title: 'Depósito Confirmado! 💰🔥',
        message: `Recebeste ${numericAmount.toLocaleString()} Kz na tua carteira através de ${method === 'ref_multicaixa' ? 'Referência MCX' : method === 'transferencia' ? 'IBAN' : 'Express'}.`,
        emoji: '💰',
        challengeId: '',
        createdAt: new Date().toISOString(),
        isRead: false
      });

      duetStore.saveTransaction({
        userId: 'user_1',
        type: 'deposit',
        amount: numericAmount,
        method: method === 'ref_multicaixa' ? 'Referência MCX' : method === 'transferencia' ? 'IBAN' : 'Multicaixa Express',
        destination: 'Carteira Duet',
        status: 'Completed'
      });
    } else if (type === 'levantar') {
      storageService.updateWallet({ balance: wallet.balance - numericAmount });

      storageService.addNotification({
        id: `notif_lev_${Date.now()}`,
        type: 'Performance',
        title: 'Levantamento Solicitado 🏦⏳',
        message: `O teu pedido de levantamento de ${numericAmount.toLocaleString()} Kz para o IBAN ${iban.substring(0, 10)}... foi enviado.`,
        emoji: '🏦',
        challengeId: '',
        createdAt: new Date().toISOString(),
        isRead: false
      });

      duetStore.saveTransaction({
        userId: 'user_1',
        type: 'withdraw',
        amount: numericAmount,
        method: 'Levantamento de Dinheiro',
        destination: `IBAN ${iban.substring(0, 10)}...`,
        status: 'Completed'
      });
    } else if (type === 'transferir') {
      storageService.updateWallet({ balance: wallet.balance - numericAmount });

      storageService.addNotification({
        id: `notif_trans_${Date.now()}`,
        type: 'Performance',
        title: 'Transferência Concluída! 🤝✨',
        message: `Transferiste com sucesso ${numericAmount.toLocaleString()} Kz para o jogador '${destTarget}'.`,
        emoji: '🤝',
        challengeId: '',
        createdAt: new Date().toISOString(),
        isRead: false
      });

      duetStore.saveTransaction({
        userId: 'user_1',
        type: 'transfer',
        amount: numericAmount,
        method: 'Duelo Direto',
        destination: destTarget,
        status: 'Completed'
      });
    }

    setIsSuccess(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="h-[46px] border-b border-gray-200 bg-white px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-black transition-colors duration-300 hover:text-[#FFB10A]" disabled={loading}>
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">{config.title}</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div id="transaction-card" className="bg-white rounded-3xl border border-gray-200 overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 z-40 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#FFB10A] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[10px] md:text-xs font-black text-[#0c1e56] uppercase tracking-widest animate-pulse">A Processar Operação...</p>
            </div>
          )}

          <div id="transaction-header" className="px-5 py-4 border-b border-gray-200 bg-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100/60 flex items-center justify-center">
                <config.icon className="w-5 h-5 text-[#FFB10A]" strokeWidth={2.5} />
              </div>
              <h3 className="text-[#0c1e56] font-black uppercase tracking-tight text-sm">{config.title}</h3>
            </div>
            <span id="secure-badge" className="flex items-center gap-1 text-[9px] md:text-[10px] text-green-600 font-black uppercase tracking-widest border border-green-200/50 bg-green-50 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5px]" /> Seguro
            </span>
          </div>

          <form id="transaction-form" className="p-6 space-y-5" onSubmit={handleTransactionSubmit}>
            <div>
              <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Valor (Kz)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0c1e56] font-black italic">Kz</span>
                <input 
                  id="amount-input"
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setError(null); }}
                  placeholder="0"
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#FFB10A] outline-none font-black text-sm transition-all"
                  required
                />
              </div>
              {error && (
                <p className="mt-2 text-[10px] md:text-xs font-bold text-red-500 uppercase tracking-tight px-1">
                  {error}
                </p>
              )}
            </div>

            {type === 'depositar' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Método de Depósito</label>
                  <div className="relative">
                    <select 
                      id="method-select"
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      disabled={loading}
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#FFB10A] outline-none font-black text-[11px] transition-all appearance-none bg-white font-sans uppercase tracking-wider text-slate-700 cursor-pointer"
                    >
                      <option value="mcx_express">Multicaixa Express</option>
                      <option value="ref_multicaixa">Referência Multicaixa</option>
                      <option value="transferencia">Transferência Bancária (IBAN)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-650 pointer-events-none" />
                  </div>
                </div>

                {/* Guia Simulado de Depósito */}
                {method === 'ref_multicaixa' && (
                  <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2.5 animate-pop-in">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-bold uppercase text-[9px] md:text-[10px]">Entidade</span>
                      <span className="font-black text-slate-800 tracking-wider">21092 (DUET)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-slate-200/50 pt-2.5">
                      <span className="text-slate-500 font-bold uppercase text-[9px] md:text-[10px]">Referência</span>
                      <span className="font-black text-slate-800 tracking-wider">992 001 023</span>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-slate-400 leading-normal text-center pt-1.5 uppercase font-bold tracking-tight">
                      Instruções: Vai ao Multicaixa Express, escolhe Pagamentos por Referência e insere os dados acima com o valor pretendido.
                    </p>
                  </div>
                )}

                {method === 'transferencia' && (
                  <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2.5 animate-pop-in">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-bold uppercase text-[9px] md:text-[10px]">Titular</span>
                      <span className="font-black text-slate-800 text-right">Duet Desportivo Lda</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-slate-200/50 pt-2.5">
                      <span className="text-slate-500 font-bold uppercase text-[9px] md:text-[10px]">Banco</span>
                      <span className="font-black text-slate-800">BFA / BAI</span>
                    </div>
                    <div className="flex flex-col text-xs border-t border-slate-200/50 pt-2.5">
                      <span className="text-slate-400 font-bold uppercase text-[8px] mb-1">IBAN Angola</span>
                      <span className="font-mono font-black text-slate-800 text-[10px] md:text-xs bg-slate-200/50 p-2 rounded-lg select-all">
                        AO06.0040.0000.1234.5678.9012.3
                      </span>
                    </div>
                  </div>
                )}

                {method === 'mcx_express' && (
                  <div className="p-4 bg-[#f0f9ff] border border-blue-200/60 rounded-2xl">
                    <p className="text-[9.5px] text-sky-800 font-bold leading-normal text-center uppercase tracking-tight">
                      Ao clicares em "Confirmar", enviaremos uma notificação Express para o telemóvel associado ao teu perfil para aprovar a operação no valor especificado.
                    </p>
                  </div>
                )}
              </div>
            )}

            {type === 'levantar' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">IBAN de Destino (AO06)</label>
                  <input 
                    type="text"
                    value={iban}
                    onChange={(e) => {
                      setIban(e.target.value.toUpperCase());
                      setError(null);
                    }}
                    placeholder="AO06 0000 0000 0000 0000 0"
                    disabled={loading}
                    maxLength={25}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#FFB10A] outline-none font-mono font-black text-[11px] tracking-widest uppercase"
                    required
                  />
                  <p className="text-[9px] md:text-[10px] text-slate-400 mt-1.5 px-1 uppercase font-bold tracking-tight">O IBAN deve conter exatamente 21 caracteres no total e iniciar com "AO06".</p>
                </div>
              </div>
            )}

            {type === 'transferir' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Destinatário (ID do Jogador ou Telemóvel)</label>
                  <input 
                    type="text"
                    value={destTarget}
                    onChange={(e) => {
                      setDestTarget(e.target.value);
                      setError(null);
                    }}
                    placeholder="@GelsonDala ou 9xxxxxxxx"
                    disabled={loading}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#FFB10A] outline-none font-bold text-[11px]"
                    required
                  />
                  <p className="text-[9px] md:text-[10px] text-slate-400 mt-1.5 px-1 uppercase font-bold tracking-tight">A transferência será enviada instantaneamente para a carteira do utilizador de destino.</p>
                </div>
              </div>
            )}

            <div id="total-preview" className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/40">
               <div className="flex items-center justify-between">
                 <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest">Saldo a processar</span>
                 <span className="text-lg font-black text-[#0c1e56]">{amount ? Number(amount).toLocaleString() : '0'} Kz</span>
               </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                id="cancel-transaction"
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="flex-1 py-2.5 rounded-[1.2rem] border-2 border-gray-200 font-black text-slate-600 hover:bg-gray-50 transition-all uppercase tracking-widest text-[10px] md:text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                id="confirm-transaction"
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-[1.2rem] bg-[#FFB10A] text-white font-black hover:bg-[#FFC000] transition-all uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-orange-50 cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 flex gap-3 p-4 rounded-2xl bg-transparent border-2 border-gray-250">
           <Info className="w-5 h-5 text-gray-500 shrink-0" />
           <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed font-bold uppercase tracking-tight">
             As operações financeiras nesta versão são simuladas localmente de forma interativa para fins de exploração do ecossistema.
           </p>
        </div>
      </div>
    </div>
  );
}
