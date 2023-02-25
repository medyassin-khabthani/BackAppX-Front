import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Countdown from 'react-countdown';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        newPass:"",
        resetLink:""
    }
    this.handleResetPassword=this.handleResetPassword.bind(this);
  }
  componentDidMount(){
    const searchParams = new URLSearchParams(window.location.search);
    const reset = searchParams.get('token');
    console.log(reset);
    this.setState({resetLink:reset});

  }

  handleResetPassword(e){
    e.preventDefault();
    const {newPass,resetLink}=this.state;
    console.log(newPass,resetLink);
    fetch("http://127.0.0.1:9092/user/reset-password",{
      method:"PUT",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        newPass,
        resetLink
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data?.status == "ok"){
        alert(data?.message);
        window.localStorage.clear();
        window.location.href="./login";
      }
    })
  }


    render() {
        const dateReset = window.localStorage.getItem("time");
          // Renderer callback with condition
          const renderer = ({minutes, seconds}) => {

            // Render a countdown
            return <span style={{fontWeight:"bold"}}>{minutes}:{seconds}</span>;
        };

        return (
            <div className="container">

            <form className="login-form" onSubmit={this.handleResetPassword} style={{paddingRight: '100px', paddingLeft: '100px'}}>
              <h1 style={{marginBottom: '20px'}}>Entrer votre nouveau mot de passe</h1>
              <input className="form-control" type="password" onChange={(e)=> this.setState({newPass:e.target.value})} placeholder="Nouveau mot de passe" style={{marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px'}} />
              <input className="form-control" type="password"  placeholder="Confirmer nouveau mot de passe" style={{paddingTop: '12px', paddingBottom: '12px', marginBottom: '20px'}} />
              <div className="form-buttons"><p className="password-forgot" style={{color: '#212529',marginBottom:"0px"}}>Votre clé de réinisialisation expire dans:&nbsp; </p><Countdown date={parseInt(dateReset) + 900000} zeroPadTime={2} renderer={renderer} />
              <button className="btn btn-primary login-button" type="submit" style={{paddingRight: '80px', paddingLeft: '80px', borderRadius: '15px', boxShadow: '0px 0px 5px 0px #f05b57', background: '#f05b57', marginLeft: 'auto', paddingTop: '12px', paddingBottom: '12px', borderWidth: '0px'}}>Login</button></div>
              
            </form>
          </div>

        )
    }
}
export default Login;