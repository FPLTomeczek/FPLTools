import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/EntryPage.css";

var qs = require("qs");

function EntryPage({ id, setId }) {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:8000/api/users-picks",
        qs.stringify({ id: id })
      );
    } catch (e) {
      setIsError(e.message);
      console.log(e.message);
    } finally {
      navigate("/tf", {
        state: {
          id: id,
        },
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="id">ID: </label>
        <input
          id="id"
          type="number"
          onChange={(e) => setId(e.target.value)}
          value={id}
          placeholder="Put your team ID here"
        ></input>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default EntryPage;
