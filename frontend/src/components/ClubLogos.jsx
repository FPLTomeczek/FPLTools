import React, { useState } from "react";

function ClubLogos({ clubImages, setTeamCode }) {
  return (
    <>
      {clubImages &&
        clubImages.map((image) => {
          const { img, teamCode } = image;
          return (
            <img
              src={img}
              key={teamCode}
              alt="klub"
              className="photo"
              onClick={() => setTeamCode(teamCode)}
            />
          );
        })}
    </>
  );
}

export default ClubLogos;
