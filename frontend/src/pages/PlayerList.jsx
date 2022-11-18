import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ClubLogos from '../components/ClubLogos'
import './../css/PlayerList.css'

function PlayerList() {

// basic fetch

// fetch('https://api.github.com/users/eunit99/repos')
//   .then(response => response.json())
//   .then(data => console.log(data));
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const [sortField, setSortField] = useState("")
const [order, setOrder] = useState("asc")

const columns = [
  { label: "Name", accessor: "web_name" },
  { label: "Goals", accessor: "goals_scored" },
  { label: "Assists", accessor: "assists" },
  { label: "Points", accessor: "total_points" },
  { label: "Team", accessor: "team_code" },
 ];

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
        const response = await axios.get(
          `http://localhost:8000/api/players`
        );
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
    console.log(sortField, sortOrder)
   };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
   };

  return (
    <div className='PlayerList'>
      <ClubLogos/>
        {loading && <p>Loading...</p>}
        {!loading && <p>Fetched data</p>}
        <div className='PlayerListTable'>
      <table>
        <thead>
        <tr>
          {columns.map(({label, accessor}) =>{
            return(
              <th key={accessor} onClick={() => handleSortingChange(accessor)}>{label}</th>
            )
          })}
        </tr>
        </thead>
        <tbody>
        {data && data.map((val) =>{
          return(
            <tr key={val.id}>
              {columns.map(({accessor}) =>{
                //if (accessor === 'team_code' && val[accessor] === 8)
                const tData = val[accessor] ? val[accessor] : '0';
                return <td key={accessor}>{tData}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      </div>
    </div>

  )
}

export default PlayerList