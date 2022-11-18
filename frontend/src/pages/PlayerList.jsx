import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';

function PlayerList() {

// basic fetch

// fetch('https://api.github.com/users/eunit99/repos')
//   .then(response => response.json())
//   .then(data => console.log(data));
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const [order, setOrder] = useState('asc')
const header = ['Name', 'Goals', 'Assists', 'Points', 'Team']

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

  // const handleSort = (event) =>{
  //   if(order === 'asc'){
  //     setOrder('desc')
  //   }
  //   else if(order === 'desc'){
  //     setOrder('asc')
  //   }
  // }

  return (
    <div className='PlayerList'>
        {loading && <p>Loading...</p>}
        {!loading && <p>Fetched data</p>}
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right" sortDirection={order}>Goals
                  </TableCell>
                  <TableCell align="right">Assists</TableCell>
                  <TableCell align="right">Points</TableCell>
                  <TableCell align="right">Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.map((player, index) => (
                  <TableRow
                    key={index}
                  >
                    <TableCell>{player.web_name}</TableCell>
                    <TableCell align="right">{player.goals_scored}</TableCell>
                    <TableCell align="right">{player.assists}</TableCell>
                    <TableCell align="right">{player.total_points}</TableCell>
                    <TableCell align="right">{player.team_code}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    </div>
  )
}

export default PlayerList