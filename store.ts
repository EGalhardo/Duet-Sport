import { 
  MOCK_USERS, 
  MOCK_MATCHES, 
  MOCK_MARKETS, 
  MOCK_BETS, 
  MOCK_TRANSACTIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_FAVORITES,
  MockUser,
  MockMatch,
  MockMarket,
  MockBet,
  MockTransaction,
  MockNotification
} from '../data/mockData';
import { FavoriteItem, Wallet } from '../types';

// ============================================================================
// STORE KEYS FOR LOCALSTORAGE
// ============================================================================
const STORE_KEYS = {
  USERS: 'duet_store_users',
  MATCHES: 'duet_store_matches',
  MARKETS: 'duet_store_markets',
  BETS: 'duet_store_bets',
  TRANSACTIONS: 'duet_store_transactions',
  NOTIFICATIONS: 'duet_store_notifications',
  FAVORITES: 'duet_favorites', // Kept for backwards compatibility
  WALLET: 'duet_wallet'        // Kept for backwards compatibility
};

// ============================================================================
// REAL-TIME EVENT SYSTEM SIGNALS
// ============================================================================
export const STORE_EVENTS = {
  USERS_UPDATED: 'duet_event_users_updated',
  BETS_UPDATED: 'duet_event_bets_updated',
  TRANSACTIONS_UPDATED: 'duet_event_transactions_updated',
  NOTIFICATIONS_UPDATED: 'duet_event_notifications_updated',
  WALLET_UPDATED: 'walletUpdated', // Keeps compatibility with existing UI listeners
  FAVORITES_UPDATED: 'favoritesUpdated' // Keeps compatibility with existing UI listeners
};

// ============================================================================
// LAZY STORAGE STATE INITIALIZATION
// ============================================================================
function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

// Ensure first-time startup data gets populated securely
export function initializeStore(): void {
  if (!localStorage.getItem(STORE_KEYS.USERS)) {
    setStoredItem(STORE_KEYS.USERS, MOCK_USERS);
  }
  if (!localStorage.getItem(STORE_KEYS.MATCHES)) {
    setStoredItem(STORE_KEYS.MATCHES, MOCK_MATCHES);
  }
  if (!localStorage.getItem(STORE_KEYS.MARKETS)) {
    setStoredItem(STORE_KEYS.MARKETS, MOCK_MARKETS);
  }
  if (!localStorage.getItem(STORE_KEYS.BETS)) {
    setStoredItem(STORE_KEYS.BETS, MOCK_BETS);
  }
  if (!localStorage.getItem(STORE_KEYS.TRANSACTIONS)) {
    setStoredItem(STORE_KEYS.TRANSACTIONS, MOCK_TRANSACTIONS);
  }
  if (!localStorage.getItem(STORE_KEYS.NOTIFICATIONS)) {
    setStoredItem(STORE_KEYS.NOTIFICATIONS, MOCK_NOTIFICATIONS);
  }
  if (!localStorage.getItem(STORE_KEYS.FAVORITES)) {
    setStoredItem(STORE_KEYS.FAVORITES, MOCK_FAVORITES);
  }
  if (!localStorage.getItem(STORE_KEYS.WALLET)) {
    const initialWallet: Wallet = {
      balance: 1125,
      blocked_balance: 0
    };
    setStoredItem(STORE_KEYS.WALLET, initialWallet);
  }
}

// Auto-run initialization
initializeStore();

// ============================================================================
// CENTRALIZED SYNCED STORAGE ENGINE METHODS
// ============================================================================
export const duetStore = {
  // --------------------------------------------------------------------------
  // USERS & PROFILE
  // --------------------------------------------------------------------------
  getUsers: (): MockUser[] => {
    return getStoredItem<MockUser[]>(STORE_KEYS.USERS, MOCK_USERS);
  },

  getUserById: (id: string): MockUser | undefined => {
    const users = duetStore.getUsers();
    return users.find(u => u.id === id);
  },

  getCurrentUser: (): MockUser => {
    const user = duetStore.getUserById('user_1');
    if (!user) {
      // Emergency fallback to prevent null crashes
      return MOCK_USERS[0];
    }
    return user;
  },

  updateUserProfile: (profileUpdates: Partial<MockUser>): MockUser => {
    const users = duetStore.getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === 'user_1') {
        const updated = { ...u, ...profileUpdates };
        // Sync custom photo / avatar redundancy
        if (profileUpdates.photo) updated.avatar = profileUpdates.photo;
        if (profileUpdates.avatar) updated.photo = profileUpdates.avatar;
        return updated;
      }
      return u;
    });

    setStoredItem(STORE_KEYS.USERS, updatedUsers);
    
    // Broadcast updates
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.USERS_UPDATED));
    window.dispatchEvent(new CustomEvent('userProfileUpdated')); // Keeps legacy support live
    return updatedUsers.find(u => u.id === 'user_1')!;
  },

  // Dynamic Rankings generated live from USERS
  getRankings: (tab: '1 vs 1' | 'Privado' | 'Nacional'): MockUser[] => {
    const users = duetStore.getUsers();
    // Sort all users by score descending
    const sorted = [...users].sort((a, b) => b.score - a.score);
    
    if (tab === '1 vs 1') {
      // Simulate/Filter cohort of smaller score nodes or return standard segment
      return sorted.filter(u => u.score <= 10000 || u.id === 'user_1');
    }
    if (tab === 'Privado') {
      return sorted.filter(u => (u.score > 10000 && u.score <= 20000) || u.id === 'user_1');
    }
    // Nacional displays the whole global board
    return sorted;
  },

  // --------------------------------------------------------------------------
  // MATCHES & SPORTS
  // --------------------------------------------------------------------------
  getMatches: (): MockMatch[] => {
    return getStoredItem<MockMatch[]>(STORE_KEYS.MATCHES, MOCK_MATCHES);
  },

  getMatchById: (id: number): MockMatch | undefined => {
    const matches = duetStore.getMatches();
    return matches.find(m => m.id === id);
  },

  // --------------------------------------------------------------------------
  // MARKETS
  // --------------------------------------------------------------------------
  getMarkets: (): MockMarket[] => {
    return getStoredItem<MockMarket[]>(STORE_KEYS.MARKETS, MOCK_MARKETS);
  },

  getMarketsByMatchId: (matchId: number): MockMarket[] => {
    const markets = duetStore.getMarkets();
    return markets.filter(m => m.matchId === matchId);
  },

  getMarketById: (id: string): MockMarket | undefined => {
    const markets = duetStore.getMarkets();
    return markets.find(m => m.id === id);
  },

  // --------------------------------------------------------------------------
  // WALLET
  // --------------------------------------------------------------------------
  getWallet: (): Wallet => {
    return getStoredItem<Wallet>(STORE_KEYS.WALLET, { balance: 1125, blocked_balance: 0 });
  },

  updateWallet: (data: Partial<Wallet>): Wallet => {
    const current = duetStore.getWallet();
    const updated = { ...current, ...data };
    setStoredItem(STORE_KEYS.WALLET, updated);
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.WALLET_UPDATED));
    return updated;
  },

  // --------------------------------------------------------------------------
  // BETS
  // --------------------------------------------------------------------------
  getBets: (): MockBet[] => {
    return getStoredItem<MockBet[]>(STORE_KEYS.BETS, MOCK_BETS);
  },

  getBetsByUser: (userId: string): MockBet[] => {
    const bets = duetStore.getBets();
    return bets.filter(b => b.userId === userId);
  },

  saveBet: (betData: Omit<MockBet, 'userId' | 'potentialPayout'> & { userId?: string }): MockBet => {
    const bets = duetStore.getBets();
    const userId = betData.userId || 'user_1';
    
    // Dynamic calculate payout = amount * odds
    const potentialPayout = Math.round(betData.amount * betData.odds);
    
    const newBet: MockBet = {
      ...betData,
      userId,
      potentialPayout,
      status: betData.status || 'Open'
    };

    const updated = [newBet, ...bets];
    setStoredItem(STORE_KEYS.BETS, updated);

    // Update wallet balance vs blocked amount silently inside store rules
    const wallet = duetStore.getWallet();
    if (newBet.status === 'Open') {
      duetStore.updateWallet({
        balance: Math.max(0, wallet.balance - newBet.amount),
        blocked_balance: wallet.blocked_balance + newBet.amount
      });
    }

    // Record associated transaction
    duetStore.saveTransaction({
      userId,
      type: 'transfer',
      amount: newBet.amount,
      method: 'Aposta Unificada',
      destination: `Aposta #${newBet.id}`,
      status: 'Completed'
    });

    window.dispatchEvent(new CustomEvent(STORE_EVENTS.BETS_UPDATED));
    window.dispatchEvent(new CustomEvent('betsUpdated'));
    return newBet;
  },

  deleteBet: (id: string, refund: boolean = false): void => {
    const bets = duetStore.getBets();
    const betToDelete = bets.find(b => b.id === id);
    if (!betToDelete) return;

    const updated = bets.filter(b => b.id !== id);
    setStoredItem(STORE_KEYS.BETS, updated);

    // Refund handling
    if (refund && betToDelete.status === 'Open') {
      const wallet = duetStore.getWallet();
      duetStore.updateWallet({
        balance: wallet.balance + betToDelete.amount,
        blocked_balance: Math.max(0, wallet.blocked_balance - betToDelete.amount)
      });

      duetStore.saveTransaction({
        userId: betToDelete.userId,
        type: 'deposit',
        amount: betToDelete.amount,
        method: 'Reembolso Previsão',
        destination: 'Carteira Duet',
        status: 'Completed'
      });
    }

    window.dispatchEvent(new CustomEvent(STORE_EVENTS.BETS_UPDATED));
    window.dispatchEvent(new CustomEvent('betsUpdated'));
  },

  updateBetStatus: (id: string, status: 'Won' | 'Lost' | 'Live' | 'Canceled'): void => {
    const bets = duetStore.getBets();
    const updated = bets.map(b => {
      if (b.id === id) {
        const updatedBet = { ...b, status };
        
        // Handle payouts or refunds upon conclusion
        if (status === 'Won') {
          const wallet = duetStore.getWallet();
          duetStore.updateWallet({
            balance: wallet.balance + updatedBet.potentialPayout,
            blocked_balance: Math.max(0, wallet.blocked_balance - b.amount)
          });

          // Save transaction
          duetStore.saveTransaction({
            userId: b.userId,
            type: 'deposit',
            amount: updatedBet.potentialPayout,
            method: 'Prémio Consagrado',
            destination: 'Carteira Duet',
            status: 'Completed'
          });

          // Create notification
          duetStore.addNotification({
            userId: b.userId,
            type: 'Performance',
            title: 'Previsão Vencedora! 🏆🏁',
            message: `Ganhaste ${updatedBet.potentialPayout} KZ com a odd de ${b.odds.toFixed(2)}!`,
            emoji: '💰',
            entityType: 'bet',
            entityId: b.id
          });

          // Dynamic Profile Upgrades
          const user = duetStore.getUserById(b.userId);
          if (user) {
            const newWon = user.stats.totalWon + 1;
            const newTotal = newWon + user.stats.totalLost;
            duetStore.updateUserProfile({
              score: user.score + Math.round(150 * b.odds),
              stats: {
                ...user.stats,
                totalWon: newWon,
                winRate: Math.round((newWon / newTotal) * 100)
              }
            });
          }
        } else if (status === 'Lost') {
          const wallet = duetStore.getWallet();
          duetStore.updateWallet({
            blocked_balance: Math.max(0, wallet.blocked_balance - b.amount)
          });

          // Dynamic Profile Stats Loss
          const user = duetStore.getUserById(b.userId);
          if (user) {
            const newLost = user.stats.totalLost + 1;
            const newTotal = user.stats.totalWon + newLost;
            duetStore.updateUserProfile({
              score: Math.max(0, user.score - 50),
              stats: {
                ...user.stats,
                totalLost: newLost,
                winRate: Math.round((user.stats.totalWon / newTotal) * 100)
              }
            });
          }
        }

        return updatedBet;
      }
      return b;
    });

    setStoredItem(STORE_KEYS.BETS, updated);
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.BETS_UPDATED));
  },

  // --------------------------------------------------------------------------
  // TRANSACTIONS
  // --------------------------------------------------------------------------
  getTransactions: (): MockTransaction[] => {
    return getStoredItem<MockTransaction[]>(STORE_KEYS.TRANSACTIONS, MOCK_TRANSACTIONS);
  },

  getTransactionsByUser: (userId: string): MockTransaction[] => {
    const transactions = duetStore.getTransactions();
    return transactions.filter(t => t.userId === userId);
  },

  saveTransaction: (txData: Omit<MockTransaction, 'id' | 'createdAt'>): MockTransaction => {
    const transactions = duetStore.getTransactions();
    const newTx: MockTransaction = {
      ...txData,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    const updated = [newTx, ...transactions];
    setStoredItem(STORE_KEYS.TRANSACTIONS, updated);
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.TRANSACTIONS_UPDATED));
    return newTx;
  },

  // --------------------------------------------------------------------------
  // NOTIFICATIONS
  // --------------------------------------------------------------------------
  getNotifications: (): MockNotification[] => {
    return getStoredItem<MockNotification[]>(STORE_KEYS.NOTIFICATIONS, MOCK_NOTIFICATIONS);
  },

  getNotificationsByUser: (userId: string): MockNotification[] => {
    const notifications = duetStore.getNotifications();
    return notifications.filter(n => n.userId === userId);
  },

  addNotification: (notificationData: Omit<MockNotification, 'id' | 'isRead' | 'createdAt'>): MockNotification => {
    const notifications = duetStore.getNotifications();
    const newNotification: MockNotification = {
      ...notificationData,
      id: `nt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    const updated = [newNotification, ...notifications];
    setStoredItem(STORE_KEYS.NOTIFICATIONS, updated);
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.NOTIFICATIONS_UPDATED));
    window.dispatchEvent(new CustomEvent('notificationsUpdated')); // Compatibility trigger
    return newNotification;
  },

  markNotificationAsRead: (id: string): void => {
    const notifications = duetStore.getNotifications();
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    setStoredItem(STORE_KEYS.NOTIFICATIONS, updated);
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.NOTIFICATIONS_UPDATED));
    window.dispatchEvent(new CustomEvent('notificationsUpdated'));
  },

  // --------------------------------------------------------------------------
  // FAVORITES
  // --------------------------------------------------------------------------
  getFavorites: (): FavoriteItem[] => {
    return getStoredItem<FavoriteItem[]>(STORE_KEYS.FAVORITES, MOCK_FAVORITES);
  },

  saveFavorite: (favorite: FavoriteItem): FavoriteItem[] => {
    const favorites = duetStore.getFavorites();
    const updated = [favorite, ...favorites.filter(f => f.id !== favorite.id)];
    setStoredItem(STORE_KEYS.FAVORITES, updated);
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.FAVORITES_UPDATED));
    return updated;
  },

  deleteFavorite: (id: string | number): FavoriteItem[] => {
    const favorites = duetStore.getFavorites();
    const updated = favorites.filter(f => f.id !== id);
    setStoredItem(STORE_KEYS.FAVORITES, updated);
    window.dispatchEvent(new CustomEvent(STORE_EVENTS.FAVORITES_UPDATED));
    return updated;
  }
};
