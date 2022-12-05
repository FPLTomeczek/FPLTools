import React, { useState } from "react";
import data from "./clubImages";
import PlayerList from "./PlayerList";
import ClubLogos from "./ClubLogos";

function Stats() {
  const [teamCode, setTeamCode] = useState("");
  const [clubImages, setClubImages] = useState(data);
  const handleSettingTeamCode = (team_code) => {
    setTeamCode(team_code);
  };

  return (
    <div>
      <ClubLogos clubImages={clubImages} setTeamCode={setTeamCode} />
      <button type="button" onClick={() => setTeamCode("")}>
        All Clubs
      </button>
      <PlayerList teamCode={teamCode}></PlayerList>
    </div>
  );
}

export default Stats;
