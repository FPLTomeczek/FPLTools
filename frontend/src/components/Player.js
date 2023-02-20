import React, { useState } from "react";
import { RiArrowDropDownLine, RiTShirt2Fill } from "react-icons/ri";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { GrRevert } from "react-icons/gr";
import { useEffect } from "react";
import axios from "axios";
import { IconContext } from "react-icons";
import switchTeamName from "../switcher";

function Player({
  id,
  pos,
  cpt,
  vcpt,
  playerkey,
  removePlayer,
  isToRevert,
  revertPlayer,
  addRole,
  validationCheck,
  subPlayers,
  subOffID,
  setSubOffID,
  darkBackground,
  setDarkBackground,
  initialGameweek,
  gameweekCounter,
}) {
  // get player by ID
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [team, setTeam] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [shirtColor, setShirtColor] = useState("");
  const [position, setPosition] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [futureGameweeks, setFutureGameweeks] = useState([]);

  const getData = async (playerID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/player/${playerID}`
      );
      setName(response.data["web_name"]);
      setPoints(response.data["total_points"]);
      setTeam(response.data["team_code"]);
      setPrice(response.data["price"]);
      setPosition(response.data["position"]);
      setIsLoaded(true);
    } catch (err) {
      console.log(err.message);
      setName("");
      setPoints(0);
      setTeam("");
      setPrice(0);
      setPosition(0);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  useEffect(() => {
    const getNext5GW = async (teamName) => {
      try {
        const gameweeks = await axios.get(
          `http://localhost:8000/api/gameweeks`
        );
        // filter by initialGameweek
        const filteredGameweeks = gameweeks.data
          .filter(
            (gw) =>
              gw.event < gameweekCounter + 6 &&
              gw.event > gameweekCounter &&
              (gw.team_a === teamName || gw.team_h === teamName)
          )
          .sort((a, b) => a.event - b.event);
        setFutureGameweeks(filteredGameweeks);
      } catch (err) {
        console.log(err.message);
      }
    };
    getNext5GW(team);
  }, [team, gameweekCounter]);

  useEffect(() => {
    const getStyle = (position) => {
      switch (position) {
        case 1:
          setColor("#FFF590");
          break;
        case 2:
          setColor("#8EE5FF");
          break;
        case 3:
          setColor("#35E481");
          break;
        case 4:
          setColor("#FF6C6C");
          break;
        default:
      }
    };
    getStyle(position);
  }, [position]);

  useEffect(() => {
    const getStyle = (team) => {
      switch (team) {
        case "Arsenal":
          setShirtColor("#FF1818");
          break;
        case "Aston Villa":
          setShirtColor("#64203F");
          break;
        case "Chelsea":
          setShirtColor("#003AAF");
          break;
        case "Bournemouth":
          setShirtColor("#780112");
          break;
        case "Brentford":
          setShirtColor("#E60022");
          break;
        case "Brighton":
          setShirtColor("#3164FF");
          break;
        case "Crystal Palace":
          setShirtColor("#6E007D");
          break;
        case "Everton":
          setShirtColor("#0014A6");
          break;
        case "Fulham":
          setShirtColor("#EEF0FF");
          break;
        case "Leeds":
          setShirtColor("#D3D3D3");
          break;
        case "Leicester":
          setShirtColor("#465BFA");
          break;
        case "Liverpool":
          setShirtColor("#DC0000");
          break;
        case "Newcastle":
          setShirtColor("#333131");
          break;
        case "Forest":
          setShirtColor("#FF3E3E");
          break;
        case "Southampton":
          setShirtColor("#E63131");
          break;
        case "West Ham":
          setShirtColor("#682B00");
          break;
        case "Wolverhampton":
          setShirtColor("#FFAB08");
          break;
        case "Man United":
          setShirtColor("#C40000");
          break;
        case "Man City":
          setShirtColor("#4DFFFE");
          break;
        case "Spurs":
          setShirtColor("#FFFFFF");
          break;
        default:
      }
    };
    getStyle(team);
  }, [team]);

  const handleRemovePlayer = () => {
    removePlayer(playerkey, price);
  };

  const handleRevertPlayer = (playerKey, playerID) => {
    revertPlayer(playerKey, playerID);
  };

  const handleSubOff = (playerKey) => {
    setSubOffID(playerKey);
    setDarkBackground(true);
  };

  const handleSubOn = (subOffID, playerKey) => {
    if (subOffID !== null) {
      subPlayers(subOffID, playerKey);
      setSubOffID(null);
      setDarkBackground(false);
    }
  };

  const styleOfTeamAbbr = (difficulty) => {
    switch (difficulty) {
      case 2:
        return { backgroundColor: "green" };
      case 3:
        return { backgroundColor: "white" };
      case 4:
        return { backgroundColor: "red" };
      case 5:
        return { backgroundColor: "brown" };
      default:
        return {};
    }
  };

  const calculateDifficulty = (team, gw) => {
    return team === gw.team_a ? gw.team_a_difficulty : gw.team_h_difficulty;
  };

  return (
    <div>
      {isLoaded && (
        <div>
          <div
            className={`${darkBackground && "player-unavailable"} player`}
            id={`player-${playerkey}`}
            style={{ backgroundColor: color }}
          >
            {isToRevert ? (
              <GrRevert
                className="revert-btn"
                onClick={() => handleRevertPlayer(playerkey, id)}
              />
            ) : (
              <RiTShirt2Fill
                onClick={handleRemovePlayer}
                className="shirt-btn"
                style={{ color: shirtColor }}
              />
            )}
            <div className="substitution-button">
              {playerkey < 11 ? (
                <IconContext.Provider value={{ size: "25px" }}>
                  <div
                    className="sub-off"
                    onClick={() => handleSubOff(playerkey)}
                  >
                    <BsFillArrowDownCircleFill />
                  </div>
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: "25px" }}>
                  <div
                    className="sub-on"
                    onClick={() => handleSubOn(subOffID, playerkey)}
                  >
                    <BsFillArrowUpCircleFill />
                  </div>
                </IconContext.Provider>
              )}
            </div>
            <h4>{name || "Pick Player"}</h4>
            <h4>{team}</h4>
            <div className="future-matches">
              {futureGameweeks.map((gw, i) => {
                const difficulty = calculateDifficulty(team, gw);
                return (
                  <div className="future-match" key={i}>
                    <h4>{gw.event}</h4>
                    <div
                      className="team-abbr"
                      style={styleOfTeamAbbr(difficulty)}
                    >
                      <h4>
                        {team === gw.team_a
                          ? switchTeamName(gw.team_h)
                          : switchTeamName(gw.team_a).toLowerCase()}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
