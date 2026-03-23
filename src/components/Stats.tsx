import { competition } from '../types/data';

interface StatsProps {
  totalShown: number;
  datesCount: number;
  filteredTeams?: number;
  totalGames?: number;
}

const Stats = ({ totalShown, datesCount, filteredTeams, totalGames }: StatsProps) => {
  return (
    <div className="flex gap-6 px-6 py-3 border-b border-white/[0.03] bg-white/[0.01]">
      {[
        { v: totalShown, l: "jogos exibidos" },
        { v: datesCount, l: "datas" },
        { v: filteredTeams ?? competition.teams, l: "seleções" },
        { v: totalGames ?? competition.matches, l: "total de jogos" },
      ].map(({ v, l }) => (
        <div key={l} className="text-xs text-white/40">
          <span className="text-yellow-400 font-bold text-lg mr-1">{v}</span>
          {l}
        </div>
      ))}
    </div>
  );
};

export default Stats;
