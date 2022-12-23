import React from "react";
import Player from "./Player";
import { useState } from "react";

function Team({
  playersCopy,
  removePlayer,
  revertPlayer,
  playersToRevert,
  subPlayers,
}) {
  const [subOffID, setSubOffID] = useState(0);
  return (
    <div>
      {playersCopy.filter((player) => player.id !== null).length > 0 && (
        <div className="planner">
          {playersCopy.map((player, i) => {
            const isToRevert = playersToRevert.find(
              (player) => player.playerId === i
            )
              ? true
              : false;
            return (
              <Player
                key={i}
                {...player}
                playerkey={i}
                removePlayer={removePlayer}
                isToRevert={isToRevert}
                revertPlayer={revertPlayer}
                subPlayers={subPlayers}
                subOffID={subOffID}
                setSubOffID={setSubOffID}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Team;
