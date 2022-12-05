import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

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
  const [filterStr, setFilterStr] = useState("");

  const columns = [
    { label: "Name", accessor: "web_name" },
    { label: "Goals", accessor: "goals_scored" },
    { label: "Assists", accessor: "assists" },
    { label: "Points", accessor: "total_points" },
    { label: "Team", accessor: "team_code" },
  ];

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
  };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <div className="PlayerList">
      <input
        type="text"
        value={filterStr}
        onChange={(e) => setFilterStr(e.target.value)}
      ></input>
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
                    <div className="th-container">
                      <p>{label}</p>
                      {order === "asc" && sortField === accessor.toString() ? (
                        <AiOutlineArrowUp className="arrow" />
                      ) : (
                        <AiOutlineArrowDown className="arrow" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          {teamCode ? (
            <tbody>
              {data &&
                !filterStr &&
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
              {data &&
                filterStr &&
                data
                  .filter((player) => {
                    return (
                      player.team_code === teamCode &&
                      player.web_name
                        .toLowerCase()
                        .includes(filterStr.toLowerCase())
                    );
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
                !filterStr &&
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
              {data &&
                filterStr &&
                data
                  .filter((player) =>
                    player.web_name
                      .toLowerCase()
                      .includes(filterStr.toLowerCase())
                  )
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
          )}
        </table>
      </div>
    </div>
  );
}

export default PlayerList;
