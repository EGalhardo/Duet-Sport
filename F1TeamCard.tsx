import React from 'react';
import { motion } from 'motion/react';
import { LeagueOption } from '../../types';

interface F1TeamCardProps {
  card: LeagueOption;
  sessionType?: string;
}

const F1TeamCard: React.FC<F1TeamCardProps> = React.memo(({ card, sessionType }) => (
  <div 
    id={`f1-team-card-${card.title.toLowerCase().replace(/\s+/g, '-')}`}
    className="group block relative text-decoration-none"
  >
    <div className="aspect-video rounded-xl md:rounded-3xl border border-gray-200 bg-white overflow-hidden relative transition-all group-hover:border-[#FFB10A]">
      {/* Drivers Container Background */}
      <div className="absolute inset-0 flex items-end justify-between px-1 sm:px-4">
        {/* Driver 1 - Left */}
        {card.driver1 && (
          <div className="w-[45%] h-[80%] flex items-end">
            <motion.img 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              src={card.driver1} 
              alt="Driver 1" 
              className="w-full h-full object-contain object-bottom origin-bottom" 
            />
          </div>
        )}
        {/* Driver 2 - Right */}
        {card.driver2 && (
          <div className="w-[45%] h-[80%] flex items-end">
            <motion.img 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              src={card.driver2} 
              alt="Driver 2" 
              className="w-full h-full object-contain object-bottom origin-bottom" 
            />
          </div>
        )}
      </div>

      {/* Center Logo - Floats above drivers */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
        <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
      </div>

      {/* Dynamic Overlay removed or kept static */}
    </div>
    <p className="mt-3 text-center text-[10px] md:text-xs font-black text-[#091747] uppercase tracking-widest italic">
      {card.title}
    </p>
  </div>
));

F1TeamCard.displayName = 'F1TeamCard';

export default F1TeamCard;
