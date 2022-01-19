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
const columns = [
    { id: 'name', label: 'League Name (API)', minWidth: 250 },

    {
        id: 'newName',
        label: 'League Name (New)',
        minWidth: 300,
    },

];

function createData(name, newName) {
    return { name, newName };
}

export default function StickyHeadTable({ data }) {
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [changes, setChanges] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        const teamsData = data.map(team => {
            const name = team.old_name;
            const db = team.db;

            return createData(
                name,
                <TextField
                    label='Set League Name'
                    variant='outlined'
                    size='small'
                    defaultValue={db ? db : ''}
                    onBlur={e => handleBlur(e.target.value, name)}
                />,
            );
        });

        setRows(teamsData);
    }, [data]);

    const handleSave = async () => {
        setLoading(true);
        console.log(changes)
        const dataToSave = Object.values(changes);

        const saveLeagues = await api.saveLeagues(dataToSave);

        if (saveLeagues.data.success) {
            setLoading(false);
            alert('Saved Successfully!');
        }
    };



    const handleChange = e => {
        const val = e.target.value.toLowerCase();

        const leagueRows = data
            .filter(row => row.old_name.toLowerCase().includes(val))
            .map(league =>
                createData(
                    league.old_name,
                    <TextField
                        label='Set League Name'
                        variant='outlined'
                        size='small'
                        defaultValue={league.db ? league.db : ''}
                        onBlur={e => handleBlur(e.target.value, league.old_name)}
                    />,

                )
            );
        setRows(leagueRows);
    };

    const handleBlur = (val, name) => {
        setChanges(changes => ({ ...changes, ...{ [name]: { ...changes[name], ...{ old_name: name, new_name: val } } } }));
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
            <h1 style={{ textAlign: 'center' }}> Leagues Mapping Bulk Editor</h1>

            <Box sx={{ '& > :not(style)': { m: 1 }, position: 'relative' }}>
                <Button style={{ float: 'right' }} variant='contained' disabled={loading} onClick={handleSave}>
                    Save
                </Button>
                <TextField style={{ float: 'right' }} onChange={handleChange} placeholder='Search by leagueName' size='small' />

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
