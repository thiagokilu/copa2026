import { teams } from '../types/data';
import { PiGlobeSimpleFill } from 'react-icons/pi'; // Ícone elegante de globo/federação

interface ConfBadgeProps {
  name: string;
}

const ConfBadge = ({ name }: ConfBadgeProps) => {
  const conf = teams[name]?.confederation;
  
  if (!conf || conf === "TBD") return null;
  
  // Cores mais saturadas e modernas (estilo Dark Mode Premium)
  const confederationColors: Record<string, string> = {
    UEFA: "#3b82f6",     // Blue 500
    CONMEBOL: "#22c55e",  // Green 500
    CONCACAF: "#ef4444",  // Red 500
    CAF: "#eab308",      // Yellow 500
    AFC: "#f97316",      // Orange 500
    OFC: "#06b6d4",      // Cyan 500
  };
  
  const color = confederationColors[conf] || "#94a3b8";
  
  return (
    <div 
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border backdrop-blur-md transition-all duration-300 group-hover:brightness-125"
      style={{
        backgroundColor: `${color}10`, // Fundo muito sutil
        borderColor: `${color}30`,     // Borda suave
      }}
    >
      <PiGlobeSimpleFill 
        className="text-[10px]" 
        style={{ color: color }} 
      />
      <span
        className="text-[9px] font-black uppercase tracking-wider leading-none"
        style={{ color: color }}
      >
        {conf}
      </span>
    </div>
  );
};

export default ConfBadge;