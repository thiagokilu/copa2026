import { groups, stadiums, type Match } from "../types/data";
import Flag from "./Flag";
import ConfBadge from "./ConfBadge";

// Importando do pacote react-icons
import {
  PiMapPinFill,
  PiUsersThreeFill,
  PiTrophyBold,
  PiDotOutlineFill,
} from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineLiveTv } from "react-icons/md";

interface GameCardProps {
  match: Match;
}

const broadcastLogoMap: Record<
  string,
  { href: string; logos: Array<{ src: string; alt: string }> }
> = {
  "Cazé Tv": {
    href: "https://www.youtube.com/@CazeTV",
    logos: [
      {
        src: "/broadcastLogos/cazetv.png",
        alt: "Logo da Cazé TV",
      },
    ],
  },
  "Globo/SporTv": {
    href: "https://globoplay.globo.com/",
    logos: [
      {
        src: "/broadcastLogos/globo.png",
        alt: "Logo da Globo",
      },
      {
        src: "/broadcastLogos/sportv.png",
        alt: "Logo do SporTV",
      },
    ],
  },
  "SBT/Nsports": {
    href: "https://mais.sbt.com.br/",
    logos: [
      {
        src: "/broadcastLogos/sbt.png",
        alt: "Logo do SBT",
      },
      {
        src: "/broadcastLogos/nsports.png",
        alt: "Logo da NSports",
      },
    ],
  },
};

const GameCard = ({ match }: GameCardProps) => {
  const groupColor = groups[match.group]?.color || "#888";
  const stadium = stadiums[match.stadium];
  const isFinished = match.status === "FINISHED";
  const isLive = match.status === "IN_PLAY" || match.status === "PAUSED";
  const hasScore = isFinished || isLive;
  const broadcast = match.broadcast ?? [];

  return (
    <div className="group relative bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-600 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      {/* Detalhe de cor do grupo - Estética lateral moderna */}
      <div
        className="absolute top-0 left-0 w-1.5 h-full opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: groupColor }}
      />

      <div className="pl-6 pr-5 py-5">
        {/* Header: Grupo e Status */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-black tracking-[0.15em] uppercase px-2 py-0.5 rounded-md bg-white/5"
              style={{ color: groupColor }}
            >
              Grupo {match.group}
            </span>
          </div>

          {isLive ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500">
              <PiDotOutlineFill className="text-xl animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-tighter">
                LIVE
              </span>
            </div>
          ) : isFinished ? (
            <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tight">
              Finalizado
            </span>
          ) : (
            <div className="flex items-center gap-1.5 text-blue-400 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
              <IoTimeOutline className="text-sm" />
              <span className="text-xs font-mono font-bold">
                {match.time_brt}
              </span>
            </div>
          )}
        </div>

        {/* Placar Principal */}
        <div className="flex items-center justify-between gap-2 mb-8">
          {/* Time Casa */}
          <div className="flex flex-col items-center gap-3 flex-[1.5] min-w-0">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700/50 flex items-center justify-center p-3 shadow-xl">
                <Flag name={match.home} />
              </div>
              <div className="absolute -bottom-1 -right-1 scale-90">
                <ConfBadge name={match.home} />
              </div>
            </div>
            <span className="text-sm font-bold text-white text-center truncate w-full tracking-tight leading-tight">
              {match.home}
            </span>
          </div>

          {/* Divisor / Placar */}
          <div className="flex flex-col items-center justify-center flex-1">
            {hasScore ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black font-mono text-white tracking-tighter tabular-nums">
                  {match.score?.home ?? 0}
                </span>
                <span className="text-slate-700 font-light text-2xl">-</span>
                <span className="text-3xl font-black font-mono text-white tracking-tighter tabular-nums">
                  {match.score?.away ?? 0}
                </span>
              </div>
            ) : (
              <div className="bg-slate-800/50 p-2 rounded-full shadow-inner">
                <PiTrophyBold className="text-slate-600 text-lg" />
              </div>
            )}
          </div>

          {/* Time Visitante */}
          <div className="flex flex-col items-center gap-3 flex-[1.5] min-w-0">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700/50 flex items-center justify-center p-3 shadow-xl">
                <Flag name={match.away} />
              </div>
              <div className="absolute -bottom-1 -right-1 scale-90">
                <ConfBadge name={match.away} />
              </div>
            </div>
            <span className="text-sm font-bold text-white text-center truncate w-full tracking-tight leading-tight">
              {match.away}
            </span>
          </div>
        </div>

        {/* Footer: Estádio */}
        <div className="mt-2 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 mb-1">
            <PiMapPinFill className="text-blue-500 text-sm shrink-0" />
            <span className="text-[11px] font-bold text-slate-300 truncate tracking-wide uppercase">
              {match.stadium}
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium ml-5 uppercase tracking-tighter">
            <span>
              {stadium?.city}, {stadium?.country}
            </span>
            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded text-slate-400">
              <PiUsersThreeFill className="text-xs" />
              {stadium?.capacity.toLocaleString("pt-BR")}
            </div>
          </div>

          {broadcast.length > 0 && (
            <div className="mt-3 ml-5">
              <div className="flex items-center gap-2 mb-2">
                <MdOutlineLiveTv className="text-amber-400 text-sm shrink-0" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">
                  Broadcast
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {broadcast.map((channel) => (
                  <div
                    key={channel}
                    className="flex items-center justify-center min-h-9 px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/70"
                  >
                    {broadcastLogoMap[channel] ? (
                      <a
                        href={broadcastLogoMap[channel].href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2"
                        aria-label={`Abrir ${channel}`}
                      >
                        {broadcastLogoMap[channel].logos.map((logo) => (
                          <img
                            key={logo.src}
                            src={logo.src}
                            alt={logo.alt}
                            className="h-8 w-auto object-contain"
                            loading="lazy"
                          />
                        ))}
                      </a>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-200 tracking-tight">
                        {channel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
