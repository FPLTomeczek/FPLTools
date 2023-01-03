import React, { useEffect, useState } from "react";
import axios from "axios";
import images from "../clubImages";
import ClubInjuries from "../components/ClubInjuries";

function Injuries() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/players");
        setData(
          response.data
            .filter(
              (player) =>
                player.chance_of_playing_next_round !== null &&
                player.chance_of_playing_next_round !== 100
            )
            .reduce((acc, player) => {
              if (!acc[player.team_code]) {
                acc[player.team_code] = [];
              }
              acc[player.team_code].push(player);
              return acc;
            }, {})
        );
      } catch (err) {
        console.log(err.message);
      }
    };
    getPlayers();
  }, []);
  console.log(data);

  return (
    <div className="main-injury">
      <div className="all-clubs-injuries">
        {images.map((image) => {
          const { img, teamCode } = image;
          return (
            <ClubInjuries
              img={img}
              teamCode={teamCode}
              players={data[teamCode]}
            />
          );
        })}
        ;
      </div>
    </div>
  );
}

export default Injuries;
