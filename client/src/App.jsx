import { useState } from 'react';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Regitser from './components/register/Register';

function App() {
  return (
    <div className='p-4'>
      <Header/>
      {/* <Router> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Regitser />} />
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
