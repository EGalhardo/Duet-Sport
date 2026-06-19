import React from 'react';
import { Match } from '../../../types';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface BettingModalHeaderProps {
  match: Match;
}

const BettingModalHeader: React.FC<BettingModalHeaderProps> = ({ match }) => {
  return (
    <div className="bg-[#091747] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 text-white mb-4 md:mb-6 relative overflow-hidden shadow-xl">
      <div className="absolute right-0 top-0 w-32 h-32 bg-[#FFB10A]/10 rounded-full blur-3xl" />
      
      <div className="flex flex-col items-center gap-3 md:gap-4 relative z-10">
        <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2 flex items-center justify-center shadow-lg border-2 border-white/10 mb-1.5 md:mb-2">
              <img src={match.teamA.logo} alt={match.teamA.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center h-6 md:h-8 flex items-center">
              {match.teamA.name}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-1.5 md:mb-2">
              <span className="text-[#FFB10A] text-base md:text-xl font-black italic">VS</span>
            </div>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2 flex items-center justify-center shadow-lg border-2 border-white/10 mb-1.5 md:mb-2">
              <img src={match.teamB.logo} alt={match.teamB.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center h-6 md:h-8 flex items-center">
              {match.teamB.name}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full mt-1.5 md:mt-2">
          <div className="bg-white/5 rounded-xl py-1.5 md:py-2 px-2.5 md:px-3 flex items-center gap-1.5 md:gap-2 border border-white/5">
            <Calendar className="w-3 h-3 text-[#FFB10A]" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300">{match.date}</span>
          </div>
          <div className="bg-white/5 rounded-xl py-1.5 md:py-2 px-2.5 md:px-3 flex items-center gap-1.5 md:gap-2 border border-white/5">
            <Clock className="w-3 h-3 text-[#FFB10A]" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300">{match.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingModalHeader;
