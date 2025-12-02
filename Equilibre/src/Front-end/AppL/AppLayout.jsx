import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../TelaInicial/components/Header';
import Footer from '../TelaInicial/components/Footer';
import '../../App.css';

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;