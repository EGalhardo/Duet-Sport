import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ArrowLeft, Trophy, Users, Plus, List, Shield, 
  AlertCircle, Lock, Calendar, Clock, Check,
  CheckCircle2, Trash2, Copy, MessageSquare, Mail,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { Match, Bet, FavoriteItem, Wallet as WalletType } from '../../../types';
import { storageService } from '../../../services/storageService';
import { FOOTBALL_MARKETS, PRIVATE_MARKETS, BASKETBALL_PRIVATE_MARKETS, F1_PRIVATE_MARKETS } from '../../../constants/markets';
import { MATCH_DATA, LEAGUE_CLASSIFICATIONS } from '../../../constants';
import BettingModalHeader from './BettingModalHeader';
import MarketOption from './MarketOption';
import SuccessView from './SuccessView';
import ClassificationTable from '../ClassificationTable';

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  activeTab: string;
  category?: string;
}

const BettingModal: React.FC<BettingModalProps> = ({ 
  isOpen, 
  onClose, 
  match, 
  activeTab,
  category
}) => {
  const [betAction, setBetAction] = useState<'create' | 'join' | 'my_bets' | 'bet_details' | null>(null);
  const [selectedBetId, setSelectedBetId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [createStep, setCreateStep] = useState<'password' | 'selection' | 'details'>('selection');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedMarketsList, setSelectedMarketsList] = useState<(string | null)[]>(Array(10).fill(''));
  const [betValue, setBetValue] = useState('0');
  const [marketType, setMarketType] = useState('Resultado Final');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [roomName, setRoomName] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('2');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [roomNameInput, setRoomNameInput] = useState('');
  const [joiningBet, setJoiningBet] = useState<Bet | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [autoConfirmNacional, setAutoConfirmNacional] = useState(false);
  const [showClassification, setShowClassification] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserView, setSelectedUserView] = useState<string>('me');

  const inscribedUsers = useMemo(() => [
    { id: '1', name: 'João Silva', picks: ['A', 'X', 'B', 'A', 'X', 'B', 'A', 'X', 'B', 'A'] },
    { id: '2', name: 'Maria Santos', picks: ['B', 'B', 'A', 'X', 'A', 'B', 'X', 'A', 'B', 'X'] },
    { id: '3', name: 'Carlos Pereira', picks: ['X', 'A', 'X', 'B', 'B', 'A', 'A', 'X', 'B', 'B'] }
  ], []);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      const resetScroll = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
        }
      };
      resetScroll();
      const timer = setTimeout(resetScroll, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, createStep, activeTab, betAction, isSuccess, showClassification, showDeleteConfirm, joiningBet]);

  const handleClose = useCallback(() => {
    setBetAction(activeTab === 'Nacional' ? 'create' : null);
    setCreateStep('selection');
    setCreatePassword('');
    setConfirmPassword('');
    setSelectedMarketsList(Array(10).fill(''));
    setBetValue('0');
    setMarketType('Resultado Final');
    setSelectedMarket('');
    setRoomName('');
    setMaxParticipants('2');
    setRoomCodeInput('');
    setRoomNameInput('');
    setJoiningBet(null);
    setIsSuccess(false);
    setAutoConfirmNacional(false);
    setShowClassification(false);
    setError('');
    setSelectedUserView('me');
    setSelectedBetId(null);
    setShowDeleteConfirm(null);
    onClose();
  }, [activeTab, onClose]);

  useEffect(() => {
    if (isOpen) {
      setBetAction(activeTab === 'Nacional' ? 'create' : null);
      setCreateStep('selection');
      setSelectedMarketsList(Array(10).fill(''));
      setError('');
      setJoiningBet(null);
      setIsSuccess(false);
      setBetValue('0');
      setMarketType('Resultado Final');
      setSelectedMarket('');
      setRoomName('');
      setRoomNameInput('');
      setAutoConfirmNacional(false);
      setShowClassification(false);
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    const selectedCount = selectedMarketsList.filter(m => !!m && m !== 'PENDING').length;
    const mapping: Record<number, number> = {
      1: 3, 2: 6, 3: 12, 4: 20, 5: 50, 6: 100, 7: 150, 8: 250, 9: 500, 10: 1000
    };
    if (selectedCount > 0) {
      setMaxParticipants(String(mapping[selectedCount] || 2));
    } else {
      setMaxParticipants('2');
    }
  }, [selectedMarketsList]);

  if (!match) return null;

  const handleBet = () => {
    const wallet = storageService.getWallet();
    const amount = activeTab === 'Nacional' ? 1000 : parseInt(betValue);

    if (betAction === 'join') {
      if (!roomCodeInput || !roomNameInput) {
        setError('Preencha o nome da sala e a senha!');
        return;
      }

      if (!joiningBet) {
        const allBets = storageService.getBets();
        const existingBet = allBets.find(b => 
          b.password === roomCodeInput && 
          b.roomName?.toLowerCase() === roomNameInput.toLowerCase() &&
          b.matchId === match.id && 
          b.category === activeTab
        );

        if (!existingBet) {
          setError(
            activeTab === 'Privado' 
              ? 'Grupo Privado não encontrado ou senha incorreta. Verifica os dados e tenta novamente.'
              : 'Desafio não encontrado ou senha incorreta. Verifica os dados e tenta novamente.'
          );
          return;
        }

        setError('');
        setJoiningBet(existingBet);
        setSelectedMarket('');
        
        if (activeTab === 'Privado' && existingBet.selectedMarkets) {
          const initialList = existingBet.selectedMarkets.map(m => m !== null ? '' : null);
          setSelectedMarketsList(initialList);
        }
        return;
      }

      if (activeTab === '1 vs 1' && joiningBet) {
        if (!selectedMarket) {
          setError('Escolhe o teu prognóstico!');
          return;
        }
        if (selectedMarket === joiningBet.market) {
          setError('Deves escolher um resultado diferente do teu amigo!');
          return;
        }
      }

      if (activeTab === 'Privado' && joiningBet) {
        const allMarketsFilled = selectedMarketsList.every((res, idx) => {
          if (joiningBet.selectedMarkets && joiningBet.selectedMarkets[idx] === null) return true;
          return !!res && res !== 'PENDING' && res !== '';
        });

        if (!allMarketsFilled) {
          setError('Por favor, preenche todos os prognósticos!');
          return;
        }
      }

      const amountToJoin = joiningBet.amount;
      if (wallet.balance < amountToJoin) {
        setError('Saldo insuficiente!');
        return;
      }

      storageService.updateWallet({ 
        balance: wallet.balance - amountToJoin,
        blocked_balance: wallet.blocked_balance + amountToJoin
      });

      storageService.saveBet({
        id: Date.now().toString(),
        matchId: match.id,
        category: activeTab as any,
        market: activeTab === '1 vs 1' ? selectedMarket : joiningBet.market,
        amount: amountToJoin,
        status: 'Open',
        password: roomCodeInput,
        roomName: roomNameInput,
        selectedMarkets: activeTab === 'Privado' ? selectedMarketsList : undefined,
        createdAt: new Date().toISOString()
      });

      setIsSuccess(true);
      return;
    }

    if (activeTab === 'Privado' && betAction === 'create') {
      const selectedCount = selectedMarketsList.filter(s => s && s !== '').length;
      if (selectedCount === 0) {
        setError('Seleciona pelo menos 1 mercado!');
        return;
      }
      
      const hasPending = selectedMarketsList.some(s => s === 'PENDING');
      if (hasPending) {
        setError('Por favor, escolhe o resultado (A, X ou B) para todos os mercados selecionados!');
        return;
      }
    }

    if (activeTab === 'Nacional') {
      const selectedCount = selectedMarketsList.filter(s => !!s && s !== 'PENDING' && s !== '').length;
      if (selectedCount < 10) {
        setError('Por favor, preenche todos os 10 prognósticos da Rodada!');
        return;
      }
    }

    if (amount > wallet.balance) {
      setError('Saldo insuficiente!');
      return;
    }

    storageService.updateWallet({ 
      balance: wallet.balance - amount,
      blocked_balance: wallet.blocked_balance + amount
    });

    const finalMarketsToSave = (activeTab === 'Privado' || activeTab === 'Nacional')
      ? selectedMarketsList.map(s => s === '' ? null : s)
      : undefined;

    storageService.saveBet({
      id: Date.now().toString(),
      matchId: match.id,
      category: activeTab as any,
      market: activeTab === 'Nacional' ? 'Predição 10 Mercados' : selectedMarket,
      marketType: activeTab === '1 vs 1' ? marketType : undefined,
      amount: amount,
      status: 'Open',
      autoConfirmThreshold: (activeTab === 'Nacional' && autoConfirmNacional) ? 100000 : undefined,
      password: (activeTab === '1 vs 1' || activeTab === 'Privado') ? createPassword : '',
      roomName: (activeTab === '1 vs 1' || activeTab === 'Privado') ? roomName : '',
      maxParticipants: activeTab === 'Privado' ? Number(maxParticipants) : undefined,
      selectedMarkets: finalMarketsToSave,
      createdAt: new Date().toISOString()
    });

    setIsSuccess(true);
  };

  const getActionText = () => {
    if (betAction === 'join') {
      return joiningBet ? 'Confirmar e Apostar' : 'Entrar Agora';
    }
    if (activeTab === 'Nacional') return 'Submeter Rodada';
    return 'Finalizar Aposta';
  };

  const getActionClass = () => {
    if (betAction === 'join') {
      return joiningBet ? "bg-green-600 shadow-green-100" : "bg-blue-600 shadow-blue-100";
    }
    return "bg-[#FFB10A] shadow-orange-100";
  };

  const isBasketball = category === 'basket' || (match && (match.league === 'NBA' || match.league === 'Unitel Basket' || match.league === 'Liga ACB' || match.league === 'VTB United League' || match.league === 'Basket League' || match.league === 'Serie A Basket' || match.league === 'Jeep Elite' || match.league === 'BBL Alemanha'));

  const renderContent = () => {
    if (showClassification) {
      return (
        <ClassificationTable 
          league={match.league} 
          homeTeam={match.teamA.name} 
          awayTeam={match.teamB.name}
          onBack={() => setShowClassification(false)}
        />
      );
    }

    if (isSuccess) {
      const shareText = `Vem jogar no Duet Desportivo!\nSala: ${roomName || roomNameInput || '---'}\nSenha: ${createPassword || roomCodeInput || '---'}\nJogo: ${match.teamA.name} vs ${match.teamB.name}`;
      return (
        <SuccessView 
          roomCode={createPassword || roomCodeInput || '---'}
          onShare={() => {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(whatsappUrl, '_blank');
          }}
          onCopy={() => {
            navigator.clipboard.writeText(shareText);
          }}
          onClose={handleClose}
        />
      );
    }

    if (!betAction) {
      if (activeTab === 'Nacional') {
        setBetAction('create');
        return null;
      }
      const userBets = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);

      return (
        <div className="flex flex-col gap-3 md:gap-4 py-2 md:py-4">
          <button 
            onClick={() => {
              setBetAction('create');
              if (activeTab === 'Privado' || activeTab === '1 vs 1') setCreateStep('password');
              else setCreateStep('details');
            }}
            className="group flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-white border border-gray-200 rounded-2xl md:rounded-[2rem] hover:border-[#FFB10A] transition-all hover:bg-orange-50/50"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-orange-50 flex items-center justify-center text-[#FFB10A] shrink-0 group-hover:bg-[#FFB10A] group-hover:text-white transition-all">
              <Plus className="w-6 h-6 md:w-8 md:h-8 stroke-[3px]" />
            </div>
            <div className="text-left">
              <h4 className="font-black text-[#091747] text-lg md:text-xl uppercase tracking-tighter italic">Criar {activeTab === '1 vs 1' ? 'Duelo' : 'Sala'}</h4>
              <p className="text-[9px] md:text-[10px] text-gray-800 font-black uppercase tracking-widest mt-0.5 md:mt-1">Lança um desafio novo</p>
            </div>
          </button>
          <button 
            onClick={() => setBetAction('join')}
            className="group flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-white border border-gray-200 rounded-2xl md:rounded-[2rem] hover:border-blue-500 transition-all hover:bg-blue-50/50"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Users className="w-6 h-6 md:w-8 md:h-8 stroke-[3px]" />
            </div>
            <div className="text-left">
              <h4 className="font-black text-[#091747] text-lg md:text-xl uppercase tracking-tighter italic">Entrar com Senha</h4>
              <p className="text-[9px] md:text-[10px] text-gray-800 font-black uppercase tracking-widest mt-0.5 md:mt-1">Aceita um convite direto</p>
            </div>
          </button>

          {userBets.length > 0 && (
            <button 
              onClick={() => setBetAction('my_bets')}
              className="group flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-white border border-gray-300 rounded-2xl md:rounded-[2rem] hover:border-green-500 transition-all hover:bg-green-50"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-[#091747] text-lg md:text-xl uppercase tracking-tighter italic">Tuas Apostas</h4>
                  <span className="bg-green-500 text-white text-[9px] md:text-[10px] font-black px-2.5 py-0.5 md:px-3 md:py-1 rounded-xl">{userBets.length}</span>
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-0.5 md:mt-1">Vê o estado dos teus duelos</p>
              </div>
            </button>
          )}
        </div>
      );
    }

    if (showDeleteConfirm) {
      const bet = storageService.getBets().find(b => b.id === showDeleteConfirm);
      return (
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-gray-900 text-center mb-2 uppercase italic tracking-tighter">Eliminar Aposta?</h3>
          <p className="text-sm text-gray-900 text-center mb-8 px-6 font-bold uppercase tracking-tight leading-relaxed">
            Tens a certeza que pretendes eliminar este desafio? O valor de <span className="text-[#FFB10A]">{bet?.amount.toLocaleString()} Kz</span> será devolvido ao teu saldo.
          </p>
          <div className="w-full flex flex-col gap-3">
            <button onClick={() => {
              if (showDeleteConfirm) {
                storageService.deleteBet(showDeleteConfirm, true);
                setShowDeleteConfirm(null);
                const remaining = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);
                if (remaining.length === 0) setBetAction(null);
              }
            }} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs">Sim, Eliminar</button>
            <button onClick={() => setShowDeleteConfirm(null)} className="w-full bg-transparent border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors font-black py-4 rounded-2xl uppercase tracking-widest text-xs">Cancelar</button>
          </div>
        </div>
      );
    }

    if (betAction === 'my_bets') {
      const userBets = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);
      return (
        <div className="flex flex-col gap-4 py-2">
          <div className="bg-white border-2 border-green-500 p-4 rounded-2xl mb-2">
            <h4 className="text-xs font-black text-green-700 mb-1 uppercase italic">Tuas Apostas Ativas</h4>
            <p className="text-[10px] text-gray-900 font-black uppercase tracking-tight">Vê os teus desafios ou elimina os que não queres</p>
          </div>
          <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {userBets.map((bet) => (
              <div key={bet.id} className="group flex flex-col gap-3 p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-500 transition-all text-left">
                <div onClick={() => { setSelectedBetId(bet.id); setBetAction('bet_details'); }} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                      <Trophy className="w-5 h-5" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">{match.teamA.name} vs {match.teamB.name}</p>
                      <p className="text-xs font-black text-[#091747]">{bet.market}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#FFB10A]">{bet.amount.toLocaleString()} Kz</p>
                    <p className="text-[10px] font-black text-green-600 uppercase italic">Ativo</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                  <button onClick={() => setShowDeleteConfirm(bet.id)} className="flex items-center gap-1 text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (betAction === 'bet_details') {
      const bet = storageService.getBets().find(b => b.id === selectedBetId);
      if (!bet) return null;

      const isBasketball = category === 'basket' || (match && (match.league === 'NBA' || match.league === 'Unitel Basket' || match.league === 'Liga ACB' || match.league === 'VTB United League' || match.league === 'Basket League' || match.league === 'Serie A Basket' || match.league === 'Jeep Elite' || match.league === 'BBL Alemanha'));
      const isF1 = category === 'f1';
      const currentPrivateMarkets = isF1 ? F1_PRIVATE_MARKETS : (isBasketball ? BASKETBALL_PRIVATE_MARKETS : PRIVATE_MARKETS);

      const shareText = `Vem jogar no Duet Desportivo!\nSala: ${bet.roomName || '---'}\nSenha: ${bet.password || '---'}\nJogo: ${match.teamA.name} vs ${match.teamB.name}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      const mailUrl = `mailto:?subject=${encodeURIComponent('Convite para Desafio Duet')}&body=${encodeURIComponent(shareText)}`;

      return (
        <div className="flex flex-col gap-4 py-1 pb-6 animate-fade-in">
          <div className="bg-white p-4 rounded-3xl border-2 border-gray-200">
             <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FFB10A]" strokeWidth={3} />
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest italic">Resumo do Desafio</span>
              </div>
              <span className="text-[10px] font-black text-[#091747] bg-white px-3 py-1 rounded-full uppercase tracking-widest border-2 border-gray-200">Aberto</span>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <div className="bg-transparent p-4 rounded-2xl border-2 border-gray-200">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <List className="w-3.5 h-3.5 text-[#FFB10A]" strokeWidth={3} />
                  A tua escolha
                </p>
                <div className="flex flex-col gap-2">
                  {bet.selectedMarkets ? (
                    (() => {
                      const validSelections = bet.selectedMarkets.map((predCode, idx) => {
                        if (!predCode || predCode === 'PENDING') return null;
                        const marketObj = currentPrivateMarkets[idx];
                        if (!marketObj) return null;
                        const optionObj = match ? marketObj.options(match).find(o => o.id === predCode) : null;
                        const choiceLabel = optionObj ? optionObj.label : predCode;
                        return { market: marketObj.name, choice: choiceLabel };
                      }).filter((s): s is { market: string; choice: string } => s !== null);

                      if (validSelections.length === 0) {
                        return <p className="text-xs font-black text-[#091747]">Nenhuma escolha</p>;
                      }

                      return validSelections.map((sel, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{sel.market}:</span>
                          <span className="text-xs font-black text-[#091747]">{sel.choice}</span>
                        </div>
                      ));
                    })()
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Prognóstico:</span>
                      <span className="text-xs font-black text-[#091747]">{bet.market || '---'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-transparent p-4 rounded-2xl border-2 border-gray-200 flex justify-between items-center">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Valor Apostado</p>
                <p className="text-sm font-black text-[#FFB10A]">{bet.amount.toLocaleString()} Kz</p>
              </div>
            </div>

            {bet.roomName && (
              <div className="bg-transparent p-3.5 rounded-2xl border-2 border-gray-200 mb-4 flex justify-between items-center px-4">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Nome da Sala</p>
                  <p className="text-xs font-black text-[#091747] uppercase font-mono">{bet.roomName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Status</p>
                  <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase italic">Criada por ti</span>
                </div>
              </div>
            )}
            <div className="bg-blue-50/50 p-4 rounded-3xl border-2 border-dashed border-blue-400">
              <p className="text-[9px] text-blue-700 uppercase font-black tracking-widest text-center mb-1.5 italic">Senha do Desafio</p>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border-2 border-blue-200">
                <span className="text-xl font-mono font-black text-[#091747] tracking-wider">{bet.password || '---'}</span>
                <button onClick={() => { if (bet.password) navigator.clipboard.writeText(bet.password); }} className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white active:scale-95 transition-all">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-500/10 active:scale-95 transition-all cursor-pointer animate-fade-in"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
            <a 
              href={mailUrl}
              className="flex items-center justify-center gap-2 bg-[#091747] text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-900/10 active:scale-95 transition-all cursor-pointer animate-fade-in"
            >
              <Mail className="w-4 h-4" />
              E-mail
            </a>
          </div>
        </div>
      );
    }

    if (betAction === 'create' && createStep === 'password') {
      return (
        <div className="flex flex-col gap-4 md:gap-6 py-2 md:py-4">
          <div className="bg-white border-2 border-orange-200 p-3.5 md:p-5 rounded-xl md:rounded-[2rem] flex items-start gap-3 md:gap-4">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#FFB10A] shrink-0 mt-0.5 md:mt-1" strokeWidth={3} />
            <p className="text-[10px] md:text-[11px] text-gray-900 leading-relaxed font-black uppercase tracking-tight">Configura o acesso ao teu desafio. Cria um nome para a sala e uma senha de segurança.</p>
          </div>
          <div className="flex flex-col gap-3 md:gap-5">
            <input type="text" placeholder="NOME DA SALA" value={roomName} onChange={(e) => setRoomName(e.target.value)} className="w-full bg-white border-2 border-gray-300 rounded-xl md:rounded-[2rem] py-3.5 md:py-5 px-4 md:px-6 text-center text-sm md:text-lg font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all uppercase" />
            <input type="password" placeholder="SENHA" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} className="w-full bg-white border-2 border-gray-300 rounded-xl md:rounded-[2rem] py-3.5 md:py-5 px-4 md:px-5 text-center text-lg md:text-2xl font-mono font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all" />
            <input type="password" placeholder="CONFIRMAR SENHA" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-white border-2 border-gray-300 rounded-xl md:rounded-[2rem] py-3.5 md:py-5 px-4 md:px-5 text-center text-lg md:text-2xl font-mono font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all" />
          </div>
        </div>
      );
    }

    if (betAction === 'join') {
      if (joiningBet) {
        if (activeTab === '1 vs 1') {
          const options = FOOTBALL_MARKETS[joiningBet.marketType || 'Resultado Final'] || [];
          return (
            <div className="flex flex-col gap-4 md:gap-6 py-2">
              <div className="bg-white border-2 border-orange-500 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-start gap-2.5 md:gap-3">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#FFB10A] shrink-0" strokeWidth={3} />
                <p className="text-[9px] md:text-[10px] text-gray-900 font-black uppercase">O adversário escolheu {joiningBet.market}. Escolhe outra opção!</p>
              </div>
              <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                {options.map(({ id, label }) => {
                  const disp = label(match);
                  const isOccVal = disp === joiningBet.market;
                  return <MarketOption key={id} id={id} label={disp} isSelected={selectedMarket === disp} onClick={() => setSelectedMarket(disp)} disabled={isOccVal} />;
                })}
              </div>
            </div>
          );
        }
        return (
          <div className="flex flex-col gap-4 md:gap-6 py-2 md:py-4">
             <div className="bg-transparent p-3.5 md:p-5 rounded-2xl md:rounded-3xl border-2 border-gray-200">
              <select value={selectedUserView} onChange={(e) => setSelectedUserView(e.target.value)} className="w-full bg-white border-2 border-white rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 text-[10px] md:text-xs font-black text-[#091747] appearance-none uppercase">
                <option value="me">Teus Prognósticos</option>
                {inscribedUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              {PRIVATE_MARKETS.map((m, i) => {
                if (joiningBet.selectedMarkets && joiningBet.selectedMarkets[i] === null) return null;
                const selectedUser = inscribedUsers.find(u => u.id === selectedUserView);
                const currentAnswer = selectedUserView === 'me' 
                  ? selectedMarketsList[i] 
                  : (selectedUser ? selectedUser.picks[i] : null);

                return (
                  <div key={i} className="bg-white border-2 border-gray-200 rounded-xl md:rounded-[2rem] p-4 md:p-5">
                    <p className="text-[9px] md:text-[10px] font-black text-[#091747] uppercase mb-2 md:mb-4">{m.name}</p>
                    <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                      {m.options(match).map(o => {
                        const isSelected = currentAnswer === o.id;
                        return (
                          <button 
                            key={o.id} 
                            disabled={selectedUserView !== 'me'}
                            onClick={() => { 
                              if (selectedUserView === 'me') {
                                const n = [...selectedMarketsList]; 
                                n[i] = o.id; 
                                setSelectedMarketsList(n); 
                              }
                            }} 
                            className={cn(
                              "py-2 px-1 text-[8px] md:text-[9px] font-black border-2 rounded-lg md:rounded-xl transition-all uppercase", 
                              isSelected 
                                ? "bg-[#FFB10A] border-[#FFB10A] text-white" 
                                : "bg-white border-gray-300 text-gray-700 font-bold",
                              selectedUserView !== 'me' ? "opacity-90" : ""
                            )}
                          >
                            {o.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-4 md:gap-6 py-2 md:py-4">
          <input 
            type="text" 
            placeholder="NOME DA SALA" 
            value={roomNameInput} 
            onChange={(e) => {
              setError('');
              setRoomNameInput(e.target.value);
            }} 
            className="w-full bg-white border-2 border-gray-300 rounded-xl md:rounded-[2rem] py-3.5 md:py-5 px-4 md:px-6 text-center text-sm md:text-lg font-black text-[#091747] outline-none placeholder:text-gray-400 uppercase" 
          />
          <input 
            type="text" 
            placeholder="SENHA" 
            value={roomCodeInput} 
            onChange={(e) => {
              setError('');
              setRoomCodeInput(e.target.value);
            }} 
            className="w-full bg-white border-2 border-gray-300 rounded-xl md:rounded-[2rem] py-3.5 md:py-6 px-3 md:px-4 text-center text-lg md:text-2xl font-mono font-black text-[#091747] outline-none placeholder:text-gray-400" 
          />
          {error && (
            <div className="text-red-600 text-[11px] font-black uppercase italic flex items-center justify-center gap-2 mt-1 bg-red-50 border-2 border-red-500 rounded-2xl p-4">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 animate-pulse" />
              <span>{error}</span>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'Nacional') {
      return (
        <div className="flex flex-col gap-3 md:gap-6 py-2">
          {PRIVATE_MARKETS.map((m, i) => (
            <div key={i} className="bg-white border-2 border-gray-200 rounded-xl md:rounded-2xl p-3 md:p-4">
               <p className="text-[9px] font-black text-[#091747] uppercase mb-2 md:mb-3">{i+1}. {m.name}</p>
               <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                 {m.options(match).map(o => <button key={o.id} onClick={() => { const n = [...selectedMarketsList]; n[i] = o.id; setSelectedMarketsList(n); }} className={cn("py-2 md:py-2.5 text-[7px] font-black rounded-md md:rounded-lg border-2", selectedMarketsList[i] === o.id ? "bg-[#FFB10A] border-[#FFB10A] text-white" : "bg-transparent border-gray-200 text-gray-500")}>{o.label}</button>)}
               </div>
            </div>
          ))}
          <div className="flex items-center justify-between bg-orange-50/50 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-orange-100">
            <span className="text-[9px] md:text-[10px] font-black text-[#091747] uppercase italic">Confirmação Inteligente (+100k)</span>
            <button onClick={() => setAutoConfirmNacional(!autoConfirmNacional)} className={cn("w-10 md:w-12 h-5 md:h-6 rounded-full transition-all relative flex items-center px-1", autoConfirmNacional ? "bg-[#FFB10A]" : "bg-gray-300")}>
              <motion.div animate={{ x: autoConfirmNacional ? 20 : 0 }} className="w-3.5 h-3.5 md:w-4 md:h-4 bg-white rounded-full" />
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === 'Privado' && createStep === 'selection') {
      return (
        <div className="flex flex-col gap-3 md:gap-6 py-1 md:py-2">
           <div className="grid grid-cols-1 gap-1.5 md:gap-2">
            {PRIVATE_MARKETS.map((m, i) => (
              <button key={i} onClick={() => { const n = [...selectedMarketsList]; n[i] = n[i] ? '' : 'PENDING'; setSelectedMarketsList(n); }} className={cn("flex items-center gap-2.5 md:gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl border-2 transition-all", selectedMarketsList[i] ? "bg-white border-[#FFB10A]" : "bg-transparent border-gray-200 opacity-70")}>
                <div className={cn("w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center", selectedMarketsList[i] ? "bg-[#FFB10A] border-[#FFB10A]" : "bg-white")}>{selectedMarketsList[i] && <Check className="w-2 md:w-2.5 h-2 md:h-2.5 text-white stroke-[4px]" />}</div>
                <span className="text-[9px] md:text-[10px] font-black uppercase">{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4 md:gap-6 py-1 md:py-2">
        <div className="bg-orange-50/50 rounded-2xl md:rounded-[2rem] p-4 md:p-6 border-2 border-orange-100 flex flex-col gap-4 md:gap-6">
          {activeTab === 'Privado' && (
            <div className="flex flex-col gap-3 md:gap-4">
               {selectedMarketsList.map((res, i) => res && (
                 <div key={i} className="bg-white border-2 border-gray-200 rounded-2xl md:rounded-3xl p-4 md:p-5">
                    <p className="text-[9px] md:text-[10px] font-black text-[#091747] uppercase mb-2 md:mb-4">{PRIVATE_MARKETS[i].name}</p>
                    <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                      {PRIVATE_MARKETS[i].options(match).map(o => <button key={o.id} onClick={() => { const n = [...selectedMarketsList]; n[i] = o.id; setSelectedMarketsList(n); }} className={cn("py-2.5 md:py-3 text-[8px] md:text-[9px] font-black border-2 rounded-xl md:rounded-2xl transition-all", res === o.id ? "bg-[#FFB10A] border-[#FFB10A] text-white" : "bg-white border-gray-200 text-gray-900")}>{o.label}</button>)}
                    </div>
                 </div>
               ))}
            </div>
          )}
          {activeTab === '1 vs 1' && (
            <>
              <select value={marketType} onChange={(e) => { setMarketType(e.target.value); setSelectedMarket(''); }} className="w-full bg-white border-2 border-white rounded-xl py-2.5 md:py-3.5 px-4 md:px-5 text-[11px] md:text-xs font-black text-[#091747] uppercase italic appearance-none">
                {Object.keys(FOOTBALL_MARKETS).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                {(FOOTBALL_MARKETS[marketType] || []).map(({ id, label }) => {
                  const disp = label(match);
                  return <MarketOption key={id} id={id} label={disp} isSelected={selectedMarket === disp} onClick={() => setSelectedMarket(disp)} />;
                })}
              </div>
              <div className="relative">
                <input type="number" value={betValue} onChange={(e) => setBetValue(e.target.value)} className="w-full bg-white border-2 border-white rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 text-xl md:text-2xl font-black text-[#091747] outline-none" />
                <span className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[#FFB10A] font-black italic text-sm md:text-base">Kz</span>
              </div>
            </>
          )}
        </div>
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 border-2 border-gray-200">
           <p className="text-[9px] md:text-[10px] font-black text-gray-600 mb-0.5 text-center uppercase italic">Lotação: <span className="text-[#091747] text-base md:text-lg ml-1 md:ml-2">{maxParticipants} Atletas</span></p>
        </div>
      </div>
    );
  };

  const steps = activeTab === 'Privado' ? ['password', 'selection', 'details'] : (activeTab === '1 vs 1' ? ['password', 'details'] : ['details']);
  const currentStepIndex = steps.indexOf(createStep);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }} className="relative w-full max-w-lg bg-white rounded-t-[2rem] md:rounded-[2rem] p-4 md:p-5 flex flex-col h-[85vh] md:h-[75vh] md:max-h-[600px] overflow-hidden border border-gray-200 shadow-xl">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-400 rounded-full md:hidden" />
          <div className="flex items-center justify-between mb-4 mt-1 shrink-0">
            <div className="flex items-center gap-2">
              {((betAction && !isSuccess) || showDeleteConfirm) && !showClassification && (
                <button onClick={() => {
                  if (showDeleteConfirm) setShowDeleteConfirm(null);
                  else if (betAction === 'join' && joiningBet) setJoiningBet(null);
                  else if (betAction === 'bet_details') { setBetAction('my_bets'); setSelectedBetId(null); }
                  else if (betAction === 'create' && createStep !== 'password' && activeTab !== 'Nacional') {
                    if (activeTab === 'Privado' && createStep === 'selection') setCreateStep('password');
                    else setCreateStep('details');
                  } else {
                    if (activeTab === 'Nacional') handleClose();
                    else setBetAction(null);
                  }
                }} className="w-8 h-8 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center"><ArrowLeft className="w-4 h-4 stroke-[3px]" /></button>
              )}
              <h2 className="text-lg font-black text-[#091747] uppercase italic">{showDeleteConfirm ? 'Eliminar' : isSuccess ? 'Confirmado' : betAction === 'join' ? 'Entrar' : betAction === 'my_bets' ? 'Minhas Apostas' : activeTab}</h2>
            </div>
            <button onClick={handleClose} className="w-8 h-8 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center"><X className="w-4 h-4" /></button>
          </div>
          {betAction === 'create' && !isSuccess && steps.length > 1 && (
            <div className="flex gap-2 mb-6 px-1">
              {steps.map((s, idx) => <div key={s} className={cn("h-1.5 rounded-full transition-all duration-500", idx <= currentStepIndex ? "bg-[#FFB10A] flex-[2]" : "bg-gray-300 flex-1")} />)}
            </div>
          )}
          <div ref={scrollRef} className="overflow-y-auto flex-1 -mr-2 pr-2 custom-scrollbar">
             {!isSuccess && !showClassification && !showDeleteConfirm && <BettingModalHeader match={match} />}
             <AnimatePresence mode="wait">
                <motion.div key={`${betAction}-${createStep}-${isSuccess}-${showDeleteConfirm}-${showClassification}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  {renderContent()}
                </motion.div>
             </AnimatePresence>
          </div>
          {betAction && (betAction === 'create' || betAction === 'join') && !isSuccess && !showClassification && !showDeleteConfirm && (
            <div className="mt-6 flex flex-col gap-4 shrink-0">
              {error && !(betAction === 'join' && !joiningBet) && <div className="bg-white text-red-600 p-4 rounded-2xl border-2 border-red-500 text-[11px] font-black uppercase italic flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}
              {betAction === 'create' && createStep !== 'details' && activeTab !== 'Nacional' ? (
                <button onClick={() => {
                  setError('');
                  if (createStep === 'password') {
                    if (!createPassword || !confirmPassword) return setError('Preenche os campos!');
                    if (createPassword !== confirmPassword) return setError('Senhas diferentes!');
                    if (activeTab === 'Privado') setCreateStep('selection');
                    else setCreateStep('details');
                  } else if (createStep === 'selection') {
                    if (selectedMarketsList.filter(s => !!s).length < 1) return setError('Seleciona 1 mercado!');
                    setCreateStep('details');
                  }
                }} className="w-full bg-[#FFB10A] text-white font-black py-3.5 rounded-2xl uppercase tracking-widest text-xs">Próximo Passo</button>
              ) : (
                <button onClick={handleBet} className={cn("w-full text-white font-black py-3.5 rounded-2xl uppercase tracking-widest text-xs", getActionClass())}>{getActionText()}</button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BettingModal;
