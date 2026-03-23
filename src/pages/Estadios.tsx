import { useState, useMemo } from 'react';
import { stadiums, matches } from '../../matches.json';
import { PiMapPinFill, PiUsersThreeFill, PiSoccerBallFill, PiMagnifyingGlassBold } from 'react-icons/pi';
import StadiumMatchesModal from '../components/StadiumMatchesModal';

const Estadios = () => {
  const [search, setSearch] = useState('');
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);

  const filteredStadiums = useMemo(() => {
    const q = search.toLowerCase().trim();
    const entries = Object.entries(stadiums) as [string, { city: string; country: string; capacity: number; images?: string[] }][];
    if (!q) return entries;
    
    return entries.filter(([name, info]) => 
      name.toLowerCase().includes(q) || 
      info.city.toLowerCase().includes(q) || 
      info.country.toLowerCase().includes(q)
    );
  }, [search]);

  const getMatchesCount = (stadiumName: string) => {
    return matches.filter(m => m.stadium === stadiumName).length;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pb-20">
      
      {/* Search Header Sticky */}
      <div className="sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="max-w-3xl mx-auto relative group">
          <PiMagnifyingGlassBold className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar estádio, cidade ou país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500/40 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        {/* Info de Resumo */}
        <div className="mb-10 flex items-end justify-between border-l-4 border-yellow-500 pl-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Sedes Oficiais</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Copa do Mundo 2026</p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-4xl font-black text-white/10 tracking-tighter leading-none block">
              {filteredStadiums.length < 10 ? `0${filteredStadiums.length}` : filteredStadiums.length}
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Resultados</span>
          </div>
        </div>

        {/* Grid de Estádios */}
        <div className="grid gap-8">
          {filteredStadiums.map(([name, info]) => {
            const matchesCount = getMatchesCount(name);
            return (
              <div 
                key={name} 
                className="group relative flex flex-col md:flex-row bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-slate-800/60 transition-all duration-500 shadow-xl"
              >
                {/* Imagem do Estádio com Overlay */}
                <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
                  <img 
                    src={stadiums[name]?.images?.[0] || `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop`}
                    alt={name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-[#020617]/80 to-transparent md:from-transparent" />
                  
                  {/* Badge de Jogos sobre a imagem */}
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 shadow-lg">
                    <PiSoccerBallFill className="text-sm" />
                    {matchesCount} Jogos
                  </div>
                </div>

                {/* Conteúdo Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                        {name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-1 text-slate-400 mb-6">
                      <PiMapPinFill className="text-yellow-500/70" />
                      <span className="text-sm font-semibold italic uppercase tracking-wider">
                        {info.city}, {info.country}
                      </span>
                    </div>
                  </div>

                  {/* Footer Técnico */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Capacidade</span>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/5 rounded-lg">
                          <PiUsersThreeFill className="text-slate-400 text-lg" />
                        </div>
                        <span className="text-lg font-mono font-black text-white tabular-nums">
                          {info.capacity.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-end items-end">
                      <button 
                        onClick={() => setSelectedStadium(name)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all"
                      >
                        Ver Calendário
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Partidas do Estádio */}
      {selectedStadium && (
        <StadiumMatchesModal 
          stadiumName={selectedStadium}
          onClose={() => setSelectedStadium(null)}
        />
      )}
    </div>
  );
};

export default Estadios;