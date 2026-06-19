import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, CircleDot as Football, Calendar, Trophy, Copy, CheckCircle2, AlertCircle, X, Loader2, Plus, Users, Shield, Check, ChevronDown, Trash2, List, Share2, Mail, MessageSquare, Heart, Lock, Send, Smile, Ghost, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

import { MATCH_DATA, COMPETITION_LOGOS, getCompetitionLogo, GIRABOLA_MATCHES, BUNDESLIGA_MATCHES, LALIGA_MATCHES, LIGUE1_MATCHES, EREDIVISIE_MATCHES, PREMIERLEAGUE_MATCHES, SERIEA_MATCHES, LIGANOS_MATCHES, TACADEANGOLA_MATCHES, TACADAALEMANHA_MATCHES, LEAGUE_CLASSIFICATIONS, NBA_MATCHES, UNITEL_BASKET_MATCHES, ACB_MATCHES, VTB_MATCHES, GREEK_BASKET_MATCHES, ITALY_BASKET_MATCHES, JEEP_ELITE_MATCHES, BBL_MATCHES, F1_MATCHES, COPA_DO_MUNDO_MATCHES } from '../constants';
import { Match, Wallet as WalletType, UserProfile, Bet, FavoriteItem } from '../types';
import { storageService } from '../services/storageService';
import ClassificationTable from '../components/bets/ClassificationTable';
import MatchCard from '../components/bets/MatchCard';
import { FOOTBALL_MARKETS, PRIVATE_MARKETS, BASKETBALL_PRIVATE_MARKETS, F1_PRIVATE_MARKETS } from '../constants/markets';

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match | null;
  activeTab: string;
  category?: string;
}

import { useAppContext } from '../context/AppContext';
import { useWallet } from '../hooks/useSupabase';
import { supabase } from '../lib/supabase';

const BettingModal = ({ isOpen, onClose, match, activeTab, category }: BettingModalProps) => {
  const { auth } = useAppContext();
  const { balance, updateWallet } = useWallet();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  const [betAction, setBetAction] = React.useState<'create' | 'join' | 'my_bets' | 'bet_details' | 'challenge_results' | null>(null);
  const [selectedBetId, setSelectedBetId] = React.useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState<string | null>(null);
  const [createStep, setCreateStep] = React.useState<'password' | 'selection' | 'details'>('selection');
  const [createPassword, setCreatePassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [selectedMarketsList, setSelectedMarketsList] = React.useState<(string | null)[]>(Array(10).fill(''));
  const [createdCode, setCreatedCode] = React.useState('');
  const [betValue, setBetValue] = React.useState('0');
  const [marketType, setMarketType] = React.useState('Resultado Final');
  const [selectedMarket, setSelectedMarket] = React.useState('');
  const [roomName, setRoomName] = React.useState('');
  const [maxParticipants, setMaxParticipants] = React.useState('2');
  const [roomCodeInput, setRoomCodeInput] = React.useState('');
  const [roomNameInput, setRoomNameInput] = React.useState('');
  const [joiningBet, setJoiningBet] = React.useState<Bet | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [autoConfirmNacional, setAutoConfirmNacional] = React.useState(false);
  const [showClassification, setShowClassification] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [error, setError] = React.useState('');
  const [selectedUserView, setSelectedUserView] = React.useState<string>('me');
  const [showTauntSelector, setShowTauntSelector] = React.useState<string | null>(null); // userId to taunt
  const [simOpponent, setSimOpponent] = React.useState<any | null>(null);
  const [simTicks, setSimTicks] = React.useState(12);
  const [copied, setCopied] = React.useState(false);
  const [headerLoaded, setHeaderLoaded] = React.useState(false);
  const userProfile = storageService.getUserProfile();

  // Compatibilidade Mínima Opcional para Mocks (Pode ignorar no uso real 1vs1)
  const getSelectedOdds = (): number => {
    return 1; // As odds deixam de ser numéricas ou influenciar pagamentos na DUET
  };

  React.useEffect(() => {
    if (category === 'f1') {
      const img = new Image();
      img.src = "https://i.postimg.cc/ZKqzCtsV/F1-Classificacao.png";
    }
  }, [category]);

  const inscribedUsers = React.useMemo(() => [
    { id: 'user_1', name: 'João Silva', picks: ['A', 'X', 'B', 'A', 'X', 'B', 'A', 'X', 'B', 'A'], points: 8, rank: 1, photo: 'https://i.pravatar.cc/150?u=1' },
    { id: 'user_2', name: 'Maria Santos', picks: ['B', 'B', 'A', 'X', 'A', 'B', 'X', 'A', 'B', 'X'], points: 5, rank: 2, photo: 'https://i.pravatar.cc/150?u=2' },
    { id: 'user_3', name: 'Carlos Pereira', picks: ['X', 'A', 'X', 'B', 'B', 'A', 'A', 'X', 'B', 'B'], points: 3, rank: 3, photo: 'https://i.pravatar.cc/150?u=3' },
    { id: 'me', name: userProfile.name, picks: ['A', 'A', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A'], points: 2, rank: 4, photo: userProfile.photo }
  ], [userProfile]);

  const isBasketball = category === 'basket' || (match && (match.league === 'NBA' || match.league === 'Unitel Basket' || match.league === 'Liga ACB' || match.league === 'VTB United League' || match.league === 'Basket League' || match.league === 'Serie A Basket' || match.league === 'Jeep Elite' || match.league === 'BBL Alemanha'));
  const isF1 = category === 'f1';
  const currentPrivateMarkets = isF1 ? F1_PRIVATE_MARKETS : (isBasketball ? BASKETBALL_PRIVATE_MARKETS : PRIVATE_MARKETS);

  const roomInscribedUsers = React.useMemo(() => {
    if (!joiningBet) return [];

    const allBetsInRoom = storageService.getBets().filter(b => 
      b.category === 'Privado' && 
      b.matchId === match?.id && 
      b.roomName?.toLowerCase() === joiningBet.roomName?.toLowerCase()
    );

    const creatorPicks = joiningBet.selectedMarkets || [];

    const getMockPicksForUser = (seedOffset: number) => {
      return creatorPicks.map((m, idx) => {
        if (m === null) return null;
        const marketObj = currentPrivateMarkets[idx];
        if (!marketObj) return null;
        const opts = marketObj.options(match || { id: 0 } as any);
        if (opts.length === 0) return null;
        return opts[(idx + seedOffset) % opts.length].id;
      });
    };

    const list = [
      {
        id: 'room_creator',
        name: 'Manuel Neto (Moderador)',
        picks: creatorPicks,
        points: 6,
        rank: 1,
        photo: 'https://i.pravatar.cc/150?u=15'
      },
      {
        id: 'user_room_1',
        name: 'Rita Vaz',
        picks: getMockPicksForUser(1),
        points: 7,
        rank: 2,
        photo: 'https://i.pravatar.cc/150?u=10'
      },
      {
        id: 'user_room_2',
        name: 'Cláudio Silva',
        picks: getMockPicksForUser(2),
        points: 4,
        rank: 3,
        photo: 'https://i.pravatar.cc/150?u=12'
      }
    ];

    const userBet = allBetsInRoom.find(b => b.id !== joiningBet.id);
    if (userBet && userBet.selectedMarkets) {
      list.push({
        id: 'me',
        name: `${userProfile.name} (Tu)`,
        picks: userBet.selectedMarkets,
        points: 2,
        rank: 4,
        photo: userProfile.photo
      });
    }

    return list;
  }, [joiningBet, match, userProfile, currentPrivateMarkets]);

  const STICKERS = [
    { id: 'stick_1', emoji: '🏆', label: 'CAMPEÃO', type: 'celebrate' },
    { id: 'stick_2', emoji: '🎉', label: 'FESTA', type: 'celebrate' },
    { id: 'stick_3', emoji: '🥳', label: 'FELIZ', type: 'celebrate' },
    { id: 'stick_4', emoji: '😜', label: 'GOZAR', type: 'mocking' },
    { id: 'stick_5', emoji: '🤡', label: 'PALHAÇO', type: 'mocking' },
    { id: 'stick_6', emoji: '😂', label: 'RIR', type: 'mocking' },
    { id: 'stick_7', emoji: '😢', label: 'CHORAR', type: 'sad' },
    { id: 'stick_8', emoji: '💔', label: 'TRISTE', type: 'sad' },
    { id: 'stick_9', emoji: '👋', label: 'TCHAU', type: 'sad' },
  ];

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setBetAction(null);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isSuccess && (activeTab === 'Privado' || activeTab === '1 vs 1') && betAction === 'create') {
      setSimTicks(12);
      setSimOpponent(null);
      
      const interval = setInterval(() => {
        setSimTicks((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            const avatars = [
              { name: 'Sandra Morais', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', rank: 'Prata', winRate: '64%' },
              { name: 'Fernando Gaspar', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', rank: 'Ouro', winRate: '71%' },
              { name: 'Carlos Mendes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', rank: 'Elite', winRate: '82%' },
              { name: 'Sofia Lopes', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', rank: 'Ouro', winRate: '69%' },
            ];
            const chosen = avatars[Math.floor(Math.random() * avatars.length)];
            setSimOpponent(chosen);

            const opponentBetId = `opponent_bet_${Date.now()}`;
            
            // Build random selections consistent with chosen markets
            const mockPreds = selectedMarketsList.map((m, idx) => {
              if (!m || m === 'PENDING') return null;
              const marketObj = currentPrivateMarkets[idx];
              if (!marketObj) return null;
              const opts = marketObj.options(match || { id: 0 } as any);
              return opts[Math.floor(Math.random() * opts.length)].id;
            });

            // Save opponent bet
            storageService.saveBet({
              id: opponentBetId,
              matchId: match?.id || 1,
              category: activeTab as any,
              market: activeTab === '1 vs 1' ? 'Resultado Rival' : 'Predições Rivais',
              amount: parseInt(betValue) || 1000,
              status: 'Open',
              password: createPassword,
              roomName: roomName,
              selectedMarkets: activeTab === 'Privado' ? mockPreds : undefined,
              createdAt: new Date().toISOString()
            });

            // Dispatch reactive event
            window.dispatchEvent(new CustomEvent('betsUpdated'));

            // Beautiful notifications in-app
            storageService.addNotification({
              id: `notif_opp_joined_${Date.now()}`,
              type: 'Taunt',
              title: `Adversário Conectado! ⚔️🛡️`,
              message: `${chosen.name} (${chosen.rank}) juntou-se à tua sala "${roomName || 'Sem Nome'}" usando o código ${createPassword}!`,
              emoji: '⚔️',
              challengeId: opponentBetId,
              createdAt: new Date().toISOString(),
              isRead: false
            });

            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSuccess, activeTab, createPassword, roomName, selectedMarketsList, match, betValue, betAction]);

  React.useEffect(() => {
    if (isOpen && scrollRef.current) {
      const resetScroll = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
        }
      };
      
      // Reset immediately
      resetScroll();
      
      // Also reset after a microtask to catch some rendering edge cases
      const timer = setTimeout(resetScroll, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, createStep, activeTab, betAction, isSuccess, showClassification, showDeleteConfirm, joiningBet]);

  const handleClose = React.useCallback(() => {
    setBetAction(null);
    setCreateStep('selection');
    setCreatePassword('');
    setConfirmPassword('');
    setSelectedMarketsList(Array(10).fill(''));
    setCreatedCode('');
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
    setShowTauntSelector(null);
    onClose();
  }, [activeTab, onClose]);

  const favoriteId = React.useMemo(() => match ? `match-${match.id}` : '', [match?.id]);

  React.useEffect(() => {
    if (!match) return;
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsFavorited(favorites.some((f: FavoriteItem) => f.id === favoriteId));
    };
    updateFavStatus();
    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => window.removeEventListener('favoritesUpdated', updateFavStatus);
  }, [favoriteId, match]);

  const toggleFavorite = () => {
    if (!match) return;
    if (isFavorited) {
      storageService.deleteFavorite(favoriteId);
      setIsFavorited(false);
    } else {
      // Find category from path or context if possible, otherwise use match.league
      const pathParts = window.location.pathname.split('/');
      const category = pathParts[pathParts.length - 1] || 'futebol';
      
      storageService.saveFavorite({
        id: favoriteId,
        title: `${match.teamA.name} vs ${match.teamB.name}`,
        sub: `Aposta: ${match.league}`,
        type: 'practice',
        path: `/aposta/${category}?matchId=${match.id}`
      });
      setIsFavorited(true);
    }
  };

  // Process notifications and set bet status for terminated matches
  React.useEffect(() => {
    if (isOpen && match && match.status === 'terminou') {
      const userBets = storageService.getBets().filter(b => b.matchId === match.id && b.status === 'Open');
      userBets.forEach(bet => {
        const isWinner = Math.random() > 0.5; // Simulate result
        const status = isWinner ? 'Won' : 'Lost';
        storageService.updateBetStatus(bet.id, status);
        
        // Add notification
        const notifications = storageService.getNotifications();
        const alreadyNotified = notifications.find(n => n.challengeId === bet.id && n.type === 'Performance');
        
        if (!alreadyNotified) {
          const emoji = isWinner ? '🏆' : '😢';
          const title = isWinner ? 'VITÓRIA! 🎉' : 'NÃO FOI DESTA... 📈';
          const message = isWinner 
            ? `Parabéns! Venceste no desafio ${bet.category} do jogo ${match.teamA.name} vs ${match.teamB.name}.`
            : `Ficaste na classificação do desafio ${bet.category} do jogo ${match.teamA.name} vs ${match.teamB.name}.`;
            
          storageService.addNotification({
            id: Date.now().toString() + Math.random(),
            type: 'Performance',
            title,
            message,
            emoji,
            challengeId: bet.id,
            createdAt: new Date().toISOString(),
            isRead: false
          });
        }
      });
    }
  }, [isOpen, match]);

  React.useEffect(() => {
    const selectedCount = selectedMarketsList.filter(m => !!m).length;
    const mapping: Record<number, number> = {
      1: 3,
      2: 6,
      3: 12,
      4: 20,
      5: 50,
      6: 100,
      7: 150,
      8: 250,
      9: 500,
      10: 1000
    };
    if (selectedCount > 0) {
      setMaxParticipants(String(mapping[selectedCount] || 2));
    } else {
      setMaxParticipants('2');
    }
  }, [selectedMarketsList]);

  if (!match) return null;

  const steps = activeTab === 'Privado' ? ['password', 'selection', 'details'] : (activeTab === '1 vs 1' ? ['password', 'details'] : ['details']);
  const currentStepIndex = steps.indexOf(createStep);

  const isF1Step2 = isF1 && activeTab === '1 vs 1' && createStep === 'details';

  const matchHeader = isF1Step2 ? (
    <div className="mb-6 rounded-[2rem] overflow-hidden border-2 border-[#FFB10A]/20 shadow-xl relative aspect-video bg-[#091747]">
      <img 
        src="https://i.postimg.cc/ZKqzCtsV/F1-Classificacao.png" 
        alt="F1 Classificação" 
        onLoad={() => setHeaderLoaded(true)}
        className={cn(
          "w-full h-full object-cover block transition-opacity duration-700",
          headerLoaded ? "opacity-100" : "opacity-0"
        )}
      />
      
      {!headerLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/50 to-[#091747] animate-pulse" />
        </div>
      )}

      {/* Dynamic Labels Overlay for High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#091747] via-transparent to-[#091747]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      
      {/* Top Left Badge & Date */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 flex flex-col gap-3 md:gap-4 pointer-events-none">
        <div className="inline-flex items-center px-6 py-2.5 bg-[#091747] rounded-full border border-white/20 shadow-2xl">
          <span className="text-[9px] md:text-sm font-black text-[#FFB10A] uppercase tracking-[0.2em] italic">
            {match.league.split(' ')[0]} {topic || (match.league.includes(' ') ? match.league.split(' ').slice(1).join(' ') : match.league)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-white font-black text-base md:text-2xl uppercase tracking-tighter italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ml-1">
          <Calendar className="w-5 h-5 md:w-8 md:h-8 text-[#FFB10A]" />
          {match.date}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-4 py-4 px-1 mb-2 shrink-0">
      {/* LEAGUE & BROADCAST */}
      <div className="flex flex-col items-center gap-1.5 focus-within:">
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-1 bg-[#091747]/5 border border-[#091747]/10 rounded-full"
        >
          <span className="text-[10px] md:text-xs font-black text-[#091747] uppercase tracking-widest italic text-center">
            {match.league}
          </span>
        </motion.div>
        {match.broadcast && (
          <span className="text-[9px] md:text-[10px] font-black text-gray-400 shadow-sm uppercase tracking-[0.2em] italic">
            {match.broadcast}
          </span>
        )}
      </div>

      <div className="flex items-center justify-around gap-2 mt-1">
        {/* Team A */}
        <div className="flex flex-col items-center flex-1 max-w-[130px] overflow-hidden">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white p-2.5 mb-2 shadow-md rounded-2xl border border-gray-100">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={match.teamA.logo} 
              alt={match.teamA.name} 
              className="w-full h-full object-contain drop-shadow-sm contrast-125" 
            />
          </div>
          <span className="font-black text-[#091747] text-center text-[9px] md:text-xs uppercase tracking-tight leading-tight italic whitespace-nowrap truncate w-full">
            {match.teamA.name}
          </span>
          {isBasketball && match.teamA.record && (
            <span className="text-[8px] md:text-[9px] font-black text-gray-400 mt-0.5 uppercase tracking-tighter">
              {match.teamA.record}
            </span>
          )}
        </div>
        
        {/* Divider / Time */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="px-3 py-1 bg-orange-50 rounded-full border border-orange-100 shadow-sm">
            <span className="text-xs md:text-sm text-[#FFB10A] font-black uppercase tracking-[0.2em] italic">
              VS
            </span>
          </div>
          <div className="text-[10px] md:text-xs text-[#091747] font-black bg-white px-3 py-1 rounded-lg border border-gray-100 flex items-center gap-1 shadow-sm">
            <Calendar className="w-2.5 h-2.5 text-[#FFB10A]" strokeWidth={3} />
            {match.time}
          </div>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center flex-1 max-w-[130px] overflow-hidden">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white p-2.5 mb-2 shadow-md rounded-2xl border border-gray-100">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={match.teamB.logo} 
              alt={match.teamB.name} 
              className="w-full h-full object-contain drop-shadow-sm contrast-125" 
            />
          </div>
          <span className="font-black text-[#091747] text-center text-[9px] md:text-xs uppercase tracking-tight leading-tight italic whitespace-nowrap truncate w-full">
            {match.teamB.name}
          </span>
          {isBasketball && match.teamB.record && (
            <span className="text-[8px] md:text-[9px] font-black text-gray-400 mt-0.5 uppercase tracking-tighter">
              {match.teamB.record}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const handleBet = async () => {
    const wallet = storageService.getWallet();
    const currentBalance = balance || wallet.balance; // Using real balance
    const currentBlocked = wallet.blocked_balance; // Use real blocked when integrated 
    const amount = activeTab === 'Nacional' ? (isF1 ? 250 : 1000) : parseInt(betValue);
    const commission = 50;

    if (betAction === 'join') {
      if (!roomCodeInput || !roomNameInput) {
        setError('Preencha o nome da sala e a senha!');
        return;
      }

      // Se ainda não encontramos a aposta, procuramos
      if (!joiningBet) {
        const allBets = storageService.getBets();
        const existingBet = allBets.find(b => 
          b.password === roomCodeInput && 
          b.roomName?.toLowerCase() === roomNameInput.toLowerCase() &&
          b.matchId === match.id && 
          b.category === activeTab
        );

        if (!existingBet) {
          if (isBasketball) {
            setError('Erro: Sala não encontrada ou credenciais inválidas. Tente novamente.');
            return;
          }
          // Fallback para desenvolvimento: cria uma aposta fictícia se não encontrar
          const mockBet = {
            id: `mock-${Date.now()}`,
            matchId: match.id,
            category: activeTab as any,
            market: 'Vitória A',
            amount: parseInt(betValue) || 1000,
            status: 'Open',
            password: roomCodeInput,
            roomName: roomNameInput,
            selectedMarkets: activeTab === 'Privado' ? Array(10).fill('').map((_, i) => i < 3 ? 'A' : null) : undefined,
            createdAt: new Date().toISOString()
          };
          
          setJoiningBet(mockBet);
          setError('');
          setSelectedMarket('');
          
          if (activeTab === 'Privado' && mockBet.selectedMarkets) {
            const allBetsInRoom = storageService.getBets().filter(b => 
              b.category === 'Privado' && 
              b.matchId === match.id && 
              b.roomName?.toLowerCase() === roomNameInput.toLowerCase()
            );
            const userBet = allBetsInRoom.find(b => b.id !== mockBet.id);
            if (userBet && userBet.selectedMarkets) {
              setSelectedMarketsList(userBet.selectedMarkets);
            } else {
              // Consistent with creation: '' for not-yet-filled, null for not-in-bet
              const initialList = mockBet.selectedMarkets.map(m => m !== null ? '' : null);
              setSelectedMarketsList(initialList);
            }
          }
          return;
        }

        setError('');
        setJoiningBet(existingBet);
        setSelectedMarket('');
        
        if (activeTab === 'Privado' && existingBet.selectedMarkets) {
          const allBetsInRoom = storageService.getBets().filter(b => 
            b.category === 'Privado' && 
            b.matchId === match.id && 
            b.roomName?.toLowerCase() === roomNameInput.toLowerCase()
          );
          const userBet = allBetsInRoom.find(b => b.id !== existingBet.id);
          if (userBet && userBet.selectedMarkets) {
            setSelectedMarketsList(userBet.selectedMarkets);
          } else {
            const initialList = existingBet.selectedMarkets.map(m => m !== null ? '' : null);
            setSelectedMarketsList(initialList);
          }
        }
        return;
      }

      if (activeTab === '1 vs 1') {
        if (!selectedMarket) {
          setError('Escolhe o teu prognóstico!');
          return;
        }
        if (selectedMarket === joiningBet.market) {
          setError('Deves escolher um resultado diferente do teu amigo!');
          return;
        }
      }

      if (activeTab === 'Privado') {
        // Validation: all required markets (non-null) must have a value (non-empty string)
        const allMarketsFilled = selectedMarketsList.every((res, idx) => {
          if (joiningBet.selectedMarkets && joiningBet.selectedMarkets[idx] === null) return true;
          return !!res && res !== 'PENDING';
        });

        if (!allMarketsFilled) {
          setError('Por favor, preenche todos os prognósticos!');
          return;
        }

        // --- UNIQUE COMBINATION VALIDATION ---
        const isDuplicate = roomInscribedUsers.some(user => {
          if (user.id === 'me') return false; // ignore checking self
          return selectedMarketsList.every((val, idx) => val === user.picks[idx]);
        });

        if (isDuplicate) {
          setError('Esta combinação de palpites já está registada por outro participante. Modifica pelo menos um mercado para continuar.');
          return;
        }
      }

      // Entrar na aposta encontrada
      const amountToJoin = joiningBet.amount;
      const totalCostJoin = amountToJoin + commission;

      if (currentBalance < totalCostJoin) {
        setError('Saldo insuficiente para aposta e comissão!');
        return;
      }

      await updateWallet(currentBalance - totalCostJoin, currentBlocked + amountToJoin);

      const joinOddsSelected = getSelectedOdds();
      
      const newBetData = {
        id: Date.now().toString(),
        match_id: match.id.toString(),
        user_id: auth.user?.id === 'me' ? null : auth.user?.id,
        category: activeTab,
        market: activeTab === '1 vs 1' ? selectedMarket : joiningBet.market,
        amount: amountToJoin,
        status: 'Open',
        password: roomCodeInput,
        room_name: roomNameInput,
        selected_markets: activeTab === 'Privado' ? selectedMarketsList : null,
        odds: joinOddsSelected,
        created_at: new Date().toISOString()
      };

      if (!auth.isLoggedIn || auth.user?.id === 'me') {
        // Fallback para storageService se for modo de demonstração local
        storageService.saveBet({
          ...newBetData,
          matchId: match.id,
          userId: 'me',
          roomName: newBetData.room_name,
          selectedMarkets: newBetData.selected_markets
        } as any);
      } else {
        // Inserção real no Supabase
        const { error } = await supabase.from('bets').insert([newBetData]);
        if (error) {
          setError('Erro de comunicação com o servidor.');
          // Reverter carteira em caso de falha grave
          await updateWallet(currentBalance, currentBlocked);
          return;
        }
      }

      setIsSuccess(true);
      return;
    }

    if (activeTab === 'Privado' && betAction === 'create') {
      // For Private creation: only those in the bet should be non-null. '' means not in bet.
      const selectedCount = selectedMarketsList.filter(s => s && s !== '').length;
      if (selectedCount === 0) {
        setError('Seleciona pelo menos 1 mercado!');
        return;
      }
      
      const hasPending = selectedMarketsList.some(s => s === 'PENDING');
      if (hasPending) {
        setError('Por favor, escolhe o resultado para todos os mercados selecionados!');
        return;
      }
    }

    if (activeTab === 'Nacional') {
      const selectedCount = selectedMarketsList.filter(s => !!s && s !== 'PENDING').length;
      if (selectedCount < 10) {
        setError('Por favor, preenche todos os 10 prognósticos da Rodada!');
        return;
      }
    }

    const totalCostCreate = amount + commission;

    if (isNaN(amount) || amount <= 0) {
      setError('Insira um valor válido!');
      return;
    }

    if (currentBalance < totalCostCreate) {
      setError('Saldo insuficiente para aposta e comissão!');
      return;
    }

    // Processar Transação
    await updateWallet(currentBalance - totalCostCreate, currentBlocked + amount);

    const finalMarketsToSave = (activeTab === 'Privado' || activeTab === 'Nacional')
      ? selectedMarketsList.map(s => s === '' ? null : s)
      : undefined;

    const createOddsSelected = getSelectedOdds();
    
    const newBetData = {
      id: Date.now().toString(),
      match_id: match.id.toString(),
      user_id: auth.user?.id === 'me' ? null : auth.user?.id,
      category: activeTab,
      market: activeTab === 'Nacional' ? 'Predição 10 Mercados' : (category === 'f1' && !selectedMarket ? 'Classificação' : selectedMarket),
      amount: amount,
      status: 'Open',
      password: (activeTab === '1 vs 1' || activeTab === 'Privado') ? createPassword : null,
      room_name: (activeTab === '1 vs 1' || activeTab === 'Privado') ? roomName : null,
      max_participants: activeTab === 'Privado' ? Number(maxParticipants) : 2,
      selected_markets: finalMarketsToSave || null,
      odds: createOddsSelected,
      created_at: new Date().toISOString()
    };

    if (!auth.isLoggedIn || auth.user?.id === 'me') {
      storageService.saveBet({
        ...newBetData,
        matchId: match.id,
        userId: 'me',
        roomName: newBetData.room_name || undefined,
        password: newBetData.password || undefined,
        marketType: activeTab === '1 vs 1' ? marketType : undefined,
        autoConfirmThreshold: (activeTab === 'Nacional' && autoConfirmNacional) ? 100000 : undefined,
        selectedMarkets: newBetData.selected_markets || undefined
      } as any);
    } else {
      const { error } = await supabase.from('bets').insert([newBetData]);
      if (error) {
        setError('Erro de comunicação com o servidor ao criar sala.');
        // Reverter carteira
        await updateWallet(currentBalance, currentBlocked);
        return;
      }
    }

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
      return joiningBet ? "bg-green-600" : "bg-blue-600";
    }
    return "bg-[#FFB10A]";
  };

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
      const shareText = `Vem jogar no Duet Desportivo!\nSala: ${roomName || '---'}\nSenha: ${createPassword || '---'}\nJogo: ${match.teamA.name} vs ${match.teamB.name}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      const mailUrl = `mailto:?subject=Convite para Desafio Duet&body=${encodeURIComponent(shareText)}`;

      const handleCopyCode = () => {
        if (!createPassword) return;
        navigator.clipboard.writeText(createPassword);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return (
        <div className="flex flex-col items-center py-6 px-1">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="mb-4 flex justify-center items-center"
          >
            {activeTab === '1 vs 1' || activeTab === 'Privado' ? (
              <img 
                src="https://images.vexels.com/media/users/3/157890/isolated/preview/4f2c005416b7f48b3d6d09c5c6763d87-icone-de-circulo-com-marca-de-verificacao.png" 
                alt="Sucesso" 
                className="w-32 h-32 object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="relative">
                <div className="w-24 h-24 rounded-[2.5rem] bg-green-50 flex items-center justify-center border-4 border-white relative z-10 shadow-lg">
                  <CheckCircle2 className="w-12 h-12 text-green-500 stroke-[3px]" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-green-400 rounded-full blur-3xl -z-10"
                />
              </div>
            )}
          </motion.div>
          
          <h3 className="text-2xl font-black text-[#091747] text-center px-4 uppercase tracking-tighter italic leading-none">
            {betAction === 'join' ? 'Desafio Aceite!' : (activeTab === 'Privado' || activeTab === '1 vs 1' ? 'Sala Criada!' : 'Rodada Lançada!')}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-600 mt-2 font-bold text-center px-10 leading-relaxed uppercase tracking-widest">
            {activeTab === '1 vs 1' && betAction === 'create' 
              ? 'O teu duelo está ativo. Partilha os dados com o teu adversário para começar!'
              : 'Informação registada com sucesso. Acompanha o teu prémio no histórico.'}
          </p>

          {/* EXCLUSIVE CODE DISPLAY & COPY ACTION - SECTOR 3 */}
          {(activeTab === 'Privado' || activeTab === '1 vs 1') && betAction === 'create' && (
            <div className="mt-5 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[1.5rem] p-4 flex flex-col gap-3 items-center">
              <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Código Exclusivo da Sala</span>
              <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-slate-200">
                <Lock className="w-4 h-4 text-[#FFB10A]" />
                <span className="font-mono text-lg font-black text-[#091747] tracking-wider">{createPassword}</span>
              </div>
              <button
                onClick={handleCopyCode}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-[9px] md:text-[10px] transition-all active:scale-95",
                  copied 
                    ? "bg-green-600 text-white shadow-lg shadow-green-500/10" 
                    : "bg-[#091747] text-white hover:bg-opacity-95 shadow-lg shadow-blue-900/10"
                )}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Código Copiado!' : 'Copiar Código'}
              </button>
            </div>
          )}

          {/* LIVE OPPONENT JOINING SIMULATION - SECTOR 4 */}
          {(activeTab === 'Privado' || activeTab === '1 vs 1') && betAction === 'create' && (
            <div className="mt-5 w-full bg-white border-2 border-gray-100 rounded-[1.5rem] p-4 shadow-sm">
              {!simOpponent ? (
                <div className="flex flex-col items-center py-2 gap-3">
                  <div className="flex items-center gap-2.5">
                    <Loader2 className="w-4 h-4 text-[#FFB10A] animate-spin shrink-0" strokeWidth={3} />
                    <span className="text-[10px] md:text-xs font-black text-gray-700 uppercase tracking-wider animate-pulse">
                      A aguardar oponente conectar...
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-[#FFB10A] h-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 12, ease: 'linear' }}
                    />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                    Conexão prevista em {simTicks} segundos
                  </span>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-3 items-center"
                >
                  <div className="flex items-center gap-3 w-full bg-orange-50/65 border border-orange-100 rounded-xl p-3">
                    <div className="relative">
                      <img 
                        src={simOpponent.avatar}
                        alt="Rival"
                        className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      </div>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <h4 className="font-black text-[#091747] text-xs uppercase truncate">{simOpponent.name}</h4>
                      <p className="text-[8px] md:text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                        Classificação: <span className="text-[#FFB10A] font-black">{simOpponent.rank}</span> | {simOpponent.winRate} WinRate
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[8px] md:text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full animate-bounce">
                      Pronto
                    </span>
                  </div>
                  <p className="text-[9px] md:text-[10px] text-green-700 font-extrabold uppercase tracking-tight text-center">
                    🛡️ Adversário aceitou e registou palpites na sala! O desafio agora está ATIVO.
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {(activeTab === 'Privado' || activeTab === '1 vs 1') && betAction === 'create' && (
            <div className="mt-5 space-y-4 w-full">
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </a>
                <a 
                  href={mailUrl}
                  className="flex items-center justify-center gap-2 bg-[#091747] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  E-mail
                </a>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col gap-3 mt-6">
            <button 
              onClick={handleClose}
              className="w-full bg-white border-2 border-gray-100 text-gray-600 font-black py-5 rounded-[1.5rem] hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
            >
              Sair
            </button>
          </div>
        </div>
      );
    }

    // Initial action selection
    if (!betAction) {
      const userBets = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);

      return (
        <div className="flex flex-col gap-4 py-4">
          <button 
            id="criar-sala-btn"
            onClick={() => {
              setBetAction('create');
              if (activeTab === 'Privado' || activeTab === '1 vs 1') {
                const code = `DUET-${Math.floor(1000 + Math.random() * 9000)}`;
                setCreatePassword(code);
                setConfirmPassword(code);
                setCreateStep('password');
              } else {
                setCreateStep('details');
              }
            }}
            className="group flex items-center gap-5 p-6 bg-white border border-gray-200 rounded-[2rem] hover:border-[#FFB10A] transition-all hover:bg-orange-50/50"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FFB10A] group-hover:bg-[#FFB10A] group-hover:text-white transition-all">
              <Plus className="w-8 h-8 stroke-[3px]" />
            </div>
            <div className="text-left">
              <h4 className="font-black text-[#091747] text-xl uppercase tracking-tighter italic">
                {activeTab === 'Nacional' && isBasketball ? 'Participar' : 'Criar Sala'}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-800 font-black uppercase tracking-widest mt-1">
                {activeTab === 'Nacional' && isBasketball ? 'Adere à rodada nacional' : 'Lança um desafio novo'}
              </p>
            </div>
          </button>
          {activeTab !== 'Nacional' && (
            <button 
              id="entrar-com-senha-btn"
              onClick={() => setBetAction('join')}
              className="group flex items-center gap-5 p-6 bg-white border border-gray-200 rounded-[2rem] hover:border-blue-500 transition-all hover:bg-blue-50/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Users className="w-8 h-8 stroke-[3px]" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-[#091747] text-xl uppercase tracking-tighter italic">Entrar com Senha</h4>
                <p className="text-[10px] md:text-xs text-gray-800 font-black uppercase tracking-widest mt-1">Aceita um convite direto</p>
              </div>
            </button>
          )}

          <button 
            id="tuas-apostas-btn"
            onClick={() => setBetAction('my_bets')}
            className="group flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-green-500 transition-all hover:bg-green-50"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
              <Trophy className="w-8 h-8 stroke-[2px]" />
            </div>
            <div className="text-left flex-1 font-sans">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-[#091747] text-xl uppercase tracking-tighter italic">Tuas Apostas</h4>
                <span className="bg-green-500 text-white text-xs md:text-sm font-black px-3 py-1 rounded-full flex items-center justify-center min-w-[24px] h-[24px] shadow-sm">
                  {userBets.length}
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Vê o estado dos teus duelos</p>
            </div>
          </button>
        </div>
      );
    }

    if (showDeleteConfirm) {
      const bet = storageService.getBets().find(b => b.id === showDeleteConfirm);
      
      const handleDelete = () => {
        if (showDeleteConfirm) {
          storageService.deleteBet(showDeleteConfirm, true);
          setShowDeleteConfirm(null);
          
          // If no more bets for this match/category, go back to main actions
          const remaining = storageService.getBets().filter(b => b.matchId === match.id && b.category === activeTab);
          if (remaining.length === 0) setBetAction(null);
        }
      };

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
            <button 
              onClick={handleDelete}
              className="w-full bg-red-600 text-white font-black py-4 rounded-2xl active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Sim, Eliminar
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(null)}
              className="w-full bg-transparent border-2 border-gray-200 text-gray-700 font-black py-4 rounded-2xl active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Cancelar
            </button>
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
            <p className="text-[10px] md:text-xs text-gray-900 font-black uppercase tracking-tight">Vê os teus desafios ou elimina os que não queres</p>
          </div>
          <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {userBets.map((bet) => {
              const betMatch = MATCH_DATA.find(m => m.id === bet.matchId) || match;
              
              return (
                <div
                  key={bet.id}
                  className="group flex flex-col gap-3 p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-500 transition-all text-left"
                >
                  <div 
                    onClick={() => {
                      setSelectedBetId(bet.id);
                      setBetAction('bet_details');
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                        <Trophy className="w-5 h-5" strokeWidth={3} />
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-tighter">{betMatch.teamA.name} vs {betMatch.teamB.name}</p>
                        <p className="text-xs font-black text-[#091747]">{bet.market}</p>
                        <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase">{new Date(bet.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#FFB10A]">{bet.amount.toLocaleString()} Kz</p>
                      <p className={cn(
                        "text-[10px] md:text-xs font-black uppercase italic",
                        betMatch.status === 'terminou' ? "text-blue-600" : "text-green-600"
                      )}>
                        {betMatch.status === 'terminou' ? 'Finalizado' : 'Ativo'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
                    {betMatch.status === 'terminou' ? (
                      <button 
                        onClick={() => {
                          setSelectedBetId(bet.id);
                          setBetAction('challenge_results');
                        }}
                        className="flex-1 bg-blue-600 text-white text-[10px] md:text-xs font-black py-2.5 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                      >
                        <Trophy className="w-3.5 h-3.5" strokeWidth={3} />
                        Ver Resultados
                      </button>
                    ) : (
                      <>
                        {bet.autoConfirmThreshold && (
                          <span className="text-[8px] md:text-[9px] font-black bg-blue-100 text-blue-800 px-2 py-1 rounded-lg uppercase tracking-tight flex items-center gap-1">
                            <Shield className="w-2.5 h-2.5" />
                            Conf. Prémio {bet.autoConfirmThreshold.toLocaleString()}
                          </span>
                        )}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(bet.id);
                          }}
                          className="flex items-center gap-1 text-[10px] md:text-xs font-black text-red-500 uppercase tracking-widest hover:text-red-700 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
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

      const shareText = bet.category === 'Nacional'
        ? `Vem jogar no Duet Desportivo!\nModo: Nacional\nJogo: ${match.teamA.name} vs ${match.teamB.name}`
        : `Vem jogar no Duet Desportivo!\nSala: ${bet.roomName || '---'}\nSenha: ${bet.password || '---'}\nJogo: ${match.teamA.name} vs ${match.teamB.name}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      const mailUrl = `mailto:?subject=${encodeURIComponent('Convite para Desafio Duet')}&body=${encodeURIComponent(shareText)}`;

      return (
        <div className="flex flex-col gap-4 py-1 pb-6 animate-fade-in">
          <div className="bg-white p-4 rounded-3xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FFB10A]" strokeWidth={3} />
                <span className="text-[10px] md:text-xs font-black text-gray-900 uppercase tracking-widest italic">Resumo do Desafio</span>
              </div>
              <span className="text-[10px] md:text-xs font-black text-[#091747] bg-white px-3 py-1 rounded-full uppercase tracking-widest border-2 border-gray-200">Aberto</span>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <div className="bg-transparent p-4 rounded-2xl border-2 border-gray-200">
                <p className="text-[10px] md:text-xs font-black text-gray-600 uppercase tracking-widest mb-3 flex items-center gap-2">
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
                        <div key={sIdx} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                          <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tight">{sel.market}:</span>
                          <span className="text-xs font-black text-[#091747]">{sel.choice}</span>
                        </div>
                      ));
                    })()
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-tight">Prognóstico:</span>
                      <span className="text-xs font-black text-[#091747]">{bet.market || '---'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-transparent p-4 rounded-2xl border-2 border-gray-200 flex justify-between items-center">
                <p className="text-[10px] md:text-xs font-black text-gray-600 uppercase tracking-widest">Valor Apostado</p>
                <p className="text-sm font-black text-[#FFB10A]">{bet.amount.toLocaleString()} Kz</p>
              </div>
            </div>

            {bet.roomName && (
              <div className="bg-transparent p-3.5 rounded-2xl border-2 border-gray-200 mb-4 flex justify-between items-center px-4">
                <div>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Nome da Sala</p>
                  <p className="text-xs font-black text-[#091747] uppercase font-mono">{bet.roomName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Status</p>
                  <span className="text-[9px] md:text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase italic">Criada por ti</span>
                </div>
              </div>
            )}

            {bet.autoConfirmThreshold && (
              <div className="bg-orange-50 p-3 rounded-xl border-2 border-[#FFB10A]/20 flex items-start gap-2 mb-4">
                <Shield className="w-3.5 h-3.5 text-[#FFB10A] shrink-0" strokeWidth={3} />
                <p className="text-[9px] md:text-[10px] text-orange-700 font-black uppercase tracking-tight leading-tight">
                  Aposta Inteligente: Só confirma se o prémio ultrapassar {bet.autoConfirmThreshold.toLocaleString()} Kz.
                </p>
              </div>
            )}

            {bet.category !== 'Nacional' && (
              <div className="bg-blue-50/50 p-4 rounded-3xl border-2 border-dashed border-blue-400">
                <p className="text-[9px] md:text-[10px] text-blue-700 uppercase font-black tracking-widest text-center mb-1.5 italic">Senha do Desafio</p>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border-2 border-blue-200">
                  <span className="text-xl md:text-2xl font-mono font-black text-[#091747] tracking-wider">{bet.password || '---'}</span>
                  <button 
                    onClick={() => {
                      if (bet.password) navigator.clipboard.writeText(bet.password);
                    }}
                    className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white active:scale-95 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[9px] md:text-[10px] text-blue-800 mt-2.5 font-black text-center px-4 uppercase tracking-tighter">Envia esta senha ao teu colega para ele aceitar o desafio!</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-green-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp
            </a>
            <a 
              href={mailUrl}
              className="flex items-center justify-center gap-2 bg-[#091747] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-blue-900/20 active:scale-95 transition-all cursor-pointer"
            >
              <Mail className="w-5 h-5" />
              E-mail
            </a>
          </div>
        </div>
      );
    }

    // If joining, show code input first
    if (betAction === 'create' && createStep === 'password') {
      return (
        <div className="flex flex-col gap-6 py-4">
          <div className="bg-white border-2 border-orange-200 p-5 rounded-[2rem] flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#FFB10A] shrink-0 mt-1" strokeWidth={3} />
            <p className="text-xs md:text-sm text-gray-900 leading-relaxed font-black uppercase tracking-tight">
              Configura o acesso ao teu desafio. Cria um nome para a sala e uma senha de segurança.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-[10px] md:text-xs font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Nome da Sala</label>
              <input 
                type="text" 
                placeholder="EX: DUELO DOS MESTRES"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-6 text-center text-lg font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all uppercase placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-[10px] md:text-xs font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Senha de Segurança</label>
              <input 
                type="password" 
                placeholder="••••••"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-5 text-center text-2xl font-mono font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all tracking-[0.5em] placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-[10px] md:text-xs font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Confirmar Senha</label>
              <input 
                type="password" 
                placeholder="••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-5 text-center text-2xl font-mono font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all tracking-[0.5em] placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      );
    }

    if (betAction === 'join') {
      if (joiningBet) {
        if (activeTab === '1 vs 1') {
          const currentMarketType = joiningBet.marketType || 'Resultado Final';
          const options = isBasketball
            ? [
                { id: 'Vitória A', label: () => match.teamA.name },
                { id: 'Vitória B', label: () => match.teamB.name }
              ]
            : (FOOTBALL_MARKETS[currentMarketType] || []);

          return (
            <div className="flex flex-col gap-6 py-2">
              {matchHeader}

            <div className="bg-white border-2 border-orange-500 p-4 rounded-2xl flex items-start gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-[#FFB10A] shrink-0 mt-0.5" strokeWidth={3} />
                <p className="text-[10px] md:text-xs text-gray-900 leading-relaxed font-black uppercase tracking-tight">
                  O teu adversário escolheu <span className="text-[#FFB10A] italic">{joiningBet.market}</span> no mercado <span className="text-[#FFB10A] italic">{currentMarketType}</span>. Escolhe um dos resultados restantes!
                </p>
              </div>

              <div>
                <label className="text-[10px] md:text-xs font-black text-gray-900 mb-4 block uppercase tracking-widest px-2 italic">O teu Prognóstico: {currentMarketType}</label>
                <div className={cn(
                  "grid gap-3",
                  options.length === 2 ? "grid-cols-2" : "grid-cols-3"
                )}>
                  {options.map(({ id, label }) => {
                    const optionLabel = label(match);
                    const isOccupied = id === joiningBet.market || optionLabel === joiningBet.market;
                    return (
                      <button 
                        key={id}
                        disabled={isOccupied}
                        onClick={() => setSelectedMarket(optionLabel)}
                        className={cn(
                          "py-6 px-2 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center gap-2 relative",
                          selectedMarket === optionLabel 
                            ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-md scale-[1.02]" 
                            : isOccupied
                              ? "bg-transparent border-gray-300 opacity-40 cursor-not-allowed"
                              : "bg-white border-gray-200 text-gray-900 hover:border-[#FFB10A]"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                          selectedMarket === optionLabel ? "border-white" : "border-gray-300"
                        )}>
                          {selectedMarket === optionLabel && <div className="w-2 h-2 rounded-full bg-white" />}
                          {isOccupied && <X className="w-3 h-3 text-red-600" strokeWidth={3} />}
                        </div>
                        <span className={cn(
                          "text-[10px] md:text-xs font-black uppercase tracking-tight text-center leading-tight",
                          selectedMarket === optionLabel ? "text-white" : "text-gray-900"
                        )}>{optionLabel}</span>
                        {isOccupied && <span className="absolute -top-2 bg-red-600 text-white text-[7px] font-black px-2 py-0.5 rounded-full">OCUPADO</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[10px] md:text-xs font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Valor do Duelo (Kz)</label>
                <div className="relative">
                  <div className="w-full bg-transparent border-2 border-gray-200 rounded-[1.5rem] py-5 px-6 text-2xl font-black text-[#091747] flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                      <span>{joiningBet.amount.toLocaleString()}</span>
                    </div>
                    <span className="text-[#FFB10A] italic">Kz</span>
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-500 mt-3 font-black px-2 uppercase tracking-tight text-center italic leading-relaxed">Este valor é fixo para este duelo direto definido pelo moderador.</p>
              </div>
            </div>
          );
        }

        const viewingUser = roomInscribedUsers.find(u => u.id === selectedUserView);
        const displayPicks = viewingUser ? viewingUser.picks : selectedMarketsList;
        const currentPrivateMarkets = category === 'f1' ? F1_PRIVATE_MARKETS : (isBasketball ? BASKETBALL_PRIVATE_MARKETS : PRIVATE_MARKETS);

        return (
          <motion.div 
            key={`predictions-join-${selectedUserView}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-6 py-4"
          >
            {matchHeader}

            <div className="bg-white border-2 border-orange-500 p-4 rounded-2xl flex items-start gap-4 mb-2">
              <AlertCircle className="w-5 h-5 text-[#FFB10A] shrink-0 mt-0.5" strokeWidth={3} />
              <p className="text-[10px] md:text-xs text-gray-900 leading-relaxed font-black uppercase tracking-tight">
                {viewingUser ? `Estás a ver o palpite de ${viewingUser.name}.` : "Faz as tuas previsões para os mercados selecionados nesta sala."}
              </p>
            </div>

            <div className="bg-transparent p-5 rounded-3xl border-2 border-gray-200 shadow-sm mb-2">
              <label className="text-[10px] md:text-xs font-black text-gray-600 mb-3 block uppercase tracking-widest px-2 italic flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#FFB10A]" />
                Usuários Inscritos
              </label>
              <div className="relative">
                <select 
                  value={selectedUserView}
                  onChange={(e) => setSelectedUserView(e.target.value)}
                  className="w-full bg-white border-2 border-white rounded-2xl py-4 px-5 text-xs font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all appearance-none shadow-sm uppercase tracking-[0.1em]"
                >
                  <option value="me">Teus Prognósticos (Tu)</option>
                  {roomInscribedUsers.filter(u => u.id !== 'me').map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] md:text-xs font-black text-gray-900 mb-4 block uppercase tracking-widest px-2 italic">
                {viewingUser ? `Resultados de ${viewingUser.name}` : `Teus Prognósticos (${selectedMarketsList.filter(s => !!s).length}/${joiningBet?.selectedMarkets ? joiningBet.selectedMarkets.filter(m => m !== null).length : (joiningBet?.market ? 1 : 0)})`}
              </label>
              <div className="flex flex-col gap-4">
                {displayPicks.map((res, idx) => {
                  // Only show markets that were selected in the original bet
                  if (joiningBet?.selectedMarkets) {
                    if (idx >= joiningBet.selectedMarkets.length || joiningBet.selectedMarkets[idx] === null) return null;
                  } else if (idx > 0) {
                    return null;
                  }

                  if (!currentPrivateMarkets[idx]) return null;

                  return (
                    <div key={idx} className={cn(
                      "bg-white border-2 rounded-[2rem] p-5 flex flex-col gap-4 transition-all duration-300",
                      viewingUser ? "border-orange-100 bg-orange-50/5" : "border-gray-200"
                    )}>
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] md:text-xs font-black text-[#091747] uppercase tracking-widest italic">{currentPrivateMarkets[idx].name}</span>
                        {viewingUser && <span className="text-[8px] md:text-[9px] font-black bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full uppercase tracking-wider">Inscrito</span>}
                      </div>
                      <div className={cn(
                        "grid gap-2",
                        currentPrivateMarkets[idx].options(match).length <= 2 ? "grid-cols-2" : (currentPrivateMarkets[idx].options(match).length <= 6 ? "grid-cols-3" : "grid-cols-2")
                      )}>
                        {currentPrivateMarkets[idx].options(match).map((opt) => {
                          const isSelected = viewingUser ? (viewingUser.picks[idx] === opt.id) : (res === opt.id);

                          return (
                            <button
                              key={opt.id}
                              disabled={!!viewingUser}
                              onClick={() => {
                                const newPreds = [...selectedMarketsList];
                                newPreds[idx] = opt.id;
                                setSelectedMarketsList(newPreds);
                              }}
                              className={cn(
                                "py-3 px-2 rounded-[1.2rem] text-[9px] md:text-[10px] font-black border-2 transition-all uppercase tracking-tight text-center leading-tight line-clamp-2 relative",
                                viewingUser 
                                  ? isSelected 
                                    ? "bg-[#FFB10A]/90 border-[#FFB10A] text-white shadow-md scale-[1.01]"
                                    : "bg-transparent border-gray-200 text-gray-400 opacity-60 pointer-events-none"
                                  : isSelected
                                    ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-md scale-[1.01]"
                                    : "bg-white border-gray-100 text-gray-700 hover:border-[#FFB10A] hover:bg-gray-50"
                              )}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t-2 border-gray-100">
              <label className="text-[10px] md:text-xs font-black text-gray-600 mb-3 block uppercase tracking-widest px-2 italic">Valor da Entrada (Kz)</label>
              <div className="w-full bg-transparent border-2 border-gray-200 rounded-[1.5rem] py-5 px-6 text-2xl font-black text-[#091747] flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span>{joiningBet.amount.toLocaleString()}</span>
                </div>
                <span className="text-[#FFB10A] italic">Kz</span>
              </div>
              <p className="text-[8px] md:text-[9px] text-gray-400 mt-3 font-bold text-center uppercase tracking-tight italic">Este valor foi definido pelo moderador da sala.</p>
            </div>
          </motion.div>
        );
      }

      return (
        <div className="flex flex-col gap-8 py-4">
          <div className="bg-white border-2 border-blue-500 p-5 rounded-[2rem] flex items-start gap-4">
            <Shield className="w-6 h-6 text-blue-600 shrink-0 mt-1" strokeWidth={3} />
            <p className="text-xs md:text-sm text-gray-900 leading-relaxed font-black uppercase tracking-tight">
              Insere o nome da sala e a senha do desafio para acederes ao duelo direto.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-[10px] md:text-xs font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Nome da Sala</label>
              <input 
                type="text" 
                placeholder="EX: DUELO DOS MESTRES"
                value={roomNameInput}
                onChange={(e) => setRoomNameInput(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-5 px-6 text-center text-lg font-black text-[#091747] outline-none focus:border-blue-600 transition-all uppercase placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="text-[10px] md:text-xs font-black text-gray-900 mb-3 block uppercase tracking-widest px-2 italic">Senha de Acesso</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="EX: 1234"
                  value={roomCodeInput}
                  onChange={(e) => setRoomCodeInput(e.target.value)}
                  className="w-full bg-white border-2 border-gray-300 rounded-[2rem] py-6 px-4 text-center text-2xl font-mono font-black text-[#091747] outline-none focus:border-blue-600 transition-all tracking-[0.2em] placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (betAction === 'challenge_results') {
      const bet = storageService.getBets().find(b => b.id === selectedBetId);
      if (!bet) return null;
      
      const myRankInfo = inscribedUsers.find(u => u.id === 'me');
      const myRank = myRankInfo?.rank || 99;
      const taunts = storageService.getTaunts();
      const hasSentTaunt = taunts.some(t => t.challengeId === bet.id && t.fromUserId === 'me');

      return (
        <div className="flex flex-col gap-6 py-2 overflow-y-auto custom-scrollbar max-h-[70vh] pb-8 relative">
          <div className="bg-[#091747] rounded-3xl p-6 text-white relative overflow-hidden shadow-xl sticky top-0 z-20">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="flex items-center justify-between relative z-10 mb-4">
               <div>
                 <h4 className="text-xl font-black text-[#FFB10A] uppercase tracking-tighter italic leading-tight">Classificação Final</h4>
                 <span className="text-[10px] md:text-xs text-blue-300 font-bold uppercase tracking-widest">Desafio: {bet.roomName || 'Geral'}</span>
               </div>
               <div className="text-right">
                 <div className="text-2xl font-black text-white italic">#{myRank}</div>
                 <span className="text-[8px] md:text-[9px] text-white/50 font-bold uppercase tracking-widest">Tua Posição</span>
               </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/5 relative z-10">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[10px] md:text-xs font-bold text-blue-200 uppercase tracking-widest">O teu desempenho</span>
                 <span className="text-[10px] md:text-xs font-black text-[#FFB10A] uppercase tracking-widest">{myRankInfo?.points} Pontos</span>
               </div>
               <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(myRankInfo?.points || 0) * 10}%` }}
                   className="h-full bg-gradient-to-r from-[#FFB10A] to-orange-400"
                 />
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between px-2">
               <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] italic">Classificação do Grupo</label>
               <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] italic">PTS</span>
             </div>
             
             <div className="flex flex-col gap-2.5">
               {inscribedUsers.sort((a, b) => a.rank - b.rank).map((user, i) => {
                 const isMe = user.id === 'me';
                 const canBeTaunted = !isMe && user.rank > myRank;
                 const alreadyTaunted = taunts.some(t => t.challengeId === bet.id && t.fromUserId === 'me' && t.toUserId === user.id);
                 
                 return (
                   <motion.div 
                     key={user.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className={cn(
                      "group flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                      isMe ? "bg-orange-50 border-[#FFB10A]/30 shadow-md ring-1 ring-[#FFB10A]/20" : "bg-white border-gray-100 hover:border-gray-200"
                     )}
                   >
                      <div className="flex items-center gap-4">
                         <div className="relative">
                            <span className={cn(
                              "absolute -left-2 -top-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black shadow-sm z-10",
                              user.rank === 1 ? "bg-[#FFB10A] text-white" : "bg-transparent border border-gray-300 text-gray-500"
                            )}>
                              {user.rank}
                            </span>
                            <img src={user.photo} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" />
                         </div>
                         <div className="flex flex-col">
                            <span className={cn(
                              "text-xs md:text-sm font-black uppercase tracking-tight",
                              isMe ? "text-[#091747]" : "text-gray-900"
                            )}>
                              {user.name} {isMe && '(Tu)'}
                            </span>
                            <span className="text-[8px] md:text-[9px] text-gray-500 font-bold uppercase tracking-widest">{user.rank === 1 ? 'Vencedor do Duelo' : 'Participante'}</span>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                         <span className="text-sm font-black text-[#091747] italic">{user.points}</span>
                         {canBeTaunted && (
                           <button
                             onClick={() => !hasSentTaunt && setShowTauntSelector(user.id)}
                             disabled={hasSentTaunt}
                             className={cn(
                               "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                               alreadyTaunted 
                                 ? "bg-green-100 text-green-600" 
                                 : hasSentTaunt 
                                   ? "bg-transparent border border-gray-200 text-gray-300 cursor-not-allowed"
                                   : "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white active:scale-95 shadow-sm"
                             )}
                           >
                             {alreadyTaunted ? (
                               <Check className="w-4 h-4 stroke-[3px]" />
                             ) : (
                               <Smile className="w-4 h-4" strokeWidth={3} />
                             )}
                           </button>
                         )}
                      </div>
                   </motion.div>
                 );
               })}
             </div>
          </div>

          {/* TAUNT SELECTOR MODAL */}
          <AnimatePresence>
            {showTauntSelector && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl relative border-2 border-[#FFB10A]/20"
                >
                  <button 
                    onClick={() => setShowTauntSelector(null)}
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" strokeWidth={3} />
                  </button>
                  
                  <div className="flex flex-col items-center mb-8">
                     <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center text-red-500 mb-4 shadow-inner">
                        <Smile className="w-10 h-10" />
                     </div>
                     <h5 className="text-lg font-black text-[#091747] text-center uppercase tracking-tighter italic leading-tight px-4">
                        Enviar Provocação
                     </h5>
                     <p className="text-[9px] md:text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest text-center">Escolhe um sticker para "picar" o teu colega!</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-8">
                     {STICKERS.map((sticker) => (
                       <button
                         key={sticker.id}
                         onClick={() => {
                            if (showTauntSelector) {
                              storageService.sendTaunt({
                                challengeId: bet.id,
                                fromUserId: 'me',
                                toUserId: showTauntSelector,
                                stickerId: sticker.id
                              });
                              
                              // Create notification for the target user (simulation)
                              storageService.addNotification({
                                id: Date.now().toString() + Math.random(),
                                type: 'Taunt',
                                title: 'PROVOCAÇÃO RECEBIDA! 😜',
                                message: `O usuário ${userProfile.name} enviou-te uma provocação no desafio ${bet.roomName || 'Geral'}.`,
                                emoji: sticker.emoji,
                                fromUserId: 'me',
                                challengeId: bet.id,
                                createdAt: new Date().toISOString(),
                                isRead: false
                              });
                              
                              setShowTauntSelector(null);
                            }
                         }}
                         className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border-2 border-gray-100 hover:border-[#FFB10A] hover:bg-orange-50 active:scale-95 transition-all text-center group"
                       >
                          <span className="text-3xl filter group-hover:scale-110 transition-transform">{sticker.emoji}</span>
                          <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#FFB10A]">{sticker.label}</span>
                       </button>
                     ))}
                  </div>
                  
                  <p className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase tracking-tight text-center px-6 italic leading-relaxed">
                     Apenas podes enviar uma provocação por desafio. Escolhe com sabedoria!
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-white via-white to-transparent pb-4 z-10">
            <button 
              onClick={() => setBetAction('my_bets')}
              className="w-full bg-[#091747] text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-3 active:scale-95 transition-all uppercase tracking-widest text-xs shadow-lg shadow-blue-900/20"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={3} />
              Voltar às Apostas
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case '1 vs 1':
        return (
          <div className="flex flex-col gap-6 py-2">
            {matchHeader}

            <div className="bg-orange-50/50 rounded-[2rem] p-6 border-2 border-orange-100 flex flex-col gap-6 shadow-sm">
              {!isBasketball && category !== 'f1' && (
                <div>
                  <div className="flex items-center justify-between mb-2 px-2">
                    <label className="text-[10px] md:text-xs font-black text-gray-600 block uppercase tracking-widest italic">Mercado do Duelo</label>
                    <span className="text-[9px] md:text-[10px] font-black text-orange-500 uppercase tracking-widest italic">Comissão (50 Kz)</span>
                  </div>
                  <div className="relative">
                    <select 
                      value={marketType}
                      onChange={(e) => {
                        const newType = e.target.value;
                        setMarketType(newType);
                        setSelectedMarket('');
                      }}
                      className="w-full bg-white border-2 border-white rounded-xl py-3.5 px-5 text-xs font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all appearance-none tracking-widest shadow-sm uppercase italic"
                    >
                      {Object.keys(FOOTBALL_MARKETS).map(market => (
                        <option key={market} value={market}>{market}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={3} />
                  </div>
                </div>
              )}

              {category !== 'f1' && (
                <div id="basketball-market-prognostic-container">
                  <label className="text-[10px] md:text-xs font-black text-gray-600 mb-3 block uppercase tracking-widest px-2 italic">O teu Prognóstico: {!isBasketball ? marketType : ''}</label>
                {isBasketball && (
                  <div className="relative mb-3">
                    <select 
                      id="basketball-market-select"
                      value={marketType}
                      onChange={(e) => {
                        setMarketType(e.target.value);
                        setSelectedMarket('');
                      }}
                      className="w-full bg-white border-2 border-white rounded-xl py-3.5 px-5 text-xs font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all appearance-none tracking-widest shadow-sm uppercase italic"
                    >
                      <option value="Resultado Final">Resultado Final</option>
                      <option value="pontos marcados">pontos marcados</option>
                      <option value="assistências">assistências</option>
                      <option value="ressaltos">ressaltos</option>
                      <option value="MVP da partida">MVP da partida</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={3} />
                  </div>
                )}
                <div className={cn(
                  "grid gap-2",
                  isBasketball ? "grid-cols-2" : (FOOTBALL_MARKETS[marketType]?.length === 2 ? "grid-cols-2" : "grid-cols-3")
                )}>
                  {(isBasketball 
                    ? [
                        { id: 'Vitória A', label: match.teamA.name },
                        { id: 'Vitória B', label: match.teamB.name }
                      ]
                    : FOOTBALL_MARKETS[marketType] || []
                  ).map(({ id, label }) => {
                    const displayName = typeof label === 'function' ? label(match) : label;
                    return (
                      <button 
                        key={id}
                        onClick={() => setSelectedMarket(displayName)}
                        className={cn(
                          "py-5 px-1 rounded-2xl border-2 transition-all active:scale-95 flex flex-col items-center justify-center gap-2 text-center shadow-sm",
                          selectedMarket === displayName 
                            ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-md scale-[1.02]" 
                            : "bg-white border-white text-gray-600 hover:border-[#FFB10A]"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                          selectedMarket === displayName ? "border-white" : "border-[#FFB10A]/30"
                        )}>
                          {selectedMarket === displayName && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className={cn(
                          "text-[8px] md:text-[10px] font-black uppercase tracking-tight leading-tight truncate whitespace-nowrap px-1",
                          selectedMarket === displayName ? "text-white" : "text-gray-900"
                        )}>{displayName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
              
              <div>
                <label className="text-[10px] md:text-xs font-black text-gray-600 mb-3 block uppercase tracking-widest px-2 italic">
                  {category === 'f1' ? 'Melhor Classificado' : 'Investimento (Kz)'}
                </label>
                
                {/* Investment Presets Dropdown - Hidden for Football and Basketball */}
                {category !== 'futebol' && !isBasketball && (
                  <div className="mb-4 relative px-1">
                    <select 
                      id="investment-presets"
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 px-6 text-xs md:text-sm font-black text-gray-800 uppercase tracking-widest outline-none focus:border-[#FFB10A] transition-all appearance-none cursor-pointer shadow-sm"
                      onChange={(e) => category === 'f1' ? setSelectedMarket(e.target.value) : setBetValue(e.target.value)}
                      value={category === 'f1' ? selectedMarket : ""}
                    >
                      <option value="" disabled>
                        {category === 'f1' ? 'Escolha o Piloto' : 'Escolha um valor pré-definido'}
                      </option>
                      {category === 'f1' ? (
                        <>
                          <option value="Max Verstappen">Max Verstappen</option>
                          <option value="Lewis Hamilton">Lewis Hamilton</option>
                          <option value="Charles Leclerc">Charles Leclerc</option>
                          <option value="Lando Norris">Lando Norris</option>
                          <option value="Oscar Piastri">Oscar Piastri</option>
                          <option value="Carlos Sainz">Carlos Sainz</option>
                          <option value="George Russell">George Russell</option>
                          <option value="Sergio Perez">Sergio Perez</option>
                          <option value="Fernando Alonso">Fernando Alonso</option>
                        </>
                      ) : (
                        <>
                          <option value="500">500 Kz</option>
                          <option value="1000">1.000 Kz</option>
                          <option value="5000">5.000 Kz</option>
                          <option value="10000">10.000 Kz</option>
                          <option value="50000">50.000 Kz</option>
                        </>
                      )}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                )}

                <div className="relative group">
                  <input 
                    type="number" 
                    value={betValue}
                    onChange={(e) => setBetValue(e.target.value)}
                    className="w-full bg-white border-2 border-white rounded-2xl py-4 px-6 text-2xl font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all shadow-sm italic"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <div className="w-[1px] h-6 bg-gray-100" />
                    <span className="text-[#FFB10A] font-black italic text-base">Kz</span>
                  </div>
                </div>
              </div>
            </div>

            {category !== 'f1' && category !== 'futebol' && !isBasketball && (
              <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-sm">
                <label className="text-[10px] md:text-xs font-black text-gray-600 mb-3 block uppercase tracking-widest text-center italic">Lotação da Sala</label>
                <div className="relative overflow-hidden">
                  <motion.div 
                    key="fixed-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full bg-transparent border-2 border-gray-200 rounded-xl py-4 px-5 text-xl font-black text-[#091747] flex items-center justify-center gap-3 shadow-inner select-none"
                  >
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span>3</span>
                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">Atletas</span>
                  </motion.div>
                </div>
                <p className="text-[8px] md:text-[9px] text-gray-500 mt-3 font-bold text-center uppercase tracking-tight italic">Este modo de jogo requer uma lotação específica de atletas.</p>
              </div>
            )}
          </div>
        );
      case 'Privado': {
        if (createStep === 'selection') {
          const currentPrivateMarkets = category === 'f1' ? F1_PRIVATE_MARKETS : (isBasketball ? BASKETBALL_PRIVATE_MARKETS : PRIVATE_MARKETS);
          return (
            <div className="flex flex-col gap-6 py-2">
              <div className="bg-[#091747] rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                <h4 className="text-xs md:text-sm font-black text-[#FFB10A] uppercase tracking-widest mb-1 italic relative z-10">Seleção de Mercados</h4>
                <p className="text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-tight leading-relaxed relative z-10">Escolhe os mercados que estarão disponíveis para o desafio.</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {currentPrivateMarkets.map((market, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      const newPreds = [...selectedMarketsList];
                      if (newPreds[i]) newPreds[i] = '';
                      else newPreds[i] = 'PENDING'; 
                      setSelectedMarketsList(newPreds);
                    }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
                      selectedMarketsList[i] 
                        ? "bg-white border-[#FFB10A] shadow-md scale-[1.01]" 
                        : "bg-transparent border-gray-200 opacity-70 hover:opacity-100"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                      selectedMarketsList[i] 
                        ? "bg-[#FFB10A] border-[#FFB10A]" 
                        : "bg-white border-gray-300"
                    )}>
                      {selectedMarketsList[i] && <Check className="w-2.5 h-2.5 text-white stroke-[4px]" />}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[10px] md:text-xs font-black uppercase tracking-tight",
                        selectedMarketsList[i] ? "text-[#091747]" : "text-gray-900"
                      )}>
                        {market.name}
                      </span>
                      <span className="text-[7px] text-gray-500 font-bold uppercase">Disponível para todos</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        }

        const currentPrivateMarkets = category === 'f1' ? F1_PRIVATE_MARKETS : (isBasketball ? BASKETBALL_PRIVATE_MARKETS : PRIVATE_MARKETS);
        return (
          <div className="flex flex-col gap-6 py-2">
            {category !== 'futebol' && category !== 'f1' && !isBasketball && (
              <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 mb-2 shadow-sm">
                <label className="text-[10px] md:text-xs font-black text-gray-600 mb-3 block uppercase tracking-widest text-center italic">Lotação da Sala</label>
                <div className="relative overflow-hidden">
                  <motion.div 
                    key={maxParticipants}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full bg-transparent border-2 border-gray-200 rounded-xl py-4 px-5 text-xl font-black text-[#091747] flex items-center justify-center gap-3 shadow-inner select-none"
                  >
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span>{maxParticipants}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-1">Atletas</span>
                  </motion.div>
                </div>
                <p className="text-[8px] md:text-[9px] text-gray-500 mt-3 font-bold text-center uppercase tracking-tight italic px-4">
                  A lotação da sala é definida automaticamente com base na quantidade de mercados selecionados.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <label className="text-[10px] md:text-xs font-black text-gray-600 mb-0 block uppercase tracking-widest px-2 italic">Mercado de Aposta ({selectedMarketsList.filter(s => !!s).length})</label>
              <div className="flex flex-col gap-3">
                {selectedMarketsList.map((res, idx) => {
                   if (!res || !currentPrivateMarkets[idx]) return null;
                   return (
                    <div key={idx} className="bg-white border-2 border-gray-200 rounded-3xl p-5 flex flex-col gap-4 transition-all hover:border-[#FFB10A]/30 shadow-sm">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] md:text-xs font-black text-[#091747] uppercase tracking-widest italic">{currentPrivateMarkets[idx].name}</span>
                        <button 
                          onClick={() => {
                            const newPreds = [...selectedMarketsList];
                            newPreds[idx] = '';
                            setSelectedMarketsList(newPreds);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={3} />
                        </button>
                      </div>
                      <div className={cn(
                        "grid gap-2",
                        currentPrivateMarkets[idx].options(match).length <= 2 ? "grid-cols-2" : (currentPrivateMarkets[idx].options(match).length <= 6 ? "grid-cols-3" : "grid-cols-2")
                      )}>
                        {currentPrivateMarkets[idx].options(match).map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => {
                              const newPreds = [...selectedMarketsList];
                              newPreds[idx] = opt.id;
                              setSelectedMarketsList(newPreds);
                            }}
                            className={cn(
                              "py-3 px-1 rounded-2xl text-[8px] md:text-[10px] font-black border-2 transition-all uppercase tracking-tight text-center leading-tight whitespace-nowrap truncate",
                              res === opt.id
                                ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-md"
                                : "bg-white border-gray-100 text-gray-900 hover:border-[#FFB10A]"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-orange-50/50 p-5 rounded-3xl border border-orange-100">
              <div className="flex items-center justify-between mb-3 px-2">
                <label className="text-[10px] md:text-xs font-black text-gray-600 block uppercase tracking-widest italic">Valor (Kz)</label>
                <span className="text-[9px] md:text-[10px] font-black text-orange-500 uppercase tracking-widest italic">Comissão (50 Kz)</span>
              </div>
              <div className="relative group">
                <input 
                  type="number" 
                  value={betValue}
                  onChange={(e) => setBetValue(e.target.value)}
                  className="w-full bg-white border-2 border-orange-100 rounded-2xl py-4 px-6 text-2xl font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all shadow-sm italic"
                  placeholder="EX: 1000"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="w-[1px] h-6 bg-gray-100" />
                  <span className="text-[#FFB10A] font-black italic text-base">Kz</span>
                </div>
              </div>
              <p className="text-[8px] md:text-[9px] text-gray-400 mt-3 font-bold text-center uppercase tracking-tight italic">Escolha o valor da aposta para este desafio direto.</p>
            </div>
          </div>
        );
      }
      case 'Nacional': {
        const currentNacionalMarkets = isF1 ? F1_PRIVATE_MARKETS : (isBasketball ? BASKETBALL_PRIVATE_MARKETS : PRIVATE_MARKETS);
        return (
          <div className="flex flex-col gap-6 py-2">
            <div className="bg-[#091747] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -right-12 -top-12 w-44 h-44 bg-[#FFB10A]/10 rounded-full blur-3xl text-[#FFB10A]"
              >
                <Trophy className="w-full h-full opacity-10" />
              </motion.div>
              <div className="flex items-center justify-between relative z-10 mb-4">
                <div className="flex flex-col">
                  <h4 className="text-base font-black text-[#FFB10A] uppercase tracking-widest italic leading-tight">
                    {isF1 ? 'Rodada Nacional F1' : 'Rodada Nacional'}
                  </h4>
                  <span className="text-[9px] md:text-[10px] text-orange-200 font-bold uppercase tracking-widest">Desafio Oficial Duet</span>
                </div>
                {storageService.getBets().filter(b => b.matchId === match.id && b.category === 'Nacional').length > 0 && (
                  <button 
                    onClick={() => setBetAction('my_bets')}
                    className="text-[9px] md:text-[10px] font-black bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl uppercase tracking-tight backdrop-blur-md border border-white/10 transition-colors"
                  >
                    Tuas Rodadas
                  </button>
                )}
              </div>
              <div className="relative z-10 space-y-2">
                <p className="text-xs md:text-sm text-orange-50/70 leading-relaxed font-bold uppercase tracking-[0.05em] max-w-[90%]">
                  {isF1 ? (
                    <> Prevê a <span className="text-[#FFB10A]">classificação oficial</span> e sobe na classificação nacional!</>
                  ) : (
                    <> Prevê os <span className="text-[#FFB10A]">10 resultados</span> e sobe na classificação nacional!</>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[9px] md:text-[10px] font-black text-gray-400 mb-0 block uppercase tracking-widest px-2 italic">Teus Prognósticos</label>
              {currentNacionalMarkets.map((market, i) => {
                const options = (typeof market.options === 'function' ? market.options(match) : []) as any[];
                return (
                  <div key={i} className="flex flex-col gap-3 p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#FFB10A]/30 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-orange-50 text-[#FFB10A] text-[9px] md:text-[10px] font-black flex items-center justify-center border border-orange-100">{i + 1}</span>
                      <span className="text-[9px] md:text-[10px] font-black text-[#091747] uppercase tracking-widest italic">{market.name}</span>
                    </div>
                    <div className={cn(
                      "grid gap-2",
                      options.length <= 2 ? "grid-cols-2" : (options.length <= 6 ? "grid-cols-3" : "grid-cols-2")
                    )}>
                      {options.map((opt) => (
                        <button 
                          key={opt.id}
                          onClick={() => {
                            const newPreds = [...selectedMarketsList];
                            newPreds[i] = opt.id;
                            setSelectedMarketsList(newPreds);
                          }}
                          className={cn(
                            "py-2.5 text-[7px] md:text-[9px] font-black rounded-lg border-2 transition-all active:scale-95 px-1 uppercase tracking-tighter whitespace-nowrap truncate", 
                            selectedMarketsList[i] === opt.id ? "bg-[#FFB10A] border-[#FFB10A] text-white shadow-lg" : "bg-transparent border-gray-200 text-gray-500 hover:border-[#FFB10A]"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {isF1 && (
              <div className="flex flex-col gap-1 items-center justify-center p-3 bg-transparent rounded-2xl border-2 border-gray-200 mb-2">
                <p className="text-[10px] md:text-xs font-black text-[#091747] uppercase tracking-widest leading-none">
                  Valor Aposta: <span className="text-[#FFB10A]">250 Kz</span>
                </p>
                <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">
                  50 Kz (Taxa de Inscrição)
                </p>
              </div>
            )}

            <div className="flex items-center justify-between bg-orange-50/50 p-5 rounded-3xl border border-orange-100 mb-6">
              <div className="flex-1 pr-6 text-left">
                <h5 className="text-[10px] md:text-xs font-black text-[#091747] uppercase tracking-widest mb-1 italic">Confirmação Inteligente</h5>
                <p className="text-[8px] md:text-[9px] text-gray-500 font-bold leading-tight uppercase">Confirmar apenas se o prémio total superar 100.000 Kz</p>
              </div>
              <button 
                onClick={() => setAutoConfirmNacional(!autoConfirmNacional)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative flex items-center px-1 shrink-0",
                  autoConfirmNacional ? "bg-[#FFB10A]" : "bg-gray-300"
                )}
              >
                <motion.div 
                  animate={{ x: autoConfirmNacional ? 24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
            className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] md:rounded-[3rem] p-4 md:p-8 flex flex-col h-[85vh] md:h-auto md:max-h-[90vh] overflow-hidden border border-gray-200 shadow-xl"
          >
            {/* DRAG HANDLE FOR MOBILE */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-400 rounded-full md:hidden" />

            <div className="flex items-center justify-between mb-4 mt-1 shrink-0">
              <div className="flex items-center gap-2">
                {((betAction && !isSuccess) || showDeleteConfirm) && !showClassification && (
                  <button 
                    onClick={() => {
                      if (showDeleteConfirm) setShowDeleteConfirm(null);
                      else if (betAction === 'join' && joiningBet) setJoiningBet(null);
                      else if (betAction === 'bet_details') {
                        setBetAction('my_bets');
                        setSelectedBetId(null);
                      } else if (betAction === 'create' && createStep !== 'password' && activeTab !== 'Nacional') {
                        if (activeTab === 'Privado' && createStep === 'selection') setCreateStep('password');
                        else if (createStep === 'details') {
                          if (activeTab === 'Privado') setCreateStep('selection');
                          else setCreateStep('password');
                        }
                      } else {
                        setBetAction(null);
                      }
                    }}
                    className="w-8 h-8 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[3px]" />
                  </button>
                )}
                <div>
                  <h2 className="text-lg font-black text-[#091747] uppercase tracking-tighter leading-none italic">
                    {showDeleteConfirm ? 'Eliminar' : 
                     isSuccess ? 'Confirmado' :
                     betAction === 'join' ? 'Entrar' : 
                     betAction === 'my_bets' ? 'Minhas Apostas' :
                     betAction === 'bet_details' ? 'Detalhes' :
                     activeTab === 'Nacional' ? (betAction === 'create' ? 'Rodada Nacional' : 'Criar Nacional') : `Criar ${activeTab}`}
                  </h2>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-900 uppercase tracking-widest mt-0.5">
                    {match.league}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isSuccess && !showDeleteConfirm && LEAGUE_CLASSIFICATIONS[match.league] && (
                  <button 
                    onClick={() => setShowClassification(!showClassification)}
                    className={cn(
                      "w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center shadow-sm",
                      showClassification 
                        ? "bg-[#091747] border-[#091747] text-white" 
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                    )}
                    title="Classificação"
                  >
                    <List className="w-4 h-4 stroke-[2.5px]" />
                  </button>
                )}

                <button 
                  onClick={handleClose}
                  className="w-8 h-8 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-all font-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PROGRESS BAR FOR CREATE FLOW */}
            {betAction === 'create' && !isSuccess && steps.length > 1 && (
              <div className="flex gap-2 mb-6 px-1">
                {steps.map((s, idx) => (
                  <div 
                    key={s} 
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      idx <= currentStepIndex ? "bg-[#FFB10A] flex-[2]" : "bg-gray-300 flex-1"
                    )}
                  />
                ))}
              </div>
            )}

            <div ref={scrollRef} className="overflow-y-auto custom-scrollbar flex-1 -mr-2 pr-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${betAction}-${createStep}-${isSuccess}-${showDeleteConfirm}-${showClassification}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {betAction && (betAction === 'create' || betAction === 'join') && !isSuccess && !showClassification && (
              <div className="mt-6 flex flex-col gap-4 shrink-0">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white text-red-600 p-4 rounded-2xl flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-tight border-2 border-red-500"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={3} />
                    {error}
                  </motion.div>
                )}
                
                {betAction === 'create' && createStep !== 'details' && activeTab !== 'Nacional' ? (
                  <button 
                    onClick={() => {
                      setError('');
                      if (createStep === 'password') {
                        if (!createPassword || !confirmPassword) return setError('Preenche todos os campos!');
                        if (createPassword !== confirmPassword) return setError('As senhas não coincidem!');
                        if (createPassword.length < 4) return setError('Mínimo 4 caracteres!');
                        if (activeTab === 'Privado') setCreateStep('selection');
                        else setCreateStep('details');
                      } else if (createStep === 'selection') {
                        if (selectedMarketsList.filter(s => !!s).length < 1) return setError('Seleciona 1 mercado!');
                        setCreateStep('details');
                      }
                    }}
                    className="w-full bg-[#FFB10A] text-white font-black py-3.5 rounded-2xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs"
                  >
                    Próximo Passo
                  </button>
                ) : (
                  <button 
                    onClick={handleBet}
                    className={cn(
                      "w-full text-white font-black py-3.5 rounded-2xl transition-all active:scale-[0.98] uppercase tracking-widest text-xs",
                      getActionClass()
                    )}
                  >
                    {getActionText()}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function Aposta() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  const session = searchParams.get('session');
  const [activeTab, setActiveTab] = React.useState('1 vs 1');
  const [selectedGroup, setSelectedGroup] = React.useState('Todos');
  const [selectedGameStatus, setSelectedGameStatus] = React.useState('Todos');
  const [selectedMatch, setSelectedMatch] = React.useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Estados da Copa do Mundo persistidos no dispositivo
  const [wcLogo, setWcLogo] = React.useState<string>('');
  const [wcMatches, setWcMatches] = React.useState<Match[]>([]);
  const [wcTeams, setWcTeams] = React.useState<Record<string, any[]>>({});

  React.useEffect(() => {
    if (topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo') {
      setWcLogo(storageService.getWorldCupImage());
      setWcMatches(storageService.getWorldCupMatches());
      setWcTeams(storageService.getWorldCupTeams());
    }
  }, [topic]);
  const matchesRef = React.useRef<HTMLDivElement>(null);

  // Handle matchId from URL to open modal on load
  React.useEffect(() => {
    const matchId = searchParams.get('matchId');
    if (matchId) {
      const allMatches = [...MATCH_DATA, ...GIRABOLA_MATCHES, ...BUNDESLIGA_MATCHES, ...LALIGA_MATCHES, ...LIGUE1_MATCHES, ...EREDIVISIE_MATCHES, ...PREMIERLEAGUE_MATCHES, ...SERIEA_MATCHES, ...LIGANOS_MATCHES, ...TACADEANGOLA_MATCHES, ...TACADAALEMANHA_MATCHES, ...NBA_MATCHES, ...UNITEL_BASKET_MATCHES, ...ACB_MATCHES, ...VTB_MATCHES, ...GREEK_BASKET_MATCHES, ...ITALY_BASKET_MATCHES, ...JEEP_ELITE_MATCHES, ...BBL_MATCHES, ...F1_MATCHES, ...storageService.getWorldCupMatches()];
      let match = allMatches.find(m => m.id.toString() === matchId);
      if (match) {
        // Apply F1 league update if needed
        if (category === 'f1') {
          const sessionPrefix = session || 'Classificação';
          match = {
            ...match,
            league: topic ? `${sessionPrefix} ${topic}` : `${sessionPrefix} ${match.league}`
          };
        }
        setSelectedMatch(match);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

  const [wallet, setWallet] = React.useState<WalletType>(storageService.getWallet());
  const [profile] = React.useState<UserProfile>(storageService.getUserProfile());

  const [isLeagueFavorited, setIsLeagueFavorited] = React.useState(false);
  const leagueFavoriteId = topic ? `aposta-topic-${category}-${topic}` : `aposta-league-${category}`;

  React.useEffect(() => {
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsLeagueFavorited(favorites.some(f => f.id === leagueFavoriteId));
    };
    updateFavStatus();
    window.addEventListener('favoritesUpdated', updateFavStatus);
    return () => window.removeEventListener('favoritesUpdated', updateFavStatus);
  }, [leagueFavoriteId]);

  const toggleLeagueFavorite = () => {
    if (isLeagueFavorited) {
      storageService.deleteFavorite(leagueFavoriteId);
      setIsLeagueFavorited(false);
    } else {
      const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Aposta';
      storageService.saveFavorite({
        id: leagueFavoriteId,
        title: topic || categoryName,
        sub: topic ? `Aposta: ${categoryName}` : 'Torneio',
        type: 'league',
        path: `/aposta/${category}${topic ? `?topic=${topic}` : ''}`
      });
      setIsLeagueFavorited(true);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleUpdate = () => {
      setWallet(storageService.getWallet());
    };
    window.addEventListener('walletUpdated', handleUpdate);
    return () => window.removeEventListener('walletUpdated', handleUpdate);
  }, []);

  const handleOpenModal = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-[#FFB10A]" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 font-dancing text-xl font-bold text-[#FFB10A]"
            >
              A carregar...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIMPLE HEADER */}
      <div className="h-[46px] lg:h-[52px] bg-white border-b border-white px-4 md:px-8 sticky top-0 z-50">
        <div className="h-full max-w-5xl mx-auto flex items-center justify-between">
          <Link 
            id="aposta-back-button"
            to={`/liga/${category}`} 
            className="text-gray-400 hover:text-[#FFB10A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Link>
          <h1 className="text-base md:text-lg lg:text-xl font-semibold text-center truncate px-4">
            {category === 'f1' && session && topic ? `${session} ${topic}` : (topic || 'Duet Aposta')}
          </h1>
          <button 
            id="aposta-favorite-button"
            onClick={toggleLeagueFavorite}
            className={cn("transition-colors duration-300 p-1 rounded-lg", isLeagueFavorited ? "text-[#FFB10A]" : "text-gray-400 hover:text-[#FFB10A]")}
          >
            <Heart className={cn("w-5 h-5 lg:w-6 lg:h-6", isLeagueFavorited && "fill-current")} />
          </button>
        </div>
      </div>

      {/* TABBAR */}
      <div className="max-w-5xl mx-auto w-full px-4 md:px-8 pt-0">
        <div className="flex items-center justify-between border-b border-gray-100">
          {(['1 vs 1', 'Privado', 'Nacional'] as const).map((tab) => (
            <button
              id={`aposta-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setTimeout(() => {
                  if (matchesRef.current) {
                    const yOffset = -80;
                    const element = matchesRef.current;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }, 50);
              }}
              className={cn(
                "flex-1 py-3 text-center text-lg md:text-xl lg:text-2xl font-dancing font-bold transition-all border-b-2",
                activeTab === tab 
                  ? "text-[#FFB10A] border-[#FFB10A]" 
                  : "text-gray-600 border-transparent hover:text-[#FFB10A]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 pt-4 md:pt-8">
        <div className={cn(
          "flex justify-center my-10 lg:my-12",
          (topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo') && "bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        )}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={topic?.toLowerCase() === 'copa do mundo' ? wcLogo || getCompetitionLogo(topic) : getCompetitionLogo(topic)} 
            alt={topic || 'Angola Girabola'} 
            referrerPolicy="no-referrer"
            className={cn(
              "h-auto object-contain",
              category === 'basket' || category === 'f1'
                ? "w-full max-w-[21rem] md:max-w-[25.5rem] lg:max-w-[29.5rem]"
                : "w-full max-w-[24rem] md:max-w-[28rem] lg:max-w-[32rem]"
            )}
          />
        </div>
      </div>

      <div ref={matchesRef} className={cn(
        "max-w-6xl mx-auto w-full px-4 border-t border-gray-100 py-6 lg:py-8 flex flex-col md:flex-row gap-4 items-center",
        (topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo') ? "justify-between" : "justify-center"
      )}>
        <h1 className={cn(
          "font-dancing text-2xl md:text-3xl lg:text-3xl font-bold text-[#FFB10A] tracking-tight",
          !(topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo') && "text-center"
        )}>
          {activeTab === 'Nacional' ? 'Rodada Nacional' : activeTab === 'Privado' ? 'Grupos Privados' : 'Desafios 1 vs 1'}
        </h1>

        {(topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo') && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex items-center gap-2">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest italic">Grupo:</span>
              <div className="relative min-w-[130px]">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-4 pr-10 text-xs font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all appearance-none tracking-widest shadow-[#0000000a]_0px_10px_20px_0px uppercase italic"
                >
                  <option value="Todos">Todos</option>
                  <option value="Grupo A">Grupo A</option>
                  <option value="Grupo B">Grupo B</option>
                  <option value="Grupo C">Grupo C</option>
                  <option value="Grupo D">Grupo D</option>
                  <option value="Grupo E">Grupo E</option>
                  <option value="Grupo F">Grupo F</option>
                  <option value="Grupo G">Grupo G</option>
                  <option value="Grupo H">Grupo H</option>
                  <option value="Grupo I">Grupo I</option>
                  <option value="Grupo J">Grupo J</option>
                  <option value="Grupo K">Grupo K</option>
                  <option value="Grupo L">Grupo L</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={3} />
              </div>
            </div>

            <div className="relative flex items-center gap-2">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest italic">Jogos:</span>
              <div className="relative min-w-[130px]">
                <select
                  value={selectedGameStatus}
                  onChange={(e) => setSelectedGameStatus(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-4 pr-10 text-xs font-black text-[#091747] outline-none focus:border-[#FFB10A] transition-all appearance-none tracking-widest shadow-[#0000000a]_0px_10px_20px_0px uppercase italic"
                >
                  <option value="Todos">Todos</option>
                  <option value="Breve">Breve</option>
                  <option value="Ao Vivo">Ao Vivo</option>
                  <option value="Terminado">Terminado</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={3} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="flex flex-col gap-8 pb-16">
          {(() => {
            const baseMatches = 
              topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo' ? wcMatches :
              topic === 'Girabola' || topic === 'Taça de Angola' ? GIRABOLA_MATCHES :
              topic?.toLowerCase() === 'bundesliga' || topic === 'Taça da Alemanha' || topic === 'DFB Pokal' ? BUNDESLIGA_MATCHES :
              topic?.toLowerCase() === 'la liga' || topic === 'Taça de Espanha' || topic === 'Copa del Rey' ? LALIGA_MATCHES :
              topic?.toLowerCase() === 'ligue 1' || topic === 'Taça de França' || topic === 'Copa da França' ? LIGUE1_MATCHES :
              topic?.toLowerCase() === 'eredivisie' || topic === 'Taça da Holanda' || topic === 'KNVB Beker' ? EREDIVISIE_MATCHES :
              topic?.toLowerCase() === 'premier league' || topic?.toLowerCase() === 'premierleague' || topic === 'Taça de Inglaterra' || topic === 'FA Cup' ? PREMIERLEAGUE_MATCHES :
              topic?.toLowerCase() === 'serie a' || topic?.toLowerCase() === 'série a' || topic === 'Taça de Itália' || topic === 'TIM Cup' ? SERIEA_MATCHES :
              topic?.toLowerCase() === 'liga nos' || topic?.toLowerCase() === 'liga nos' || topic === 'Taça de Portugal' ? LIGANOS_MATCHES :
              topic === 'NBA' || topic === 'NBA EUA Leste' ? NBA_MATCHES :
              topic === 'Unitel Basket' ? UNITEL_BASKET_MATCHES :
              topic === 'Liga ACB' || topic === 'ACB' ? ACB_MATCHES :
              topic === 'VTB United League' || topic === 'VTB' || topic === 'Liga VTB' ? VTB_MATCHES :
              topic === 'Basket League' || topic === 'Filathli' ? GREEK_BASKET_MATCHES :
              topic === 'Serie A Basket' || topic === 'LBA' ? ITALY_BASKET_MATCHES :
              topic === 'Jeep Elite' || topic === 'LNB' ? JEEP_ELITE_MATCHES :
              topic === 'BBL Alemanha' || topic === 'BBL' ? BBL_MATCHES :
              category === 'f1' ? F1_MATCHES :
              category === 'basket' ? UNITEL_BASKET_MATCHES :
              MATCH_DATA;

            let matches = category === 'f1' ? baseMatches.map(m => {
              const sessionPrefix = session || 'Classificação';
              return {
                ...m,
                league: topic ? `${sessionPrefix} ${topic}` : `${sessionPrefix} ${m.league}`
              };
            }) : (category === 'futebol' ? baseMatches.filter(m => m.league !== 'Unitel Basket' && m.league !== 'NBA' && m.league !== 'Liga ACB' && m.league !== 'VTB United League' && m.league !== 'Basket League' && m.league !== 'Serie A Basket' && m.league !== 'Jeep Elite' && m.league !== 'BBL Alemanha') : baseMatches);

            if ((topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo') && selectedGroup !== 'Todos') {
              matches = matches.filter(m => m.league?.includes(selectedGroup));
            }

            if ((topic === 'Copa do Mundo' || topic?.toLowerCase() === 'copa do mundo') && selectedGameStatus !== 'Todos') {
              const statusMap: Record<string, string> = {
                'Ao Vivo': 'ao_vivo',
                'Breve': 'breve',
                'Terminado': 'terminou'
              };
              const targetStatus = statusMap[selectedGameStatus];
              if (targetStatus) {
                matches = matches.filter(m => m.status === targetStatus);
              }
            }

            const displayMatches = category === 'f1' ? matches.slice(0, 1) : matches;

            return (
              <div className={cn(
                "grid gap-6",
                category === 'f1' ? "grid-cols-1 max-w-2xl mx-auto w-full" : "grid-cols-1 md:grid-cols-2"
              )}>
                {displayMatches.map((match) => (
                  <MatchCard key={match.id} match={match} onClick={handleOpenModal} category={category} />
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      <BettingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        match={selectedMatch} 
        activeTab={activeTab} 
        category={category}
      />
    </div>
  );
}
