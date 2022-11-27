import React, { useState } from "react";
import "./css/ClubLogos.css";

function ClubLogos({ clubImages, setTeamCode }) {
  return (
    <>
      {clubImages &&
        clubImages.map((image) => {
          const { img, teamCode } = image;
          console.log(img, teamCode);
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
