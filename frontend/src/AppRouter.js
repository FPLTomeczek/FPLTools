import React, { useState } from "react";
import Stats from "./pages/Stats";
import Injuries from "./pages/Injuries";
import EntryPage from "./pages/EntryPage";
import TransferPlanner from "./pages/TransferPlanner";
import Navbar from "./components/Navbar";
import News from "./pages/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRouter() {
  const [id, setId] = useState(0);
  const initialGameweek = 17;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EntryPage id={id} setId={setId} />} />
        <Route path="/stats" element={<Stats />} />
        <Route
          path="/tf"
          element={
            <TransferPlanner team_id={id} initialGameweek={initialGameweek} />
          }
        />
        <Route path="/injuries" element={<Injuries />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
