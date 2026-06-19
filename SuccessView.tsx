import React from 'react';
import { motion } from 'motion/react';
import { Check, Share2, Copy } from 'lucide-react';

interface SuccessViewProps {
  roomCode: string;
  onShare: () => void;
  onCopy: () => void;
  onClose: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ 
  roomCode, 
  onShare, 
  onCopy, 
  onClose 
}) => {
  return (
    <div className="flex flex-col items-center py-4 md:py-8 text-center">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 md:w-24 md:h-24 bg-[#FFB10A] rounded-full flex items-center justify-center mb-4 md:mb-8 shadow-xl shadow-orange-100"
      >
        <Check className="w-8 h-8 md:w-12 md:h-12 text-white stroke-[4px]" />
      </motion.div>
      
      <h3 className="text-lg md:text-2xl font-black text-[#091747] uppercase tracking-tight mb-1 md:mb-2 italic">Duelo Ativado!</h3>
      <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-tight mb-4 md:mb-10">A tua sala está pronta para a competição.</p>

      <div className="w-full bg-transparent border-2 border-dashed border-gray-300 rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 mb-4 md:mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB10A]" />
        <label className="text-[10px] font-black text-gray-400 block uppercase tracking-widest mb-2 md:mb-4 italic">Código de Acesso</label>
        <div className="text-3xl md:text-5xl font-mono font-black text-[#091747] tracking-[0.2em] mb-4 md:mb-6">{roomCode}</div>
        <button 
          onClick={onCopy}
          className="flex items-center gap-2 text-[#FFB10A] font-black uppercase text-[10px] tracking-widest mx-auto hover:bg-orange-50 px-4 py-1.5 md:py-2 rounded-full transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          Copiar Código
        </button>
      </div>

      <div className="w-full space-y-2 md:space-y-4">
        <button 
          onClick={onShare}
          className="w-full bg-[#091747] text-white font-black py-3 md:py-5 rounded-xl md:rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg uppercase tracking-widest text-[10px] md:text-xs"
        >
          <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          Convidar Atletas
        </button>
        <button 
          onClick={onClose}
          className="w-full py-2 md:py-4 text-gray-400 font-black text-[10px] md:text-xs uppercase tracking-widest hover:text-gray-600 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
