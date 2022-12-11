import React, { useState } from "react";
import { RiTShirt2Line } from "react-icons/ri";
import { useEffect } from "react";
import axios from "axios";

function Player({ id, pos, cpt, vcpt, playerkey, removePlayer }) {
  // get player by ID
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);
  const [team, setTeam] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/player/${id}`
        );
        setName(response.data["web_name"]);
        setPoints(response.data["total_points"]);
        setTeam(response.data["team_code"]);
        setIsLoaded(true);
      } catch (err) {
        console.log(err.message);
        setName("");
        setPoints(0);
        setTeam("");
        // setIsLoaded(false);
      }
    };
    getData();
  }, [id]);

  const handleClick = () => {
    removePlayer(playerkey);
  };

  return (
    <div>
      {isLoaded && (
        <div>
          <div className="player">
            <RiTShirt2Line id="shirt" onClick={handleClick} />
            <h4>{name}</h4>
            <h4>{points}</h4>
            <h4>{team}</h4>
            <h4>{playerkey}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
