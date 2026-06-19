import React from 'react';
import { ArrowLeft, LogOut, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function TerminarSessao() {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('onboarding:seen');
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/perfil" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Terminar Sessão</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden p-6 md:p-8">
          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 mb-6">
            <p className="text-[#091747] font-bold text-lg">Confirmar</p>
            <p className="mt-2 text-sm text-gray-600">Queres terminar a sessão neste dispositivo?</p>
          </div>

          <div className="rounded-2xl border border-gray-300 p-6 space-y-4 mb-8">
             <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6 text-red-500" />
                </div>
                <div>
                   <p className="text-sm font-bold text-[#091747]">O que acontece ao sair?</p>
                   <ul className="mt-2 list-disc pl-5 text-xs text-gray-500 space-y-2 font-medium">
                     <li>Serás redirecionado para a página inicial.</li>
                     <li>Os teus dados locais (favoritos/histórico) permanecem no dispositivo.</li>
                   </ul>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="py-4 rounded-2xl border-2 border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={handleLogout}
              className="py-4 rounded-2xl bg-white border-2 border-red-500 text-red-600 font-bold hover:bg-red-50 transition-all"
            >
              Terminar
            </button>
          </div>

          <p className="mt-6 text-[10px] text-gray-600 text-center uppercase tracking-widest font-black">
            Nota: esta ação encerra a sessão atual
          </p>
        </div>
      </div>
    </div>
  );
}
