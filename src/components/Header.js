import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';


class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      token:"",
      userData:""
    }
  }
  componentDidMount(){
    const isLoggedIn=window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn=="true"){
      fetch("http://127.0.0.1:9092/user/userData",{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          token:window.localStorage.getItem("token")
        }),
      })
      .then((res) => res.json())
      .then((data) => {
          
          this.setState({token:window.localStorage.getItem("token"),userData:data?.data});
          console.log(this.state)
        })
    }
    
    }
    
    disconnect(){
      window.localStorage.clear();
      window.location.href="./";
    }
    
    render() {
      const { token,userData } = this.state; 
      const isLoggedIn = window.localStorage.getItem("isLoggedIn");
      return (
        <div id="navigation-block">
          <nav className="navbar navbar-light navbar-expand-md border-secondary border-4 shadow-sm" style={{height: '62.8px'}}>
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
                { isLoggedIn == "true" ? (
/*                   <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <h4 className="nav-link mt-2">Welcome {userData.name}</h4>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link"><button className="btn btn-primary border rounded-pill border-0" onClick={this.disconnect} type="button" style={{background: '#F15C57'}}>Disconnect</button></a></li>
                    </ul> */
                    <ul className="navbar-nav ms-auto">
                      <div className="dropdown show">
                              <a className="dropdown-toggle"  style={{textDecoration:'none',color:'#000000E6'}}href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Welcome {userData.name}
                              </a>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              <a className="dropdown-item" href="project">Mes projets</a>
                                <a className="dropdown-item" href="edit-profile">Modifier mon profil</a>
                                <a className="dropdown-item" onClick={this.disconnect} href="#">Se deconnecter</a>
                              </div>
                            </div>  
                    </ul>
                ) :(
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item"><a className="nav-link active" href="login"><button className="btn btn-outline-primary link-primary border rounded-pill border-0" type="button">Sign in</button></a></li>
                  <li className="nav-item"><a className="nav-link" href="signup"><button className="btn btn-primary border rounded-pill border-0" type="button" style={{background: '#F15C57'}}>Sign Up</button></a></li>
                </ul>)  }

              </div>
            </div>
          </nav>
        </div>
      );
    }
  };
  export default Header;