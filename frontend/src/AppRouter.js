import React, { useState } from "react";
import Stats from "./Stats";
import Injuries from "./Injuries";
import EntryPage from "./EntryPage";
import TransferPlanner from "./TransferPlanner";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRouter() {
  const [id, setId] = useState(0);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<EntryPage id={id} setId={setId} />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/tf" element={<TransferPlanner id={id} />} />
        <Route path="/injuries" element={<Injuries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
