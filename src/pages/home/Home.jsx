import React from 'react';
import AllRecords from '../../components/allRecords/AllRecords';
import FilterPanel from '../../components/filterPanel/FilterPanel';

const Home = () => (
  <section className="w-full flex mt-10 px-10">
    <FilterPanel />
    <AllRecords />
  </section>
);

export default Home;
