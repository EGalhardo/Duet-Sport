import { duetStore, STORE_EVENTS } from './store';
import { UserProfile, Wallet, FavoriteItem, Notification, Taunt, Match, Bet } from '../types';
import { COPA_DO_MUNDO_MATCHES, COMPETITION_LOGOS, LEAGUE_CLASSIFICATIONS } from '../constants';

const STORAGE_KEYS = {
  WORLD_CUP_IMAGE: 'duet_world_cup_image',
  WORLD_CUP_MATCHES: 'duet_world_cup_matches',
  WORLD_CUP_TEAMS: 'duet_world_cup_teams',
};

// This wrapper bridges the previous Storage Service architecture to the new unified, relation-consistent duetStore data layer.
export const storageService = {
  getUserProfile: (): UserProfile => {
    const user = duetStore.getCurrentUser();
    return {
      id: user.id,
      name: user.name,
      photo: user.avatar || user.photo || 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
      ranking: user.ranking as any,
      stats: {
        winRate: user.stats.winRate,
        totalWon: user.stats.totalWon,
        totalLost: user.stats.totalLost
      }
    };
  },

  updateUserProfile: (profile: Partial<UserProfile>): UserProfile => {
    const updates: any = {};
    if (profile.name !== undefined) updates.name = profile.name;
    if (profile.photo !== undefined) {
      updates.avatar = profile.photo;
      updates.photo = profile.photo;
    }
    if (profile.ranking !== undefined) updates.ranking = profile.ranking;
    if (profile.stats !== undefined) {
      updates.stats = {
        ...duetStore.getCurrentUser().stats,
        ...profile.stats
      };
    }
    const updated = duetStore.updateUserProfile(updates);
    return {
      id: updated.id,
      name: updated.name,
      photo: updated.avatar || updated.photo || 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png',
      ranking: updated.ranking as any,
      stats: {
        winRate: updated.stats.winRate,
        totalWon: updated.stats.totalWon,
        totalLost: updated.stats.totalLost
      }
    };
  },

  getWallet: (): Wallet => {
    return duetStore.getWallet();
  },

  updateWallet: (data: Partial<Wallet>) => {
    return duetStore.updateWallet(data);
  },

  getBets: (): Bet[] => {
    return duetStore.getBets() as any[];
  },

  saveBet: (bet: Bet) => {
    // Inject userId properly to be consistent
    const saved = duetStore.saveBet({
      id: bet.id,
      matchId: bet.matchId,
      odds: bet.odds || 1.85,
      marketId: bet.marketId || `mk${bet.matchId}_1`,
      market: bet.market,
      amount: bet.amount,
      category: bet.category as any,
      status: bet.status,
      roomName: bet.roomName,
      password: bet.password,
      createdAt: bet.createdAt || new Date().toISOString()
    });
    return duetStore.getBets() as any[];
  },

  deleteBet: (id: string, refund: boolean = false) => {
    duetStore.deleteBet(id, refund);
    return duetStore.getBets() as any[];
  },

  getFavorites: (): FavoriteItem[] => {
    return duetStore.getFavorites();
  },

  saveFavorite: (favorite: FavoriteItem) => {
    return duetStore.saveFavorite(favorite);
  },

  updateFavorites: (favorites: FavoriteItem[]) => {
    localStorage.setItem('duet_favorites', JSON.stringify(favorites));
    try {
      window.dispatchEvent(new CustomEvent('favoritesUpdated'));
    } catch (e) {
      const event = document.createEvent('Event');
      event.initEvent('favoritesUpdated', true, true);
      window.dispatchEvent(event);
    }
    return favorites;
  },

  deleteFavorite: (id: string | number) => {
    return duetStore.deleteFavorite(id);
  },

  getNotifications: (): Notification[] => {
    return duetStore.getNotifications() as any[];
  },

  addNotification: (notification: Notification) => {
    duetStore.addNotification({
      userId: 'user_1',
      type: ((notification.type as string) === 'Challenge' || notification.type === 'Taunt') ? 'Taunt' : 'Performance',
      title: notification.title,
      message: notification.message || '',
      emoji: notification.emoji || '🔔',
      entityType: notification.challengeId ? 'challenge' : 'general',
      entityId: notification.challengeId || undefined
    });
    return duetStore.getNotifications() as any[];
  },

  markNotificationAsRead: (id: string) => {
    duetStore.markNotificationAsRead(id);
    return duetStore.getNotifications() as any[];
  },

  getTaunts: (): Taunt[] => {
    try {
      const data = localStorage.getItem('duet_taunts');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  sendTaunt: (taunt: Omit<Taunt, 'id' | 'createdAt'>) => {
    const taunts = storageService.getTaunts();
    const newTaunt: Taunt = {
      ...taunt,
      id: `taunt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newTaunt, ...taunts];
    localStorage.setItem('duet_taunts', JSON.stringify(updated));
    
    // Auto-create a synced centralized notification for consistency
    duetStore.addNotification({
      userId: taunt.toUserId || 'user_2',
      type: 'Taunt',
      title: 'Provocação Enviada! 🎭⚡',
      message: `Enviou uma provocação (Sticker: ${taunt.stickerId}) para o utilizador.`,
      emoji: '⚡'
    });

    try {
      window.dispatchEvent(new CustomEvent('tauntsUpdated'));
    } catch (e) {}
    return updated;
  },

  updateBetStatus: (id: string, status: Bet['status']) => {
    duetStore.updateBetStatus(id, status as any);
    return duetStore.getBets() as any[];
  },

  getWorldCupImage: (): string => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORLD_CUP_IMAGE);
      if (!data || data.startsWith('/src/assets/')) {
        const defaultImg = COMPETITION_LOGOS['Copa do Mundo'];
        localStorage.setItem(STORAGE_KEYS.WORLD_CUP_IMAGE, defaultImg);
        return defaultImg;
      }
      return data;
    } catch (e) {
      return COMPETITION_LOGOS['Copa do Mundo'];
    }
  },

  saveWorldCupImage: (url: string) => {
    localStorage.setItem(STORAGE_KEYS.WORLD_CUP_IMAGE, url);
    window.dispatchEvent(new CustomEvent('worldCupUpdated'));
  },

  getWorldCupMatches: (): Match[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORLD_CUP_MATCHES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.WORLD_CUP_MATCHES, JSON.stringify(COPA_DO_MUNDO_MATCHES));
        return COPA_DO_MUNDO_MATCHES;
      }
      return JSON.parse(data);
    } catch (e) {
      return COPA_DO_MUNDO_MATCHES;
    }
  },

  saveWorldCupMatches: (matches: Match[]) => {
    localStorage.setItem(STORAGE_KEYS.WORLD_CUP_MATCHES, JSON.stringify(matches));
    window.dispatchEvent(new CustomEvent('worldCupUpdated'));
  },

  getWorldCupTeams: (): Record<string, any[]> => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORLD_CUP_TEAMS);
      if (!data) {
        const wcTeams: Record<string, any[]> = {};
        Object.keys(LEAGUE_CLASSIFICATIONS).forEach(key => {
          if (key.startsWith('Copa do Mundo')) {
            wcTeams[key] = LEAGUE_CLASSIFICATIONS[key];
          }
        });
        localStorage.setItem(STORAGE_KEYS.WORLD_CUP_TEAMS, JSON.stringify(wcTeams));
        return wcTeams;
      }
      return JSON.parse(data);
    } catch (e) {
      const wcTeams: Record<string, any[]> = {};
      Object.keys(LEAGUE_CLASSIFICATIONS).forEach(key => {
        if (key.startsWith('Copa do Mundo')) {
          wcTeams[key] = LEAGUE_CLASSIFICATIONS[key];
        }
      });
      return wcTeams;
    }
  },

  saveWorldCupTeams: (teams: Record<string, any[]>) => {
    localStorage.setItem(STORAGE_KEYS.WORLD_CUP_TEAMS, JSON.stringify(teams));
    window.dispatchEvent(new CustomEvent('worldCupUpdated'));
  }
};
