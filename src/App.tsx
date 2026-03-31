import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Filters from "./components/Filters";
import Stats from "./components/Stats";
import MatchList from "./components/MatchList";
import Footer from "./components/Footer";
import FullCalendar from "./pages/FullCalendar";
import Estadios from "./pages/Estadios";
import Grupos from "./pages/Grupos";
import Selecoes from "./pages/Selecoes";
import { matches, stadiums, type Match } from "./types/data";
import Dashboard from "./pages/Dashboard";

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState("TODOS");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = matches;
    if (selectedGroup !== "TODOS")
      list = list.filter((m) => m.group === selectedGroup);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.home.toLowerCase().includes(q) ||
          m.away.toLowerCase().includes(q) ||
          m.stadium.toLowerCase().includes(q),
      );
    }
    return list;
  }, [selectedGroup, search]);

  const byDate = useMemo(() => {
    const map: Record<string, Match[]> = {};
    filtered.forEach((m) => {
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    });
    return map;
  }, [filtered]);

  const dates = Object.keys(byDate).sort();
  const totalShown = filtered.length;
  
  // Calcular número de seleções únicas nos jogos filtrados
  const filteredTeams = useMemo(() => {
    const uniqueTeams = new Set<string>();
    filtered.forEach(match => {
      uniqueTeams.add(match.home);
      uniqueTeams.add(match.away);
    });
    return uniqueTeams.size;
  }, [filtered]);

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0e1a] text-white font-sans md:pb-0 pb-[72px]">
        {/* ── Header ── */}
        <Header totalStadiums={Object.keys(stadiums).length} />

        {/* ── Routes ── */}
        <Routes>
          <Route path="/" element={
            <>
              {/* ── Filtros ── */}
              <Filters 
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                search={search}
                setSearch={setSearch}
              />

              {/* ── Stats ── */}
              <Stats totalShown={totalShown} datesCount={dates.length} filteredTeams={filteredTeams} totalGames={filtered.length} />

              {/* ── Lista ── */}
              <div className=" px-6 py-8 pb-16">
                <MatchList byDate={byDate} dates={dates} />
              </div>
            </>
          } />
          
          <Route path="/estadios" element={<Estadios />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/selecoes" element={<Selecoes />} />
          <Route path="/calendario" element={<FullCalendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* ── Footer ── */}
        <Footer />
      </div>
      
      {/* Bottom Navigation Mobile */}
      <BottomNav />
    </Router>
  );
}
