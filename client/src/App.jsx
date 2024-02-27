import { useState } from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
function App( ) {
  
  
  return (  
    <div className='p-4'>
      <Header/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
