import React from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { LEAGUE_CLASSIFICATIONS } from '../../constants';
import { storageService } from '../../services/storageService';

interface ClassificationTableProps {
  league: string;
  homeTeam: string;
  awayTeam: string;
  onBack: () => void;
}

const ClassificationTable: React.FC<ClassificationTableProps> = ({ 
  league, 
  homeTeam, 
  awayTeam, 
  onBack 
}) => {
  const clean = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\b(de|do|da|fc|sc|clube|club)\b/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const isMatch = (teamA: string, teamB: string) => {
    const cleanA = clean(teamA);
    const cleanB = clean(teamB);
    if (cleanA === cleanB) return true;
    if (cleanA.length > 3 && cleanB.length > 3) {
      return cleanA.includes(cleanB) || cleanB.includes(cleanA);
    }
    return false;
  };

  let tableData = LEAGUE_CLASSIFICATIONS[league] || LEAGUE_CLASSIFICATIONS['Girabola'];
  if (league?.startsWith('Copa do Mundo')) {
    const wcTeams = storageService.getWorldCupTeams();
    if (wcTeams && wcTeams[league]) {
      tableData = wcTeams[league];
    }
  }

  return (
    <div className="flex flex-col gap-5 py-4 animate-fade-in">
      <div className="bg-[#091747] text-white p-5 rounded-[2rem] flex items-center justify-between shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#FFB10A]/10 rounded-full blur-2xl" />
        <h4 className="text-[11px] font-black uppercase tracking-widest italic flex items-center gap-2 relative z-10">
          <Trophy className="w-4 h-4 text-[#FFB10A]" />
          Tabela: {league}
        </h4>
      </div>

      <div className="bg-[#FFB10A]/5 border-2 border-[#FFB10A]/20 p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-[10px] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-black text-[#091747] uppercase tracking-wider text-[8px] bg-[#091747]/10 px-2 py-0.5 rounded">Foco no Jogo:</span>
          <span className="font-extrabold text-[#091747]">{homeTeam}</span>
          <span className="font-black text-[#FFB10A] px-0.5">X</span>
          <span className="font-extrabold text-[#091747]">{awayTeam}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 font-bold text-gray-600">
            <span className="w-2.5 h-2.5 rounded bg-[#091747] border border-[#FFB10A]/40 inline-block" /> Casa
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-gray-600">
            <span className="w-2.5 h-2.5 rounded bg-[#FFB10A] inline-block" /> Fora
          </span>
        </div>
      </div>
      
      <div className="bg-white border-2 border-gray-300 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-transparent border-b-2 border-gray-200">
              <th className="px-3 py-2.5 text-left font-black text-gray-600 uppercase tracking-tighter">#</th>
              <th className="px-1 py-2.5 text-left font-black text-gray-600 uppercase tracking-tighter">Equipa</th>
              <th className="px-1 py-2.5 text-center font-black text-gray-600 uppercase tracking-tighter">J</th>
              <th className="px-1 py-2.5 text-center font-black text-gray-600 uppercase tracking-tighter">V</th>
              <th className="px-1 py-2.5 text-center font-black text-gray-600 uppercase tracking-tighter">E</th>
              <th className="px-1 py-2.5 text-center font-black text-gray-600 uppercase tracking-tighter">D</th>
              <th className="px-2 py-2.5 text-center font-black text-gray-600 uppercase tracking-tighter">Pts</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => {
              const isHomeTeam = isMatch(row.team, homeTeam);
              const isAwayTeam = isMatch(row.team, awayTeam);
              const isMatchTeam = isHomeTeam || isAwayTeam;
              
              return (
                <tr key={i} className={cn(
                  "border-b border-gray-255 transition-all duration-300", 
                  isMatchTeam ? "bg-[#FFB10A]/12" : "bg-transparent"
                )}>
                  <td className={cn(
                    "px-3 py-2 font-black transition-all",
                    isMatchTeam ? "text-[#091747] border-l-4 border-l-[#FFB10A] italic text-[10px]" : "text-[#091747] italic text-[9px]"
                  )}>{row.pos}º</td>
                  <td className="px-1 py-2 font-bold uppercase tracking-tight text-[9px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={cn(
                        "truncate max-w-[120px] md:max-w-none transition-all",
                        isMatchTeam ? "font-black text-[#091747]" : "text-gray-700"
                      )}>{row.team}</span>
                      {isHomeTeam && (
                        <span className="shrink-0 text-[7px] md:text-[8px] font-black bg-[#091747] text-[#FFB10A] px-2 py-0.5 rounded-lg border border-[#FFB10A]/30 uppercase tracking-wider animate-pulse">
                          CASA
                        </span>
                      )}
                      {isAwayTeam && (
                        <span className="shrink-0 text-[7px] md:text-[8px] font-black bg-[#FFB10A] text-white px-2 py-0.5 rounded-lg uppercase tracking-wider animate-pulse">
                          FORA
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={cn("px-1 py-2 text-center font-bold text-[9px]", isMatchTeam ? "text-[#091747] font-black" : "text-gray-500")}>{row.p}</td>
                  <td className={cn("px-1 py-2 text-center font-bold text-[9px]", isMatchTeam ? "text-[#091747] font-black" : "text-gray-600")}>{row.w || 0}</td>
                  <td className={cn("px-1 py-2 text-center font-bold text-[9px]", isMatchTeam ? "text-[#091747] font-black" : "text-gray-600")}>{row.d || 0}</td>
                  <td className={cn("px-1 py-2 text-center font-bold text-[9px]", isMatchTeam ? "text-[#091747] font-black" : "text-gray-600")}>{row.l || 0}</td>
                  <td className={cn("px-2 py-2 text-center font-black text-[10px]", isMatchTeam ? "text-[#091747] bg-[#FFB10A]/20" : "text-[#091747]")}>{row.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <button 
          onClick={onBack}
          className="w-full bg-[#091747] text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 hover:bg-black transition-all uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Detalhes
        </button>
      </div>
    </div>
  );
};

export default ClassificationTable;
