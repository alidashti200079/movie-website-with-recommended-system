import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './home';
import SignUp from './signUp';  
import Login from './login';
import Movies from './movies';
import Tvshows from './tvshows';
import Help from './help';
import Actors from './actors';
import UserPage from './userPage';
import AdminPage from './adminPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/tvshows" element={<Tvshows/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/actors" element={<Actors/>}/>
          <Route path="/login/user" element={<UserPage/>}/>
          <Route path="/login/admin" element={<AdminPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
