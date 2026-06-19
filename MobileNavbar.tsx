import React from 'react';
import { Home, Heart, Trophy, Wallet, History, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function MobileNavbar() {
  const location = useLocation();

  const items = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Heart, label: 'Favoritos', path: '/favoritos' },
    { icon: Trophy, label: 'Classificação', path: '/classificacao' },
    { icon: Wallet, label: 'Carteira', path: '/carteira' },
    { icon: History, label: 'Histórico', path: '/historico' },
    { icon: User, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-300 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="max-w-7xl mx-auto px-2 h-16">
        <div className="grid grid-cols-6 h-full items-center">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200",
                location.pathname === item.path
                  ? "text-[#FFC000]"
                  : "text-gray-600 hover:text-[#FFC000]"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="mt-1 text-[10px] font-bold truncate w-full text-center">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
