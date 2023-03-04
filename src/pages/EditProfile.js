import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class EditProfile extends Component {
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
      buttonText:"Upload image"
    }
    this.handleUpdate=this.handleUpdate.bind(this);
    this.deleteAccount=this.deleteAccount.bind(this);
    this.handleUpload=this.handleUpload.bind(this);


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
      imageUrl:data?.data.image.url

    });
      console.log("data:", data)
    })
  }


  handleUpdate(e){
    e.preventDefault();

    const {id,name,email,phoneNumber}=this.state;
    
    console.log(id,name,email,phoneNumber);

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
      console.log(data.user,"user updated")
      if (data?.status == "updated"){
        this.setState({userData:data.user})
        alert('update successful !');
        window.location.href="./edit-profile"
       }
      

    })
  }



  deleteAccount(){
    const { id }=this.state;

    fetch(`http://127.0.0.1:9092/user/delete/${id}`,{
      method:"DELETE",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status == "deleted"){
        alert('deletion successful !');
        window.location.href="./"
        window.localStorage.clear()
      }
    })
  }

   handleImageUpload = e => {
    
    this.setState({image:e.target.files[0]})

    console.log(this.state.image)

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({imageUrl:reader.result})
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  handleUpload(e){
    e.preventDefault();
    const{image,id}= this.state;
    const formData = new FormData();
    formData.append('image', image);
    
    fetch(`http://127.0.0.1:9092/user/uploadphoto/${id}`, {
      method: 'PUT',
      body: formData
    })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status == "ok"){
        alert('upload image successful !');
        console.log(data?.file)
        window.location.href="./edit-profile"
      }
    });
    const handleClick = () => {
      this.setState({buttonColor:'#176182',buttonText:'Veuillez patienter...'});
    };

  }

    render() {
      const {name,phoneNumber,email,imageUrl,buttonColor,buttonText} = this.state;
        return (
            <div>
            <Header/>
            <div className="container profile profile-view" id="profile">
            <div className="row">
              <div className="col-md-12 alert-col relative">
                <div className="alert alert-info alert-dismissible absolue center" role="alert"><button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" /><span>Profile save with success</span></div>
              </div>
            </div> 

              <div className="row profile-row">
                <div className="col-md-4 relative">
                  <form onSubmit={this.handleUpload}>
                  <div className="avatar">
                    <div className="center">  
                    {imageUrl && <img className='mb-2' src={imageUrl} style={{objectFit :"coverd",height: "200px",width: "200px", borderRadius:"50%"}} />}</div>
                  </div><input className="form-control form-control" type="file" onChange={this.handleImageUpload} name="avatar-file" />
                  <button className='btn btn-primary w-100 mt-3' style={{background: buttonColor, boxShadow: '0px 0px 7px #1c7ba5', border:"none"}} onClick={this.handleClick} type="submit">{buttonText}</button>
                  </form>
                </div>
                <div className="col-md-8">
                <form onSubmit={this.handleUpdate} className="h-100"> 
                  <h1>Modifier mon profil</h1>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="text" onChange={(e)=> this.setState({name:e.target.value})} name="username" placeholder="Nom d'utilisateur"  value={name} /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="text" onChange={(e)=> this.setState({phoneNumber:e.target.value})} name="phone" placeholder="Numéro de téléphone" value={phoneNumber} /></div>
                    </div>
                  </div>
                  <div className="form-group mb-3"><input className="form-control" type="email" onChange={(e)=> this.setState({email:e.target.value})} autoComplete="off"  name="email" placeholder="Email" value={email} /></div>
                  {/* <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="password" name="password" autoComplete="off" required placeholder="Mot de passe" /></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3"><input className="form-control" type="password" name="confirmpass" autoComplete="off" required placeholder="Confirmer mot de passe" /></div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-12 content-right "><button className="btn btn-primary form-btn" type="submit" style={{background: '#1c7ba5', boxShadow: '0px 0px 7px #1c7ba5', border:"none"}}>Confirmer</button><button className="btn form-btn btn-secondary text-secondary" type="reset" style={{background: 'rgba(220,53,69,0)'}}>Annuler</button></div>
                  </div>
                  </form>

                </div>
                <hr className='mt-4'/>
                <div className="col">
                  <p>Lorem ipsum det alore ist.</p><button className="btn btn-primary" onClick={this.deleteAccount} type="button" style={{width: '200px', background: '#f05b57', boxShadow: '0px 0px 4px #f05b57',border:"none"}}>Delete my account</button>
                </div>
              </div>
          </div>
          <Footer/>
          </div>
        )
    }
}
export default EditProfile;