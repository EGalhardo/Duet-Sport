import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Globe, Flag } from 'lucide-react';
import { Category } from '../../types';
import { CATEGORY_DATA } from '../../constants';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onEntrar: (path: string) => void;
}

const InfoModal: React.FC<InfoModalProps> = React.memo(({ 
  isOpen, 
  onClose, 
  category,
  onEntrar
}) => {
  if (!category) return null;
  const detail = CATEGORY_DATA[category.id];
  if (!detail) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-lg bg-[#F8FAFC] rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header - Now Yellow and Centered */}
            <div className="bg-[#FFB10A] p-6 md:p-8 text-white relative flex flex-col items-center text-center">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] mb-1">{category.title}</h3>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Ligas e Competições Disponíveis</p>
            </div>

            {/* Content Swiper Style */}
            <div className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8 scrollbar-hide">
              {Object.entries(detail.cards).map(([type, items]) => (
                <div key={type} className="space-y-4">
                  <div className="flex items-center gap-3 border-b-2 border-gray-200 pb-2">
                    {type === 'practice' && <Flag className="w-5 h-5 text-blue-600" />}
                    {type === 'private' && <Trophy className="w-5 h-5 text-orange-500" />}
                    {type === 'community' && <Globe className="w-5 h-5 text-green-600" />}
                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-600">
                      {detail.labels[type as keyof typeof detail.labels]}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {items.map((item, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={item.title} 
                        className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border-2 border-gray-200 hover:border-[#FFB10A]/30 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-transparent border-2 border-gray-200">
                          <img src={item.image} alt="" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-[#091747] uppercase leading-tight group-hover:text-[#FFB10A] transition-colors">{item.title}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer - Two Buttons Side by Side (Swapped Pos) */}
            <div className="p-4 md:p-5 bg-white border-t-2 border-gray-200 grid grid-cols-2 gap-3">
               <button 
                id="modal-entrar-btn"
                onClick={() => onEntrar(category.path)}
                className="w-full py-4 bg-[#FFB10A] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#e69f09] transition-all shadow-lg shadow-orange-100 active:scale-95"
               >
                 Entrar Agora
               </button>
               <button 
                id="modal-sair-btn"
                onClick={onClose}
                className="w-full py-4 bg-transparent border-2 border-gray-300 text-gray-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
               >
                 Sair
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

InfoModal.displayName = 'InfoModal';

export default InfoModal;
