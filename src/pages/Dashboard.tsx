import { useMemo } from 'react';
import GameCard from '../components/GameCard';
import Flag from '../components/Flag';
import ConfBadge from '../components/ConfBadge';
import { groups, matches, stadiums, type Match } from '../types/data';

export default function Dashboard() {
  const selectedGroup = 'A';
  
  // Jogos ao vivo (simulados)
  const liveMatches = matches.filter(match => match.status === 'IN_PLAY').slice(0, 2);
  
  // Próximos jogos
  const upcomingMatches = matches
    .filter(match => match.status === 'SCHEDULED')
    .slice(0, 3);
  
  // Estatísticas
  const stats = useMemo(() => {
    const totalMatches = matches.length;
    const completedMatches = matches.filter(m => m.status === 'FINISHED').length;
    const totalGoals = matches.reduce((acc, match) => {
      if (match.score) {
        return acc + match.score.home + match.score.away;
      }
      return acc;
    }, 0);
    const uniqueTeams = new Set();
    matches.forEach(match => {
      uniqueTeams.add(match.home);
      uniqueTeams.add(match.away);
    });
    
    return {
      totalMatches,
      completedMatches,
      totalGoals,
      totalTeams: uniqueTeams.size,
      totalStadiums: Object.keys(stadiums).length
    };
  }, []);

  const groupTeams = useMemo(() => {
    return groups[selectedGroup]?.teams ?? [];
  }, [selectedGroup]);

  const getTeamStats = (teamName: string) => {
    const teamMatches: Match[] = matches.filter(
      (match) =>
        (match.home === teamName || match.away === teamName) &&
        match.group === selectedGroup,
    );

    const played = teamMatches.filter((match) => match.status === 'FINISHED').length;
    const wins = teamMatches.filter((match) => {
      if (match.status !== 'FINISHED') return false;
      return match.home === teamName
        ? (match.score?.home ?? 0) > (match.score?.away ?? 0)
        : (match.score?.away ?? 0) > (match.score?.home ?? 0);
    }).length;
    const draws = teamMatches.filter(
      (match) =>
        match.status === 'FINISHED' &&
        match.score?.home === match.score?.away,
    ).length;
    const losses = played - wins - draws;
    const gf = teamMatches.reduce(
      (sum, match) =>
        sum +
        (match.home === teamName
          ? (match.score?.home ?? 0)
          : (match.score?.away ?? 0)),
      0,
    );
    const ga = teamMatches.reduce(
      (sum, match) =>
        sum +
        (match.home === teamName
          ? (match.score?.away ?? 0)
          : (match.score?.home ?? 0)),
      0,
    );
    const pts = wins * 3 + draws;

    return { played, wins, draws, losses, gf, ga, gd: gf - ga, pts };
  };

  const sortedGroupTeams = useMemo(() => {
    return [...groupTeams].sort((a, b) => {
      const statsA = getTeamStats(a);
      const statsB = getTeamStats(b);
      return statsB.pts - statsA.pts || statsB.gd - statsA.gd || statsB.gf - statsA.gf;
    });
  }, [groupTeams]);

  return (
    <div className="p-6 bg-[#020617] min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Dashboard - Copa 2026
        </h1>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          
          {/* Coluna Esquerda - Estatísticas */}
          <div className="space-y-4 xl:col-span-3">
            {/* Estatísticas */}
            <div className="bg-[#0f172a] rounded-xl p-4 border border-white/10">
              <h2 className="text-lg font-bold text-white mb-3">
                Estatísticas
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-yellow-500">
                    {stats.totalMatches}
                  </div>
                  <div className="text-xs text-gray-400">
                    Total Jogos
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-green-500">
                    {stats.completedMatches}
                  </div>
                  <div className="text-xs text-gray-400">
                    Finalizados
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-blue-500">
                    {stats.totalGoals}
                  </div>
                  <div className="text-xs text-gray-400">
                    Total Gols
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-purple-500">
                    {stats.totalTeams}
                  </div>
                  <div className="text-xs text-gray-400">
                    Seleções
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Central - YouTube Live e Grupo A */}
          <div className="space-y-4 xl:col-span-5">
            {/* YouTube Live */}
            <div className="bg-[#0f172a] rounded-xl p-4 border border-white/10">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                YouTube Live
              </h2>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-red-500 text-4xl mb-2">
                    ▶
                  </div>
                </div>
              </div>
            </div>

            {/* Grupo A */}
            <div className="bg-[#0f172a] rounded-xl p-4 border border-white/10">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Grupo A
              </h2>
              <div className="overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <div className="grid grid-cols-[1.8fr_repeat(6,minmax(0,1fr))] gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-slate-400 border-b border-white/5">
                  <span>Time</span>
                  <span className="text-center">P</span>
                  <span className="text-center">J</span>
                  <span className="text-center">V</span>
                  <span className="text-center">GP</span>
                  <span className="text-center">GC</span>
                  <span className="text-center">SG</span>
                </div>

                <div className="divide-y divide-white/5">
                  {sortedGroupTeams.map((teamName, index) => {
                    const teamStats = getTeamStats(teamName);
                    const isQualified = index < 2;

                    return (
                      <div
                        key={teamName}
                        className="grid grid-cols-[1.8fr_repeat(6,minmax(0,1fr))] gap-2 px-3 py-3 items-center"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`text-xs font-mono w-4 ${isQualified ? 'text-green-400' : 'text-slate-500'}`}>
                            {index + 1}
                          </span>
                          <div className="w-6 h-6 shrink-0">
                            <Flag name={teamName} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate uppercase">
                              {teamName}
                            </div>
                            <div className="mt-0.5 scale-75 origin-left opacity-80">
                              <ConfBadge name={teamName} />
                            </div>
                          </div>
                        </div>
                        <span className="text-center text-sm font-black text-white tabular-nums">{teamStats.pts}</span>
                        <span className="text-center text-xs text-slate-300 tabular-nums">{teamStats.played}</span>
                        <span className="text-center text-xs text-slate-300 tabular-nums">{teamStats.wins}</span>
                        <span className="text-center text-xs text-slate-300 tabular-nums">{teamStats.gf}</span>
                        <span className="text-center text-xs text-slate-300 tabular-nums">{teamStats.ga}</span>
                        <span className={`text-center text-xs font-bold tabular-nums ${teamStats.gd > 0 ? 'text-green-400' : teamStats.gd < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                          {teamStats.gd > 0 ? `+${teamStats.gd}` : teamStats.gd}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Jogos Ao Vivo e Próximos Jogos */}
          <div className="space-y-4">
            {/* Grupo Atual */}
            <div className="bg-[#0f172a] rounded-xl p-4 border border-white/10">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Grupo Atual
              </h2>
              <div className="space-y-2">
                {[
                  { letter: 'A', teams: 'México, África do Sul, Coreia do Sul, República Tcheca' },
                  { letter: 'B', teams: 'Canadá, Bósnia, Catar, Suíça' },
                  { letter: 'C', teams: 'Brasil, Marrocos, Haiti, Escócia' },
                  { letter: 'D', teams: 'Estados Unidos, Paraguai, Austrália, Turquia' },
                  { letter: 'E', teams: 'Alemanha, Curaçao, Costa do Marfim, Equador' },
                  { letter: 'F', teams: 'Holanda, Japão, Suécia, Tunísia' },
                  { letter: 'G', teams: 'Bélgica, Egito, Irã, Nova Zelândia' },
                  { letter: 'H', teams: 'Espanha, Cabo Verde, Arábia Saudita, Uruguai' },
                  { letter: 'I', teams: 'França, Senegal, Iraque, Noruega' },
                  { letter: 'J', teams: 'Argentina, Argélia, Áustria, Jordânia' },
                  { letter: 'K', teams: 'Portugal, RD Congo, Uzbequistão, Colômbia' },
                  { letter: 'L', teams: 'Inglaterra, Croácia, Gana, Panamá' }
                ].map((group) => {
                  // Verificar se há jogos em andamento neste grupo
                  const hasLiveGames = matches.some(match => 
                    match.group === group.letter && match.status === 'IN_PLAY'
                  );
                  
                  return (
                    <div 
                      key={group.letter}
                      className={`bg-white/5 rounded-lg p-3 text-center hover:bg-white/10 transition-colors cursor-pointer
                        ${hasLiveGames ? 'ring-2 ring-red-500 ring-opacity-50' : ''}`}
                    >
                      <div className={`text-sm font-bold ${hasLiveGames ? 'text-red-500' : 'text-yellow-500'}`}>
                        Grupo {group.letter}
                        {hasLiveGames && (
                          <span className="ml-1 text-xs">🔴</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 leading-tight mt-1">
                        {group.teams.split(', ')[0]}...
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Jogos Ao Vivo */}
            {liveMatches.length > 0 && (
              <div className="bg-[#0f172a] rounded-xl p-4 border border-white/10">
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Ao Vivo ({liveMatches.length})
                </h2>
                <div className="space-y-3">
                  {liveMatches.map((match) => (
                    <GameCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            )}

            {/* Próximos Jogos */}
            <div className="bg-[#0f172a] rounded-xl p-4 border border-white/10">
              <h2 className="text-lg font-bold text-white mb-3">
                Próximos Jogos
              </h2>
              <div className="space-y-3">
                {upcomingMatches.map((match) => (
                  <GameCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
