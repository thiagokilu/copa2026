import { groups } from '../types/data';

interface FiltersProps {
  selectedGroup: string;
  setSelectedGroup: (group: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

const Filters = ({ selectedGroup, setSelectedGroup, search, setSearch }: FiltersProps) => {
  return (
    <div className="sticky top-0 z-10 bg-[#0a0e1a]/95 backdrop-blur border-b border-white/5">
      {/* Busca */}
      <div className="px-4 sm:px-6 pt-3 pb-2">
        <input
          type="text"
          placeholder="Buscar seleção ou estádio…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-yellow-400/40 focus:bg-white/8 transition-all"
        />
      </div>
      {/* Grupos */}
      <div className="px-4 sm:px-6 pb-3">
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {["TODOS", ...Object.keys(groups)].map((g) => {
            const active = selectedGroup === g;
            const color =
              g === "TODOS" ? "#ffd700" : groups[g]?.color || "#fff";
            return (
              <button
                key={g}
                onClick={() => setSelectedGroup(g)}
                className="px-3 sm:px-4 py-1.5 rounded-full text-xs transition-all duration-150 cursor-pointer"
                style={{
                  border: `1px solid ${active ? color : "rgba(255,255,255,0.12)"}`,
                  background: active ? color + "22" : "transparent",
                  color: active ? color : "rgba(255,255,255,0.45)",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {g === "TODOS" ? "Todos" : `Grupo ${g}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Filters;
