import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="App">
      <ul id="nav-list">
        <li>
          <Link to="/">EntryPage</Link>
        </li>
        <li>
          <Link to="/stats">Stats</Link>
        </li>
        <li>
          <Link to="/tf">TransferPlanner</Link>
        </li>
        <li>
          <Link to="/injuries">Injuries</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
