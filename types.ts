export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Match {
  id: number;
  league: string;
  teamA: { name: string; logo: string; record?: string };
  teamB: { name: string; logo: string; record?: string };
  date: string;
  time: string;
  odds: { winA: number; draw: number; winB: number };
  isLive?: boolean;
  status?: 'ao_vivo' | 'terminou' | 'breve';
  scoreA?: number;
  scoreB?: number;
  broadcast?: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  path: string;
}

export interface LeagueOption {
  title: string;
  image?: string;
  driver1?: string;
  driver2?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  photo: string;
  ranking: 'Bronze' | 'Prata' | 'Ouro' | 'Elite' | 'Lenda';
  stats: {
    winRate: number;
    totalWon: number;
    totalLost: number;
  };
}

export interface Wallet {
  balance: number;
  blocked_balance: number;
}

export interface Bet {
  id: string;
  matchId: number;
  userId?: string;
  odds?: number;
  marketId?: string;
  category: '1 vs 1' | 'Privado' | 'Nacional';
  market: string;
  amount: number;
  status: 'Open' | 'Live' | 'Won' | 'Lost' | 'Canceled';
  roomCode?: string;
  password?: string;
  roomName?: string;
  maxParticipants?: number;
  selectedMarkets?: (string | null)[];
  marketType?: string;
  autoConfirmThreshold?: number;
  createdAt: string;
}

export interface FavoriteItem {
  id: string | number;
  title: string;
  sub: string;
  type: string;
  path: string;
}

export interface Notification {
  id: string;
  type: 'Performance' | 'Taunt';
  title: string;
  message: string;
  emoji: string;
  image?: string;
  challengeId: string;
  fromUserId?: string;
  createdAt: string;
  isRead: boolean;
}

export interface Taunt {
  id: string;
  challengeId: string;
  fromUserId: string;
  toUserId: string;
  stickerId: string;
  createdAt: string;
}

export interface CategoryDetail {
  title: string;
  image: string;
  labels: { 
    practice: string; 
    private: string; 
    community?: string; 
  };
  cards: {
    practice: LeagueOption[];
    private: LeagueOption[];
    community?: LeagueOption[];
  };
}
