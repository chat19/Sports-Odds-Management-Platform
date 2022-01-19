import React, { useState, useEffect } from 'react';
import DataTable from '../components/dataTable/leagues';
import Spinner from '../components/Spinner';
import { api } from '../utils/api_handler';

export default function Index() {
  const [leagues, setLeagues] = useState([]);
  useEffect(() => {
    api.getLeagues('view').then(res => {
      setLeagues(res.data);
    });
  }, []);
  return leagues.length > 0 ? <DataTable data={leagues} /> : <Spinner />;
}
