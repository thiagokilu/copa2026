import { useState, useMemo } from 'react';
import Flag from '../components/Flag';
import ConfBadge from '../components/ConfBadge';
import { teams, type Team } from '../types/data';

const Selecoes = () => {
  const [search, setSearch] = useState('');
  const [selectedConfederation, setSelectedConfederation] = useState("TODOS");

  const confederations = useMemo(() => {
    const confs = new Set<string>();
    Object.values(teams).forEach(team => {
      if (team.confederation && team.confederation !== "TBD") {
        confs.add(team.confederation);
      }
    });
    return ["TODOS", ...Array.from(confs).sort()];
  }, []);

  const filteredTeams = useMemo<[string, Team][]>(() => {
    let teamsList = Object.entries(teams) as [string, Team][];
    
    // Filtrar por confederação
    if (selectedConfederation !== "TODOS") {
      teamsList = teamsList.filter(([_, info]) => info.confederation === selectedConfederation);
    }
    
    // Filtrar por busca
    if (search.trim()) {
      const q = search.toLowerCase();
      teamsList = teamsList.filter(([name]) => name.toLowerCase().includes(q));
    }
    
    return teamsList.sort(([a], [b]) => a.localeCompare(b));
  }, [search, selectedConfederation]);

  const confederationColors: Record<string, string> = {
    UEFA: "#0052A5",
    CONMEBOL: "#009B3A",
    CONCACAF: "#BE0000",
    CAF: "#FFD700",
    AFC: "#FF6600",
    OFC: "#00A86B",
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans">
      {/* Filtros */}
      <div className="sticky top-0 z-10 bg-[#0a0e1a]/95 backdrop-blur border-b border-white/5">
        {/* Busca */}
        <div className="px-4 sm:px-6 pt-3 pb-2">
          <input
            type="text"
            placeholder="Buscar seleção…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-yellow-400/40 focus:bg-white/8 transition-all"
          />
        </div>
        
        {/* Confederações */}
        <div className="px-4 sm:px-6 pb-3">
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {confederations.map((conf) => {
              const active = selectedConfederation === conf;
              const color = conf === "TODOS" ? "#ffd700" : confederationColors[conf] || "#fff";
              return (
                <button
                  key={conf}
                  onClick={() => setSelectedConfederation(conf)}
                  className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer"
                  style={{
                    border: `1px solid ${active ? color : "rgba(255,255,255,0.12)"}`,
                    background: active ? color + "22" : "transparent",
                    color: active ? color : "rgba(255,255,255,0.45)",
                  }}
                >
                  {conf === "TODOS" ? "Todas" : conf}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista de Seleções */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="m-0 text-2xl sm:text-3xl font-black tracking-tight text-yellow-400 mb-2">
            SELEÇÕES
          </h1>
          <p className="m-0 text-xs sm:text-sm text-white/40 tracking-wide uppercase">
            {Object.keys(teams).length} equipes · Copa do Mundo 2026
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredTeams.map(([teamName]) => {
            return (
              <div key={teamName} className="bg-slate-800 rounded-lg border border-white/10 overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/60 p-4 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Flag name={teamName} />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">{teamName}</h3>
                    <ConfBadge name={teamName} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Selecoes;
