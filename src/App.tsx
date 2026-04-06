import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

import Filters from "./components/Filters";
import Stats from "./components/Stats";
import MatchList from "./components/MatchList";

import Estadios from "./pages/Estadios";
import Grupos from "./pages/Grupos";
import Selecoes from "./pages/Selecoes";
import FullCalendar from "./pages/FullCalendar";
import { matches, type Match } from "./types/data";

export default function App() {
  const [selectedGroup, setSelectedGroup] = useState("TODOS");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = matches;

    if (selectedGroup !== "TODOS") {
      list = list.filter((m) => m.group === selectedGroup);
    }

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
  }, [search, selectedGroup]);

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

  const filteredTeams = useMemo(() => {
    const uniqueTeams = new Set<string>();
    filtered.forEach((match) => {
      uniqueTeams.add(match.home);
      uniqueTeams.add(match.away);
    });
    return uniqueTeams.size;
  }, [filtered]);

  return (
    <Router>
      <Routes>
        {/* 🔹 Layout padrão (com Header/Footer) */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <>
                <Filters
                  selectedGroup={selectedGroup}
                  setSelectedGroup={setSelectedGroup}
                  search={search}
                  setSearch={setSearch}
                />
                <Stats
                  totalShown={totalShown}
                  datesCount={dates.length}
                  filteredTeams={filteredTeams}
                  totalGames={filtered.length}
                />
                <div className="py-8 pb-16">
                  <MatchList byDate={byDate} dates={dates} />
                </div>
              </>
            }
          />

          <Route path="/estadios" element={<Estadios />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/selecoes" element={<Selecoes />} />
          <Route path="/calendario" element={<FullCalendar />} />
        </Route>
      </Routes>
    </Router>
  );
}
