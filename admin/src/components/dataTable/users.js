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
import IconButton from '@mui/material/IconButton';
import noImage from '../../assets/placeholder.png';

import { AiFillDelete } from 'react-icons/ai';
import { api } from '../../utils/api_handler';

const columns = [
  { id: 'email', label: 'Email Address', minWidth: 100 },
  { id: 'fullName', label: 'FullName', minWidth: 100 },
  { id: 'site', label: 'Site', minWidth: 100 },
  { id: 'isAdmin', label: 'Role', minWidth: 100 },
  { id: 'action', label: 'Action' },
];

function createData(email, fullName, site, isAdmin, action) {
  return { email, fullName, site, isAdmin, action };
}

export default function DataTableSticky({ data }) {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const users = data.map(user =>
      createData(
        user.email,
        user.fullName,
        user.site,
        user.isAdmin ? 'Admin' : 'Non-Admin',
        <IconButton onClick={() => handleClick(user.email)}>
          <AiFillDelete />
        </IconButton>
      )
    );

    setRows(users);
  }, [data]);

  const handleChange = e => {
    const val = e.target.value.toLowerCase();

    const userRows = data
      .filter(row => row.email.toLowerCase().includes(val))
      .map(user =>
        createData(
          user.email,
          user.fullName,
          user.site,
          <IconButton onClick={() => handleClick(user.email)}>
            <AiFillDelete />
          </IconButton>
        )
      );
    setRows(userRows);
  };

  const handleClick = async email => {
    console.log('email', email);
    const user = await api.deleteAccount({ email: email });
    if (user.data.success) alert(`Deleted User Account with email address ${user.data.user.email} `);
    setRows(rows => rows.filter(row => row.email !== email));
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
      <h1 style={{ textAlign: 'center' }}> All Users</h1>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <TextField style={{ float: 'right' }} onChange={handleChange} placeholder='Search by Email' size='small' />
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
                <TableRow hover role='checkbox' tabIndex={-1} key={row.email}>
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
