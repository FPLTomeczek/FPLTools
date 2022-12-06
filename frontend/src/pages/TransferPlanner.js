import React, { useState, useEffect } from "react";
import axios from "axios";
import Player from "../components/Player";
import "../css/TF.css";
import PlayerList from "../components/PlayerList";
import FilterByTeam from "../components/FilterByTeam";

function TransferPlanner({ team_id }) {
  const [team, setTeam] = useState({});
  const [selected, setSelected] = useState("");
  const [teamValue, setTeamValue] = useState(0);
  const [bankValue, setBankValue] = useState(0);
  const [players, setPlayers] = useState([
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
    {
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/user-picks/${team_id}`
        );
        const resp = response.data;
        setTeamValue(resp["team_value"]);
        setBankValue(resp["bank_value"]);
        setTeam({ ...response.data });
        const players = [
          {
            id: resp["p1"],
            pos: resp["p1_pos"],
            cpt: resp["p1_cpt"],
            vcpt: resp["p1_vcpt"],
          },
          {
            id: resp["p2"],
            pos: resp["p2_pos"],
            cpt: resp["p2_cpt"],
            vcpt: resp["p2_vcpt"],
          },
          {
            id: resp["p3"],
            pos: resp["p3_pos"],
            cpt: resp["p3_cpt"],
            vcpt: resp["p3_vcpt"],
          },
          {
            id: resp["p4"],
            pos: resp["p4_pos"],
            cpt: resp["p4_cpt"],
            vcpt: resp["p4_vcpt"],
          },
          {
            id: resp["p5"],
            pos: resp["p5_pos"],
            cpt: resp["p5_cpt"],
            vcpt: resp["p5_vcpt"],
          },
          {
            id: resp["p6"],
            pos: resp["p6_pos"],
            cpt: resp["p6_cpt"],
            vcpt: resp["p6_vcpt"],
          },
          {
            id: resp["p7"],
            pos: resp["p7_pos"],
            cpt: resp["p7_cpt"],
            vcpt: resp["p7_vcpt"],
          },
          {
            id: resp["p8"],
            pos: resp["p8_pos"],
            cpt: resp["p8_cpt"],
            vcpt: resp["p8_vcpt"],
          },
          {
            id: resp["p9"],
            pos: resp["p9_pos"],
            cpt: resp["p9_cpt"],
            vcpt: resp["p9_vcpt"],
          },
          {
            id: resp["p10"],
            pos: resp["p10_pos"],
            cpt: resp["p10_cpt"],
            vcpt: resp["p10_vcpt"],
          },
          {
            id: resp["p11"],
            pos: resp["p11_pos"],
            cpt: resp["p11_cpt"],
            vcpt: resp["p11_vcpt"],
          },
          {
            id: resp["p12"],
            pos: resp["p12_pos"],
            cpt: resp["p12_cpt"],
            vcpt: resp["p12_vcpt"],
          },
          {
            id: resp["p13"],
            pos: resp["p13_pos"],
            cpt: resp["p13_cpt"],
            vcpt: resp["p13_vcpt"],
          },
          {
            id: resp["p14"],
            pos: resp["p14_pos"],
            cpt: resp["p14_cpt"],
            vcpt: resp["p14_vcpt"],
          },
          {
            id: resp["p15"],
            pos: resp["p15_pos"],
            cpt: resp["p15_cpt"],
            vcpt: resp["p15_vcpt"],
          },
        ];
        setPlayers(players);
        setIsError(false);
        console.log("team");
        console.log(team);
        console.log("players");
        console.log(players);
      } catch (err) {
        console.log("error");
        console.log(err.message);
        setIsError(true);
        setTeam(null);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h4>{isLoading ? "...Fetching" : "Loaded"}</h4>
      <h2>TransferPlanner</h2>
      <h2>{team_id}</h2>
      <h4>{teamValue}</h4>
      <h4>{bankValue}</h4>
      {players.filter((player) => player.id !== null).length > 0 && (
        <div className="planner">
          {players.map((player, i) => (
            <Player key={i} {...player} />
          ))}
        </div>
      )}
      <FilterByTeam selected={selected} setSelected={setSelected} />
      <PlayerList teamCode={selected} />
    </>
  );
}

export default TransferPlanner;
