import axios from 'axios';
import React, { useContext, useState } from 'react';
import RecordsContext from '../../context/recordsContext';

const CreateForm = () => {
  const { APIresult, displayRecords } = useContext(RecordsContext);
  const [result, setResult] = APIresult;
  const [, setRecords] = displayRecords;

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [picture, setPicture] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const record = {
      title,
      artist,
      year,
      genre,
      image_data: picture,
    };
    axios.post('http://localhost:3000/api/v1/record', { record }).then((response) => {
      if (response.data.status === 'created') {
        const newRecords = [...result, response.data.record];
        setResult(newRecords);
        setRecords(newRecords);
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h2 className="font-semibold text-2xl mb-10">Add new record</h2>

      <form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" className="my-2 py-2 px-2 border border-gray-400 rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Artist" className="my-2 py-2 px-2 border border-gray-400 rounded" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <input type="number" placeholder="Year" className="my-2 py-2 px-2 border border-gray-400 rounded" value={year} onChange={(e) => setYear(e.target.value)} />
        <input type="text" placeholder="Genre" className="my-2 py-2 px-2 border border-gray-400 rounded" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <input type="text" placeholder="Album cover" className="my-2 py-2 px-2 border border-gray-400 rounded" value={picture} onChange={(e) => setPicture(e.target.value)} />
        <input type="submit" value="Create" className="bg-gray-500 w-fit text-white py-2 px-3 rounded cursor-pointer mt-4" />
      </form>
    </div>
  );
};

export default CreateForm;
