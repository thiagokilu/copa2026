import type { SyntheticEvent } from 'react';
import { teams } from '../types/data';
import { FLAG_URL } from '../utils/helpers';

interface FlagProps {
  name: string;
  className?: string;
}

const Flag = ({ name, className }: FlagProps) => {
  const team = teams[name];
  const code = team?.flag;
  if (!code || code === "eu" || code === "un") {
    return (
      <div
        className={`w-9 h-6 rounded flex items-center justify-center text-sm flex-shrink-0 ${className || ''}`}
        style={{ background: code === "eu" ? "#003399" : "#4a9fd5" }}
      >
        {code === "eu" ? "🇪🇺" : "🌍"}
      </div>
    );
  }
  return (
    <img
      src={FLAG_URL(code)}
      alt={name}
      className={`w-9 h-6 object-cover rounded flex-shrink-0 border border-white/20 ${className || ''}`}
      onError={(e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
};

export default Flag;
