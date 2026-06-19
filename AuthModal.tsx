import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, Globe, UserPlus, Key, Mail, Lock, User, Check, ShieldAlert, Camera } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'login' | 'social' | 'signup' | 'reset';
}

type AuthTab = 'login' | 'social' | 'signup' | 'reset';

const AVAILABLE_AVATARS = [
  { id: '1', url: 'https://i.postimg.cc/Nj00CMbd/Foto-Edlasio.png', label: 'Edlasio (Padrão)' },
  { id: '2', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', label: 'Fernando' },
  { id: '3', url: 'https://i.postimg.cc/mD7Pr65C/Avatar.png', label: 'Avatar Azul' },
  { id: '4', url: 'https://i.pravatar.cc/150?u=12', label: 'Geral 1' },
  { id: '5', url: 'https://i.pravatar.cc/150?u=23', label: 'Geral 2' },
];

export default function AuthModal({ isOpen, onClose, initialTab }: AuthModalProps) {
  const { login } = useAppContext();
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Reset tab when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setEmail('');
      setPassword('');
      setName('');
      setConfirmPassword('');
      setSuccessMsg('');
      setErrorMsg('');
      setIsLoading(false);
    }
  }, [isOpen, initialTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        if (!email || !password) {
          setErrorMsg('Por favor preencha todos os campos.');
          setIsLoading(false);
          return;
        }
        
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message);
          setIsLoading(false);
          return;
        }
        
        setSuccessMsg('Sessão iniciada com sucesso!');
        setTimeout(() => onClose(), 1500);
      } 
      else if (activeTab === 'signup') {
        if (!name || !email || !password || !confirmPassword) {
          setErrorMsg('Todos os campos são obrigatórios.');
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMsg('As senhas não coincidem.');
          setIsLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              avatar_url: avatar,
            }
          }
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        setSuccessMsg('Conta criada com sucesso! Sessão iniciada.');
        setTimeout(() => onClose(), 1500);
      } 
      else if (activeTab === 'reset') {
        if (!email) {
          setErrorMsg('Por favor digite o seu e-mail.');
          setIsLoading(false);
          return;
        }
        
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        setSuccessMsg('Enviámos um link de redefinição para o seu e-mail!');
        setTimeout(() => {
          setActiveTab('login');
          setSuccessMsg('');
          setIsLoading(false);
        }, 2500);
      }
    } catch (err: any) {
      setErrorMsg('Ocorreu um erro inesperado.');
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (platform: string) => {
    setIsLoading(true);
    try {
      const provider = platform.toLowerCase() as 'google' | 'facebook' | 'apple';
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      // Redirection happens automatically via Supabase
    } catch (err: any) {
      setErrorMsg(`Erro ao ligar com ${platform}`);
      setIsLoading(false);
    }
  };

  const handleAutoFill = () => {
    setEmail('joao@duet.com');
    setPassword('password123');
    setName('João Adepto do Real');
    setConfirmPassword('password123');
  };

  const titles = {
    login: 'ENTRAR NA CONTA',
    social: 'LOGIN SOCIAL',
    signup: 'CRIAR CONTA',
    reset: 'RECUPERAR SENHA'
  };

  const subtitles = {
    login: 'Acede aos teus palpites e desafia os teus amigos',
    social: 'Inicia sessão de forma rápida com a tua rede social',
    signup: 'Regista-te grátis e começa a durlar nos teus desportos favoritos',
    reset: 'Introduz o teu e-mail para receberes as instruções'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            id="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            id="auth-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-md bg-[#FAFBFD] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header - Styled like NotificationsModal layout */}
            <div className="bg-[#FFB10A] pt-10 pb-8 px-6 text-white relative flex flex-col items-center text-center rounded-t-[2.5rem] shadow-sm">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/25 rounded-full p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
              
              {/* Magic Auto-Complete Button */}
              {process.env.NODE_ENV !== 'production' && (
                <button
                  type="button"
                  onClick={handleAutoFill}
                  title="Auto preencher credenciais de teste"
                  className="absolute top-5 left-5 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/25 rounded-full p-1.5"
                >
                  <Key className="w-4 h-4" />
                </button>
              )}

              <h3 className="text-xl font-black uppercase tracking-[0.2em] italic text-white leading-none">
                {titles[activeTab]}
              </h3>
              <p className="text-white/95 text-[10px] md:text-xs font-bold uppercase tracking-wider mt-2.5 leading-tight max-w-[280px]">
                {subtitles[activeTab]}
              </p>
            </div>

            {/* Inner Content Area */}
            <div className="p-6 md:p-8 space-y-6 bg-[#F8FAFC]">
              {successMsg ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl border-2 border-emerald-300">
                    <Check className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#091747]">
                    Sucesso!
                  </p>
                  <p className="text-xs text-gray-600 font-bold max-w-[250px]">
                    {successMsg}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-[10px] md:text-xs font-bold rounded-xl flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Form fields depending on selected tab */}
                  {activeTab === 'signup' && (
                    <div className="flex flex-col items-center mb-4">
                      <label className="relative group cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setAvatar(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="w-20 h-20 rounded-full border-4 border-orange-100 hover:brightness-90 transition-all overflow-hidden bg-slate-100 shadow-sm flex items-center justify-center">
                          {avatar ? (
                            <img src={avatar} className="w-full h-full object-cover" alt="User Profile" />
                          ) : (
                            <User className="w-8 h-8 text-slate-300" />
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#FFB10A] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
                          <Camera className="w-3.5 h-3.5" />
                        </div>
                      </label>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Adicionar Foto</span>
                    </div>
                  )}

                  {activeTab === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Edlasio Galhardo"
                          className="w-full pl-10 pr-4 py-3 placeholder:text-slate-400 bg-white border-2 border-slate-200 rounded-2xl text-xs font-bold text-[#091747] focus:outline-none focus:border-[#FFB10A] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {(activeTab === 'login' || activeTab === 'signup' || activeTab === 'reset') && (
                    <div className="space-y-1">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">Endereço de E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nome@exemplo.com"
                          className="w-full pl-10 pr-4 py-3 placeholder:text-slate-400 bg-white border-2 border-slate-200 rounded-2xl text-xs font-bold text-[#091747] focus:outline-none focus:border-[#FFB10A] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {(activeTab === 'login' || activeTab === 'signup') && (
                    <div className="space-y-1">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">Senha</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 placeholder:text-slate-400 bg-white border-2 border-slate-200 rounded-2xl text-xs font-bold text-[#091747] focus:outline-none focus:border-[#FFB10A] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">Confirmar Senha</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 placeholder:text-slate-400 bg-white border-2 border-slate-200 rounded-2xl text-xs font-bold text-[#091747] focus:outline-none focus:border-[#FFB10A] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'social' && (
                    <div className="space-y-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Google')}
                        className="w-full py-3.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-wider text-slate-700 transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.281 1.05 15.45 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.195-1.925H12.24z"/>
                        </svg>
                        Google
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Facebook')}
                        className="w-full py-3.5 px-4 bg-[#1877F2] hover:bg-[#166FE5] rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-sm"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                        </svg>
                        Facebook
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Apple')}
                        className="w-full py-3.5 px-4 bg-black hover:bg-neutral-900 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-wider text-white transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-sm"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                        </svg>
                        Apple ID
                      </button>
                    </div>
                  )}

                  {/* Submission Buttons */}
                  {activeTab !== 'social' && (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 mt-2 bg-[#FFB10A] text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-[#e69f09] active:scale-95 transition-all shadow-md text-center flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                      {activeTab === 'login' && 'Entrar'}
                      {activeTab === 'signup' && 'Criar Conta'}
                      {activeTab === 'reset' && 'Enviar Link'}
                    </button>
                  )}

                  {/* Dynamic sub navigation within the modal */}
                  <div className="grid grid-cols-1 pt-3 text-center gap-2">
                    {activeTab === 'login' && (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveTab('signup')}
                          className="text-[10px] md:text-xs text-slate-500 font-bold hover:text-[#091747] transition-colors"
                        >
                          Não tens uma conta? <span className="text-[#FFB10A] font-black uppercase tracking-wider ml-1 hover:underline">Regista-te</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('reset')}
                          className="text-[10px] md:text-xs text-slate-500 font-bold hover:text-[#091747] transition-colors"
                        >
                          Esqueceste-te da senha? <span className="text-[#FFB10A] font-black uppercase tracking-wider ml-1 hover:underline">Recuperar</span>
                        </button>
                      </>
                    )}

                    {activeTab === 'signup' && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="text-[10px] md:text-xs text-slate-500 font-bold hover:text-[#091747] transition-colors"
                      >
                        Já tens uma conta? <span className="text-[#FFB10A] font-black uppercase tracking-wider ml-1 hover:underline">Entrar</span>
                      </button>
                    )}

                    {(activeTab === 'reset' || activeTab === 'social') && (
                      <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="text-[10px] md:text-xs text-slate-500 font-bold hover:text-[#091747] transition-colors"
                      >
                        Voltar ao <span className="text-[#FFB10A] font-black uppercase tracking-wider ml-1 hover:underline">Login</span>
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Footer with uniform Close button */}
            <div className="p-5 bg-white border-t border-gray-100 flex justify-end rounded-b-[2.5rem]">
              <button 
                onClick={onClose}
                className="w-full py-4 bg-transparent border-2 border-gray-300 text-slate-600 rounded-2xl font-extrabold text-xs md:text-sm uppercase tracking-widest hover:bg-slate-50 active:scale-95 transition-all text-center"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
