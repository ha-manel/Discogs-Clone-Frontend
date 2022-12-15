import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import RecordsContext from '../../context/recordsContext';

const Navbar = () => {
  const { APIresult, displayRecords } = useContext(RecordsContext);
  const [result] = APIresult;
  const [, setRecords] = displayRecords;

  const search = (query) => {
    const searchResult = result.filter((record) => {
      if ((query === '') || (record.title.toLowerCase().includes(query.toLowerCase()))
        || (record.artist.toLowerCase().includes(query.toLowerCase()))) {
        return record;
      }
      return null;
    });

    setRecords(searchResult);
  };

  return (
    <nav className="w-full py-4 px-24 flex bg-gray-800 items-center">
      <div className="mr-36 text-3xl text-white font-bold">
        <NavLink to="/">
          Discogs
        </NavLink>
      </div>
      <form>
        <input className="w-80 py-2 px-4 rounded" type="text" placeholder="Search artists or albums" onChange={(e) => search(e.target.value)} />
      </form>
    </nav>
  );
};

export default Navbar;
