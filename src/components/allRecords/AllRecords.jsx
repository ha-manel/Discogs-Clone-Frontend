import axios from 'axios';
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RecordsContext from '../../context/recordsContext';

const AllRecords = () => {
  const { APIresult, displayRecords } = useContext(RecordsContext);
  const [result, setResult] = APIresult;
  const [records, setRecords] = displayRecords;

  const [selected, setSelected] = useState('latest');

  const deleteRecord = (id) => {
    axios.delete(`http://localhost:3000/api/v1/record/${id}`).then((response) => {
      if (response.data.status === 'ok') {
        const newRecords = result.filter((record) => record.id !== id);
        setResult(newRecords);
        setRecords(newRecords);
      }
    });
  };

  if (records.length > 0) {
    if (selected === 'latest') {
      setRecords(records.sort((a, b) => b.year - a.year));
    } else if (selected === 'a-z') {
      setRecords(records.sort((a, b) => a.title.localeCompare(b.title)));
    } else {
      setRecords(records.sort((a, b) => b.title.localeCompare(a.title)));
    }
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-2xl font-semibold">Find Music on Discogs</h2>
      <div className="w-full flex justify-between">
        <NavLink to="/create" className="bg-gray-500 text-white font-semibold px-4 py-2 rounded">Add a new record</NavLink>
        <div>
          <label htmlFor="sort">
            Sort by:
            <select id="sort" className="ml-2 border border-black p-1 rounded" value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="latest">Latest Additions</option>
              <option value="a-z">Title A-Z</option>
              <option value="z-a">Title Z-A</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-6 mt-10 gap-4">
        {records.map((item) => (
          <div key={item.id} className="relative group">
            <div className="absolute hidden items-center justify-center w-full h-full bg-gray-700/80 group-hover:flex">
              <button onClick={() => deleteRecord(item.id)} type="button" className="bg-white p-2 rounded">Delete Record</button>
            </div>
            <img className="w-full h-44 object-cover" src={item.image_data} alt="album cover" />
            <div className="ml-4">
              <p>{item.title}</p>
              <p>{item.artist}</p>
              <p>{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecords;
