import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface RankingPlayer {
  id: number;
  name: string;
  score: number;
  avatar: string;
}

interface PodiumPositionProps {
  position: number;
  player: RankingPlayer;
}

const PodiumPosition: React.FC<PodiumPositionProps> = ({ position, player }) => {
  const isFirst = position === 1;
  return (
    <div className={cn("flex flex-col items-center", isFirst ? "mb-4" : "")}>
      <img 
        src={player.avatar} 
        alt={player.name}
        className={cn(
          "rounded-full border-4 mb-2 object-cover shadow-lg", 
          isFirst ? "w-20 h-20 sm:w-24 sm:h-24 border-yellow-400 drop-shadow-xl" : "w-16 h-16 sm:w-20 sm:h-20 border-gray-300"
        )} 
        referrerPolicy="no-referrer"
      />
      <span className="text-[10px] sm:text-xs font-bold text-[#091747] truncate w-24 text-center">{player.name}</span>
      <span className="text-[10px] sm:text-xs font-bold text-[#FFB10A]">{player.score.toLocaleString()} pts</span>
      <div className={cn(
        "w-12 sm:w-16 mt-2 rounded-t-xl flex items-center justify-center font-black text-white text-sm sm:text-base",
        isFirst ? "h-16 sm:h-20 bg-yellow-400" : position === 2 ? "h-12 sm:h-16 bg-gray-300" : "h-10 sm:h-14 bg-amber-600"
      )}>
        {position}
      </div>
    </div>
  );
};

export default PodiumPosition;
