import React, { useState, useEffect } from 'react';
import EditableTable from '../components/editableTable';
import Spinner from '../components/Spinner';
import { api } from '../utils/api_handler';

export default function Index() {
  const [teams, setTeams] = useState([]);
  const [view, setView] = useState('all');
  useEffect(() => {
    api.getTeams('set', view).then(res => {
      setTeams(res.data);
    });
  }, [view]);
  return teams.length > 0 ? <EditableTable data={teams} setView={setView} /> : <Spinner />;
}
