import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      email:"",
      password:"",
      phoneNumber:"12345678"
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const {name,email,password,phoneNumber}=this.state;
    console.log(name,email,password,phoneNumber);
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
  }
    render() {
        return (
            <div>
            <Header/>
            <div className="container profile profile-view" id="profile">
            <div className="row">
              <div className="col-md-12 alert-col relative">
                <div className="alert alert-info alert-dismissible absolue center" role="alert"><button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" /><span>Profile save with success</span></div>
              </div>
            </div>
            <form>
              <div className="row profile-row">
                <div className="col-md-4 relative">
                  <div className="avatar">
                    <div className="avatar-bg center" />
                  </div><input className="form-control form-control" type="file" name="avatar-file" />
                </div>
                <div className="col-md-8">
                  <h1>Modifier mon profil</h1>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="text" name="username" placeholder="Nom d'utilisateur" /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="text" name="phone" placeholder="Numéro de téléphone" /></div>
                    </div>
                  </div>
                  <div className="form-group mb-3"><input className="form-control" type="email" autoComplete="off" required name="email" placeholder="Email" /></div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="password" name="password" autoComplete="off" required placeholder="Mot de passe" /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="password" name="confirmpass" autoComplete="off" required placeholder="Confirmer mot de passe" /></div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12 content-right"><button className="btn btn-primary form-btn" type="submit" style={{background: '#1c7ba5', boxShadow: '0px 0px 7px #1c7ba5', border:"none"}}>Confirmer</button><button className="btn form-btn btn-secondary text-secondary" type="reset" style={{background: 'rgba(220,53,69,0)'}}>Annuler</button></div>
                  </div>
                </div>
                <hr className='mt-4'/>
                <div className="col">
                  <p>Lorem ipsum det alore ist.</p><button className="btn btn-primary" type="button" style={{width: '200px', background: '#f05b57', boxShadow: '0px 0px 4px #f05b57',border:"none"}}>Delete my account</button>
                </div>
              </div>
            </form>
          </div>
          <Footer/>
          </div>
        )
    }
}
export default Signup;