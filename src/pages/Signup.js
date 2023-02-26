import React, {Component} from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Header from '../components/Header';
import Footer from '../components/Footer';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      email:"",
      password:"",
      phoneNumber:""
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const {name,email,password,phoneNumber}=this.state;
    console.log(name,email,password,phoneNumber);
/* 
    if (this.ValidateEmail(email)){ */
      fetch("http://127.0.0.1:9092/user/register",{
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"userRegister")
        if (data?.status == "created"){
          alert('Signup successful !');
          window.location.href="./login"
        }
        
  
      })
/*     } */

  }

/*   ValidateEmail(input) {

    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (input.test(validRegex)) {
  
      alert("Valid email address!");  
  
      return true;
  
    } else {
  
      alert("Invalid email address!");
  
      document.form1.text1.focus();
  
      return false;
  
    } 
  
  }*/
    render() {
        return (
            <div className="row" style={{height: '100vh'}}>
            <div style={{position:'absolute',marginTop:'20px'}}>
            <a href="/"  style={{marginLeft:'1rem',borderRadius: '100%' , backgroundColor: '#f1f1f1',color: '#212529',  textDecoration: 'none',display: 'inline-block',padding: '8px 16px',fontSize:'20px', fontWeight:'bold'}}><i className="fa fa-arrow-left"/></a>
            </div>  
            <div className="col welcome-logo" style={{background: 'linear-gradient(144deg, #EC1B69 0%, #F05B57 100%)'}}>

              <div>
                <div className="row gy-4 gx-md-0 gy-md-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-md-flex d-xl-flex align-items-md-center" style={{width: '600px'}}>
                  <div className="col-xl-5 col-xxl-5 offset-xl-2" style={{marginLeft: '30px'}}>
                    <div className="card bg-light border-0">
                      <div className="card-body p-4" style={{width: '260px'}}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h3 className="fw-bold mb-0">Starter bundle</h3>
                            <p>Suscipit</p>
                            <h4 className="display-6 fw-bold">$0</h4>
                          </div>
                        </div>
                        <div>
                          <ul className="list-unstyled">
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Lectus ut nibh quam, felis porttitor.</span></li>
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Ante nec venenatis etiam lacinia.</span></li>
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Porta suscipit netus ad ac.</span></li>
                          </ul>
                        </div>
                        <div className="d-grid"><a className="btn btn-primary"   role="button">Get Started</a></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-5">
                    <div className="card text-white bg-primary border-0" style={{width: '300px', background: 'linear-gradient(#1C7BA5, #1c7ba5), rgb(13, 110, 253)'}}>
                      <div className="card-body p-4" style={{width: '300px'}}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h3 className="fw-bold text-white mb-0">Pro Bundle</h3>
                            <p>Suscipit + donec</p>
                            <h4 className="display-6 fw-bold text-white">$38</h4>
                          </div>
                          <div><span className="badge rounded-pill bg-primary text-uppercase bg-white-300">Best Value</span></div>
                        </div>
                        <div>
                          <ul className="list-unstyled">
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Lectus ut nibh quam, felis porttitor.</span></li>
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Ante nec venenatis etiam lacinia.</span></li>
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Porta suscipit netus ad ac.</span></li>
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Morbi praesent aptent integer at.</span></li>
                            <li className="d-flex mb-2"><span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon me-2"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-check-lg">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                </svg></span><span>Nisl potenti ut auctor lobortis.</span></li>
                          </ul>
                        </div>
                          <a className="btn btn-primary d-block w-100 bg-white-300" role="button" href="/payment" style={{borderWidth: '0px'}}>Choisir</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col login-col">
              <div>
                <form className="login-form" onSubmit={this.handleSubmit} style={{paddingRight: '100px', paddingLeft: '100px'}}>
                  <h1 style={{marginBottom: '20px'}}>Signup</h1>
                  <input className="form-control" onChange={(e)=> this.setState({name:e.target.value})} type="text" placeholder="Username" style={{marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px'}} required/>
                  <input className="form-control" onChange={(e)=> this.setState({email:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px'}} required />
                  <input className="form-control" onChange={(e)=> this.setState({phoneNumber:e.target.value})} type="tel" placeholder="Numéro de téléphone" style={{marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px'}} required/>
                  <input className="form-control" onChange={(e)=> this.setState({password:e.target.value})} type="password" placeholder="password" style={{paddingTop: '12px', paddingBottom: '12px', marginBottom: '20px'}} required />
                  <input className="form-control" type="password" placeholder="Confirm password" style={{paddingTop: '12px', paddingBottom: '12px', marginBottom: '20px'}} />
                  <div className="form-buttons">
                  <button className="btn btn-primary login-button" type="submit" style={{paddingRight: '80px', paddingLeft: '80px', borderRadius: '15px', boxShadow: '0px 0px 5px 0px #1c7ba5', background: '#1c7ba5', marginLeft: 'auto', paddingTop: '12px', paddingBottom: '12px', borderWidth: '0px', marginRight: 'auto'}}>S'inscrire</button></div>
                  <div><a className="text-center login-text" href="login" style={{display: 'block', fontSize: '22px', color: '#212529', marginTop: '10px'}}>Login</a></div>
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
          </div>
        )
    }
}
export default Signup;