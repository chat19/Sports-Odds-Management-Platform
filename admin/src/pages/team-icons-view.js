import React, { useState, useEffect } from 'react';
import DataTable from '../components/dataTable';
import Spinner from '../components/Spinner';
import { api } from '../utils/api_handler';

export default function Index() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    api.getTeams('view').then(res => {
      setTeams(res.data);
    });
  }, []);

  return teams.length > 0 ? <DataTable data={teams} /> : <Spinner />;
}
