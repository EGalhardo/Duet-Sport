import React from 'react';
import { ArrowLeft, Star, Zap, Pencil, Trash2, Trophy, Info, Check, X, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { storageService } from '../services/storageService';
import { cn } from '../lib/utils';
import { FavoriteItem } from '../types';

export default function Favoritos() {
  const [favorites, setFavorites] = React.useState<FavoriteItem[]>([]);
  const [editingId, setEditingId] = React.useState<string | number | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | number | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const updateFavs = () => {
      setFavorites(storageService.getFavorites());
    };
    updateFavs();
    window.addEventListener('favoritesUpdated', updateFavs);
    return () => window.removeEventListener('favoritesUpdated', updateFavs);
  }, []);

  const handleRemove = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      const updated = storageService.deleteFavorite(deleteConfirmId);
      setFavorites(updated);
      setDeleteConfirmId(null);
    }
  };

  const handleEdit = (item: FavoriteItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditValue(item.title);
  };

  const saveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (editingId && editValue.trim() !== '') {
      const updated = favorites.map(f => 
        f.id === editingId ? { ...f, title: editValue.trim() } : f
      );
      storageService.updateFavorites(updated);
      setFavorites(updated);
      setEditingId(null);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'league': return Trophy;
      case 'practice': return Zap;
      default: return Star;
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* DELETE CONFIRM MODAL */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border-2 border-red-100"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[#091747] text-center mb-2">Remover Favorito?</h3>
              <p className="text-gray-500 text-center text-sm font-medium leading-relaxed mb-8">
                Tens a certeza que queres remover este conteúdo dos teus favoritos?
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={confirmDelete}
                  className="w-full bg-red-500 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-all uppercase tracking-widest text-xs"
                >
                  Confirmar Remoção
                </button>
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="w-full bg-transparent border-2 border-gray-200 text-gray-600 font-black py-4 rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* NAV LINE */}
      <div className="h-[46px] bg-white border-b border-gray-200 px-4 md:px-8">
        <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
          <Link to="/" className="text-black transition-colors duration-300 hover:text-[#FFB10A]">
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </Link>
          <h2 className="text-base md:text-lg lg:text-xl font-semibold text-center">Favoritos</h2>
          <div className="w-6 h-6 md:w-7 md:h-7" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 pt-20 pb-16">
        <div className="text-center mb-16">
          <img 
            src="https://i.postimg.cc/wxt6XDKB/Favorito-GIF.gif" 
            alt="Favoritos" 
            className="mx-auto w-48 md:w-64 h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
          <h1 className="mt-10 text-2xl md:text-3xl font-bold text-[#091747] tracking-tight">Os Teus Favoritos</h1>
          <p className="mt-4 text-gray-500 font-medium">Acede rapidamente aos teus torneios!</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-10 shadow-sm">
          <div className="bg-[#FFB10A] p-6 text-white font-bold">
            <h3 className="text-xl">Meus Favoritos</h3>
            <p className="text-xs text-white/80">Acesso rápido aos teus conteúdos</p>
          </div>

          <div className="bg-transparent px-6 py-3 border-b-2 border-gray-200">
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-3 h-3 text-[#FFB10A]" />
                Acesso direto
             </p>
          </div>

          <div className="divide-y divide-gray-100">
            {favorites.length === 0 ? (
              <div className="p-16 text-center text-gray-600 font-bold italic text-sm">
                Nenhum favorito guardado ainda.
              </div>
            ) : (
              favorites.map((item) => {
                const IconComponent = getIcon(item.type);
                const isEditing = editingId === item.id;

                return (
                  <div 
                    key={item.id} 
                    onClick={() => !isEditing && navigate(item.path)}
                    className={cn(
                      "flex items-center gap-4 p-5 transition-all",
                      isEditing ? "bg-blue-50/50" : "hover:bg-[#FFCD33] group cursor-pointer"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      isEditing ? "bg-blue-100" : "bg-orange-100/50 group-hover:bg-white"
                    )}>
                      <Heart className={cn("w-6 h-6 fill-[#FFB10A]", isEditing ? "text-blue-600 fill-blue-600" : "text-[#FFB10A]")} />
                    </div>
                    
                    <div className="flex-1 min-w-0" onClick={(e) => isEditing && e.stopPropagation()}>
                      {isEditing ? (
                        <form onSubmit={saveEdit} className="flex items-center gap-2">
                          <input 
                            autoFocus
                            type="text" 
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => !editValue.trim() && setEditingId(null)}
                            className="w-full bg-white border-2 border-blue-400 rounded-lg px-3 py-1.5 text-sm font-bold text-[#091747] outline-none"
                          />
                          <button 
                            type="submit"
                            className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(null);
                            }}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </form>
                      ) : (
                        <>
                          <p className={cn(
                            "text-base font-bold text-[#091747] transition-colors truncate",
                            "group-hover:text-white"
                          )}>
                            {item.title}
                          </p>
                          <p className={cn(
                            "text-[11px] text-gray-500 transition-colors",
                            "group-hover:text-white/80"
                          )}>
                            {item.sub}
                          </p>
                        </>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="flex flex-col items-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => handleEdit(item, e)}
                          className="flex items-center gap-1 text-[10px] font-bold text-[#091747] md:text-white bg-black/5 md:bg-transparent hover:bg-black/10 md:hover:bg-white/20 px-2 py-1 rounded"
                        >
                          <Pencil className="w-3 h-3" /> Editar
                        </button>
                        <button 
                          onClick={(e) => handleRemove(item.id, e)}
                          className="flex items-center gap-1 text-[10px] font-bold text-red-600 md:text-red-100 bg-red-500/5 md:bg-transparent hover:bg-red-500/10 md:hover:bg-red-500/20 px-2 py-1 rounded"
                        >
                          <Trash2 className="w-3 h-3" /> Remover
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-[#FFB10A] rounded-2xl p-5 flex gap-3 items-start border border-white/20 shadow-sm">
          <Info className="w-6 h-6 text-white shrink-0 mt-0.5" />
          <div className="text-white">
            <p className="text-sm font-bold">Guardados localmente</p>
            <p className="text-xs text-white/80 leading-relaxed mt-1">
              Os favoritos são guardados apenas neste dispositivo para acesso rápido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
