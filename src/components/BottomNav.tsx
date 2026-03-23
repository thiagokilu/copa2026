import { Link, useLocation } from 'react-router-dom';
// Usando Phosphor Icons para um traço consistente e moderno
import { PiSoccerBallFill, PiMapPinFill, PiChartPieSliceFill, PiUsersThreeFill, PiCalendarFill } from 'react-icons/pi';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Jogos", icon: <PiSoccerBallFill /> },
    { path: "/estadios", label: "Estádios", icon: <PiMapPinFill /> },
    { path: "/grupos", label: "Grupos", icon: <PiChartPieSliceFill /> },
    { path: "/selecoes", label: "Seleções", icon: <PiUsersThreeFill /> },
    { path: "/calendario", label: "Calendário", icon: <PiCalendarFill /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-18 flex items-stretch pb-2 px-1
      bg-[#020617]/90 backdrop-blur-md border-t border-white/6">
      {navItems.map(({ path, label, icon }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className="flex-1 flex flex-col items-center justify-center gap-1 rounded-xl relative group"
          >
            {/* Pill de fundo */}
            <div className={`
              flex items-center justify-center w-9 h-7 rounded-[10px] transition-all duration-300
              ${isActive
                ? "bg-yellow-500 shadow-[0_6px_16px_-4px_rgba(234,179,8,0.5)] -translate-y-0.5"
                : "bg-transparent group-hover:bg-white/5"
              }
            `}>
              <span className={`text-base leading-none ${isActive ? "text-black" : "text-slate-500"}`}>
                {icon}
              </span>
            </div>

            {/* Label */}
            <span className={`text-[9px] font-bold uppercase tracking-wide transition-colors
              ${isActive ? "text-yellow-500" : "text-slate-600"}`}>
              {label}
            </span>

            {/* Dot indicator */}
            <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-500
              transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
