import React, { useState } from "react";
import "../css/Injuries.css";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { BiError } from "react-icons/bi";

function ClubInjuries({ img, teamCode, players }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [length, setLength] = useState(1);

  const styleOfError = (chanceOfPlaying) => {
    switch (chanceOfPlaying) {
      case 0:
        return { color: "red", size: "25px" };
      case 25:
        return { color: "brown" };
      case 50:
        return { color: "orange" };
      case 75:
        return { color: "yellow" };
      default:
        return {};
    }
  };
  const handleOnClick = () => {
    setIsExpanded(!isExpanded);
    setLength(players.length);
    console.log(length);
  };

  const styleExpanded = {
    gridColumn: "span 1",
    gridRow: `span ${length}`,
  };

  const style = {
    gridColumn: "span 1",
    gridRow: "span 1",
  };

  return (
    <div
      // className={`${isExpanded && "expanded"} club-injuries`}
      className="club-injuries"
      style={style}
    >
      <div className="badge-arrow-container" onClick={handleOnClick}>
        <img src={img} alt={teamCode} className="photo" />
        <IconContext.Provider value={{ size: "50px", color: "#FFFFFF" }}>
          {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
        </IconContext.Provider>
      </div>
      {isExpanded && (
        <div className="team-info-container">
          {players &&
            players.map((player, i) => {
              return (
                <div className="injury-player-info" key={i}>
                  <div className="error-percentage">
                    <IconContext.Provider
                      value={{
                        style: styleOfError(
                          player.chance_of_playing_next_round
                        ),
                        size: "25px",
                      }}
                    >
                      <BiError></BiError>
                    </IconContext.Provider>
                    <h4>{player.chance_of_playing_next_round}%</h4>
                  </div>
                  <h4>{player.news}</h4>
                  <h4 className="injury-player-name">{player.web_name}</h4>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default ClubInjuries;
