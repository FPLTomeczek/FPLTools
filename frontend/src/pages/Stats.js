import React, { useState } from "react";
import data from "../clubImages";
import PlayerList from "../components/PlayerList";
import ClubLogos from "../components/ClubLogos";
import "../css/Stats.css";
import FilterByTeam from "../components/FilterByTeam";

function Stats() {
  const [teamCode, setTeamCode] = useState("");
  const [clubImages, setClubImages] = useState(data);
  const handleSettingTeamCode = (team_code) => {
    setTeamCode(team_code);
  };

  return (
    <div className="stats-container">
      <ClubLogos clubImages={clubImages} setTeamCode={setTeamCode} />
      <div className="div-btn">
        <button className="btn" type="button" onClick={() => setTeamCode("")}>
          All Clubs
        </button>
      </div>
      <PlayerList teamCode={teamCode}></PlayerList>
    </div>
  );
}

export default Stats;