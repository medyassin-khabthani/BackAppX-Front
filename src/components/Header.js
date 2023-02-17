import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';


class Header extends Component{
    render() {
      return (
        <div id="navigation-block">
          <nav className="navbar navbar-light navbar-expand-md border-secondary border-4" style={{height: '62.8px'}}>
            <div className="container"><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-2"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
              <div className="collapse navbar-collapse" id="navcol-2">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="#">Services</a></li>
                  <li className="nav-item"><a className="nav-link" href="#">Pricing</a></li>
                  <li className="nav-item"><a className="nav-link" href="#">Docs</a></li>
                </ul>
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item"><a className="navbar-brand" style={{fontFamily: 'Bungee, cursive', paddingTop: '-0.6px'}} href="#"><img className="img-fluid" src="assets/img/logo.png" style={{width: '150px'}} /></a></li>
                </ul>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item"><a className="nav-link active" href="login"><button className="btn btn-outline-primary link-primary border rounded-pill border-0" type="button">Sign in</button></a></li>
                  <li className="nav-item"><a className="nav-link" href="signup"><button className="btn btn-primary border rounded-pill border-0" type="button" style={{background: '#F15C57'}}>Sign Up</button></a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  };
  export default Header;