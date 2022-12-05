import React, { useState } from "react";

function FilterByTeam({ selected, setSelected }) {
  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">All Teams</option>
        <option value="Arsenal">Arsenal</option>
        <option value="Aston Villa">Aston Villa</option>
        <option value="Chelsea">Chelsea</option>
        <option value="Bournemouth">Bournemouth</option>
        <option value="Brentford">Brentford</option>
        <option value="Brighton">Brighton</option>
        <option value="Crystal Palace">Crystal Palace</option>
        <option value="Everton">Everton</option>
        <option value="Fulham">Fulham</option>
        <option value="Leeds">Leeds</option>
        <option value="Leicester">Leicester</option>
        <option value="Liverpool">Liverpool</option>
        <option value="Man City">Man City</option>
        <option value="Man United">Man United</option>
        <option value="Newcastle">Newcastle</option>
        <option value="Nottingham Forest">Nottingham Forest</option>
        <option value="Southampton">Southampton</option>
        <option value="Spurs">Spurs</option>
        <option value="West Ham">West Ham</option>
        <option value="Wolverhampton">Wolverhampton</option>
      </select>
    </div>
  );
}

export default FilterByTeam;
