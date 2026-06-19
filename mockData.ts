import { Match, UserProfile, Bet, FavoriteItem, Notification } from '../types';

// ============================================================================
// 1. TYPES & INTERFACES FOR THE DATA LAYER
// ============================================================================

export interface MockUser {
  id: string;
  name: string;
  avatar: string;
  photo?: string; // Aliased for backwards compatibility with photo
  ranking: 'Bronze' | 'Prata' | 'Ouro' | 'Elite' | 'Lenda';
  score: number;
  stats: {
    winRate: number;
    totalWon: number;
    totalLost: number;
  };
}

export interface MockMatch extends Match {
  sport: 'futebol' | 'basket' | 'f1';
}

export interface MockMarket {
  id: string;
  matchId: number;
  type: string; // e.g. "1x2", "winner", "class"
  label: string; // e.g. "Vence Casa", "Empate", "Vence Fora"
  odds: number;
}

export interface MockBet extends Omit<Bet, 'category'> {
  userId: string;
  marketId: string;
  odds: number;
  potentialPayout: number; // calculated as amount * odds
  category: '1 vs 1' | 'Privado' | 'Nacional';
}

export interface MockTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  method: string;
  destination?: string;
  status: 'Completed' | 'Pending' | 'Failed';
  createdAt: string;
}

export interface MockNotification {
  id: string;
  userId: string;
  type: 'Performance' | 'Taunt';
  title: string;
  message: string;
  emoji: string;
  entityType?: 'match' | 'bet' | 'challenge' | 'general';
  entityId?: string | number;
  isRead: boolean;
  createdAt: string;
}

// ============================================================================
// 2. CENTRALIZED MOCK DATA ENTITIES WITH STABLE IDs & RELATIONS
// ============================================================================

// All users - including Edlasio Galhardo ("user_1"), the logged-in user
export const MOCK_USERS: MockUser[] = [
  {
    id: 'user_1',
    name: 'Edlasio Galhardo',
    avatar: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
    photo: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
    ranking: 'Bronze',
    score: 9500,
    stats: {
      winRate: 64,
      totalWon: 32,
      totalLost: 18,
    }
  },
  {
    id: 'user_2',
    name: 'Ricardo Dias',
    avatar: 'https://i.pravatar.cc/150?u=21',
    photo: 'https://i.pravatar.cc/150?u=21',
    ranking: 'Lenda',
    score: 150400,
    stats: {
      winRate: 72,
      totalWon: 145,
      totalLost: 55,
    }
  },
  {
    id: 'user_3',
    name: 'Tiago Santos',
    avatar: 'https://i.pravatar.cc/150?u=22',
    photo: 'https://i.pravatar.cc/150?u=22',
    ranking: 'Ouro',
    score: 142300,
    stats: {
      winRate: 68,
      totalWon: 120,
      totalLost: 56,
    }
  },
  {
    id: 'user_4',
    name: 'Andreia Cruz',
    avatar: 'https://i.pravatar.cc/150?u=23',
    photo: 'https://i.pravatar.cc/150?u=23',
    ranking: 'Ouro',
    score: 139100,
    stats: {
      winRate: 70,
      totalWon: 110,
      totalLost: 47,
    }
  },
  {
    id: 'user_5',
    name: 'Nuno Alves',
    avatar: 'https://i.pravatar.cc/150?u=24',
    photo: 'https://i.pravatar.cc/150?u=24',
    ranking: 'Ouro',
    score: 128500,
    stats: {
      winRate: 61,
      totalWon: 98,
      totalLost: 62,
    }
  },
  {
    id: 'user_6',
    name: 'Beatriz Vaz',
    avatar: 'https://i.pravatar.cc/150?u=25',
    photo: 'https://i.pravatar.cc/150?u=25',
    ranking: 'Ouro',
    score: 125000,
    stats: {
      winRate: 59,
      totalWon: 85,
      totalLost: 59,
    }
  },
  {
    id: 'user_7',
    name: 'Carlos Mendes',
    avatar: 'https://i.pravatar.cc/150?u=2',
    photo: 'https://i.pravatar.cc/150?u=2',
    ranking: 'Bronze',
    score: 9420,
    stats: {
      winRate: 50,
      totalWon: 12,
      totalLost: 12,
    }
  },
  {
    id: 'user_8',
    name: 'Sofia Lopes',
    avatar: 'https://i.pravatar.cc/150?u=3',
    photo: 'https://i.pravatar.cc/150?u=3',
    ranking: 'Bronze',
    score: 8990,
    stats: {
      winRate: 48,
      totalWon: 10,
      totalLost: 11,
    }
  },
  {
    id: 'user_9',
    name: 'Rui Santos',
    avatar: 'https://i.pravatar.cc/150?u=4',
    photo: 'https://i.pravatar.cc/150?u=4',
    ranking: 'Bronze',
    score: 8540,
    stats: {
      winRate: 44,
      totalWon: 8,
      totalLost: 10,
    }
  },
  {
    id: 'user_10',
    name: 'Marta Costa',
    avatar: 'https://i.pravatar.cc/150?u=5',
    photo: 'https://i.pravatar.cc/150?u=5',
    ranking: 'Bronze',
    score: 8100,
    stats: {
      winRate: 42,
      totalWon: 6,
      totalLost: 8,
    }
  },
  {
    id: 'user_11',
    name: 'Luís Gomes',
    avatar: 'https://i.pravatar.cc/150?u=13',
    photo: 'https://i.pravatar.cc/150?u=13',
    ranking: 'Prata',
    score: 13800,
    stats: {
      winRate: 55,
      totalWon: 22,
      totalLost: 18,
    }
  },
  {
    id: 'user_12',
    name: 'Isabel Rocha',
    avatar: 'https://i.pravatar.cc/150?u=14',
    photo: 'https://i.pravatar.cc/150?u=14',
    ranking: 'Prata',
    score: 12500,
    stats: {
      winRate: 53,
      totalWon: 19,
      totalLost: 17,
    }
  }
];

// Centralized matches with sports and current statuses
export const MOCK_MATCHES: MockMatch[] = [
  {
    id: 1,
    league: "Premier League",
    teamA: { name: "Arsenal", logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
    teamB: { name: "Chelsea", logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
    date: "12/06/2026",
    time: "20:00",
    odds: { winA: 2.10, draw: 3.40, winB: 3.50 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    sport: 'futebol'
  },
  {
    id: 2,
    league: "La Liga",
    teamA: { name: "Real Madrid", logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
    teamB: { name: "Barcelona", logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
    date: "13/06/2026",
    time: "21:30",
    odds: { winA: 2.50, draw: 3.20, winB: 2.80 },
    isLive: true,
    status: 'ao_vivo',
    scoreA: 2,
    scoreB: 1,
    sport: 'futebol'
  },
  {
    id: 3,
    league: "Serie A",
    teamA: { name: "Juventus", logo: "https://upload.wikimedia.org/wikipedia/en/6/69/Juventus_FC_crest.svg" },
    teamB: { name: "Inter Milan", logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Inter_Milan.svg" },
    date: "14/06/2026",
    time: "19:45",
    odds: { winA: 2.30, draw: 3.10, winB: 3.20 },
    isLive: false,
    status: 'terminou',
    scoreA: 1,
    scoreB: 1,
    sport: 'futebol'
  },
  {
    id: 4,
    league: "Bundesliga",
    teamA: { name: "Bayern Munchen", logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
    teamB: { name: "B. Dortmund", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
    date: "15/06/2026",
    time: "17:30",
    odds: { winA: 1.80, draw: 3.80, winB: 4.20 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    sport: 'futebol'
  },
  {
    id: 6,
    league: "Girabola",
    teamA: { name: "Petro Luanda", logo: "https://upload.wikimedia.org/wikipedia/pt/d/d4/Petr%C3%B3leo_Atl%C3%A9tico_de_Luanda.png" },
    teamB: { name: "1º de Agosto", logo: "https://upload.wikimedia.org/wikipedia/pt/8/87/1%C2%BA_de_Agosto.png" },
    date: "17/06/2026",
    time: "16:00",
    odds: { winA: 2.10, draw: 3.00, winB: 3.40 },
    isLive: false,
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    sport: 'futebol'
  },
  {
    id: 3001,
    league: "Unitel Basket",
    teamA: { name: 'Petro de Luanda', logo: 'https://i.postimg.cc/Cnntg6fx/PETRO-LUANDA-ANGOLA.png' },
    teamB: { name: '1º de Agosto', logo: 'https://i.postimg.cc/rRRbkYR7/1-AGOSTO-ANGOLA.png' },
    date: "20/06/2026",
    time: "18:00",
    odds: { winA: 1.85, draw: 0, winB: 1.95 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    broadcast: 'TPA / Unitel',
    sport: 'basket'
  },
  {
    id: 3002,
    league: "Unitel Basket",
    teamA: { name: 'GD Interclube', logo: 'https://i.postimg.cc/bSSMhF2j/GD-INTERCLUBE-ANGOLA.png' },
    teamB: { name: 'AS Aviação', logo: 'https://i.postimg.cc/9F0MstCq/ASA-ANGOLA.png' },
    date: "21/06/2026",
    time: "19:00",
    odds: { winA: 1.70, draw: 0, winB: 2.10 },
    status: 'breve',
    scoreA: 0,
    scoreB: 0,
    sport: 'basket'
  }
];

// Centralized betting markets linking to matches
export const MOCK_MARKETS: MockMarket[] = [
  // For Match 1 (Arsenal vs Chelsea)
  { id: 'mk1_1', matchId: 1, type: '1x2', label: 'Vence Arsenal', odds: 2.10 },
  { id: 'mk1_x', matchId: 1, type: '1x2', label: 'Empate', odds: 3.40 },
  { id: 'mk1_2', matchId: 1, type: '1x2', label: 'Vence Chelsea', odds: 3.50 },

  // For Match 2 (Real Madrid vs Barcelona)
  { id: 'mk2_1', matchId: 2, type: '1x2', label: 'Vence Real Madrid', odds: 2.50 },
  { id: 'mk2_x', matchId: 2, type: '1x2', label: 'Empate', odds: 3.20 },
  { id: 'mk2_2', matchId: 2, type: '1x2', label: 'Vence Barcelona', odds: 2.80 },

  // For Match 6 (Petro Luanda vs 1º de Agosto)
  { id: 'mk6_1', matchId: 6, type: '1x2', label: 'Vence Petro Luanda', odds: 2.10 },
  { id: 'mk6_x', matchId: 6, type: '1x2', label: 'Empate', odds: 3.00 },
  { id: 'mk6_2', matchId: 6, type: '1x2', label: 'Vence 1º de Agosto', odds: 3.40 },

  // For Match 3001 (Petro de Luanda vs 1º de Agosto Basket)
  { id: 'mk3001_1', matchId: 3001, type: 'winner', label: 'Vence Petro de Luanda', odds: 1.85 },
  { id: 'mk3001_2', matchId: 3001, type: 'winner', label: 'Vence 1º de Agosto', odds: 1.95 }
];

// Rich, structured pre-populated bets for historical accuracy
export const MOCK_BETS: MockBet[] = [
  {
    id: 'bet_init_1',
    userId: 'user_1',
    matchId: 2,
    marketId: 'mk2_1',
    category: '1 vs 1',
    market: 'Vence Real Madrid',
    amount: 250,
    odds: 2.50,
    potentialPayout: 625,
    status: 'Won',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  },
  {
    id: 'bet_init_2',
    userId: 'user_1',
    matchId: 1,
    marketId: 'mk1_2',
    category: 'Nacional',
    market: 'Vence Chelsea',
    amount: 100,
    odds: 3.50,
    potentialPayout: 350,
    status: 'Lost',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'bet_init_3',
    userId: 'user_1',
    matchId: 6,
    marketId: 'mk6_1',
    category: 'Privado',
    market: 'Vence Petro Luanda',
    amount: 500,
    odds: 2.10,
    potentialPayout: 1050,
    status: 'Open',
    roomName: 'Duelo de Gigantes',
    password: '123',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  }
];

// Real financial movements for the wallet history UI
export const MOCK_TRANSACTIONS: MockTransaction[] = [
  {
    id: 'tx_1',
    userId: 'user_1',
    type: 'deposit',
    amount: 1500,
    method: 'Multicaixa Express',
    destination: 'Carteira Duet',
    status: 'Completed',
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'tx_2',
    userId: 'user_1',
    type: 'transfer',
    amount: 250,
    method: 'Aposta Unificada',
    destination: 'Aposta #bet_init_1',
    status: 'Completed',
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'tx_3',
    userId: 'user_1',
    type: 'deposit',
    amount: 625,
    method: 'Prémio Consagrado',
    destination: 'Carteira Duet',
    status: 'Completed',
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
  }
];

// Rich notification entries
export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    id: 'nt_1',
    userId: 'user_1',
    type: 'Performance',
    title: 'Prémio Recebido! 🏆🎉',
    message: 'A tua previsão no Real Madrid vs Barcelona deu lucro de 625 Kz.',
    emoji: '⭐',
    entityType: 'bet',
    entityId: 'bet_init_1',
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'nt_2',
    userId: 'user_1',
    type: 'Taunt',
    title: 'Recebeste uma Provocação! 🎭⚡',
    message: 'Ricardo Dias desafiou-te nas previsões do Girabola.',
    emoji: '⚔️',
    entityType: 'challenge',
    entityId: 'user_2',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
  }
];

// Initial preloaded Favorites
export const MOCK_FAVORITES: FavoriteItem[] = [
  { id: 'liga-futebol', title: 'Futebol', sub: 'Abrir liga', type: 'league', path: '/liga/futebol' },
  { id: 'fav-girabola', title: 'Girabola', sub: 'Duelos 1 vs 1', type: 'league', path: '/aposta/futebol?topic=Girabola' },
];
