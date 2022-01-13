import React, { useState, useEffect } from 'react';
import EditableTable from '../components/editableTable';
import Spinner from '../components/Spinner';
import { api } from '../utils/api_handler';

export default function Index() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    api.getTeams('set').then(res => {
      setTeams(res.data);
    });
  }, []);
  return teams.length > 0 ? <EditableTable data={teams} /> : <Spinner />;
}
