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
import Button from '@mui/material/Button';
import { api } from '../../utils/api_handler';
import CircularProgress from '@mui/material/CircularProgress';
import Toast from '../toast';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
const columns = [
  { id: 'name', label: 'Team Name (API)', minWidth: 100 },
  { id: 'league', label: 'League Name', minWidth: 100 },
  {
    id: 'newName',
    label: 'Team Name (New)',
    minWidth: 170,
  },
  {
    id: 'icon',
    label: 'Logo',
  },
];

function createData(name, league, newName, icon) {
  return { name, league, newName, icon };
}

export default function StickyHeadTable({ setView, data }) {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [changes, setChanges] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [cur, setCurrent] = React.useState('All teams');

  useEffect(() => {
    const teamsData = data.map(team => {
      const name = team.old_name;
      const league = team.league_name;

      return createData(
        name,
        league,
        <TextField
          label='Set Team Name'
          variant='outlined'
          size='small'
          defaultValue={team.db.length > 0 ? team.db[0] : ''}
          onBlur={e => handleBlur(e.target.value, name, 'new_name', league)}
        />,
        <TextField
          label='Set Icon Url'
          variant='outlined'
          size='small'
          onBlur={e => handleBlur(e.target.value, name, 'logo', league)}
          defaultValue={team.db.length > 0 ? team.db[1] : ''}
        />
      );
    });

    setRows(teamsData);
  }, [data]);

  const handleSave = async () => {
    setLoading(true);

    const dataToSave = Object.values(changes);

    const saveTeams = await api.saveTeams(dataToSave);

    if (saveTeams.data.success) {
      setLoading(false);
      alert('Saved Successfully!');
    }
  };

  const handleSwitch = () => {
    if (cur === 'Currently playing teams') {
      setCurrent('All teams');
      setView('all');
    } else {
      setCurrent('Currently playing teams');
      setView('current');
    }
  };

  const handleChange = e => {
    const val = e.target.value.toLowerCase();

    const teamRows = data
      .filter(row => row.old_name.toLowerCase().includes(val))
      .map(team =>
        createData(
          team.old_name,
          team.league_name,
          <TextField
            label='Set Team Name'
            variant='outlined'
            size='small'
            defaultValue={team.db.length > 0 ? team.db[0] : ''}
            onBlur={e => handleBlur(e.target.value, team.old_name, 'new_name', team.league_name)}
          />,
          <TextField
            label='Set Icon Url'
            variant='outlined'
            size='small'
            onBlur={e => handleBlur(e.target.value, team.old_name, 'logo', team.league_name)}
            defaultValue={team.db.length > 0 ? team.db[1] : ''}
          />
        )
      );
    setPage(0);
    setRows(teamRows);
  };

  const handleBlur = (val, name, type, league) => {
    setChanges(changes => ({ ...changes, ...{ [name]: { ...changes[name], ...{ [type]: val, old_name: name, league_name: league } } } }));
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
      <h1 style={{ textAlign: 'center' }}> Teams Mapping Bulk Editor</h1>

      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'relative' }}>
        <Button style={{ float: 'right' }} variant='contained' disabled={loading} onClick={handleSave}>
          Save
        </Button>
        <TextField style={{ float: 'right' }} onChange={handleChange} placeholder='Search by TeamName' size='small' />
        <FormControlLabel control={<Switch onChange={handleSwitch} />} label={cur} />
        {loading && (
          <CircularProgress
            size={20}
            sx={{
              float: 'right',
              position: 'absolute',
              top: '10px',
              right: '20px',
            }}
          />
        )}
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
                <TableRow hover role='checkbox' tabIndex={-1} key={row.name}>
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
