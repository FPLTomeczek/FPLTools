import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/TF.css";
import PlayerList from "../components/PlayerList";
import Team from "../components/Team";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import Error from "../components/Error";

function TransferPlanner({ team_id, initialGameweek }) {
  const [teamValue, setTeamValue] = useState(0);
  const [bankValue, setBankValue] = useState(0);
  const [bankValueCopy, setBankValueCopy] = useState(0);
  const [blankPlayersArrayKey, setBlankPlayersArrayKey] = useState([]);
  const [costOfThisGw, setCostOfThisGW] = useState(0);
  const [costOfTransfers, setCostOfTransfers] = useState(0);
  const [playersToRevert, setPlayersToRevert] = useState([]);
  const [gameweekCounter, setGameweekCounter] = useState(initialGameweek);

  /*error */
  const [errorForSubmit, setErrorForSubmit] = useState(null);
  const [remainingTime, setRemainingTime] = useState(10000);
  const [errorMessage, setErrorMessage] = useState("");

  const [players, setPlayers] = useState(
    Array(15).fill({
      id: null,
      pos: null,
      cpt: false,
      vcpt: false,
    })
  );
  const [availableTransfersArr, setAvailableTransfersArr] = useState(
    Array(38 - initialGameweek + 1).fill(1)
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

  useEffect(() => {
    if (errorForSubmit) {
      const timeoutId = setTimeout(() => {
        setErrorForSubmit(null);
      }, remainingTime);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [errorForSubmit, remainingTime]);

  useEffect(() => {
    if (errorForSubmit) {
      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1000);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [errorForSubmit]);

  function handleError() {
    setErrorForSubmit(true);
    setRemainingTime(10000);
  }

  const checkPlayerRoles = (dict) => {
    if (dict[1] !== 2 || dict[2] !== 5 || dict[3] !== 5 || dict[4] !== 3) {
      setBankValue(bankValueCopy);
      return true;
    }
    return false;
  };

  const checkBankValue = (bank_value) => {
    if (bank_value < 0) {
      setBankValue(bankValueCopy);
      return true;
    }
    return false;
  };

  const validate = (
    playersCopy,
    response,
    countRoles,
    countFirstElevenRoles,
    bankValue
  ) => {
    const allPlayersRoles = checkPlayerRoles(countRoles);
    const firstElevenPlayersRoles = firstElevenFormationValidation(
      countFirstElevenRoles
    );
    const bank_value = checkBankValue(bankValue);

    if (allPlayersRoles) {
      handleError();
      setErrorMessage(
        "Wrong Positions of Player!\nRequired Players Roles:\nGoalkeepers: 1\nDefenders: 5\nMidfielders: 5\nForwards: 3"
      );
    }
    if (firstElevenPlayersRoles) {
      handleError();
      setErrorMessage(
        "Wrong Formation of First Eleven!\nRequired First Eleven Roles:\nGoalkeepers: 1\nDefenders: 3-5\nMidfielders: 3-5\nForwards: 1-3"
      );
    }
    if (bank_value) {
      handleError();
      setErrorMessage("Total Bank Value under 0$");
    }

    if (allPlayersRoles || firstElevenPlayersRoles || bank_value) {
      playersCopy = playersForAllGWs[gameweekCounter - 16].players;
      const availableTransfersArrCopy = [...availableTransfersArr];
      availableTransfersArrCopy[gameweekCounter - initialGameweek] = 1;
      setAvailableTransfersArr(availableTransfersArrCopy);
      setCostOfTransfers(costOfTransfers - costOfThisGw);
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

    const playersForAllGWsCopy = [...playersForAllGWs];
    playersForAllGWsCopy[gameweekCounter - 16] = {
      ...playersForAllGWsCopy[gameweekCounter - 16],
      players: playersCopy,
    };

    const nextGWobjects = [];
    for (let i = gameweekCounter + 1; i <= 38; i++) {
      let obj = { gw: i, players: playersCopy };
      nextGWobjects.push(obj);
    }

    const finishedGWs = playersForAllGWsCopy.slice(0, gameweekCounter - 16 + 1);

    const allGWs = finishedGWs.concat(nextGWobjects);
    setPlayersForAllGWs(allGWs);
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
      setBankValue(bankValueCopy);
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
        validate(
          playersCopyFN,
          response,
          countRoles,
          countFirstElevenRoles,
          bank_value
        );
      } catch (e) {
        console.log(e.message);
      }
    };
    if (!isLoading) {
      getRole();
    }
  };

  const addPlayer = (playerID, playerPosition) => {
    const isPlayerInTeam = playersCopy.find((player) => player.id === playerID);
    if (!isPlayerInTeam) {
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
      const newPlayersCopy =
        playersForAllGWs[gameweekCounter - initialGameweek].players;
      newPlayers[playerId] = { id: null, cpt: false, vcpt: false };
      setPlayersCopy(newPlayers);
      setBlankPlayersArrayKey([...blankPlayersArrayKey, playerId]);
      setBankValue(bankValue + price);
      setPlayersToRevert([...playersToRevert, { playerId, actualID }]);
      makeTransfer(actualID, newPlayersCopy[playerId].id);
    }
  };
  const makeTransfer = (actualID, initialActualID) => {
    if (actualID === initialActualID) {
      const availableTransfersArrCopy = [...availableTransfersArr];
      availableTransfersArrCopy[gameweekCounter - initialGameweek] += -1;
      setAvailableTransfersArr(availableTransfersArrCopy);
      if (availableTransfersArr[gameweekCounter - initialGameweek] <= 0) {
        setCostOfTransfers(costOfTransfers - 4);
        setCostOfThisGW(costOfThisGw - 4);
      }
    }
  };

  const revertPlayer = (id) => {
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

  const undoTransfer = () => {
    const availableTransfersArrCopy = [...availableTransfersArr];
    availableTransfersArrCopy[gameweekCounter - initialGameweek] += 1;
    setAvailableTransfersArr(availableTransfersArrCopy);
    if (availableTransfersArr[gameweekCounter - initialGameweek] < 0) {
      setCostOfTransfers(costOfTransfers + 4);
      setCostOfThisGW(costOfThisGw + 4);
    }
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

  const handleGameweekBackward = () => {
    if (gameweekCounter > initialGameweek) {
      setGameweekCounter(gameweekCounter - 1);
      playersForPrevGw();
    }
  };

  const handleGameweekForward = () => {
    if (gameweekCounter < 38) {
      setGameweekCounter(gameweekCounter + 1);
      playersForNextGw();
    }
  };

  const playersForNextGw = () => {
    const nextGWPlayers = playersForAllGWs.filter(
      (gameweek) => gameweek.gw === gameweekCounter + 1
    );
    getPlayersSortedAndSetGW(nextGWPlayers);
    setCostOfThisGW(0);
  };

  const playersForPrevGw = () => {
    const prevGWPlayers = playersForAllGWs.filter(
      (gameweek) => gameweek.gw === gameweekCounter - 1
    );
    getPlayersSortedAndSetGW(prevGWPlayers);
    setCostOfThisGW(0);
  };

  return (
    <>
      {isLoading || (
        <div className="main">
          <div className="bank-value-id"></div>
          <header className="tf-header">
            <h3>Your Team ID: {team_id}</h3>
            <div>
              <h3>Bank Value: {bankValue.toFixed(1)} $</h3>
            </div>
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
            <h3>
              Cost:{" "}
              <span className={`cost ${costOfTransfers < 0 && "cost-red"}`}>
                {costOfTransfers > 0 ? 0 : costOfTransfers}
              </span>
            </h3>
            <h3>
              Available Transfers:{" "}
              <span
                className={`transfer ${
                  availableTransfersArr[gameweekCounter - initialGameweek] <
                    0 && "transfer-red"
                }`}
              >
                {availableTransfersArr[gameweekCounter - initialGameweek]}
              </span>
            </h3>
          </header>
          {errorForSubmit && <Error message={errorMessage}></Error>}
          <Team
            playersCopy={playersCopy}
            removePlayer={removePlayer}
            revertPlayer={revertPlayer}
            playersToRevert={playersToRevert}
            subPlayers={subPlayers}
            gameweekCounter={gameweekCounter}
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
        setPlayersCopy(newPlayersArray);
      } catch (e) {
        console.log(e.message);
      }
    };
    getSorted();
  }
}

export default TransferPlanner;
