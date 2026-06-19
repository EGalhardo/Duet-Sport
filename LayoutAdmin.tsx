import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Gavel, LogOut, ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile } = useAppContext();

  // Simple auth check - normally this would check a role='admin' on userProfile
  React.useEffect(() => {
    if (!userProfile) {
      navigate('/');
    }
  }, [userProfile, navigate]);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard IA', path: '/admin' },
    { icon: CalendarDays, label: 'Gerar Partidas', path: '/admin/partidas' },
    { icon: Gavel, label: 'Auditoria de Resultados', path: '/admin/resultados' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-[#091747] text-white flex flex-col hidden md:flex h-full fixed left-0 top-0 z-40">
        <div className="p-6 flex flex-col gap-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-black text-xl leading-none italic">DUET</h1>
              <span className="text-[10px] text-purple-300 font-bold uppercase tracking-widest">Admin IA</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all",
                location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar à App</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#091747] text-white p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-black italic">DUET ADMIN</span>
          </div>
          <Link to="/" className="p-2 bg-white/10 rounded-lg">
            <LogOut className="w-4 h-4" />
          </Link>
        </header>
        
        {/* Mobile Nav */}
        <nav className="md:hidden flex overflow-x-auto bg-[#091747] text-white/70 text-xs font-bold border-t border-white/10 hide-scrollbar sticky top-[60px] z-30">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-4 py-3 whitespace-nowrap flex items-center gap-2 border-b-2 transition-all",
                location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                  ? "border-purple-400 text-purple-400"
                  : "border-transparent"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}