import React, { useState } from "react";
import { RiTShirt2Line } from "react-icons/ri";
import { GrRevert } from "react-icons/gr";
import { useEffect } from "react";
import axios from "axios";

function Player({
  id,
  pos,
  cpt,
  vcpt,
  playerkey,
  removePlayer,
  isToRevert,
  revertPlayer,
}) {
  // get player by ID
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [team, setTeam] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [position, setPosition] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handleRemovePlayer = () => {
    removePlayer(playerkey, price);
  };

  const handleRevertPlayer = (playerKey, playerID) => {
    revertPlayer(playerKey, playerID);
  };

  return (
    <div>
      {isLoaded && (
        <div>
          <div className="player" style={{ backgroundColor: color }}>
            {isToRevert ? (
              <GrRevert
                className="revert-btn"
                onClick={() => handleRevertPlayer(playerkey, id)}
              />
            ) : (
              <RiTShirt2Line
                className="shirt-btn"
                onClick={handleRemovePlayer}
              />
            )}
            <h4>{name || "Pick Player"}</h4>
            <h4>{points}</h4>
            <h4>{team}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
