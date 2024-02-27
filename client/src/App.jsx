import { useState } from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(import.meta.env.VITE_API_BASE_URL)
axios.defaults.withCredentials = true;
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
