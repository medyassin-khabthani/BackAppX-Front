import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleForgotPassword=this.handleForgotPassword.bind(this);


  }

  handleSubmit(e){
    e.preventDefault();
    const {email,password}=this.state;
    console.log(email,password);
    fetch("http://127.0.0.1:9092/user/login",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data,"userRegister")
      if(data?.status == "ok"){
        alert("Login Successful !");
        window.localStorage.setItem("token",data?.token);
        window.localStorage.setItem("isLoggedIn",true)
        window.location.href="./";
      }
    })
  }
  handleForgotPassword(e){
    e.preventDefault();
    const {email}=this.state;
    console.log(email);
    fetch("http://127.0.0.1:9092/user/forgot-password",{
      method:"PUT",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        email
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data?.status == "ok"){
        alert(data?.message);
        window.localStorage.setItem("time",Date.now());
      }
    })
  }
    render() {
        return (
            <div className="wrapper">
      <div className="row" style={{height: '100vh'}}>
        <div className="col login-col">
            <div>
            <a href="/"  style={{marginLeft:'1rem',borderRadius: '100%' , backgroundColor: '#f1f1f1',color: '#212529',  textDecoration: 'none',display: 'inline-block',padding: '8px 16px',fontSize:'20px', fontWeight:'bold'}}><i className="fa fa-arrow-left"/></a>
            </div>
          <div>
            <form className="login-form" onSubmit={this.handleSubmit} style={{paddingRight: '100px', paddingLeft: '100px'}}>
              <h1 style={{marginBottom: '20px'}}>Get Started</h1>
              <input className="form-control" type="text" onChange={(e)=> this.setState({email:e.target.value})} placeholder="Email" style={{marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px'}} />
              <input className="form-control" type="password" onChange={(e)=> this.setState({password:e.target.value})} placeholder="Password" style={{paddingTop: '12px', paddingBottom: '12px', marginBottom: '20px'}} />
              <div className="form-buttons"><a className="password-forgot" href="#myModal" data-bs-toggle="modal" style={{color: '#212529'}}>Forgot Password ?</a>
              <button className="btn btn-primary login-button" type="submit" style={{paddingRight: '80px', paddingLeft: '80px', borderRadius: '15px', boxShadow: '0px 0px 5px 0px #f05b57', background: '#f05b57', marginLeft: 'auto', paddingTop: '12px', paddingBottom: '12px', borderWidth: '0px'}}>Login</button></div><a className="text-center signup-text" href="signup" style={{fontSize: '22px', display: 'block', color: '#212529', marginTop: '10px'}}>S'inscrire</a>
              <hr style={{height: '0.5px', marginTop: '30px'}} />
              <h1 style={{fontSize: '18px', textAlign: 'center'}}>connect with Social media</h1>
              <ul className="list-inline text-center" style={{marginTop: '20px'}}>
                <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x" /><i className="fa fa-facebook fa-stack-1x fa-inverse" /></span></a></li>
                <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x" /><i className="fa fa-google fa-stack-1x fa-inverse" /></span></a></li>
                <li className="list-inline-item"><a href="#" /></li>
                <li className="list-inline-item"><a href="#" /></li>
              </ul>
            </form>
          </div>
        </div>

        <div id="myModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={this.handleForgotPassword}>
                <div className="modal-header">
                  <h4>Entrer votre E-mail</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <input className="form-control" onChange={(e)=> this.setState({email:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px'}} />
                </div>
                <div className="modal-footer">
                <button className="btn btn-light" type="button" data-bs-dismiss="modal">Annuler</button>
                <button className="btn btn-primary" type="submit">Soumettre</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        <div className="col welcome-logo" style={{background: 'linear-gradient(#1c7ba5 0%, #2aa1c1)'}}>
          <div>
            <h1 style={{textAlign: 'center', color: 'rgb(255,255,255)', fontFamily: 'outfit', fontSize: '24px', marginBottom: '60px'}}>Welcome To</h1><img src="assets/img/logo%20light%20mode-01.png" style={{width: '268px', display: 'block', marginRight: 'auto', marginLeft: 'auto'}} />
            <p style={{color: 'rgb(255,255,255)', textAlign: 'center', fontFamily: 'outfit', marginTop: '60px', paddingRight: '50px', paddingLeft: '50px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ,eiusmod tempor incididunt ut laboreet dolore</p>
          </div>
        </div>
      </div>
            </div>
        )
    }
}
export default Login;