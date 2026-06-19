import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAppContext } from '../context/AppContext';

export function useWallet() {
  const { auth } = useAppContext();
  const [balance, setBalance] = useState<number>(0);
  const [blockedBalance, setBlockedBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.isLoggedIn || !auth.user?.id || auth.user.id === 'me') {
      // Falback to mock if not really logged in via Supabase
      const localStr = localStorage.getItem('duet_wallet');
      if (localStr) {
        try {
          const parsed = JSON.parse(localStr);
          setBalance(parsed.balance || 0);
          setBlockedBalance(parsed.blocked_balance || 0);
        } catch(e) {}
      }
      setIsLoading(false);
      return;
    }

    const fetchWallet = async () => {
      try {
        const { data, error } = await supabase
          .from('wallets')
          .select('balance, blocked_balance')
          .eq('user_id', auth.user!.id)
          .single();

        if (error) throw error;
        if (data) {
          setBalance(data.balance);
          setBlockedBalance(data.blocked_balance);
        }
      } catch (err) {
        console.error('Error fetching wallet:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallet();

    // Set up realtime subscription for wallet changes
    const subscription = supabase
      .channel(`wallet_changes_${auth.user.id}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'wallets',
        filter: `user_id=eq.${auth.user.id}`
      }, (payload) => {
        setBalance(payload.new.balance);
        setBlockedBalance(payload.new.blocked_balance);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [auth.isLoggedIn, auth.user]);

  const updateWallet = async (newBalance: number, newBlocked: number) => {
    if (!auth.isLoggedIn || auth.user?.id === 'me') {
       // Mock
       localStorage.setItem('duet_wallet', JSON.stringify({ balance: newBalance, blocked_balance: newBlocked }));
       window.dispatchEvent(new CustomEvent('walletUpdated'));
       setBalance(newBalance);
       setBlockedBalance(newBlocked);
       return;
    }

    const { error } = await supabase
      .from('wallets')
      .update({ balance: newBalance, blocked_balance: newBlocked })
      .eq('user_id', auth.user!.id);
      
    if (error) {
      console.error('Error updating wallet:', error);
      throw error;
    }
  };

  return { balance, blockedBalance, isLoading, updateWallet };
}
