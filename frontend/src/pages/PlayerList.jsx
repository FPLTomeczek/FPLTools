import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './../css/PlayerList.css'

function PlayerList() {

// basic fetch

// fetch('https://api.github.com/users/eunit99/repos')
//   .then(response => response.json())
//   .then(data => console.log(data));
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

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
  return (
    <div className='PlayerList'>
        {loading && <p>Loading...</p>}
        {!loading && <p>Fetched data</p>}
        <div className='PlayerListTable'>
      <table>
        <tr>
          <th>Name</th>
          <th>Goals</th>
          <th>Assists</th>
          <th>Points</th>
          <th>Team</th>
        </tr>
        {data.map((val, key) =>{
          return(
            <tr key={key}>
              <td>{val.web_name}</td>
              <td>{val.goals_scored}</td>
              <td>{val.assists}</td>
              <td>{val.total_points}</td>
              <td>{val.team_code}</td>
            </tr>
          )
        })}
      </table>
      </div>
    </div>
    
  )
}

export default PlayerList