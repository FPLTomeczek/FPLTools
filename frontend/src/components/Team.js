import React from "react";
import Player from "./Player";

function Team({ playersCopy, removePlayer, revertPlayer, playersToRevert }) {
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Team;
