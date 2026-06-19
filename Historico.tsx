import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Clock, CircleDot as Football, Shield, Users, Eye, Trash2, X, AlertTriangle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { storageService } from '../services/storageService';
import { MATCH_DATA } from '../constants';
import { Bet } from '../types';
import { cn } from '../lib/utils';
import { PageHeader } from '../components/UIComponents';

interface BetCardProps {
  bet: Bet;
  onView: (bet: Bet) => void;
  onDelete: (bet: Bet) => void;
}

const BetCard: React.FC<BetCardProps> = ({ bet, onView, onDelete }) => {
  const match = MATCH_DATA.find(m => m.id === bet.matchId);
  if (!match) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-transparent border-2 border-gray-200 rounded-2xl hover:border-[#FFB10A] transition-all group relative overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          <img src={match.teamA.logo} alt={match.teamA.name} className="w-10 h-10 object-contain bg-white rounded-full p-1 border border-gray-100 z-10" />
          <img src={match.teamB.logo} alt={match.teamB.name} className="w-10 h-10 object-contain bg-white rounded-full p-1 border border-gray-100" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
              bet.category === '1 vs 1' ? "bg-orange-100 text-orange-600 border border-orange-200" :
              bet.category === 'Privado' ? "bg-blue-100 text-blue-600 border border-blue-200" :
              "bg-green-100 text-green-600 border border-green-200"
            )}>
              {bet.category}
            </span>
            <span className="text-[10px] font-bold text-gray-600 capitalize">{match.league}</span>
          </div>
          <p className="text-sm font-black text-gray-800 leading-none mb-1">
            {match.teamA.name} <span className="text-gray-500 font-medium">vs</span> {match.teamB.name}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600">
            <span className="text-[#FFB10A]">{bet.market}</span>
            <span>•</span>
            <span>{new Date(bet.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <button 
            onClick={() => onView(bet)}
            className="p-1.5 rounded-lg bg-[#FFB10A] text-white hover:bg-[#e69f09] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => onDelete(bet)}
            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-right">
          <p className="text-sm font-black text-gray-800">{bet.amount.toLocaleString()} Kz</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              bet.status === 'Open' ? "bg-blue-400" :
              bet.status === 'Won' ? "bg-green-500" :
              bet.status === 'Lost' ? "bg-red-500" :
              "bg-gray-500"
            )} />
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest",
              bet.status === 'Open' ? "text-blue-400" :
              bet.status === 'Won' ? "text-green-500" :
              bet.status === 'Lost' ? "text-red-500" :
              "text-gray-500"
            )}>{bet.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Historico() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [viewBet, setViewBet] = useState<Bet | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Bet | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const favoriteId = 'page-historico';

  const loadBets = () => {
    setBets(storageService.getBets());
  };

  useEffect(() => {
    loadBets();
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsFavorited(favorites.some(f => f.id === favoriteId));
    };
    updateFavStatus();
    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => window.removeEventListener('favoritesUpdated', updateFavStatus);
  }, []);

  const toggleFavorite = () => {
    if (isFavorited) {
      storageService.deleteFavorite(favoriteId);
      setIsFavorited(false);
    } else {
      storageService.saveFavorite({
        id: favoriteId,
        title: 'Histórico',
        sub: 'Minhas apostas',
        type: 'practice',
        path: '/historico'
      });
      setIsFavorited(true);
    }
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      storageService.deleteBet(deleteConfirm.id, true);
      loadBets();
      setDeleteConfirm(null);
    }
  };

  const wins = bets.filter(b => b.status === 'Won');
  const losses = bets.filter(b => b.status === 'Lost');
  const totalWonAmount = wins.reduce((sum, b) => sum + (b.category === 'Nacional' ? 5000 : (b.amount * 2)), 0);
  const totalLostAmount = losses.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="flex flex-col flex-1">
      <PageHeader 
        title="Histórico" 
        to="/" 
        rightAction={
          <button 
            onClick={toggleFavorite}
            className={cn("transition-colors duration-300 cursor-pointer", isFavorited ? "text-[#FFB10A]" : "text-black hover:text-[#FFB10A]")}
            title="Favoritar histórico"
          >
            <Heart className={cn("w-6 h-6 md:w-7 md:h-7", isFavorited && "fill-current")} />
          </button>
        }
      />

      <div className="max-w-4xl mx-auto w-full px-4 pt-16 pb-12">
        <div className="text-center mb-16">
          <img 
            src="https://i.postimg.cc/BvGMF7py/Historico.gif" 
            alt="Historico" 
            className="mx-auto w-[278px] md:w-[371px] h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
          <h1 className="mt-10 text-2xl md:text-3xl font-bold text-[#091747] tracking-tight">O Teu Histórico</h1>
          <p className="mt-4 text-gray-600 font-medium">Consulta os teus torneios, ganhos, perdas e transações.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="bg-[#FFB10A] p-4 text-white font-bold flex items-center gap-3">
              <Trophy className="w-5 h-5" />
              <span>Lista de Apostas</span>
            </div>
            
            {bets.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="font-bold">Ainda não há apostas.</p>
                <p className="text-xs">Quando participares numa aposta, ela aparecerá aqui.</p>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {bets.map(bet => (
                  <BetCard 
                    key={bet.id} 
                    bet={bet} 
                    onView={(b) => setViewBet(b)}
                    onDelete={(b) => setDeleteConfirm(b)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden min-h-[160px]">
              <div className="bg-[#FFB10A] p-4 text-white font-bold flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Ganhos</span>
              </div>
              <div className="p-8 text-center">
                {wins.length > 0 ? (
                  <div>
                    <p className="text-3xl font-black text-green-500">{totalWonAmount.toLocaleString()} Kz</p>
                    <p className="text-[10px] font-bold text-gray-600 uppercase mt-1">{wins.length} Apostas ganhas</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs italic">Sem ganhos registados.</p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden min-h-[160px]">
              <div className="bg-[#FFB10A] p-4 text-white font-bold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Perdas</span>
              </div>
              <div className="p-8 text-center">
                {losses.length > 0 ? (
                  <div>
                    <p className="text-3xl font-black text-red-500">{totalLostAmount.toLocaleString()} Kz</p>
                    <p className="text-[10px] font-bold text-gray-600 uppercase mt-1">{losses.length} Apostas perdidas</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-xs italic">Sem perdas registadas.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {/* VIEW MODAL */}
        {viewBet && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewBet(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-[320px] bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="bg-[#FFB10A] py-5 px-6 text-white text-center">
                <button 
                  onClick={() => setViewBet(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="w-12 h-12 bg-white rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-[#FFB10A]" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">Detalhes de Aposta</h3>
                <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-0.5">ID: {viewBet.id}</p>
              </div>

              <div className="p-5 space-y-4 font-sans">
                {(() => {
                  const match = MATCH_DATA.find(m => m.id === viewBet.matchId);
                  if (!match) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between gap-4 p-3 bg-transparent border-2 border-gray-200 rounded-2xl">
                        <div className="flex flex-col items-center flex-1">
                          <img src={match.teamA.logo} alt={match.teamA.name} className="w-10 h-10 object-contain mb-1.5" />
                          <span className="font-bold text-gray-800 text-center text-[9px] uppercase leading-tight line-clamp-1">{match.teamA.name}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-gray-400 font-black text-sm italic tracking-widest">VS</span>
                          <span className="text-[9px] font-bold text-gray-500 mt-0.5">{match.time}</span>
                        </div>
                        <div className="flex flex-col items-center flex-1">
                          <img src={match.teamB.logo} alt={match.teamB.name} className="w-10 h-10 object-contain mb-1.5" />
                          <span className="font-bold text-gray-800 text-center text-[9px] uppercase leading-tight line-clamp-1">{match.teamB.name}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-tight">Sala</span>
                          <span className="text-gray-800 text-xs font-black">{viewBet.roomName || 'Sala Sem Nome'}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-tight">Mercado</span>
                          <span className="text-gray-800 text-xs font-black">{viewBet.market}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-tight">Categoria</span>
                          <span className="text-gray-800 text-xs font-black">{viewBet.category}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-tight">Montante</span>
                          <span className="text-gray-800 text-xs font-black">{viewBet.amount.toLocaleString()} Kz</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-tight">Status</span>
                          <div className="flex items-center gap-1.5">
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              viewBet.status === 'Open' ? "bg-blue-400" :
                              viewBet.status === 'Won' ? "bg-green-500" :
                              viewBet.status === 'Lost' ? "bg-red-500" :
                              "bg-gray-500"
                            )} />
                            <span className={cn(
                              "text-xs font-black uppercase tracking-widest",
                              viewBet.status === 'Open' ? "text-blue-400" :
                              viewBet.status === 'Won' ? "text-green-500" :
                              viewBet.status === 'Lost' ? "text-red-500" :
                              "text-gray-600"
                            )}>{viewBet.status}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-tight">Data de Criação</span>
                          <span className="text-gray-800 text-xs font-black">{new Date(viewBet.createdAt).toLocaleDateString()} {new Date(viewBet.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </>
                  );
                })()}

                <button 
                  onClick={() => setViewBet(null)}
                  className="w-full py-3.5 bg-[#FFB10A] text-white text-xs font-black rounded-2xl shadow-lg active:scale-[0.98] transition-all uppercase tracking-widest"
                >
                  FECHAR
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* DELETE CONFIRM MODAL */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden p-8"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-800 text-center mb-2">Eliminar Aposta?</h3>
              <p className="text-sm text-gray-600 text-center mb-8 leading-relaxed">
                Tens a certeza que queres eliminar esta aposta? Esta ação não pode ser revertida e o montante apostado poderá não ser devolvido.
              </p>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDelete}
                  className="w-full py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all uppercase tracking-wider"
                >
                  SIM, ELIMINAR
                </button>
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="w-full py-4 bg-transparent border-2 border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-wider"
                >
                  CANCELAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
