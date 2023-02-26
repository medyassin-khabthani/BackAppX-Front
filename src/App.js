import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PaymentPage from "./pages/PaymentPage";


{/* <Route exact path='/' component={Home}/> */}
function App() {
  return (
  <div className="wrapper">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/payment" element={<PaymentPage/>}/>
        <Route exact path="/payment/success" element={<h1>Payment Success</h1>}/>
        <Route path="*" element={<h1>404: Not Found</h1>}/>

      </Routes>
    </Router>
  </div>

  );
}

export default App;
