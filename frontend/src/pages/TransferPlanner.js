import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Player from "../components/Player";
import "../css/TF.css";
import PlayerList from "../components/PlayerList";
import FilterByTeam from "../components/FilterByTeam";
import ModalTF from "../components/ModalTF";
import Team from "../components/Team";

function TransferPlanner({ team_id }) {
  const [selected, setSelected] = useState("");
  const [teamValue, setTeamValue] = useState(0);
  const [bankValue, setBankValue] = useState(0);
  const [bankValueCopy, setBankValueCopy] = useState(0);
  const [blankPlayersArrayKey, setBlankPlayersArrayKey] = useState([]);
  const [availableTransfers, setAvailableTransfers] = useState(1);
  const [costOfTransfers, setCostOfTransfers] = useState(0);
  const [playersToRevert, setPlayersToRevert] = useState([]);
  const [players, setPlayers] = useState(
    Array(15).fill({
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    })
  );
  const [playersCopy, setPlayersCopy] = useState(players);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user-picks/${team_id}`
        );
        const resp = response.data;
        setTeamValue(resp["team_value"]);
        setBankValue(resp["bank_value"]);
        setBankValueCopy(resp["bank_value"]);
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
        setPlayersCopy(players);
        setIsError(false);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [team_id]);

  const addPlayer = (playerID) => {
    const newPlayers = [...playersCopy];
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/player/${playerID}`
        );
        setBankValue(bankValue - response.data["price"]);
      } catch (err) {
        console.log(err.message);
      }
    };
    if (blankPlayersArrayKey.length > 0) {
      newPlayers[blankPlayersArrayKey.at(-1)] = { id: playerID };
      setPlayersCopy(newPlayers);
      setBlankPlayersArrayKey(blankPlayersArrayKey.slice(0, -1));
      getData();
      const lastKey = blankPlayersArrayKey.pop();
      console.log(lastKey);
      const newPlayersToRevert = playersToRevert.filter(
        (playerToRevert) => playerToRevert.playerId !== lastKey
      );
      setPlayersToRevert(newPlayersToRevert);
      console.log(playersToRevert);
    }
  };

  const removePlayer = (playerId, price) => {
    if (playersCopy[playerId].id !== null) {
      const actualID = playersCopy[playerId].id;
      const newPlayers = [...playersCopy];
      newPlayers[playerId] = { id: null, cpt: false, vcpt: false };
      setPlayersCopy(newPlayers);
      setBlankPlayersArrayKey([...blankPlayersArrayKey, playerId]);
      setBankValue(bankValue + price);
      setPlayersToRevert([...playersToRevert, { playerId, actualID }]);
      makeTransfer(actualID, players[playerId].id);
    }
  };

  const revertPlayer = (id) => {
    const newPlayers = [...playersCopy];
    console.log(id);
    const playerID = players[id].id;
    console.log(playersCopy);
    console.log(playerID);
    const getPrice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/player/${playerID}`
        );
        setBankValue(bankValue - response.data["price"]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPrice();
    newPlayers[id] = { id: playerID };
    setPlayersCopy(newPlayers);
    setBlankPlayersArrayKey(blankPlayersArrayKey.slice(0, -1));
    const newPlayersToRevert = playersToRevert.filter(
      (playerToRevert) => playerToRevert.playerId !== id
    );
    setPlayersToRevert(newPlayersToRevert);
    undoTransfer();
  };

  const makeTransfer = (actualID, initialActualID) => {
    if (actualID === initialActualID) {
      setAvailableTransfers(availableTransfers - 1);
      if (availableTransfers <= 0) {
        setCostOfTransfers(costOfTransfers - 4);
      }
    }
  };

  const undoTransfer = () => {
    setAvailableTransfers(availableTransfers + 1);
    if (availableTransfers < 0) {
      setCostOfTransfers(costOfTransfers + 4);
    }
  };

  const validationCheck = (bank_value) => {
    if (bank_value < 0) {
      alert("Total Value under 0$");
      setPlayersCopy(players);
      setBankValue(bankValueCopy);
    }
  };

  return (
    <>
      <h4>{isLoading ? "...Fetching" : "Loaded"}</h4>
      {isLoading || (
        <div>
          <h2>TransferPlanner</h2>
          <h2>{team_id}</h2>
          <h4>{teamValue} $</h4>
          <h4>{bankValue.toFixed(1)} $</h4>
          <h4>Cost: {costOfTransfers}</h4>
          <h4>Available Transfers: {availableTransfers}</h4>
          <Team
            playersCopy={playersCopy}
            removePlayer={removePlayer}
            revertPlayer={revertPlayer}
            playersToRevert={playersToRevert}
          />

          {/* <ModalTF /> */}
          <button type="button" onClick={() => validationCheck(bankValue)}>
            Submit changes
          </button>
          <FilterByTeam selected={selected} setSelected={setSelected} />
          <PlayerList teamCode={selected} addPlayer={addPlayer} />
        </div>
      )}
    </>
  );
}

export default TransferPlanner;
