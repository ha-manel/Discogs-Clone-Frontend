import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Layout from './config/layout/Layout';
import RecordsContext from './context/recordsContext';
import StatsContext from './context/statsContext';

const App = () => {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({});
  const [result, setResult] = useState([]);

  const fetchRecords = async () => {
    await axios.get('http://localhost:3000/api/v1/records').then((response) => {
      setResult(response.data.records);
      setRecords(response.data.records);
      setStats(response.data.stats);
    });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <RecordsContext.Provider
      value={{ APIresult: [result, setResult], displayRecords: [records, setRecords] }}
    >
      <StatsContext.Provider value={[stats, setStats]}>
        <Layout />
      </StatsContext.Provider>
    </RecordsContext.Provider>
  );
};
export default App;
