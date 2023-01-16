import React, { useState } from "react";

function FilterByTeam({ selected, setSelected }) {
  return (
    <div>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value=""> &nbsp;All Teams</option>
        <option value="Arsenal">&nbsp;Arsenal</option>
        <option value="Aston Villa">&nbsp;Aston Villa</option>
        <option value="Chelsea">&nbsp;Chelsea</option>
        <option value="Bournemouth">&nbsp;Bournemouth</option>
        <option value="Brentford"> &nbsp;Brentford</option>
        <option value="Brighton">&nbsp;Brighton</option>
        <option value="Crystal Palace"> &nbsp;Crystal Palace</option>
        <option value="Everton"> &nbsp;Everton</option>
        <option value="Fulham">&nbsp;Fulham</option>
        <option value="Leeds"> &nbsp;Leeds</option>
        <option value="Leicester"> &nbsp;Leicester</option>
        <option value="Liverpool">&nbsp;Liverpool</option>
        <option value="Man City"> &nbsp;Man City</option>
        <option value="Man United">&nbsp;Man United</option>
        <option value="Newcastle">&nbsp;Newcastle</option>
        <option value="Nottingham Forest">&nbsp;Nottingham Forest</option>
        <option value="Southampton">&nbsp;Southampton</option>
        <option value="Spurs">&nbsp;Spurs</option>
        <option value="West Ham">&nbsp;West Ham</option>
        <option value="Wolverhampton">&nbsp;Wolverhampton</option>
      </select>
    </div>
  );
}

export default FilterByTeam;
