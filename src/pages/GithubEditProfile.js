import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class GithubEditProfile extends Component {
  constructor(props){
    super(props);
    this.state={
      id:"",
      name:"",
      email:"",
      phoneNumber:"",
      image:null,
      userData:"",
      imageUrl:"",
      buttonColor:"#1c7ba5",
      buttonText:"Upload image",
      showAlert:false,
      userImage:"",
      alertText:"",
      alertColor:"alert-danger",
      showImage:false
    }
    this.handleUpdate=this.handleUpdate.bind(this);



  }
  componentDidMount(){

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
      this.setState({
      token:window.localStorage.getItem("token"),
      userData:data?.data,
      id:data?.data._id,
      name:data?.data.name,
      phoneNumber:data?.data.phoneNumber,
      email:data?.data.email,
      userImage:data?.data.image

    });
      console.log("data:", data)
      console.log("id",this.state.id)
      

/*       this.setState({imageUrl:data?.data.image,showImage:true})
 */
    })
    const {userImage,imageUrl,showImage} = this.state;
    console.log(userImage,imageUrl)


  }


  handleUpdate(e){
    e.preventDefault();

    const {id,name,email,phoneNumber}=this.state;
    
    console.log(id,name,email,phoneNumber);
    if(this.validate()){

  
    fetch(`http://127.0.0.1:9092/user/profile/${id}`,{
      method:"PUT",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      console.log(data.user,"user updated")
      if (data?.status == "updated"){
        this.setState({userData:data.user})

        this.setState({alertText:"Profil modifié avec succées.",showAlert:true,alertColor:"alert-success"})
        window.localStorage.removeItem('token');
        window.localStorage.setItem("token",data.token)
        setTimeout(() => {
          window.location.href="./"
        }, 2000);
       }
      

    })
  }
  }


  validate(){
    const {name,email,password,phoneNumber,passwordCheck} = this.state;

    let check = false;
    var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length>4){
      check=true;
    }else{
      this.setState({alertText:"Le username doit dépasser les 4 caracteres",showAlert:true,alertColor:"alert-danger"})
      return false;
    }
    
    if (email.match(validRegex)) {  
      check=true;
    } else {
        
      this.setState({alertText:"Email invalide",showAlert:true,alertColor:"alert-danger"})
      return false;
  
    } 
    if (Number.isInteger(parseInt(phoneNumber))){
      check=true;
    }else{
      this.setState({alertText:"Numero de Telephone invalide",showAlert:true,alertColor:"alert-danger"})
      return false;
    }
    return check;

  }


    render() {
      const {id,name,phoneNumber,email,userImage,imageUrl,buttonColor,buttonText,showAlert,alertText,alertColor,showImage} = this.state;
      return (
            <div>

            <div className="container profile profile-view" id="profile">
              {showAlert && (
        <div className={`alert ${alertColor} alert-dismissible w-100 fade show`} role="alert">
          {alertText}
          <button type="button" className="btn-close" onClick={() => this.setState({showAlert:false})}></button>
        </div>
             )}
           <div className="row">
              <div className="col-md-12 alert-col relative">

              </div>
            </div> 

              <div className="row profile-row">

                <div className="col-md-12">
                <form onSubmit={this.handleUpdate} className="h-100"> 
                  <h1>Modifier mon profil</h1>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="text" onChange={(e)=> this.setState({name:e.target.value})} name="username" placeholder="Nom d'utilisateur"  value={name} required /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="text" onChange={(e)=> this.setState({phoneNumber:e.target.value})} name="phone" placeholder="Numéro de téléphone" value={phoneNumber} required /></div>
                    </div>
                  </div>
                  <div className="form-group mb-3"><input className="form-control" type="email" onChange={(e)=> this.setState({email:e.target.value})} autoComplete="off"  name="email" placeholder="Email" value={email} required /></div>
                  <div className="row">
                    <div className="col-md-12 content-right "><button className="btn btn-primary form-btn" type="submit" style={{background: '#1c7ba5', boxShadow: '0px 0px 7px #1c7ba5', border:"none"}}>Confirmer</button><button className="btn form-btn btn-secondary text-secondary" type="reset" style={{background: 'rgba(220,53,69,0)'}}>Annuler</button></div>
                  </div>
                  </form>

                </div>

              </div>
          </div>

          </div>
        )
    }
}
export default GithubEditProfile;