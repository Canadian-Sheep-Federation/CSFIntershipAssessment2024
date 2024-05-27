import { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

function Responses({ updateRows } : 
  {updateRows: boolean}) {
  const [rows, setRows] = useState<{name: string,
                                    uselessFact: string,
                                    postedDate: Date,
                                    rating: number,
                                    _id: string
                                    }[]>([]);                        
  useEffect(() => {
    updateTable();
  }, []);

  function updateTable() {
    fetch('http://localhost:4000/').then(resp => resp.json()).then(val => {
      setRows(val);
    }).catch(() => {
      alert("There was an issue with fetching the user generated useless facts.");
    });  

  }
  useEffect(() => {
    updateTable();
  }, [updateRows]);

  return <>
  <br/><br/>
  <br/><br/>
  {/* This is mostly copied code from material ui, it just creates the table.*/}
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Useless Fact</TableCell>
          <TableCell align="right">rating</TableCell>
          <TableCell align="right">Poster's Name</TableCell>
          <TableCell align="right">Posted Date</TableCell>
          <TableCell align="right">ID</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.uselessFact}
            </TableCell>
            <TableCell align="right">{row.rating * 100 + "%"}</TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{new Date(row.postedDate).toString()}</TableCell>
            <TableCell align="right">{row._id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  </>
}

export default Responses