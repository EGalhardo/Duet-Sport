import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Save, Camera, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { storageService } from '../services/storageService';
import { cn } from '../lib/utils';

const AVAILABLE_AVATARS = [
  { id: '1', url: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png', label: 'Edlasio (Padrão)' },
  { id: '2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', label: 'Fernando' },
  { id: '3', url: 'https://i.postimg.cc/mD7Pr65C/Avatar.png', label: 'Avatar Azul' },
  { id: '4', url: 'https://i.pravatar.cc/150?u=12', label: 'Geral 1' },
  { id: '5', url: 'https://i.pravatar.cc/150?u=23', label: 'Geral 2' },
];

export default function DadosPessoais() {
  const { auth } = useAppContext();
  const navigate = useNavigate();
  const [name, setName] = useState(auth.user?.name || '');
  const [avatar, setAvatar] = useState(auth.user?.avatar || 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // Update the storage service profile
    storageService.updateUserProfile({
      name: name.trim(),
      photo: avatar,
    });

    // Emite o evento reativo e de seguida volta ao perfil
    setSuccess(true);
    setTimeout(() => {
      navigate('/perfil');
    }, 1200);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/perfil" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Dados Pessoais</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full px-4 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden p-6 md:p-8 relative">
          {success && (
            <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-4 border-2 border-green-200">
                <Check className="w-8 h-8 stroke-[3px]" />
              </div>
              <h3 className="text-lg font-black text-[#0c1e56] uppercase tracking-tight">Dados Guardados!</h3>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-bold">O seu perfil foi atualizado com sucesso.</p>
            </div>
          )}

          <div className="flex flex-col items-center mb-8">
            <div 
              onClick={() => setShowAvatarSelector(!showAvatarSelector)}
              className="relative group cursor-pointer"
            >
              <img 
                src={avatar} 
                className="w-24 h-24 rounded-full border-4 border-orange-100 hover:brightness-90 transition-all object-cover" 
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#FFB10A] rounded-full flex items-center justify-center text-white border-4 border-white">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <button
              onClick={() => setShowAvatarSelector(!showAvatarSelector)}
              className="mt-3 text-[10px] font-black text-[#0c1e56] bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full uppercase tracking-widest transition-all"
            >
              Alterar Foto
            </button>

            {showAvatarSelector && (
              <div className="mt-5 p-4 rounded-2xl bg-[#f1f3f9] border border-slate-200/80 w-full animate-pop-in">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-3">Escolhe um Avatar</p>
                <div className="flex items-center justify-center gap-3.5 flex-wrap">
                  {AVAILABLE_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        setAvatar(av.url);
                        setShowAvatarSelector(false);
                      }}
                      className={cn(
                        "w-12 h-12 rounded-full overflow-hidden border-2 transition-all hover:scale-110 active:scale-95 relative",
                        avatar === av.url ? "border-[#FFB10A] scale-105 shadow-md shadow-orange-100" : "border-transparent"
                      )}
                      title={av.label}
                    >
                      <img src={av.url} className="w-full h-full object-cover" />
                      {avatar === av.url && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 stroke-[3px]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Nome Completo</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"><User className="w-5 h-5" /></span>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#FFB10A] outline-none font-semibold text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"><Mail className="w-5 h-5" /></span>
                <input 
                  type="email" 
                  defaultValue={auth.user?.email || 'edlasio@example.com'}
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-transparent text-gray-400 font-semibold text-sm cursor-not-allowed select-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Contacto</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"><Phone className="w-5 h-5" /></span>
                <input 
                  type="tel" 
                  placeholder="9xx xxx xxx"
                  defaultValue="923 456 789"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#FFB10A] outline-none font-semibold text-sm transition-all"
                />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#FFB10A] text-white font-black py-4 rounded-xl hover:bg-[#FFC000] active:scale-[0.98] transition-all uppercase tracking-wide text-xs">
                <Save className="w-4 h-4 stroke-[2.5px]" />
                Guardar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
