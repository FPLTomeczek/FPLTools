import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/PlayerList.css";

function PlayerList({ teamCode }) {
  // basic fetch

  // fetch('https://api.github.com/users/eunit99/repos')
  //   .then(response => response.json())
  //   .then(data => console.log(data));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const columns = [
    { label: "Name", accessor: "web_name" },
    { label: "Goals", accessor: "goals_scored" },
    { label: "Assists", accessor: "assists" },
    { label: "Points", accessor: "total_points" },
    { label: "Team", accessor: "team_code" },
  ];

  // const printTeam = (val) => {
  //   switch (val) {
  //     case 1:
  //       return "Man United";
  //     case 3:
  //       return "Arsenal";
  //     case 7:
  //       return "Aston Villa";
  //     case 8:
  //       return "Chelsea";
  //     case 91:
  //       return "Bournemouth";
  //     case 94:
  //       return "Brentford";
  //     case 36:
  //       return "Brighton";
  //     case 31:
  //       return "Crystal Palace";
  //     case 11:
  //       return "Everton";
  //     case 54:
  //       return "Fulham";
  //     case 2:
  //       return "Leeds";
  //     case 13:
  //       return "Leicester";
  //     case 14:
  //       return "Liverpool";
  //     case 43:
  //       return "Man City";
  //     case 4:
  //       return "Newcastle";
  //     case 17:
  //       return "Nottingham Forest";
  //     case 20:
  //       return "Southampton";
  //     case 6:
  //       return "Spurs";
  //     case 21:
  //       return "West Ham";
  //     case 39:
  //       return "Wolverhampton";
  //     default:
  //       console.log("default case");
  //   }
  // };
  // useEffect(() => {
  //     fetch(`https://api.github.com/users/eunit99/repos`)
  //         .then(response => response.json())
  //         .then((usefulData) => {
  //             console.log(usefulData);
  //             setLoading(false);
  //             setData(usefulData)
  //         })
  //         .catch((e) => {
  //             console.error('An error occurred: ' + e)
  //         })
  // },[])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/players`);
        setData(response.data);
        setError(null);
        console.log(data);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [loading]);

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...data].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setData(sorted);
    }
    console.log(sortField, sortOrder);
  };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  //  const filterData = data.filter(player => {
  //   return (player.team_code === 8)
  //  })

  return (
    <div className="PlayerList">
      <div className="PlayerListTable">
        <table>
          <thead>
            <tr>
              {columns.map(({ label, accessor }) => {
                return (
                  <th
                    key={accessor}
                    onClick={() => handleSortingChange(accessor)}
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          {teamCode ? (
            <tbody>
              {data &&
                data
                  .filter((player) => {
                    return player.team_code === teamCode;
                  })
                  .map((val) => {
                    return (
                      <tr key={val.id}>
                        {columns.map(({ accessor }) => {
                          const tData = val[accessor] ? val[accessor] : "0";
                          return <td key={accessor}>{tData}</td>;
                        })}
                      </tr>
                    );
                  })}
            </tbody>
          ) : (
            <tbody>
              {data &&
                data.map((val) => {
                  return (
                    <tr key={val.id}>
                      {columns.map(({ accessor }) => {
                        const tData = val[accessor] ? val[accessor] : "0";
                        return <td key={accessor}>{tData}</td>;
                      })}
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default PlayerList;
