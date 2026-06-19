import React from 'react';
import { Home, Heart, Trophy, Wallet, History, User, MessageSquare, PlayCircle, LogOut, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAppContext();

  const navItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Heart, label: 'Favoritos', path: '/favoritos' },
    { icon: Trophy, label: 'Classificação', path: '/classificacao' },
    { icon: Wallet, label: 'Carteira', path: '/carteira' },
    { icon: History, label: 'Histórico', path: '/historico' },
    { icon: User, label: 'Perfil', path: '/perfil' },
  ];

  const communityItems = [
    { icon: MessageSquare, label: 'Opinião & Sugestões', path: '/opinioes-sugestoes' },
    { icon: PlayCircle, label: 'Video-Tutorial', path: '/tutorial' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[250px] bg-white border-r border-gray-300 fixed left-0 top-16 bottom-0 overflow-y-auto">
      <div className="p-4 pt-8">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold transition-all duration-200",
                location.pathname === item.path
                  ? "bg-[#FFB10A] text-white"
                  : "text-[#364153] hover:bg-orange-50 hover:text-[#FFB10A]"
              )}
            >
              <item.icon className="w-5 h-5 font-bold" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-300 my-4" />

        <nav className="space-y-1">
          {communityItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold transition-all duration-200",
                location.pathname === item.path
                  ? "bg-[#FFB10A] text-white"
                  : "text-[#364153] hover:bg-orange-50 hover:text-[#FFB10A]"
              )}
            >
              <item.icon className="w-5 h-5 font-bold" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-300 my-4 transition-colors" />

        <nav className="space-y-1">
          <Link
            to="/logout"
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold transition-all duration-200",
              location.pathname === "/logout"
                ? "bg-[#FFB10A] text-white"
                : "text-[#364153] hover:bg-red-50 hover:text-red-600"
            )}
          >
            <LogOut className="w-5 h-5 font-bold" />
            <span>Terminar Sessão</span>
          </Link>

          <div className="my-2 border-t border-gray-200" />

          <Link
            to="/admin"
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg font-black transition-all duration-200",
              location.pathname.startsWith('/admin')
                ? "bg-[#091747] text-white"
                : "text-gray-400 hover:bg-[#091747]/10 hover:text-[#091747]"
            )}
          >
            <div className="p-1 rounded-md bg-gradient-to-tr from-purple-500 to-indigo-500 text-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <span className="uppercase tracking-widest text-[10px] italic">Painel Admin IA</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
