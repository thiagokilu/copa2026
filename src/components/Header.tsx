import { Link, useLocation } from 'react-router-dom';
import { competition } from '../types/data';
// Usando Phosphor Icons para um traço consistente e moderno
import { PiSoccerBallFill, PiTrophyFill, PiMapPinFill, PiChartPieSliceFill, PiUsersThreeFill, PiCalendarFill } from 'react-icons/pi';

interface HeaderProps {
  totalStadiums: number;
}

const Header = ({ totalStadiums }: HeaderProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Jogos", icon: <PiSoccerBallFill /> },
    { path: "/estadios", label: "Estádios", icon: <PiMapPinFill /> },
    { path: "/grupos", label: "Grupos", icon: <PiChartPieSliceFill /> },
    { path: "/selecoes", label: "Seleções", icon: <PiUsersThreeFill /> },
    { path: "/calendario", label: "Calendário", icon: <PiCalendarFill /> },
  ];

  return (
    <header className="relative bg-[#020617] border-b border-white/5 overflow-hidden">
      {/* Efeito de brilho de fundo (Glow) */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-yellow-500/20 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6 sm:pt-12 sm:pb-8">
        <div className="flex flex-col items-center">
          
          {/* Badge de Temporada */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4 transition-transform hover:scale-105">
            <PiTrophyFill className="text-yellow-500 text-sm" />
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider">Copa do Mundo 2026</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-center bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent mb-2 transition-all duration-700">
            FIFA World Cup
          </h1>

          {/* Subtítulo Dinâmico */}
          <div className="flex items-center gap-3 text-slate-500 text-[10px] sm:text-xs uppercase font-bold tracking-widest">
            <span className="hidden sm:inline">{competition.hosts.join(" • ")}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
            <span>{totalStadiums} Sedes</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-slate-400 italic">Junho - Julho</span>
          </div>

          {/* Navegação Desktop - Escondido em mobile */}
          <nav className="hidden md:flex justify-center gap-2 mt-8 p-1.5 bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
            {navItems.map(({ path, label, icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-tight transition-all duration-300
                    ${isActive 
                      ? "bg-yellow-500 text-black shadow-[0_10px_20px_-5px_rgba(234,179,8,0.4)] scale-105" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <span className={`text-lg ${isActive ? "text-black" : "text-slate-500"}`}>
                    {icon}
                  </span>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;