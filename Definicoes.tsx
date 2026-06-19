import React from 'react';
import { SlidersHorizontal, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { PageHeader, Panel, Button } from '../components/UIComponents';

export default function Definicoes() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Salva silenciosamente e navega para perfil sem alert()
    navigate('/perfil');
  };

  return (
    <div className="flex flex-col flex-1">
      <PageHeader title="Definições" to="/perfil" />

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <Panel
          variant="bordered"
          title={
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#FFB10A]" />
              <span>Preferências e Notificações</span>
            </div>
          }
          bodyClassName="p-6 space-y-6"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3 className="text-[#091747] font-bold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#FFB10A]" />
                Preferências
              </h3>
              
              <ToggleItem label="Sons" sub="Ativar sons da aplicação." defaultChecked />
              <ToggleItem label="Vibração" sub="Feedback tátil em interações." defaultChecked />
              <ToggleItem label="Modo Compacto" sub="Reduz espaçamentos para ver mais conteúdo." />
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#091747]">Modo Offline</p>
                  <p className="text-[10px] text-[#FFB10A] font-bold">Ativado (Imagens Guardadas)</p>
                </div>
                <div className="w-11 h-6 rounded-full bg-[#FFB10A] flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="space-y-4">
              <h3 className="text-[#091747] font-bold flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#FFB10A]" />
                Notificações
              </h3>
              
              <ToggleItem label="Torneios" sub="Lembretes e atualizações de torneios." defaultChecked />
              <ToggleItem label="Resultados" sub="Avisos quando existirem novos resultados." defaultChecked />
              <ToggleItem label="Novidades" sub="Promoções e novidades do DUET." />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
}

function ToggleItem({ label, sub, defaultChecked = false }: { label: string, sub: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#091747]">{label}</p>
        <p className="text-[10px] text-gray-500">{sub}</p>
      </div>
      <button 
        type="button"
        onClick={() => setChecked(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200 outline-none cursor-pointer",
          checked ? "bg-[#FFB10A]" : "bg-gray-200"
        )}
      >
        <div className={cn(
          "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )} />
      </button>
    </div>
  );
}
