import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Player from "../components/Player";
import "../css/TF.css";
import PlayerList from "../components/PlayerList";
import FilterByTeam from "../components/FilterByTeam";
import ModalTF from "../components/ModalTF";
import Team from "../components/Team";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

function TransferPlanner({ team_id, initialGameweek }) {
  const [teamValue, setTeamValue] = useState(0);
  const [bankValue, setBankValue] = useState(0);
  const [bankValueCopy, setBankValueCopy] = useState(0);
  const [blankPlayersArrayKey, setBlankPlayersArrayKey] = useState([]);
  const [availableTransfers, setAvailableTransfers] = useState(1);
  const [costOfTransfers, setCostOfTransfers] = useState(0);
  const [playersToRevert, setPlayersToRevert] = useState([]);
  const [gameweekCounter, setGameweekCounter] = useState(initialGameweek);
  const [players, setPlayers] = useState(
    Array(15).fill({
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    })
  );
  const [playersForAllGWs, setPlayersForAllGWs] = useState([]);
  const [playersCopy, setPlayersCopy] = useState(players);
  const [isLoading, setIsLoading] = useState(false);
  const [revertPlayersArr, setRevertPlayersArr] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log("useEffect");
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
        setRevertPlayersArr(players);
        for (let i = 16; i <= 38; i++) {
          let obj = { gw: i, players: players };
          setPlayersForAllGWs((prevArr) => [...prevArr, obj]);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [team_id]);

  const checkPlayerRoles = (dict) => {
    if (dict[1] !== 2 || dict[2] !== 5 || dict[3] !== 5 || dict[4] !== 3) {
      alert(
        "Wrong Positions of Player!\nRequired Playes Roles:\nGoalkeepers: 1\nDefenders: 5\nMidfielders: 5\nForwards: 3"
      );
      setBankValue(bankValueCopy);
      setCostOfTransfers(0);
      setAvailableTransfers(1);
      return true;
    }
    return false;
  };

  const validate = (
    playersCopy,
    response,
    countRoles,
    countFirstElevenRoles
  ) => {
    const allPlayersRoles = checkPlayerRoles(countRoles);
    const firstElevenPlayersRoles = firstElevenFormationValidation(
      countFirstElevenRoles
    );
    if (allPlayersRoles || firstElevenPlayersRoles) {
      playersCopy = players;
    }
    const sortedEleven = playersCopy
      .filter((player) => player.pos < 12)
      .sort((a, b) => {
        return (
          response.data[a.id - 1].position - response.data[b.id - 1].position
        );
      });
    const playersCopyBench = playersCopy.slice(11, 15);
    const newPlayersArray = [...sortedEleven, ...playersCopyBench];

    setPlayersCopy(newPlayersArray);
    setRevertPlayersArr(newPlayersArray);
  };

  const firstElevenFormationValidation = (dict) => {
    if (
      dict[1] !== 1 ||
      dict[2] > 5 ||
      dict[2] < 3 ||
      dict[3] > 5 ||
      dict[3] < 2 ||
      dict[4] > 3 ||
      !dict[4]
    ) {
      alert(
        "Wrong Formation of First Eleven!\nRequired First Eleven Roles:\nGoalkeepers: 1\nDefenders: 3-5\nMidfielders: 3-5\nForwards: 1-3"
      );
      setBankValue(bankValueCopy);
      setCostOfTransfers(0);
      setAvailableTransfers(1);
      return true;
    }
    return false;
  };
  const validationCheck = (bank_value, playersCopyFN) => {
    const getRole = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/players`);

        const playerRoles = [];
        const playerFirstElevenRoles = [];

        playersCopyFN
          .map((player) => {
            return player.id;
          })
          .forEach((playerCopyID) => {
            playerRoles.push(response.data[playerCopyID - 1].position);
          });

        const countRoles = playerRoles.reduce((counts, num) => {
          if (num in counts) {
            counts[num]++;
          } else {
            counts[num] = 1;
          }
          return counts;
        }, {});

        playersCopyFN
          .filter((player) => player.pos < 12)
          .map((player) => {
            return player.id;
          })
          .forEach((playerCopyID) => {
            playerFirstElevenRoles.push(
              response.data[playerCopyID - 1].position
            );
          });

        const countFirstElevenRoles = playerFirstElevenRoles.reduce(
          (counts, num) => {
            if (num in counts) {
              counts[num]++;
            } else {
              counts[num] = 1;
            }
            return counts;
          },
          {}
        );

        validate(playersCopyFN, response, countRoles, countFirstElevenRoles);
      } catch (e) {
        console.log(e.message);
      }
    };
    if (!isLoading) {
      getRole();
    }
    if (bank_value < 0) {
      alert("Total Value under 0$");
      setPlayersCopy(players);
      setBankValue(bankValueCopy);
      setCostOfTransfers(0);
      setAvailableTransfers(1);
    }

    const playersForAllGWsCopy = [...playersForAllGWs];

    console.log("playersForAllGWsCopy");
    console.log(playersForAllGWsCopy);
    playersForAllGWsCopy[gameweekCounter - 16] = {
      ...playersForAllGWsCopy[gameweekCounter - 16],
      players: playersCopy,
    };

    const nextGWobjects = [];
    for (let i = gameweekCounter + 1; i <= 38; i++) {
      let obj = { gw: i, players: playersCopy };
      nextGWobjects.push(obj);
    }
    console.log("nextGWobjects");
    console.log(nextGWobjects);

    const finishedGWs = playersForAllGWsCopy.slice(0, gameweekCounter - 16 + 1);
    console.log("finishedGWs");
    console.log(finishedGWs);

    const allGWs = finishedGWs.concat(nextGWobjects);
    setPlayersForAllGWs(allGWs);
  };

  const addPlayer = (playerID, playerPosition) => {
    const isPlayerInTeam = playersCopy.find((player) => player.id === playerID);
    if (isPlayerInTeam) {
      alert("Player already in Team, pick another player");
    } else {
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
        newPlayers[blankPlayersArrayKey.at(-1)] = {
          ...players[blankPlayersArrayKey.at(-1)],
          id: playerID,
        };
        setPlayersCopy(newPlayers);
        setBlankPlayersArrayKey(blankPlayersArrayKey.slice(0, -1));
        getData();
        const lastKey = blankPlayersArrayKey.pop();
        const newPlayersToRevert = playersToRevert.filter(
          (playerToRevert) => playerToRevert.playerId !== lastKey
        );
        setPlayersToRevert(newPlayersToRevert);
      }
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
    console.log(revertPlayersArr);
    const newPlayers = [...playersCopy];
    const playerID = revertPlayersArr[id].id;
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
    newPlayers[id] = {
      id: playerID,
      pos: revertPlayersArr[id].pos,
      cpt: revertPlayersArr[id].cpt,
      vcpt: revertPlayersArr[id].vcpt,
    };
    setPlayersCopy(newPlayers);
    setBlankPlayersArrayKey(blankPlayersArrayKey.slice(0, -1));
    const newPlayersToRevert = playersToRevert.filter(
      (playerToRevert) => playerToRevert.playerId !== id
    );
    setPlayersToRevert(newPlayersToRevert);
    undoTransfer();
  };

  const subPlayers = (playerKey1, playerKey2) => {
    const newPlayers = [...playersCopy];
    const tempPlayer = {
      id: newPlayers[playerKey1].id,
      pos: newPlayers[playerKey2].pos,
      cpt: newPlayers[playerKey1].cpt,
      vcpt: newPlayers[playerKey1].vcpt,
    };
    newPlayers[playerKey1] = {
      id: newPlayers[playerKey2].id,
      pos: newPlayers[playerKey1].pos,
      cpt: newPlayers[playerKey2].cpt,
      vcpt: newPlayers[playerKey2].vcpt,
    };
    newPlayers[playerKey2] = tempPlayer;
    setPlayersCopy(newPlayers);
    const revertPlayersArrCopy = [...revertPlayersArr];
    revertPlayersArrCopy[playerKey1] = newPlayers[playerKey1];
    revertPlayersArrCopy[playerKey2] = newPlayers[playerKey2];
    setRevertPlayersArr(revertPlayersArrCopy);
  };

  const makeTransfer = (actualID, initialActualID) => {
    if (actualID === initialActualID) {
      setAvailableTransfers(availableTransfers - 1);
      if (availableTransfers <= 0) {
        setCostOfTransfers(costOfTransfers - 4);
        setAvailableTransfers(0);
      }
    }
  };

  const undoTransfer = () => {
    setAvailableTransfers(availableTransfers + 1);
    if (availableTransfers < 0) {
      setCostOfTransfers(costOfTransfers + 4);
    }
  };

  const handleGameweekBackward = () => {
    if (gameweekCounter > initialGameweek) {
      setGameweekCounter(gameweekCounter - 1);
      playersForPrevGw();
      setAvailableTransfers(availableTransfers - 1);
    }
  };

  const handleGameweekForward = () => {
    if (gameweekCounter < 38) {
      setGameweekCounter(gameweekCounter + 1);
      playersForNextGw();
      setAvailableTransfers(availableTransfers + 1);
    }
  };

  const playersForNextGw = () => {
    const nextGWPlayers = playersForAllGWs.filter(
      (gameweek) => gameweek.gw === gameweekCounter + 1
    );
    console.log("nextGWPlayers");
    console.log(nextGWPlayers);
    getPlayersSortedAndSetGW(nextGWPlayers);
  };

  const playersForPrevGw = () => {
    const prevGWPlayers = playersForAllGWs.filter(
      (gameweek) => gameweek.gw === gameweekCounter - 1
    );
    console.log("prevGWPlayers");
    console.log(prevGWPlayers);
    getPlayersSortedAndSetGW(prevGWPlayers);
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
          <h4>Cost: {costOfTransfers > 0 ? 0 : costOfTransfers}</h4>
          <h4>Available Transfers: {availableTransfers}</h4>
          <div className="gameweek">
            <BsArrowLeftSquareFill
              className="left-arrow-btn"
              onClick={handleGameweekBackward}
            />
            <h3 className="gameweek-text">Gameweek {gameweekCounter}</h3>
            <BsArrowRightSquareFill
              className="right-arrow-btn"
              onClick={handleGameweekForward}
            />
          </div>
          <Team
            className="planner"
            playersCopy={playersCopy}
            removePlayer={removePlayer}
            revertPlayer={revertPlayer}
            playersToRevert={playersToRevert}
            subPlayers={subPlayers}
          />

          {/* <ModalTF /> */}
          <div className="submit-button-wrapper">
            <button
              type="button"
              className="submit-button"
              onClick={() => validationCheck(bankValue, playersCopy)}
            >
              Submit changes
            </button>
          </div>
          <div className="stats-container-tf">
            <PlayerList addPlayer={addPlayer} />
          </div>
        </div>
      )}
    </>
  );

  function getPlayersSortedAndSetGW(GWPlayers) {
    console.log("GWPlayers");
    console.log(GWPlayers);
    console.log("playersForAllGWs");
    console.log(playersForAllGWs);
    const getSorted = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/players`);
        const sortedEleven = GWPlayers[0].players
          .filter((player) => player.pos < 12)
          .sort((a, b) => {
            return (
              response.data[a.id - 1].position -
              response.data[b.id - 1].position
            );
          });
        const playersCopyBench = GWPlayers[0].players.slice(11, 15);
        const newPlayersArray = [...sortedEleven, ...playersCopyBench];
        console.log("newPlayersArray");
        console.log(newPlayersArray);
        setPlayersCopy(newPlayersArray);
      } catch (e) {
        console.log(e.message);
      }
    };
    getSorted();
  }
}

export default TransferPlanner;
