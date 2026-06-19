import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  onInfoClick: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = React.memo(({ category, onInfoClick }) => {
  const navigate = useNavigate();
  const lastClickTime = useRef<number>(0);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const currentTime = Date.now();
    const interval = currentTime - lastClickTime.current;
    if (interval < 300) {
      navigate(category.path);
    }
    lastClickTime.current = currentTime;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-xs md:max-w-sm group"
    >
      <div className="relative">
        <div 
          onClick={handleInteraction}
          className="flex flex-col items-center cursor-pointer select-none touch-manipulation active:scale-[0.98] transition-transform"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-4 transition-transform duration-300 group-hover:scale-[1.02] flex items-center justify-center bg-gradient-to-b from-white to-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200/60">
            <img 
              src={category.image} 
              alt={category.title} 
              loading="lazy"
              className={cn(
                "w-full h-full object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] contrast-[1.05]",
                category.id !== 'futebol' && "scale-[1.38]"
              )}
            />
            {/* Soft dark overlay at bottom for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#091747]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          <div className="flex items-center justify-between w-full px-2">
            <span className="font-black text-xl md:text-2xl text-[#091747] uppercase tracking-tight group-hover:text-[#F0B100] transition-colors">{category.title}</span>
          </div>
        </div>
        <button 
          id={`info-btn-${category.id}`}
          type="button" 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onInfoClick(category);
          }}
          className="absolute bottom-[2px] right-2 text-[#364153] hover:text-[#FFB10A] transition-all p-2 bg-white/80 backdrop-blur-sm rounded-full active:scale-95 z-10"
        >
          <Info className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </motion.div>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;
