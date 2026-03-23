import React, { useMemo } from 'react';
import { matches } from '../../matches.json';
import Flag from './Flag';
import { PiXBold } from 'react-icons/pi';

interface Match {
  id: number;
  date: string;
  time_brt: string;
  group: string;
  home: string;
  away: string;
  stadium: string;
  score: { home: number; away: number } | null;
  status: string;
}

interface StadiumMatchesModalProps {
  stadiumName: string;
  onClose: () => void;
}

export default function StadiumMatchesModal({ stadiumName, onClose }: StadiumMatchesModalProps) {
  const stadiumMatches = useMemo(() => {
    return (matches as Match[]).filter(match => match.stadium === stadiumName);
  }, [stadiumName]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-3xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight mb-1">{stadiumName}</h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
              {stadiumMatches.length} {stadiumMatches.length === 1 ? 'Jogo' : 'Jogos'} na Copa do Mundo 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <PiXBold className="text-white text-lg" />
          </button>
        </div>

        {/* Lista de Jogos */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="divide-y divide-white/5">
            {stadiumMatches.map((match, index) => (
              <div key={index} className="px-6 py-4 hover:bg-white/2 transition-colors">
                <div className="flex items-center justify-between">
                  {/* Data e Hora */}
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                        {new Date(match.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }).toUpperCase()}
                      </div>
                      <div className="text-lg font-black text-white">
                        {new Date(match.date).toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      {new Date(match.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* Confronto */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Flag name={match.home} />
                      <span className="text-sm font-bold text-white">{match.home}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        {match.status === 'FINISHED' ? `${match.score?.home || 0} - ${match.score?.away || 0}` : 'vs'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{match.away}</span>
                      <Flag name={match.away} />
                    </div>
                  </div>

                  {/* Fase */}
                  <div className="text-right">
                    <div className="text-xs font-black text-yellow-500 uppercase tracking-widest">
                      {match.group ? `GRUPO ${match.group}` : 'Fase Eliminatória'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
