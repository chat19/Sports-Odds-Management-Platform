import React, { useState, useEffect } from 'react';
import DataTable from '../components/dataTable/users';
import Spinner from '../components/Spinner';
import { api } from '../utils/api_handler';

export default function Index() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.getUsers().then(res => {
      console.log('data', res.data);
      setUsers(res.data);
    });
  }, []);

  return users.length > 0 ? <DataTable data={users} /> : <Spinner />;
}
