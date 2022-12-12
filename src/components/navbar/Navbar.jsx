import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="w-full py-4 px-24 flex bg-gray-800 items-center">
    <div className="mr-36 text-3xl text-white font-bold">
      <NavLink to="/">
        Discogs
      </NavLink>
    </div>
    <form>
      <input className="w-80 py-2 px-4 rounded" type="text" placeholder="Search artists, albums and more..." />
    </form>
  </nav>
);

export default Navbar;
