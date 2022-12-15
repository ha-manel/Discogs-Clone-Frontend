import React from 'react';
import { useRoutes } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import routes from '../routes';

const Layout = () => {
  const route = useRoutes(routes);
  return (
    <div className="min-h-screen relative pb-24">
      <header>
        <Navbar />
      </header>
      <main>
        {route}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
