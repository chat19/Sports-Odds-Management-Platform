import React, { useState, useEffect } from 'react';
import EditableTable from '../components/editableTable/leagues';
import Spinner from '../components/Spinner';
import { api } from '../utils/api_handler';

export default function Index() {
  const [leagues, setLeagues] = useState([]);
  useEffect(() => {
    api.getLeagues('set').then(res => {
        setLeagues(res.data);
    });
  }, []);
  return leagues.length > 0 ? <EditableTable data={leagues} /> : <Spinner />;
}
