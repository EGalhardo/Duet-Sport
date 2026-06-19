import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Trophy, Flag, Heart, Search, Smile, MessageSquare, Volume2, X, Send, Play, Sparkles, AlertCircle, Headphones, Calendar, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { storageService } from "../services/storageService";
import { duetStore } from "../services/store";
import { useAppContext } from "../context/AppContext";
import { supabase } from "../lib/supabase";

const quickTexts = [
  "Vemo-nos no topo! 🚀 Tenta alcançar-me se fores capaz! 😎",
  "Mais sorte na próxima jornada! 🍀",
  "Freguês do DUET! 😄",
  "Estás quase lá, continua a tentar! 💪",
  "Hoje o pódio tem dono! 🏆",
  "A vista daqui de cima é fantástica! 😎",
  "Não te preocupes, um dia chegas aqui! 🚀",
  "A competição foi boa, mas eu fui melhor! 😏",
  "Obrigado pelos pontos extras! 😄",
  "Treina mais um pouco e voltamos a falar! 💪",
  "O topo é confortável, recomendo! 👑",
  "Ainda estás a aquecer? 🔥",
  "Foi uma vitória limpa e elegante! ✨",
  "O campeão passou por aqui! 🏅",
  "Hoje não havia concorrência! 😎",
  "Fiquei à tua espera, mas não chegaste! 😂",
  "Missão cumprida. Próximo desafio! 🎯",
  "A lenda continua! 🚀",
  "Nem o GPS te ajuda a encontrar-me! 🗺️😄",
  "Estou a colecionar vitórias! 🏆",
  "Boa tentativa, quase me assustaste! 😅",
  "O primeiro lugar já conhece o meu nome! 👑",
  "Continua a perseguir os teus sonhos... e a mim! 😎",
  "O segredo é simples: jogar e vencer! 🎮",
  "Hoje fui imparável! ⚡",
  "Fica tranquilo, há espaço para todos na classificação! 😄",
  "Mais uma vitória para a coleção! 🏅",
  "O desafio era difícil... para ti! 😂",
  "O topo ligou, disse que sente a minha falta quando saio! 🚀",
  "Até à próxima derrota... quero dizer, partida! 😜"
];

const audioEffects = [
  { id: 'riso01', label: 'Riso 01 (Anexado)', desc: 'Áudio Riso01 personalizado.', icon: '😆' },
  { id: 'riso02', label: 'Riso 02 (Anexado)', desc: 'Áudio Riso02 personalizado.', icon: '🤣' },
  { id: 'riso03', label: 'Riso 03 (Anexado)', desc: 'Áudio Riso03 personalizado.', icon: '😂' },
  { id: 'riso04', label: 'Riso 04 (Anexado)', desc: 'Áudio Riso04 personalizado.', icon: '😹' },
  { id: 'riso05', label: 'Riso 05 (Anexado)', desc: 'Áudio Riso05 personalizado.', icon: '🤭' },
  { id: 'riso06', label: 'Riso 06 (Anexado)', desc: 'Áudio Riso06 personalizado.', icon: '😏' },
];

const imojinCategories = [
  {
    id: 'celebrating',
    label: 'Festejar / Comemoração',
    emojis: [
      { emoji: '🏆', label: 'Taça', anim: 'animate-bounce [animation-duration:1s]' },
      { emoji: '🥳', label: 'Festa', anim: 'animate-pulse [animation-duration:0.8s]' },
      { emoji: '🔥', label: 'Fogo', anim: 'hover:scale-125 duration-300' },
      { emoji: '⚽', label: 'Golo', anim: 'animate-bounce [animation-duration:1.2s]' },
      { emoji: '👑', label: 'Coroa', anim: 'animate-pulse [animation-duration:1.5s]' },
    ]
  },
  {
    id: 'teasing',
    label: 'Provocação / Humor',
    emojis: [
      { emoji: '😜', label: 'Língua', anim: 'animate-bounce [animation-duration:0.6s]' },
      { emoji: '🤫', label: 'Shh', anim: 'animate-pulse' },
      { emoji: '😏', label: 'Prepotência', anim: 'animate-pulse' },
      { emoji: '😂', label: 'Risos', anim: 'animate-bounce [animation-duration:0.7s]' },
      { emoji: '👀', label: 'Olho', anim: 'animate-pulse [animation-duration:1s]' },
    ]
  },
  {
    id: 'console',
    label: 'Consolo / Empatia',
    emojis: [
      { emoji: '🤝', label: 'Respeito', anim: 'animate-pulse' },
      { emoji: '💪', label: 'Força', anim: 'animate-bounce [animation-duration:1.5s]' },
      { emoji: '🥺', label: 'Pedir', anim: 'animate-pulse' },
      { emoji: '👋', label: 'Saudação', anim: 'animate-pulse' },
      { emoji: '🍀', label: 'Sorte', anim: 'animate-spin [animation-duration:10s]' },
    ]
  }
];

interface RankingPlayer {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

// Generate an extended pool of realistic players to simulate a list of thousands that goes far beyond 30 entries
const baseNacional = [
  {
    id: 21,
    name: "Ricardo Dias",
    score: 150400,
    avatar: "https://i.pravatar.cc/150?u=21",
  },
  {
    id: 22,
    name: "Tiago Santos",
    score: 142300,
    avatar: "https://i.pravatar.cc/150?u=22",
  },
  {
    id: 23,
    name: "Andreia Cruz",
    score: 139100,
    avatar: "https://i.pravatar.cc/150?u=23",
  },
  {
    id: 24,
    name: "Nuno Alves",
    score: 128500,
    avatar: "https://i.pravatar.cc/150?u=24",
  },
  {
    id: 25,
    name: "Beatriz Vaz",
    score: 125000,
    avatar: "https://i.pravatar.cc/150?u=25",
  },
  {
    id: 26,
    name: "Gonçalo Pinheiro",
    score: 122000,
    avatar: "https://i.pravatar.cc/150?u=26",
  },
  {
    id: 27,
    name: "Leonor Guerra",
    score: 119000,
    avatar: "https://i.pravatar.cc/150?u=27",
  },
  {
    id: 28,
    name: "Miguel Faria",
    score: 115000,
    avatar: "https://i.pravatar.cc/150?u=28",
  },
  {
    id: 29,
    name: "Raquel Sobral",
    score: 112000,
    avatar: "https://i.pravatar.cc/150?u=29",
  },
  {
    id: 30,
    name: "Tomás Veiga",
    score: 109000,
    avatar: "https://i.pravatar.cc/150?u=30",
  },
];

const extraFirstNames = [
  "Edmilson",
  "Valter",
  "Cristiano",
  "Hélder",
  "Sérgio",
  "Cláudio",
  "Nelson",
  "Diogo",
  "Fábio",
  "André",
  "Luís",
  "Mateus",
  "Gabriel",
  "Marcos",
  "Paulo",
  "Daniel",
  "Rafael",
  "Bruno",
  "Alexandre",
  "Fernando",
  "Samuel",
  "Inês",
  "Joana",
  "Beatriz",
  "Marta",
  "Sara",
  "Filipa",
  "Cláudia",
  "Patrícia",
  "Soraia",
  "Sandra",
  "Carla",
  "Rita",
  "Teresa",
  "Francisca",
  "Mariana",
  "Leonor",
  "Cátia",
  "Vânia",
  "Sílvia",
];
const extraLastNames = [
  "Neto",
  "Kipungo",
  "Gouveia",
  "Mateus",
  "Lourenço",
  "Sebastião",
  "Eduardo",
  "Oliveira",
  "Cabral",
  "Teixeira",
  "Cardoso",
  "Moreira",
  "Barbosa",
  "Rufino",
  "Rodrigues",
  "Fernandes",
  "Silva",
  "Santos",
  "Ferreira",
  "Costa",
  "Sousa",
  "Gomes",
  "Lopes",
  "Marques",
  "Alves",
  "Mendes",
  "Pinto",
  "Castro",
  "Ribeiro",
];

const extraPlayers = Array.from({ length: 40 }, (_, idx) => {
  const fn = extraFirstNames[idx % extraFirstNames.length];
  const ln = extraLastNames[(idx * 7) % extraLastNames.length];
  const score = 105000 - idx * 2150;
  const id = 100 + idx;
  return {
    id,
    name: `${fn} ${ln}`,
    score,
    avatar: `https://i.pravatar.cc/150?u=${id}`,
  };
});

const fullNacional = [...baseNacional, ...extraPlayers].sort(
  (a, b) => b.score - a.score,
);

const userParticipatedBets = [
  {
    id: "petro_vs_agosto",
    category: "Futebol",
    matchNickname: "Petro vs 1º de Agosto",
    date: "2026-06-03",
    p1: {
      name: "João Silva",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      betOn: "Petro de Luanda",
      betLogo: "https://i.postimg.cc/Cnntg6fx/PETRO-LUANDA-ANGOLA.png"
    },
    p2: {
      name: "Pedro Costa",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      betOn: "Primeiro de Agosto",
      betLogo: "https://i.postimg.cc/rRRbkYR7/1-AGOSTO-ANGOLA.png"
    },
    score: "3 - 1",
    winnerName: "João Silva",
    winnerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    prize: "+10.000 Kz"
  },
  {
    id: "interclube_vs_asa",
    category: "Futebol",
    matchNickname: "GD Interclube vs AS Aviação",
    date: "2026-06-02",
    p1: {
      name: "Carlos Mendes",
      avatar: "https://i.pravatar.cc/150?u=2",
      betOn: "GD Interclube",
      betLogo: "https://i.postimg.cc/bSSMhF2j/GD-INTERCLUBE-ANGOLA.png"
    },
    p2: {
      name: "Sofia Lopes",
      avatar: "https://i.pravatar.cc/150?u=3",
      betOn: "AS Aviação",
      betLogo: "https://i.postimg.cc/8ff3Snf2/AS-Aviacao-ANGOLA.png"
    },
    score: "2 - 2 (4-5 gp)",
    winnerName: "Sofia Lopes",
    winnerAvatar: "https://i.pravatar.cc/150?u=3",
    prize: "+15.000 Kz"
  },
  {
    id: "vila_clotilde_vs_academia",
    category: "Basket",
    matchNickname: "Vila Clotilde vs Académica",
    date: "2026-06-01",
    p1: {
      name: "Rui Santos",
      avatar: "https://i.pravatar.cc/150?u=4",
      betOn: "Vila Clotilde",
      betLogo: "https://i.postimg.cc/gLL5WB6x/VILA-CLOLTIDE-ANGOLA.png"
    },
    p2: {
      name: "Marta Costa",
      avatar: "https://i.pravatar.cc/150?u=5",
      betOn: "1º de Agosto Acad." ,
      betLogo: "https://i.postimg.cc/mz5qKGhs/1-AGOSTO-ACAD-ANGOLA.png"
    },
    score: "0 - 1",
    winnerName: "Marta Costa",
    winnerAvatar: "https://i.pravatar.cc/150?u=5",
    prize: "+8.000 Kz"
  },
  {
    id: "petro_vs_agosto_basket",
    category: "Basket",
    matchNickname: "Petro Basket vs 1º de Agosto Basket",
    date: "2026-06-05",
    p1: {
      name: "Daniel Silva",
      avatar: "https://i.pravatar.cc/150?u=33",
      betOn: "Petro de Luanda",
      betLogo: "https://i.postimg.cc/Cnntg6fx/PETRO-LUANDA-ANGOLA.png"
    },
    p2: {
      name: "Fábio Eduardo",
      avatar: "https://i.pravatar.cc/150?u=34",
      betOn: "Primeiro de Agosto",
      betLogo: "https://i.postimg.cc/rRRbkYR7/1-AGOSTO-ANGOLA.png"
    },
    score: "78 - 84",
    winnerName: "Fábio Eduardo",
    winnerAvatar: "https://i.pravatar.cc/150?u=34",
    prize: "+14.000 Kz"
  },
  {
    id: "gp_monaco",
    category: "F1",
    matchNickname: "GP de Mónaco (Hamilton vs Verstappen)",
    date: "2026-05-31",
    p1: {
      name: "Nuno Alves",
      avatar: "https://i.pravatar.cc/150?u=24",
      betOn: "Lewis Hamilton",
      betLogo: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=150"
    },
    p2: {
      name: "Gonçalo Pinheiro",
      avatar: "https://i.pravatar.cc/150?u=26",
      betOn: "Max Verstappen",
      betLogo: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=150"
    },
    score: "P1 - P2",
    winnerName: "Nuno Alves",
    winnerAvatar: "https://i.pravatar.cc/150?u=24",
    prize: "+20.000 Kz"
  },
  {
    id: "gp_monza",
    category: "F1",
    matchNickname: "GP de Monza (Leclerc vs Norris)",
    date: "2026-06-07",
    p1: {
      name: "Luís Gomes",
      avatar: "https://i.pravatar.cc/150?u=13",
      betOn: "Charles Leclerc",
      betLogo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=150"
    },
    p2: {
      name: "Beatriz Vaz",
      avatar: "https://i.pravatar.cc/150?u=25",
      betOn: "Lando Norris",
      betLogo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=150"
    },
    score: "P1 - P3",
    winnerName: "Luís Gomes",
    winnerAvatar: "https://i.pravatar.cc/150?u=13",
    prize: "+18.000 Kz"
  }
];

export default function Classificacao() {
  const [activeTab, setActiveTab] = useState<"1 vs 1" | "Privado" | "Nacional">(
    "1 vs 1",
  );
  const [selectedSport, setSelectedSport] = useState<string>("Futebol");
  const [isSportDropdownOpen, setIsSportDropdownOpen] = useState<boolean>(false);
  const [selectedBetId, setSelectedBetId] = useState<string>("petro_vs_agosto");
  const [selectedDate, setSelectedDate] = useState<string>("2026-06-03");

  const filteredBetsBySport = React.useMemo(() => {
    return userParticipatedBets.filter(
      (bet) => bet.category.toLowerCase() === selectedSport.toLowerCase()
    );
  }, [selectedSport]);

  const availableDates = React.useMemo(() => {
    const matchingBets = userParticipatedBets.filter(
      (bet) =>
        bet.category.toLowerCase() === selectedSport.toLowerCase() &&
        bet.id === selectedBetId
    );
    return Array.from(new Set(matchingBets.map((b) => b.date)));
  }, [selectedSport, selectedBetId]);

  // Sincronizar selectedBetId quando a categoria mudar
  useEffect(() => {
    const betsForSport = userParticipatedBets.filter(
      (bet) => bet.category.toLowerCase() === selectedSport.toLowerCase()
    );
    if (betsForSport.length > 0) {
      const currentExists = betsForSport.some((b) => b.id === selectedBetId);
      if (!currentExists) {
        setSelectedBetId(betsForSport[0].id);
      }
    } else {
      setSelectedBetId("");
    }
  }, [selectedSport]);

  // Sincronizar selectedDate quando selectedBetId ou selectedSport mudar
  useEffect(() => {
    const matchingBets = userParticipatedBets.filter(
      (bet) =>
        bet.category.toLowerCase() === selectedSport.toLowerCase() &&
        bet.id === selectedBetId
    );
    if (matchingBets.length > 0) {
      const currentExists = matchingBets.some((b) => b.date === selectedDate);
      if (!currentExists) {
        setSelectedDate(matchingBets[0].date);
      }
    } else {
      setSelectedDate("");
    }
  }, [selectedBetId, selectedSport]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const favoriteId = "page-ranking";
  
  const { auth } = useAppContext();
  const [dbRankings, setDbRankings] = useState<any[]>([]);

  // Carregar dados REAIS da Base de Dados
  useEffect(() => {
    const fetchRankings = async () => {
      // Pedimos ao Supabase todos os perfis reais criados e os seus pontos de Carteira
      // (Neste sistema simularemos o SCORE como sendo o Balance total na carteira + um multiplicador para testar)
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('id, name, avatar');
          
        if (profiles) {
          const { data: wallets } = await supabase.from('wallets').select('user_id, balance');
          
          let joinedData = profiles.map(p => {
             const w = wallets?.find(w => w.user_id === p.id);
             return {
                id: p.id,
                name: p.name || 'Apostador',
                avatar: p.avatar || "https://i.postimg.cc/mD7Pr65C/Avatar.png",
                score: w ? Number(w.balance) : 0,
                isCurrentUser: auth.user?.id === p.id
             }
          });
          
          joinedData.sort((a, b) => b.score - a.score);
          setDbRankings(joinedData);
        }
      } catch(err) {
        console.error(err);
      }
    };
    
    fetchRankings();
  }, [auth.user]);

  // User profile and reactive state hooks for "Enviar Imojin"
  const [userProfile, setUserProfile] = useState(() => storageService.getUserProfile());
  const uName = userProfile.name || "Utilizador";
  const uAvatar = userProfile.photo || "https://i.postimg.cc/mD7Pr65C/Avatar.png";

  useEffect(() => {
    const handleProfileUpdate = () => {
      setUserProfile(storageService.getUserProfile());
    };
    window.addEventListener('userProfileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('userProfileUpdated', handleProfileUpdate);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetPlayer, setTargetPlayer] = useState<any | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"text" | "audio" | "imojin">("text");

  const [writtenMessage, setWrittenMessage] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [selectedImojin, setSelectedImojin] = useState("");

  const [activeImojinBurst, setActiveImojinBurst] = useState<{
    playerId: number;
    emoji: string;
    particles: { id: number; emoji: string; delay: number; x: number; y: number; rotate: number }[];
  } | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const playingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (toastMsg) {
      const t = setTimeout(() => setToastMsg(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toastMsg]);

  // Stop playing audio when modal closes or active tab changes
  useEffect(() => {
    if (!isModalOpen || activeModalTab !== 'audio') {
      if (playingAudioRef.current) {
        try {
          playingAudioRef.current.pause();
          playingAudioRef.current.currentTime = 0;
        } catch (e) {
          // ignore
        }
        playingAudioRef.current = null;
      }
    }
  }, [isModalOpen, activeModalTab]);

  useEffect(() => {
    return () => {
      if (playingAudioRef.current) {
        try {
          playingAudioRef.current.pause();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Dynamic sound generator using Web Audio API (100% reliable)
  const playSynthesizedSound = (soundType: string) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      if (soundType === 'whistle') {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(50, ctx.currentTime);
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(20, ctx.currentTime);
        
        osc2.connect(osc2Gain);
        osc2Gain.connect(osc.frequency);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime + 0.35);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        osc2.start();
        osc.stop(ctx.currentTime + 0.4);
        osc2.stop(ctx.currentTime + 0.4);
      } else if (soundType === 'cheer') {
        const bufferSize = ctx.sampleRate * 2.0;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(750, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.25);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        noise.start();
      } else if (soundType === 'laugh') {
        const now = ctx.currentTime;
        [0, 0.12, 0.24, 0.36, 0.48].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(260 - idx * 20, now + delay);
          osc.frequency.exponentialRampToValueAtTime(90, now + delay + 0.08);
          
          gainNode.gain.setValueAtTime(0, now + delay);
          gainNode.gain.linearRampToValueAtTime(0.18, now + delay + 0.02);
          gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.09);
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(700, now + delay);
          
          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start(now + delay);
          osc.stop(now + delay + 0.1);
        });
      } else if (soundType === 'fanfare') {
        const now = ctx.currentTime;
        const notes = [
          { note: 261.63, start: 0, duration: 0.12 },
          { note: 329.63, start: 0.12, duration: 0.12 },
          { note: 392.00, start: 0.24, duration: 0.12 },
          { note: 523.25, start: 0.36, duration: 0.35 }
        ];
        notes.forEach(({ note, start, duration }) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note, now + start);
          gainNode.gain.setValueAtTime(0, now + start);
          gainNode.gain.linearRampToValueAtTime(0.15, now + start + 0.02);
          gainNode.gain.linearRampToValueAtTime(0.15, now + start + duration - 0.04);
          gainNode.gain.linearRampToValueAtTime(0, now + start + duration);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start(now + start);
          osc.stop(now + start + duration);
        });
      } else if (soundType === 'horn') {
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(220, now);
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(225, now);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gainNode.gain.setValueAtTime(0.2, now + 0.6);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.7);
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.7);
        osc2.stop(now + 0.7);
      } else if (soundType === 'applause') {
        const now = ctx.currentTime;
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(900, now);
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.12, now);
        for (let t = 0; t < 1.5; t += 0.08) {
          gainNode.gain.setValueAtTime(0.08 + Math.random() * 0.1, now + t);
        }
        gainNode.gain.linearRampToValueAtTime(0, now + 1.5);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        noise.start(now);
      } else if (soundType === 'boo') {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.8);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.15);
        gainNode.gain.setValueAtTime(0.15, now + 0.6);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, now);
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.8);
      } else if (soundType === 'drumroll') {
        const now = ctx.currentTime;
        for (let i = 0; i < 12; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(110 + Math.random() * 20, now + i * 0.05);
          gain.gain.setValueAtTime(0.15 - (i * 0.005), now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.04);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.04);
        }
      } else if (soundType === 'whistle_triple') {
        const now = ctx.currentTime;
        [0, 0.25, 0.5].forEach((delay) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1200, now + delay);
          gainNode.gain.setValueAtTime(0, now + delay);
          gainNode.gain.linearRampToValueAtTime(0.2, now + delay + 0.02);
          gainNode.gain.setValueAtTime(0.2, now + delay + 0.12);
          gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.15);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.15);
        });
      } else if (soundType === 'stadium_chant') {
        const now = ctx.currentTime;
        [150, 155, 160].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.1, now + 0.2);
          gainNode.gain.setValueAtTime(0.1, now + 1.2);
          gainNode.gain.linearRampToValueAtTime(0, now + 1.5);
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(300, now);
          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.5);
        });
      } else if (soundType === 'applause_rhythm') {
        const now = ctx.currentTime;
        [0, 0.2, 0.4, 0.6, 0.8, 1.0].forEach((delay) => {
          const bufferSize = ctx.sampleRate * 0.08;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1000, now + delay);
          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0.15, now + delay);
          gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.08);
          noise.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          noise.start(now + delay);
        });
      } else if (soundType === 'bell_winner') {
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(880, now);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1200, now);
        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.2);
        osc2.stop(now + 1.2);
      } else if (soundType === 'laughter_giggle' || soundType.startsWith('riso')) {
         const now = ctx.currentTime;
         [0, 0.1, 0.2, 0.3].forEach((delay, idx) => {
           const osc = ctx.createOscillator();
           const gainNode = ctx.createGain();
           osc.type = 'sine';
           osc.frequency.setValueAtTime(350 + idx * 30, now + delay);
           osc.frequency.exponentialRampToValueAtTime(200, now + delay + 0.07);
           gainNode.gain.setValueAtTime(0.12, now + delay);
           gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.07);
           osc.connect(gainNode);
           gainNode.connect(ctx.destination);
           osc.start(now + delay);
           osc.stop(now + delay + 0.08);
         });
      } else if (soundType === 'fail') {
        const now = ctx.currentTime;
        const notes = [
          { freq: 220, start: 0, duration: 0.25 },
          { freq: 207, start: 0.28, duration: 0.25 },
          { freq: 196, start: 0.56, duration: 0.25 },
          { freq: 174, start: 0.84, duration: 0.6 }
        ];
        notes.forEach(({ freq, start, duration }) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + start);
          if (start === 0.84) {
            osc.frequency.linearRampToValueAtTime(freq - 15, now + start + duration);
          }
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(400, now + start);
          filter.frequency.exponentialRampToValueAtTime(800, now + start + 0.1);
          filter.frequency.exponentialRampToValueAtTime(300, now + start + duration);
          gainNode.gain.setValueAtTime(0, now + start);
          gainNode.gain.linearRampToValueAtTime(0.15, now + start + 0.05);
          gainNode.gain.linearRampToValueAtTime(0, now + start + duration);
          osc.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start(now + start);
          osc.stop(now + start + duration);
        });
      }
    } catch (e) {
      console.warn("Áudio não suportado no ambiente actual: ", e);
    }
  };

  // Play real high-quality .mp3 audio effects with robust fallback to synthesis
  const playAudioEffect = (soundType: string) => {
    try {
      // Stop previously playing audio
      if (playingAudioRef.current) {
        try {
          playingAudioRef.current.pause();
          playingAudioRef.current.currentTime = 0;
        } catch (e) {
          // ignore
        }
        playingAudioRef.current = null;
      }

      const urls: Record<string, string> = {
        whistle: 'https://www.soundjay.com/misc/sounds/referee-whistle-01.mp3',
        whistle_triple: 'https://www.soundjay.com/misc/sounds/referee-whistle-01.mp3',
        cheer: 'https://www.soundjay.com/human/sounds/crowd-cheer-02.mp3',
        stadium_chant: 'https://www.soundjay.com/human/sounds/crowd-cheer-01.mp3',
        laugh: 'https://www.soundjay.com/human/sounds/laughter-02.mp3',
        laughter_giggle: 'https://www.soundjay.com/human/sounds/laughter-01.mp3',
        fanfare: 'https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3',
        horn: 'https://www.soundjay.com/misc/sounds/air-horn-01.mp3',
        applause: 'https://www.soundjay.com/human/sounds/applause-01.mp3',
        applause_rhythm: 'https://www.soundjay.com/human/sounds/applause-03.mp3',
        boo: 'https://www.soundjay.com/human/sounds/boo-01.mp3',
        drumroll: 'https://www.soundjay.com/misc/sounds/drum-roll-01.mp3',
        bell_winner: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3',
        fail: 'https://www.soundjay.com/misc/sounds/fail-trumpet-01.mp3',
        riso01: '/audio/Riso01.mp3',
        riso02: '/audio/Riso02.mp3',
        riso03: '/audio/Riso03.mp3',
        riso04: '/audio/Riso04.mp3',
        riso05: '/audio/Riso05.mp3',
        riso06: '/audio/Riso06.mp3',
      };

      const fallbackUrls: Record<string, string> = {
        riso01: 'https://www.soundjay.com/human/sounds/laughter-01.mp3',
        riso02: 'https://www.soundjay.com/human/sounds/laughter-02.mp3',
        riso03: 'https://www.soundjay.com/human/sounds/laughter-01.mp3',
        riso04: 'https://www.soundjay.com/human/sounds/laughter-02.mp3',
        riso05: 'https://www.soundjay.com/human/sounds/laughter-01.mp3',
        riso06: 'https://www.soundjay.com/human/sounds/laughter-02.mp3',
      };

      if (soundType === 'whistle_triple') {
        const playOne = (delay: number) => {
          setTimeout(() => {
            const audio = new Audio(urls.whistle);
            audio.volume = 0.55;
            audio.play().catch(() => {
              if (delay === 0) playSynthesizedSound('whistle_triple');
            });
          }, delay);
        };
        playOne(0);
        playOne(250);
        playOne(500);
        return;
      }

      const audioUrl = urls[soundType];
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        playingAudioRef.current = audio;
        audio.volume = 0.55;
        audio.play().catch((err) => {
          const fallbackUrl = fallbackUrls[soundType];
          if (fallbackUrl) {
            const fallbackAudio = new Audio(fallbackUrl);
            playingAudioRef.current = fallbackAudio;
            fallbackAudio.volume = 0.55;
            fallbackAudio.play().catch(() => {
              playSynthesizedSound(soundType);
            });
          } else {
            console.warn("Permissão de áudio pendente ou falha de rede; reproduzindo áudio sintetizado:", err);
            playSynthesizedSound(soundType);
          }
        });
      } else {
        playSynthesizedSound(soundType);
      }
    } catch (e) {
      console.warn("Reprodução HTML5 Audio não suportada; usando áudio sintetizado como fallback:", e);
      playSynthesizedSound(soundType);
    }
  };

  const handleSendInteraction = () => {
    if (!targetPlayer) return;
    
    if (activeModalTab === 'audio' && selectedAudio) {
      playAudioEffect(selectedAudio);
    } else if (activeModalTab === 'imojin') {
      playAudioEffect('fanfare');
    } else {
      playAudioEffect('laughter_giggle');
    }
    
    let successMsg = "";
    let emojiToSend = "🎉";
    
    if (activeModalTab === 'text') {
      successMsg = `Mensagem enviada para ${targetPlayer.name}: "${writtenMessage || 'Olá!'}"`;
      emojiToSend = "💬";
    } else if (activeModalTab === 'audio') {
      const audioLabel = audioEffects.find(a => a.id === selectedAudio)?.label || "Efeito sonoro";
      successMsg = `Som "${audioLabel}" enviado para ${targetPlayer.name}!`;
      emojiToSend = "🔊";
    } else if (activeModalTab === 'imojin') {
      successMsg = `Imojin ${selectedImojin || '🏆'} enviado para ${targetPlayer.name} com sucesso!`;
      emojiToSend = selectedImojin || "🥳";
    }
    
    // Create floating interactive effects next to the row
    const particlesCount = 18;
    const particles = Array.from({ length: particlesCount }, (_, idx) => ({
      id: idx,
      emoji: emojiToSend,
      delay: idx * 0.06,
      x: (Math.random() - 0.5) * 160,
      y: -50 - Math.random() * 150,
      rotate: (Math.random() - 0.5) * 160,
    }));
    
    setActiveImojinBurst({
      playerId: targetPlayer.id,
      emoji: emojiToSend,
      particles
    });
    
    setTimeout(() => {
      setActiveImojinBurst(null);
    }, 4000);
    
    setToastMsg(successMsg);
    setIsModalOpen(false);
    setWrittenMessage("");
    setSelectedAudio("");
    setSelectedImojin("");
  };

  const currentRankings = React.useMemo(() => {
    // SE TEMOS DADOS DA NUVEM (SUPABASE) UTILIZA-OS:
    if (dbRankings && dbRankings.length > 0) {
      if (activeTab === 'Nacional') {
         // Filtra apenas os milionários (quem tem mais que 15.000 para o painel Nacional, ou o utilizador local)
         return dbRankings.filter(r => r.score >= 5000 || r.isCurrentUser);
      }
      return dbRankings;
    }

    // FALLBACK: O MOCK ANTIGO SE ESTIVERMOS OFFLINE
    const rawRankings = duetStore.getRankings(activeTab);
    return rawRankings.map((u, idx) => ({
      id: u.id === 'user_1' ? 999999 : (typeof u.id === 'number' ? u.id : parseInt(u.id.replace('user_', '')) || (idx + 100)),
      name: u.name,
      score: u.id === 'user_1' 
        ? (activeTab === "1 vs 1"
          ? 5000 + (u.stats.totalWon * 150) - (u.stats.totalLost * 50) + Math.floor(u.stats.winRate * 25)
          : activeTab === "Privado"
            ? 10000 + (u.stats.totalWon * 350) - (u.stats.totalLost * 100)
            : u.score)
        : u.score,
      avatar: u.avatar || u.photo || "https://i.postimg.cc/mD7Pr65C/Avatar.png",
      isCurrentUser: u.id === 'user_1'
    })).sort((a, b) => b.score - a.score);
  }, [activeTab, userProfile, dbRankings]);

  // Filter rankings based on search term (case-insensitive)
  const filteredRankings = currentRankings.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedRankings = filteredRankings;

  const activeBet = React.useMemo(() => {
    const bet = userParticipatedBets.find(
      (b) =>
        b.category.toLowerCase() === selectedSport.toLowerCase() &&
        b.id === selectedBetId &&
        b.date === selectedDate
    );
    return bet || userParticipatedBets.find((b) => b.id === selectedBetId) || userParticipatedBets[0];
  }, [selectedSport, selectedBetId, selectedDate]);

  // Reset search term when switching tabs
  useEffect(() => {
    setSearchTerm("");
  }, [activeTab]);

  useEffect(() => {
    const updateFavStatus = () => {
      const favorites = storageService.getFavorites();
      setIsFavorited(favorites.some((f) => f.id === favoriteId));
    };
    updateFavStatus();
    window.addEventListener("favoritesUpdated", updateFavStatus);
    return () =>
      window.removeEventListener("favoritesUpdated", updateFavStatus);
  }, []);

  const toggleFavorite = () => {
    if (isFavorited) {
      storageService.deleteFavorite(favoriteId);
      setIsFavorited(false);
    } else {
      storageService.saveFavorite({
        id: favoriteId,
        title: "Classificação",
        sub: "Ver melhores resultados",
        type: "league",
        path: "/classificacao",
      });
      setIsFavorited(true);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
          <Link
            to="/"
            className="text-black transition-colors duration-300 hover:text-[#FFB10A]"
          >
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">
            Classificação
          </h2>
          <button
            onClick={toggleFavorite}
            className={cn(
              "transition-colors duration-300",
              isFavorited
                ? "text-[#FFB10A]"
                : "text-black hover:text-[#FFB10A]",
            )}
          >
            <Heart
              className={cn(
                "w-6 h-6 md:w-7 md:h-7",
                isFavorited && "fill-current",
              )}
            />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-16 pb-12">
        <div className="text-center mb-16">
          <img
            src="https://i.postimg.cc/DZRRQ8NF/Taca-58.gif"
            alt="Taça"
            className="mx-auto w-80 md:w-[480px] h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
          <h1 className="mt-10 text-2xl md:text-3xl font-bold text-[#091747] tracking-tight">
            Classificação
          </h1>
          <p className="mt-4 text-[#364153] font-bold">Top 10 Classificados</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="period-tabbar flex bg-transparent border-2 border-gray-200 p-1 rounded-2xl w-full max-w-sm">
            {["1 vs 1", "Privado", "Nacional"].map((period) => (
              <button
                key={period}
                onClick={() => setActiveTab(period as any)}
                className={cn(
                  "flex-1 py-2 text-xs font-black rounded-xl transition-all",
                  activeTab === period
                    ? "bg-[#FFB10A] text-white shadow-sm"
                    : "text-[#364153] hover:text-[#091747]",
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="bg-[#FFB10A] px-1.5 xs:px-2.5 md:px-5 py-2.5 md:py-4 text-white font-bold flex flex-row flex-nowrap items-center justify-between gap-1 md:gap-4 w-full overflow-x-hidden md:overflow-x-visible">
              <div className="flex items-center gap-1 shrink-0">
                <Trophy className="w-4 h-4 text-white shrink-0 fill-amber-200/20 hidden sm:inline" />
                {/* Dropdown Esporte Customizado e Lindo */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSportDropdownOpen(!isSportDropdownOpen)}
                    className="flex items-center gap-0.5 xs:gap-1 bg-white/20 hover:bg-white/30 border-2 border-white/90 px-1.5 xs:px-2.5 py-0.5 xs:py-1 rounded-full transition-all shrink-0 font-sans font-black text-[9px] md:text-[10px] xs:text-xs md:text-sm text-white uppercase tracking-tight cursor-pointer select-none shadow-sm"
                  >
                    <span>
                      {selectedSport === "Futebol" ? "Futebol" : selectedSport === "Basket" ? "Basket" : "F1"}
                    </span>
                    <ChevronDown className={cn("w-2.5 h-2.5 xs:w-3 transition-transform duration-200", isSportDropdownOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isSportDropdownOpen && (
                      <>
                        {/* Invisible click-away backplate */}
                        <div 
                          className="fixed inset-0 z-40 bg-transparent cursor-default" 
                          onClick={() => setIsSportDropdownOpen(false)} 
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200/60 py-2 z-50 overflow-hidden divide-y divide-slate-100"
                        >
                          {[
                            { value: "Futebol", label: "⚽ Futebol" },
                            { value: "Basket", label: "🏀 Basket" },
                            { value: "F1", label: "🏎️ F1" }
                          ].map((sport) => (
                            <button
                              key={sport.value}
                              type="button"
                              onClick={() => {
                                setSelectedSport(sport.value);
                                setIsSportDropdownOpen(false);
                              }}
                              className={cn(
                                "w-full px-4 py-2.5 text-left text-xs md:text-sm font-black uppercase tracking-tight transition-all flex items-center justify-between gap-2",
                                selectedSport === sport.value
                                  ? "bg-amber-500 text-white font-black"
                                  : "text-slate-800 hover:bg-slate-50 hover:text-[#0c1e56]"
                              )}
                            >
                              <span>{sport.label}</span>
                              {selectedSport === sport.value && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex flex-row items-center gap-1 sm:gap-3 flex-nowrap shrink-0">
                {/* Dropdown com os jogos com borda de 2px e fundo mais destacado */}
                <div className="flex items-center bg-white/20 hover:bg-white/30 border-2 border-white px-1.5 xs:px-2.5 py-0.5 xs:py-1 rounded-full transition-all shrink-0 shadow-sm col-span-1">
                  <span className="text-[9px] md:text-[10px] font-black text-white mr-1.5 uppercase tracking-tight hidden sm:inline">Jogo:</span>
                  <select
                    value={selectedBetId}
                    onChange={(e) => setSelectedBetId(e.target.value)}
                    className="bg-transparent font-sans font-black text-[9px] md:text-[10px] xs:text-xs text-white outline-none cursor-pointer border-none p-0 pr-3.5 [color-scheme:dark] select-none text-right appearance-none truncate max-w-[70px] xs:max-w-[120px] sm:max-w-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right center",
                      backgroundSize: "6px"
                    }}
                  >
                    {filteredBetsBySport.map((bet) => (
                      <option key={bet.id} value={bet.id} className="text-slate-800 font-bold text-xs bg-white">
                        {bet.matchNickname}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dropdown de Data com borda de 2px e fundo mais destacado (substituindo o selector de input de data antigo) */}
                <div className="flex items-center bg-white/20 hover:bg-white/30 border-2 border-white px-1.5 xs:px-2.5 py-0.5 xs:py-1 rounded-full transition-all shrink-0 shadow-sm">
                  <Calendar className="w-3 h-3 text-white mr-1 shrink-0 hidden sm:inline" />
                  <span className="text-[9px] md:text-[10px] font-black text-white mr-1.5 uppercase tracking-tight hidden sm:inline">Data:</span>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent font-sans font-black text-[9px] md:text-[10px] xs:text-xs text-white outline-none cursor-pointer border-none p-0 pr-3.5 [color-scheme:dark] select-none text-right appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right center",
                      backgroundSize: "6px"
                    }}
                  >
                    {availableDates.map((date) => {
                      const parts = date.split("-");
                      const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : date;
                      return (
                        <option key={date} value={date} className="text-slate-800 font-bold text-xs bg-white">
                          {formattedDate}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Podium or Custom Illustrated Image Re-creation */}
            {activeTab === "1 vs 1" ? (
              <motion.div
                key="one-vs-one-illustrated-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center p-4 md:p-5 bg-slate-50/30 border-b-2 border-slate-100 gap-4"
              >
                <div className="text-center">
                  <h3 className="text-sm md:text-base font-black text-[#091747] uppercase tracking-tight italic">
                    Aposta Encerrada
                  </h3>
                  <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    Final da Liga Nacional
                  </p>
                </div>

                <div className="w-full bg-white rounded-3xl md:rounded-full p-4 md:p-6 px-4 md:px-12 flex flex-row items-center justify-between gap-2 sm:gap-4 md:gap-8 relative">
                  {/* Participant 1 */}
                  <div className="flex flex-row items-center gap-2 sm:gap-4 flex-1 min-w-0 justify-start">
                    <div className="relative shrink-0 animate-fade-in">
                      <img
                        src={activeBet.p1.avatar}
                        alt={activeBet.p1.name}
                        className="w-[58px] h-[58px] sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full object-cover border-2 md:border-3 border-[#FFB10A] ring-2 md:ring-4 ring-[#FFB10A]/15 hover:scale-110 transition-transform duration-300 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      {/* Only visible on mobile, badge overlapping bottom-right of the avatar */}
                      <img
                        src={activeBet.p1.betLogo}
                        alt={activeBet.p1.betOn}
                        className="absolute bottom-0 right-0 w-6 h-6 object-contain bg-white rounded-full p-0.5 border border-[#FFB10A] shadow-sm filter drop-shadow sm:hidden"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col min-w-0 sm:block hidden">
                      <span className="text-[9px] md:text-[10px] xs:text-[10px] md:text-xs sm:text-sm md:text-base font-black text-[#0c1e56] uppercase tracking-tight truncate leading-tight">
                        {activeBet.p1.name}
                      </span>
                      <div className="flex flex-row items-center gap-0.5 xs:gap-1 flex-wrap">
                        <span className="text-[7.5px] xs:text-[8px] md:text-[9px] sm:text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-tight leading-none">
                          Apostou em
                        </span>
                        <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] md:text-xs font-black text-[#0c1e56] uppercase tracking-tight truncate max-w-[40px] xs:max-w-[70px] sm:max-w-none">
                          {activeBet.p1.betOn}
                        </span>
                      </div>
                    </div>
                    {/* On desktop and tablet, show the team badge next to the participant details */}
                    <img
                      src={activeBet.p1.betLogo}
                      alt={activeBet.p1.betOn}
                      className="w-8 h-8 object-contain filter drop-shadow hover:scale-115 transition-transform duration-200 shrink-0 hidden sm:block"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center justify-center shrink-0 px-2 py-1">
                    <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-[#091747] tracking-widest italic leading-none">
                      {activeBet.score}
                    </span>
                    <span className="mt-1 text-[5.5px] xs:text-[7.5px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-650 border border-emerald-100 px-1 xs:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap hidden sm:block">
                      Resultado Final
                    </span>
                  </div>

                  {/* Participant 2 */}
                  <div className="flex flex-row items-center gap-2 sm:gap-4 flex-1 min-w-0 justify-end">
                    {/* On desktop and tablet, show the team badge next to the participant details */}
                    <img
                      src={activeBet.p2.betLogo}
                      alt={activeBet.p2.betOn}
                      className="w-8 h-8 object-contain filter drop-shadow hover:scale-115 transition-transform duration-200 shrink-0 hidden sm:block"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col items-end min-w-0 sm:block hidden">
                      <span className="text-[9px] md:text-[10px] xs:text-[10px] md:text-xs sm:text-sm md:text-base font-black text-[#0c1e56] uppercase tracking-tight truncate leading-tight text-right">
                        {activeBet.p2.name}
                      </span>
                      <div className="flex flex-row items-center gap-0.5 xs:gap-1 flex-wrap justify-end">
                        <span className="text-[7.5px] xs:text-[8px] md:text-[9px] sm:text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-tight leading-none">
                          Apostou em
                        </span>
                        <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] md:text-xs font-black text-[#0c1e56] uppercase tracking-tight truncate max-w-[40px] xs:max-w-[70px] sm:max-w-none">
                          {activeBet.p2.betOn}
                        </span>
                      </div>
                    </div>
                    <div className="relative shrink-0 animate-fade-in">
                      <img
                        src={activeBet.p2.avatar}
                        alt={activeBet.p2.name}
                        className="w-[58px] h-[58px] sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full object-cover border-2 border-slate-200 ring-2 ring-slate-100 hover:scale-110 transition-transform duration-300 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      {/* Only visible on mobile, badge overlapping bottom-left of the avatar */}
                      <img
                        src={activeBet.p2.betLogo}
                        alt={activeBet.p2.betOn}
                        className="absolute bottom-0 left-0 w-6 h-6 object-contain bg-white rounded-full p-0.5 border border-slate-300 shadow-sm filter drop-shadow sm:hidden"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Reward winner block aligned to left inside a w-full container to match exact margins */}
                <div className="w-full bg-emerald-50/45 rounded-3xl md:rounded-full p-4 px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 sm:gap-14 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={activeBet.winnerAvatar}
                        alt={activeBet.winnerName}
                        className="w-[58px] h-[58px] md:w-[68px] md:h-[68px] rounded-full object-cover border-2 border-emerald-500 ring-3 ring-emerald-500/15 transition-transform duration-300 hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 bg-emerald-500 rounded-full flex items-center justify-center text-white border border-white shadow-sm">
                        <Trophy className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm md:text-base font-black text-emerald-800 uppercase tracking-tight truncate">
                        {activeBet.winnerName}
                      </span>
                      <span className="text-[9px] md:text-xs font-black text-emerald-650 uppercase tracking-wider mt-0.5 leading-none">
                        Vencedor da aposta
                      </span>
                      <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
                        Apostou na equipa vencedora
                      </span>
                    </div>
                  </div>
                  <div className="text-left flex flex-col shrink-0 sm:pl-4">
                    <span className="text-base md:text-lg font-black text-emerald-600 uppercase tracking-normal">
                      {activeBet.prize}
                    </span>
                    <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                      Prémio recebido
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`group-illustrated-results-${activeTab}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center p-4 md:p-5 bg-slate-50/30 border-b-2 border-slate-100 gap-4"
              >
                <div className="text-center">
                  <h3 className="text-sm md:text-base font-black text-[#091747] uppercase tracking-tight italic">
                    {activeTab === "1 vs 1" ? "Dados da Partida Associada" : "Aposta Encerrada"}
                  </h3>
                  <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    {activeTab === "1 vs 1" ? `${activeBet.matchNickname} • ${activeBet.date}` : "Final da Liga Nacional"}
                  </p>
                </div>

                <div className="w-full bg-white rounded-3xl md:rounded-full p-4 md:p-6 px-4 md:px-12 flex flex-row items-center justify-between gap-2 md:gap-8 relative">
                  {/* Team 1 */}
                  <div className="flex flex-row items-center gap-2 sm:gap-4 flex-1 min-w-0 justify-start">
                    <img
                      src={activeBet.p1.betLogo}
                      alt={activeBet.p1.betOn}
                      className="w-13 h-13 xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain hover:scale-110 transition-transform duration-300 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] md:text-xs sm:text-sm md:text-base font-black text-[#0c1e56] uppercase tracking-tight truncate leading-tight hidden sm:block">
                      {activeBet.p1.betOn}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-center justify-center shrink-0 px-2 py-1">
                    <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-[#091747] tracking-widest italic leading-none">
                      {activeBet.score}
                    </span>
                    <span className="mt-1 text-[5.5px] xs:text-[7.5px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-650 border border-emerald-100 px-1 xs:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap hidden sm:block">
                      Resultado Final
                    </span>
                  </div>

                  {/* Team 2 */}
                  <div className="flex flex-row items-center gap-2 sm:gap-4 flex-1 min-w-0 justify-end">
                    <span className="text-[10px] md:text-xs sm:text-sm md:text-base font-black text-[#0c1e56] uppercase tracking-tight truncate leading-tight text-right hidden sm:block">
                      {activeBet.p2.betOn}
                    </span>
                    <img
                      src={activeBet.p2.betLogo}
                      alt={activeBet.p2.betOn}
                      className="w-13 h-13 xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain hover:scale-110 transition-transform duration-300 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-gray-200"
            >
              {activeTab === "Nacional" && (
                <div className="p-4 bg-slate-50 flex items-center">
                  <div className="relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Pesquise por nome do classificado..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#091747] placeholder-slate-400 outline-none focus:border-[#FFB10A] transition-colors"
                    />
                  </div>
                </div>
              )}
              {displayedRankings.length === 0 ? (
                <div className="p-10 text-center text-slate-400 font-bold text-xs bg-white">
                  Nenhum classificado encontrado para "{searchTerm}"
                </div>
              ) : (
                displayedRankings.map((player, i) => {
                  const originalIndex = currentRankings.findIndex((p) => p.id === player.id);
                  const userRankIndex = currentRankings.findIndex((p) => p.isCurrentUser);
                  
                  // Allow mocking imojins to 'user_1' (mock fallback), but mainly check math rule
                  const isMockTarget = player.id === 999999 || player.id === '999999';
                  const isBelowUser = userRankIndex !== -1 && originalIndex > userRankIndex && !player.isCurrentUser;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={player.id}
                      className={cn(
                        "flex items-center gap-4 p-4 transition-all relative overflow-visible",
                        player.isCurrentUser
                          ? "bg-amber-50/75 border-y-2 border-amber-300/80 shadow-inner"
                          : "hover:bg-orange-50/50 transition-colors"
                      )}
                    >
                      {/* Floating particles rising next to the row if active */}
                      {activeImojinBurst && activeImojinBurst.playerId === player.id && (
                        <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
                          {activeImojinBurst.particles.map((p) => (
                            <motion.div
                              key={p.id}
                              initial={{ opacity: 1, y: 0, x: 0, scale: 0.6, rotate: 0 }}
                              animate={{ 
                                opacity: [1, 1, 0],
                                y: p.y,
                                x: p.x,
                                scale: [0.6, 1.4, 0.8],
                                rotate: p.rotate
                              }}
                              transition={{ 
                                duration: 2.5, 
                                ease: "easeOut",
                                delay: p.delay 
                              }}
                              className="absolute left-1/2 top-1/2 text-2.5xl filter drop-shadow-md select-none"
                            >
                              {p.emoji}
                            </motion.div>
                          ))}
                        </div>
                      )}

                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0",
                          originalIndex === 0
                            ? "bg-yellow-400 text-white"
                            : originalIndex === 1
                              ? "bg-gray-400 text-white"
                              : originalIndex === 2
                                ? "bg-amber-600 text-white"
                                : "bg-transparent border border-gray-300 text-[#364153]",
                        )}
                      >
                        {originalIndex + 1}º
                      </div>
                      <img
                        src={player.avatar}
                        className={cn(
                          "w-10 h-10 rounded-full border-2",
                          player.isCurrentUser ? "border-amber-400 ring-2 ring-amber-300/35" : "border-white"
                        )}
                        referrerPolicy="no-referrer"
                      />
                      <span className="flex-1 font-bold text-[#091747] flex items-center gap-1.5 min-w-0">
                        <span className="truncate">{player.name}</span>
                        {player.isCurrentUser && (
                          <span className="bg-amber-150 text-amber-900 border border-amber-300 text-[8px] md:text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shrink-0 shadow-xs">
                            Tu
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="bg-transparent border border-gray-300 px-3 py-1 rounded-full text-[10px] md:text-xs font-black text-[#364153]">
                          {player.score.toLocaleString()} pts
                        </span>

                        {(!player.isCurrentUser || isMockTarget) && (
                          <button
                            onClick={() => {
                              if (isMockTarget || isBelowUser) {
                                setTargetPlayer(player);
                                setIsModalOpen(true);
                              }
                            }}
                            disabled={!isMockTarget && !isBelowUser}
                            className={cn(
                              "flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-wider transition-all duration-300",
                              (isMockTarget || isBelowUser)
                                ? "bg-amber-100 text-[#d48c00] border border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:scale-105 active:scale-95 shadow-sm"
                                : "bg-slate-50 text-slate-300 border border-slate-200 cursor-not-allowed opacity-30 select-none"
                            )}
                            title={
                              (isMockTarget || isBelowUser)
                                ? `Enviar Imojin / mensagem para ${player.name}`
                                : `Deves superá-lo na classificação para lhe podas enviar um Imojin (apenas para quem está abaixo de ti).`
                            }
                          >
                            <Smile className={cn("w-3.5 h-3.5", (isMockTarget || isBelowUser) && "text-amber-500 animate-pulse")} />
                            <span className="hidden sm:inline">Enviar</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </div>
        </div>

        {/* Toast de Sucesso */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#091747] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-amber-300/30 max-w-sm w-[calc(100%-2rem)]"
            >
              <div className="bg-amber-400 p-1.5 rounded-xl text-white shrink-0">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase tracking-wider text-amber-300">Sucesso!</p>
                <p className="text-xs md:text-sm font-bold text-slate-100 mt-0.5 whitespace-pre-wrap">{toastMsg}</p>
              </div>
              <button 
                onClick={() => setToastMsg(null)}
                className="text-slate-400 hover:text-white shrink-0 bg-transparent border-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal / Popup "Enviar Imojin" */}
        <AnimatePresence>
          {isModalOpen && targetPlayer && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
              {/* Backdrop Blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-[#091747]/60 backdrop-blur-xs"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative bg-white w-full rounded-t-[32px] rounded-b-none sm:rounded-[32px] p-5 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.12)] sm:shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col z-10 border border-slate-100 h-[88vh] sm:h-auto max-h-[88vh] sm:max-h-[90vh] sm:max-w-md pb-10 sm:pb-6"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:scale-105 active:scale-95 flex items-center justify-center text-slate-400 hover:text-[#0c1e56] transition-all duration-200 shadow-sm shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4 text-slate-600 stroke-[2.5]" />
                </button>

                {/* Header Container */}
                <div className="flex items-center gap-4 pb-3.5 sm:pb-5 border-b border-slate-100/80 mb-4 sm:mb-5 shrink-0">
                  <div className="relative">
                    <img
                      src={targetPlayer.avatar}
                      className="w-14 h-14 rounded-full border-3 border-[#FFB10A] object-cover ring-4 ring-amber-100/30"
                      referrerPolicy="no-referrer"
                      alt={targetPlayer.name}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FFB10A] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm font-black text-[9px] md:text-[10px] tracking-tighter">
                      {currentRankings.findIndex(p => p.id === targetPlayer.id) + 1}º
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-black text-[#0c1e56] uppercase tracking-tight leading-none">
                      Enviar imojin / interação
                    </h3>
                    <p className="text-xs font-bold text-slate-450 mt-1.5 leading-none">
                      Para concorrente: <span className="text-[#0c1e56] font-black">{targetPlayer.name}</span>
                    </p>
                  </div>
                </div>

                {/* Navigation Tabs (grey background rounded container) */}
                <div className="flex border border-slate-200 bg-transparent p-1.5 rounded-[20px] mb-4 sm:mb-5 gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab("text")}
                    className={cn(
                      "flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-black uppercase transition-all duration-300 border-none cursor-pointer",
                      activeModalTab === "text"
                        ? "bg-[#FFB10A] text-white shadow-[0_4px_10px_rgba(0,0,0,0.06)]"
                        : "text-slate-450 bg-transparent hover:text-[#0c1e56]"
                    )}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    <span>Escrito</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab("audio")}
                    className={cn(
                      "flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-black uppercase transition-all duration-300 border-none cursor-pointer",
                      activeModalTab === "audio"
                        ? "bg-[#FFB10A] text-white shadow-[0_4px_10px_rgba(0,0,0,0.06)]"
                        : "text-slate-450 bg-transparent hover:text-[#0c1e56]"
                    )}
                  >
                    <Volume2 className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    <span>Sonoro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalTab("imojin")}
                    className={cn(
                      "flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm font-black uppercase transition-all duration-300 border-none cursor-pointer",
                      activeModalTab === "imojin"
                        ? "bg-[#FFB10A] text-white shadow-[0_4px_10px_rgba(0,0,0,0.06)]"
                        : "text-slate-450 bg-transparent hover:text-[#0c1e56]"
                    )}
                  >
                    <Smile className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    <span>Imojin</span>
                  </button>
                </div>

                {/* Main Contents */}
                <div className="flex-1 overflow-y-auto mb-4 sm:mb-5 min-h-[160px] sm:min-h-[240px] pr-1">
                  {activeModalTab === "text" && (
                     <div className="space-y-4">
                      <p className="text-xs font-black uppercase tracking-tight text-[#0c1e56]">
                        Digite uma provocação amigável ou incentivo:
                      </p>
                      <div className="relative">
                        <textarea
                          placeholder="Ex: Já não me consegues ver daqui de cima... 🚀"
                          value={writtenMessage}
                          onChange={(e) => setWrittenMessage(e.target.value)}
                          maxLength={120}
                          rows={3}
                          className="w-full p-4 pb-8 bg-white border-2 border-slate-300 rounded-[20px] text-xs font-bold text-[#0c1e56] outline-none placeholder-slate-400 focus:border-[#FFB10A] focus:ring-1 focus:ring-[#FFB10A] transition-all resize-none shadow-xs"
                        />
                        <span className="absolute bottom-3 right-4 text-[9px] md:text-[10px] font-black text-slate-400 select-none">
                          {writtenMessage.length}/120
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] md:text-xs font-black text-slate-450 uppercase tracking-wider">
                          <span>Frases rápidas sugeridas ({quickTexts.length}):</span>
                          <span className="text-[9px] md:text-[10px] lowercase italic text-slate-400 font-bold">Rola para ver todas</span>
                        </div>
                        <div className="max-h-[110px] sm:max-h-[160px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200">
                          {quickTexts.map((txt) => {
                            const isActive = writtenMessage === txt;
                            return (
                              <button
                                key={txt}
                                type="button"
                                onClick={() => setWrittenMessage(txt)}
                                className={cn(
                                  "w-full text-xs md:text-sm font-bold px-3.5 py-2.5 rounded-xl transition-all duration-150 cursor-pointer text-left leading-relaxed break-words block active:scale-[0.99] hover:translate-x-0.5",
                                  isActive
                                    ? "bg-[#FFB10A] text-white border border-[#FFB10A] shadow-sm"
                                    : "bg-transparent text-slate-700 hover:text-[#0c1e56] border border-slate-200 hover:border-slate-350 hover:bg-slate-50/20"
                                )}
                              >
                                {txt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModalTab === "audio" && (
                    <div className="space-y-4">
                      <p className="text-xs font-black uppercase tracking-tight text-[#0c1e56]">
                        Selecione e ouça os risos e provocações:
                      </p>
                      <div className="max-h-[180px] xs:max-h-[220px] sm:max-h-[300px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200">
                        {audioEffects.map((ae) => {
                          const isSelected = selectedAudio === ae.id;
                          return (
                            <div
                              key={ae.id}
                              onClick={() => {
                                setSelectedAudio(ae.id);
                                playAudioEffect(ae.id);
                              }}
                              className={cn(
                                "w-full text-left p-3 rounded-xl transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 active:scale-[0.99] hover:translate-x-0.5 border",
                                isSelected
                                  ? "bg-[#FFB10A] text-white border-[#FFB10A] shadow-sm"
                                  : "bg-transparent text-slate-700 hover:text-[#0c1e56] border-slate-200 hover:border-slate-350 hover:bg-slate-50/20"
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className={cn(
                                  "text-lg shrink-0 p-1 rounded-lg select-none",
                                  isSelected ? "bg-amber-600/30 text-white" : "bg-slate-50 text-[#0c1e56]"
                                )}>
                                  {ae.icon}
                                </span>
                                <div className="min-w-0">
                                  <p className={cn(
                                    "text-xs md:text-sm font-black uppercase leading-tight tracking-tight",
                                    isSelected ? "text-white" : "text-[#0c1e56]"
                                  )}>
                                    {ae.label}
                                  </p>
                                  <p className={cn(
                                    "text-[10px] md:text-xs leading-normal font-bold mt-0.5 max-w-[200px] sm:max-w-[280px] truncate",
                                    isSelected ? "text-amber-100" : "text-slate-400"
                                  )}>
                                    {ae.desc}
                                  </p>
                                </div>
                              </div>
                              
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playAudioEffect(ae.id);
                                }}
                                className={cn(
                                  "w-7 h-7 rounded-full flex items-center justify-center p-0 transition-all border-none shrink-0 cursor-pointer",
                                  isSelected
                                    ? "bg-white text-[#ffb10a] hover:scale-110 active:scale-95"
                                    : "bg-[#ffb10a] hover:bg-amber-500 hover:scale-110 active:scale-95 text-white shadow-[0_2px_5px_rgba(255,177,10,0.2)]"
                                )}
                                title="Testar som"
                              >
                                <Play className={cn("w-3 h-3 fill-current stroke-[3] translate-x-[0.5px]",
                                  isSelected ? "text-[#ffb10a]" : "text-white"
                                )} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeModalTab === "imojin" && (
                    <div className="space-y-4">
                      <p className="text-xs font-black uppercase tracking-tight text-[#0c1e56]">
                        Escolha um imojin animado:
                      </p>
                      <div className="space-y-4 pr-0.5">
                        {imojinCategories.map((cat) => (
                          <div key={cat.id} className="space-y-2">
                            <p className="text-[10px] md:text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                              {cat.label}
                            </p>
                            <div className="grid grid-cols-5 gap-1.5">
                              {cat.emojis.map((emojiObj) => {
                                const isSelected = selectedImojin === emojiObj.emoji;
                                return (
                                  <button
                                    key={emojiObj.emoji}
                                    type="button"
                                    onClick={() => setSelectedImojin(emojiObj.emoji)}
                                    className={cn(
                                      "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all group shrink-0 relative p-1 pb-1.5",
                                      isSelected
                                        ? "bg-amber-50/20 border-slate-400 scale-102 shadow-sm"
                                        : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300"
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "text-2xl select-none transition-transform duration-300 py-1.5",
                                        isSelected ? emojiObj.anim : "group-hover:scale-108"
                                      )}
                                    >
                                      {emojiObj.emoji}
                                    </span>
                                    <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-tighter truncate w-full text-center mt-auto">
                                      {emojiObj.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action Block */}
                <div className="border-t border-slate-100 pt-3 sm:pt-4 shrink-0 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-xs font-black uppercase text-slate-650 hover:bg-slate-50 rounded-2xl border-2 border-slate-300 transition-colors bg-white cursor-pointer active:scale-95 text-center shadow-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSendInteraction}
                    disabled={
                      (activeModalTab === "text" && !writtenMessage.trim()) ||
                      (activeModalTab === "audio" && !selectedAudio) ||
                      (activeModalTab === "imojin" && !selectedImojin)
                    }
                    className={cn(
                      "flex-[1.5] py-3.5 px-4 rounded-2xl text-xs font-black uppercase flex items-center justify-center gap-2 border-none transition-all cursor-pointer text-white",
                      (activeModalTab === "text" && !writtenMessage.trim()) ||
                      (activeModalTab === "audio" && !selectedAudio) ||
                      (activeModalTab === "imojin" && !selectedImojin)
                        ? "bg-slate-100 text-slate-350 cursor-not-allowed select-none"
                        : "bg-[#0c1e56] hover:bg-[#07133a] active:scale-95 shadow-md shadow-slate-900/15"
                    )}
                  >
                    <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Enviar interação</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Section({
  label,
  icon: Icon,
  rightElement,
}: {
  label: string;
  icon: React.ElementType;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#FFB10A]" />
        <h3 className="font-bold text-[#091747]">{label}</h3>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
      {rightElement}
    </div>
  );
}
