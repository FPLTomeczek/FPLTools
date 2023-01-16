import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BiError } from "react-icons/bi";

function Error({ message }) {
  return (
    <div className="error-container">
      <div className="error-message">
        <IconContext.Provider value={{ size: "50px", color: "red" }}>
          <BiError></BiError>
        </IconContext.Provider>
        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default Error;
