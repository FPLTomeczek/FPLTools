import React, { useState } from "react";
import "../css/Injuries.css";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { IconContext } from "react-icons/lib";

function ClubInjuries({ img, teamCode, players }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <div className="front-list-element">
        <img src={img} alt={teamCode} className="photo" />
        <IconContext.Provider value={{ size: "50px", color: "#FFFFFF" }}>
          {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
        </IconContext.Provider>
      </div>
      <h4>{teamCode}</h4>
      {players &&
        players.map((player) => {
          return (
            <div className="injury-player-info">
              <h4>{player.chance_of_playing_next_round}</h4>
              <h4>{player.news}</h4>
              <h4>{player.web_name}</h4>
            </div>
          );
        })}
    </div>
  );
}

export default ClubInjuries;
