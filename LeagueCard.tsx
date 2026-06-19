import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LeagueOption } from '../../types';

interface LeagueCardProps {
  card: LeagueOption;
  category: string;
  fallbackImage: string;
  sessionType?: string;
  onClick?: (card: LeagueOption) => void;
}

const LeagueCard: React.FC<LeagueCardProps> = React.memo(({ card, category, fallbackImage, sessionType, onClick }) => {
  const isDblClickOnly = category === 'futebol' || category === 'basket' || (category === 'f1' && (sessionType === 'Classificacao' || sessionType === 'G.P'));
  const lastClickTime = React.useRef<number>(0);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDblClickOnly) {
      const currentTime = Date.now();
      const clickInterval = currentTime - lastClickTime.current;
      if (clickInterval < 300) {
        if (onClick) onClick(card);
      }
      lastClickTime.current = currentTime;
    } else {
      if (onClick) onClick(card);
    }
  };

  return (
    <div 
      id={`league-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
      className={cn(
        "group block transition-transform cursor-pointer select-none touch-manipulation",
        isDblClickOnly && "active:scale-95"
      )}
      onClick={handleCardClick}
    >
      <div className={cn(
        category === 'f1' 
          ? "aspect-video" 
          : (isDblClickOnly ? "aspect-[1.3/1] md:aspect-[1.6/1]" : "aspect-[1.6/1]"),
        card.title === 'Copa do Mundo' ? "p-1 md:p-2 bg-white" : "p-4 bg-white",
        "rounded-xl md:rounded-3xl border border-gray-200 overflow-hidden flex flex-col items-center justify-center group-hover:border-[#FFB10A] transition-all shadow-sm relative"
      )}>
        <img 
          src={
            card.title === 'Copa do Mundo'
              ? (typeof window !== 'undefined' && localStorage.getItem('duet_world_cup_image') && !localStorage.getItem('duet_world_cup_image')?.startsWith('/src/assets/')
                  ? localStorage.getItem('duet_world_cup_image')!
                  : card.image)
              : (card.image || fallbackImage)
          } 
          alt={card.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={cn(
            "object-contain group-hover:scale-105 transition-transform",
            card.title === 'Copa do Mundo'
              ? "w-[95%] h-auto aspect-square max-h-[95%] md:w-56 md:h-56"
              : (category === 'f1' ? "w-32 h-32 md:w-40 md:h-40" : "w-[55%] h-auto aspect-square max-h-[75%] md:w-28 md:h-28")
          )}
        />
        
        {/* Absolute Bottom Button - Rendered only when not double-click only */}
        {!isDblClickOnly && (
          <div className="absolute inset-x-0 bottom-0 p-2 md:p-3">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onClick) onClick(card);
              }}
              className="w-full py-1.5 md:py-2 bg-[#FFB10A] text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center rounded-lg md:rounded-xl shadow-lg hover:bg-[#FFC000] transition-all transform active:scale-95 group-hover:-translate-y-1 cursor-pointer"
            >
              Entrar
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-[11px] md:text-sm font-black text-[#091747] uppercase tracking-widest group-hover:text-[#FFB10A] transition-colors line-clamp-1 px-2 italic">
        {card.title}
      </p>
    </div>
  );
});

LeagueCard.displayName = 'LeagueCard';

export default LeagueCard;
