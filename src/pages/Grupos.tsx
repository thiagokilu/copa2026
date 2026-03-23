import { useState, useMemo } from 'react';
import { groups, matches, type Group, type Match } from '../types/data';
import Flag from '../components/Flag';
import ConfBadge from '../components/ConfBadge';
import { PiInfoFill, PiTrophyBold, PiChartLineUpBold } from 'react-icons/pi';

const Grupos = () => {
  const [selectedGroup, setSelectedGroup] = useState("A");
  const groupsData = groups;

  const groupTeams = useMemo<string[]>(() => {
    const selectedGroupData: Group | undefined = groupsData[selectedGroup];
    return selectedGroupData?.teams ?? [];
  }, [groupsData, selectedGroup]);

  const groupColor = groupsData[selectedGroup]?.color || "#888";

  // Lógica de cálculo (mantive sua lógica que já está correta, mas com nomes mais limpos)
  const getTeamStats = (teamName: string) => {
    const teamMatches: Match[] = matches.filter(m => 
      (m.home === teamName || m.away === teamName) && m.group === selectedGroup
    );
    
    const played = teamMatches.filter(m => m.status === "FINISHED").length;
    const wins = teamMatches.filter(m => {
      if (m.status !== "FINISHED") return false;
      return m.home === teamName ? (m.score?.home ?? 0) > (m.score?.away ?? 0) : (m.score?.away ?? 0) > (m.score?.home ?? 0);
    }).length;
    
    const draws = teamMatches.filter(m => m.status === "FINISHED" && (m.score?.home === m.score?.away)).length;
    const losses = played - wins - draws;
    const gf = teamMatches.reduce((sum, m) => sum + (m.home === teamName ? (m.score?.home ?? 0) : (m.score?.away ?? 0)), 0);
    const ga = teamMatches.reduce((sum, m) => sum + (m.home === teamName ? (m.score?.away ?? 0) : (m.score?.home ?? 0)), 0);
    const pts = wins * 3 + draws;
    
    return { played, wins, draws, losses, gf, ga, gd: gf - ga, pts };
  };

  // Ordenação automática por pontos e saldo (Simulando critério real)
  const sortedTeams = useMemo(() => {
    return [...groupTeams].sort((a, b) => {
      const statsA = getTeamStats(a);
      const statsB = getTeamStats(b);
      return statsB.pts - statsA.pts || statsB.gd - statsA.gd;
    });
  }, [groupTeams]);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pb-10">
      {/* Seletor de Grupos Estilo Tab Bar */}
      <div className="sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar py-4">
          <div className="flex gap-2 min-w-max">
            {Object.keys(groups).map((g) => {
              const active = selectedGroup === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    active 
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                      : "text-slate-500 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        {/* Header do Grupo */}
        <div className="flex items-center gap-4 mb-6 px-2">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-white/5 border border-white/10 shadow-inner" style={{ color: groupColor }}>
            <PiTrophyBold />
          </div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">Grupo {selectedGroup}</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Classificação Atualizada</p>
          </div>
        </div>

        {/* Tabela de Classificação */}
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left px-6 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">Time</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">P</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">J</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">V</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">E</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">D</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">GP</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">GC</th>
                  <th className="text-center px-3 py-3 text-xs font-medium text-white/60 uppercase tracking-wider">SG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sortedTeams.map((teamName, index) => {
                  const stats = getTeamStats(teamName);
                  const isQualified = index < 2; // Ex: Primeiros 2 passam
                  
                  return (
                    <tr key={teamName} className="group hover:bg-white/2 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <span className={`text-xs font-mono font-bold w-4 ${isQualified ? 'text-green-400' : 'text-slate-600'}`}>
                            {index + 1}
                          </span>
                          <div className="relative">
                            <Flag name={teamName} />
                            {isQualified && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-slate-900 shadow-sm" title="Zona de classificação" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-white truncate uppercase tracking-tight">{teamName}</div>
                            <div className="mt-0.5 opacity-80 scale-75 origin-left">
                              <ConfBadge name={teamName} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="text-base font-black text-white tabular-nums">{stats.pts}</span>
                      </td>
                      <td className="px-3 py-5 text-center text-slate-400 font-medium tabular-nums">{stats.played}</td>
                      <td className="px-3 py-5 text-center text-slate-400 font-medium tabular-nums">{stats.wins}</td>
                      <td className="px-3 py-5 text-center text-slate-400 font-medium tabular-nums hidden sm:table-cell">{stats.draws}</td>
                      <td className="px-3 py-5 text-center text-slate-400 font-medium tabular-nums hidden sm:table-cell">{stats.losses}</td>
                      <td className="px-3 py-5 text-center">
                        <span className={`text-xs font-bold tabular-nums ${stats.gd > 0 ? 'text-green-400' : stats.gd < 0 ? 'text-red-400' : 'text-slate-500'}`}>
                          {stats.gd > 0 ? `+${stats.gd}` : stats.gd}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Legend Card */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-3">
            <PiChartLineUpBold className="text-green-400 text-lg shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-semibold">
              <span className="text-white">Zona de Qualificação:</span> Os dois primeiros de cada grupo avançam para a fase eliminatória.
            </p>
          </div>
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-3">
            <PiInfoFill className="text-blue-400 text-lg shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-semibold">
              <span className="text-white">Critério:</span> Pontos, Saldo de Gols, Gols Pró e Confronto Direto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grupos;
