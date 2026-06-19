import React from 'react';
import { ArrowLeft, UserRound, IdCard, Settings, Shield, LogOut, Info, Pencil, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Perfil() {
  const { auth, logout } = useAppContext();

  const menuItems = [
    { icon: IdCard, label: 'Dados Pessoais', sub: 'Nome, email, contacto e informações básicas', path: '/dados-pessoais' },
    { icon: Settings, label: 'Definições', sub: 'Preferências, notificações e configurações', path: '/definicoes' },
    { icon: Shield, label: 'Segurança', sub: 'Palavra-passe, sessão e proteção da conta', path: '/seguranca' },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Perfil</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-16 pb-12">
        <div className="text-center mb-16">
          <img 
            src="https://i.postimg.cc/8C5BL8Wt/BI.gif" 
            alt="Perfil" 
            className="mx-auto w-[460px] md:w-[600px] h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
          <h1 className="mt-10 text-2xl md:text-3xl font-bold text-[#091747] tracking-tight">O Teu Perfil</h1>
          <p className="mt-4 text-gray-500 font-medium">Gere os teus dados pessoais, definições e segurança.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-6">
          <div className="bg-[#FFB10A] p-4 md:p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <UserRound className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h3 className="font-bold text-lg">Minha Conta</h3>
                <p className="text-xs text-white/80">Gestão do teu perfil</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors text-xs font-bold">
              <Pencil className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          </div>

          <div className="divide-y divide-gray-50">
            {menuItems.map((item, i) => (
              <Link 
                key={i} 
                to={item.path}
                className="flex items-center gap-4 p-5 hover:bg-orange-50/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-100/50 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-[#FFC000]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#091747]">{item.label}</p>
                  <p className="text-[10px] text-gray-500 truncate">{item.sub}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}

            <Link 
              to="/logout"
              className="w-full flex items-center gap-4 p-5 hover:bg-red-50/50 transition-colors group text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100/50 flex items-center justify-center shrink-0">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-red-600">Terminar Sessão</p>
                <p className="text-[10px] text-gray-500 truncate">Sair da tua conta neste dispositivo</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="bg-[#FFB10A] rounded-2xl p-4 flex gap-3 items-start border border-white/20">
          <Info className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div className="text-white">
            <p className="text-xs font-bold">Página de perfil ilustrativa</p>
            <p className="text-[10px] text-white/80 leading-relaxed mt-1">
              Nesta versão, os dados são apenas ilustrativos. A autenticação real será integrada numa fase seguinte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
