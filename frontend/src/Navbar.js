import React from "react";
import { Link } from "react-router-dom";
import ".//css//Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="nav-list-container">
        <ul className="nav-list">
          <li>
            <Link className="li-link" to="/">
              EntryPage
            </Link>
          </li>
          <li>
            <Link className="li-link" to="/stats">
              Stats
            </Link>
          </li>
          <li>
            <Link className="li-link" to="/tf">
              TransferPlanner
            </Link>
          </li>
          <li>
            <Link className="li-link" to="/injuries">
              Injuries
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
