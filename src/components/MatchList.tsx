import { formatDate } from '../utils/helpers';
import type { Match } from '../types/data';
import GameCard from './GameCard';

interface MatchListProps {
  byDate: Record<string, Match[]>;
  dates: string[];
}

const MatchList = ({ byDate, dates }: MatchListProps) => {
  if (dates.length === 0) {
    return (
      <div className="text-center py-20 text-white/30 text-sm">
        Nenhum jogo encontrado.
      </div>
    );
  }

  return dates.map((date) => {
    const { day, month, weekday, full } = formatDate(date);
    const dayMatches = [...byDate[date]].sort((a, b) =>
      a.time_brt.localeCompare(b.time_brt),
    );
    return (
      <div key={date} className="mb-10">
        {/* Cabeçalho de data */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #ffd700, #ff9500)",
            }}
          >
            <span className="text-xl font-black text-black leading-none">
              {day}
            </span>
            <span className="text-[9px] font-bold text-black/60 uppercase tracking-wide">
              {month}
            </span>
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-white">
              {weekday}-feira
            </h2>
            <p className="m-0 text-xs text-white/35">
              {full} · {dayMatches.length}{" "}
              {dayMatches.length === 1 ? "jogo" : "jogos"}
            </p>
          </div>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,215,0,0.25), transparent)",
            }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {dayMatches.map((m) => (
            <GameCard key={m.id} match={m} />
          ))}
        </div>
      </div>
    );
  });
};

export default MatchList;
