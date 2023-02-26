import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Project from './pages/Project';
import EditProfile from './pages/EditProfile';
import ResetPassword from './pages/ResetPassword';
import Pricing from './pages/pricing'

{/* <Route exact path='/' component={Home}/> */}
function App() {

  const isLoggedIn=window.localStorage.getItem("isLoggedIn");

  return (
  <div className="wrapper">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={ isLoggedIn=="true" ? <Home/> : <Login/>}/>
        <Route exact path="/signup" element={isLoggedIn=="true" ? <Home/> : <Signup/>}/>
        <Route exact path="/project" element={isLoggedIn=="true"? <Project/>:<Login/>}/>
        <Route exact path="/edit-profile" element={isLoggedIn=="true"? <EditProfile/>:<Login/>}/>
        <Route exact path="/reset-password" element={isLoggedIn=="true"? <Home/>:<ResetPassword/>}/>
        <Route exact path="/pricing" element={<Pricing/>}/>

      


      </Routes>
    </Router>
  </div>

  );
}

export default App;
