import React from 'react';
import { Shield, KeyRound, LogIn, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Panel, Button } from '../components/UIComponents';

export default function Seguranca() {
  const navigate = useNavigate();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Salva silenciosamente sem window.alert()
    navigate('/perfil');
  };

  return (
    <div className="flex flex-col flex-1">
      <PageHeader title="Segurança" to="/perfil" />

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="space-y-6">
          <Panel
            variant="bordered"
            title={
              <div className="flex items-center gap-3">
                <KeyRound className="w-5 h-5 text-[#FFB10A]" />
                <span className="text-[#091747] font-black uppercase tracking-tight">Alterar Palavra-passe</span>
              </div>
            }
            bodyClassName="p-6 md:p-8"
          >
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Palavra-passe atual</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FFB10A] outline-none font-semibold transition-all text-sm" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Nova palavra-passe</label>
                <input 
                  type="password" 
                  placeholder="Mínimo 6 caracteres" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#FFB10A] outline-none font-semibold transition-all text-sm" 
                />
              </div>
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth
              >
                Salvar Nova Senha
              </Button>
            </form>
          </Panel>

          <Panel
            variant="bordered"
            title={
              <div className="flex items-center gap-3">
                <LogIn className="w-5 h-5 text-[#FFB10A]" />
                <span className="text-[#091747] font-black uppercase tracking-tight">Sessões</span>
              </div>
            }
            bodyClassName="p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-transparent border-2 border-gray-200">
                <div>
                  <p className="text-sm font-bold text-[#091747]">Este dispositivo</p>
                  <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Ativo agora</p>
                </div>
                <button className="text-xs font-black text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                  Terminar
                </button>
              </div>
              
              <button className="w-full py-4 text-xs font-black text-gray-500 uppercase tracking-wider hover:text-[#091747] transition-all cursor-pointer">
                Terminar em todos os dispositivos
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
