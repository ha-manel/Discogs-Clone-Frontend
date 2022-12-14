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
  const [picture, setPicture] = useState(null);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = new FormData();
    record.append('title', title);
    record.append('artist', artist);
    record.append('year', year);
    record.append('genre', genre);
    record.append('image_data', picture);
    await axios({
      method: 'post',
      url: 'https://discogs-clone.onrender.com/api/v1/record',
      data: record,
    }).then((response) => {
      if (response.data.status === 'created') {
        setErrors([]);
        document.querySelector('#success').classList.remove('invisible');
        const newRecords = [...result, response.data.record];
        setResult(newRecords);
        setRecords(newRecords);
        setTitle('');
        setArtist('');
        setYear('');
        setGenre('');
      }
      return true;
    }).catch((response) => {
      setErrors(response.response.data.errors);
      document.querySelector('#success').classList.add('invisible');
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
        <input type="file" accept="image/*" multiple={false} className="my-2 py-2 px-2 border border-gray-400 rounded" onChange={(e) => setPicture(e.target.files[0])} />
        <input type="submit" value="Create" className="bg-gray-500 w-fit text-white py-2 px-3 rounded cursor-pointer mt-4" />
      </form>
      <p id="success" className="invisible p-2 bg-green-600 text-white text-lg rounded">Record was added successfully</p>
      {errors.map((err) => (
        <p key={err} className="error text-red-600 text-lg">
          {err}
        </p>
      ))}
    </div>
  );
};

export default CreateForm;
