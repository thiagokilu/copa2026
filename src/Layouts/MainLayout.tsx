import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import { stadiums } from "../types/data";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white font-sans md:pb-0 pb-[72px]">
      <Header totalStadiums={Object.keys(stadiums).length} />

      <Outlet />

      <Footer />
      <BottomNav />
    </div>
  );
}
