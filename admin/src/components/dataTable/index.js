import * as React from 'react';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import noImage from '../../assets/placeholder.png';

const columns = [
  { id: 'old_name', label: 'Team Name (API)', minWidth: 100 },
  { id: 'league_name', label: 'League Name', minWidth: 100 },
  {
    id: 'new_name',
    label: 'Team Name (New)',
    minWidth: 170,
  },
  {
    id: 'logo',
    label: 'Logo',
  },
];

function createData(old_name, league_name, new_name, logo) {
  return { old_name, league_name, new_name, logo };
}

export default function DataTableSticky({ data }) {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const teamsData = data.filter(team => team.new_name || (team.logo && team.logo.includes('http'))).map(team =>
      createData(
        team.old_name,
        team.league_name,
        team.new_name,
        team.logo && team.logo.includes('http') && <img src={team.logo} width={60} height={60} />
      )
    );

    setRows(teamsData);
  }, [data]);

  const handleChange = e => {
    const val = e.target.value.toLowerCase();
    const teamRows = data.filter(team => team.new_name || (team.logo && team.logo.includes('http')))
      .filter(row => row.old_name.toLowerCase().includes(val) || (row.new_name && row.new_name.toLowerCase().includes(val)))
      .map(team =>
        createData(
          team.old_name,
          team.league_name,
          team.new_name,
          team.logo && team.logo.includes('http') && <img src={team.logo} width={60} height={60} />
        )
      );
    setPage(0);
    setRows(teamRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'visible', padding: '0 2%' }}>
      <h1 style={{ textAlign: 'center' }}> View All Mapped Teams</h1>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <TextField style={{ float: 'right' }} onChange={handleChange} placeholder='Search by TeamName' size='small' />
      </Box>
      <TableContainer sx={{ maxHeight: '80%' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.old_name} style={{ height: "99px" }}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
