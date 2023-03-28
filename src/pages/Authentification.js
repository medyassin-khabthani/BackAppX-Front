import React, {Component} from 'react';


import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Authentification extends Component {
    constructor(props){
        super(props);
        this.state={
            clients:[],
            name:"",
            familyName:"",
            fullName:"",
            email:"",
            phoneNumber:"",
            password:"",
            reference:""
        }
        this.handleSubmit=this.handleSubmit.bind(this);

      }

      componentDidMount(){
        fetch("http://127.0.0.1:9092/client/client")
        .then((res) => res.json())
        .then((data) => {
            this.setState({clients:data});

          })
        
      }
      formatDate(dateString){
          // Create a new Date object from the date string
          const date = new Date(dateString);

          // Get the individual components of the date and time
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          const hours = ('0' + date.getHours()).slice(-2);
          const minutes = ('0' + date.getMinutes()).slice(-2);
          const seconds = ('0' + date.getSeconds()).slice(-2);

          // Format the date as a string in the desired format
          const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          return formattedDate;
      }

      handleSubmit(e){
        e.preventDefault();
        const {name,familyName,fullName,email,phoneNumber,password,reference}=this.state;    
          fetch("http://127.0.0.1:9092/client/client",{
            method:"POST",
            crossDomain:true,
            headers:{
              "Content-Type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
              name,
              familyName,
              fullName,
              email,
              phoneNumber,
              password,
              reference
            }),
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data,"userRegister")
            if (data?.status == "created"){
    
                alert("created");
                window.location.href="./authentification"
            }
          })
    
      }
      
    render() {
        const{clients} = this.state;
        return (
            <><script src="assetsDash/bootstrap/js/bootstrap.min.js"></script><script src="assetsDash/js/chart.min.js"></script><script src="assetsDash/js/bs-init.js"></script><script src="assetsDash/js/theme.js"></script><script src="assetsDash/js/jquery.min.js"></script><script src="assetsDash/js/bootstrap.bundle.min.js"></script><script src="assetsDash/js/script.js"></script><link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /><link rel="stylesheet" href="assetsDash/bootstrap/css/bootstrap.min.css" /><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap" /><link rel="stylesheet" href="assetsDash/fonts/fontawesome-all.min.css" /><link rel="stylesheet" href="assetsDash/fonts/ionicons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/material-icons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/typicons.min.css" /><link rel="stylesheet" href="assetsDash/css/card-3-column-animation-shadows-images.css" /><link rel="stylesheet" href="assetsDash/css/animate.min.css" /><link rel="stylesheet" href="assetsDash/css/style.css" /><link rel="stylesheet" href="assetsDash/css/News-Cards.css" /><link rel="stylesheet" href="assetsDash/css/Tabbed-Panel-tabbed-panel.css" />
            <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                        <HeaderDashboard />
                <div className="container-fluid">
                <h3 className="text-dark mb-4">Authentification</h3>
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold" style={{ primary: '#00a0c4' }}><span style={{ fontweight: 'normal !important', color: 'rgba(var(--bs-dark-rgb)' }}>Authentification</span></p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 col-xxl-7 text-nowrap">
                                <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;<select className="d-inline-block form-select form-select-sm">
                                    <option value="10" select="">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>&nbsp;</label></div>
                            </div>
                            <div className="col-md-6 col-xxl-3">
                                <div className="text-md-end dataTables_filter" id="dataTable_filter"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /><label className="form-label"></label></div>
                            </div>
                            <div className="col text-center"> <a href="#myModal"  data-bs-toggle="modal" style={{textDecoration: 'none'}}><button className="btn" type="button" style={{ background: 'rgb(241, 92, 87)',color:'white', padding: '6px 12px', primary: '#00a0c4', bordercolor: '#00a0c4', paddingleft: '15px', marginleft: '-3px', paddingtop: '3px' }}>Add User</button></a></div>
                        </div>
                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table className="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Created at</th>
                                        <th>Reference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {clients.reverse().map((client) => (

                                    <tr key={client._id}>
                                        <td><img className="rounded-circle me-2" width="30" height="30" src="assetsDash/img/avatars/avatar1.jpeg" alt="avatar" />{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.phoneNumber}</td>
                                        <td>{this.formatDate(client.createdAt)}</td>
                                        <td>{client.reference}</td>
                                    </tr>
                                                   ))}
                                </tbody>
                                <tfoot>
                                    <tr></tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xxl-5 align-self-center">
                                <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                            </div>
                            <div className="col-md-6">
                                <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers" style={{ primary: '#00a0c4' }}>
                                    <ul className="pagination">
                                        <li className="page-item" style={{ color: 'var(--bs-card-border-color)' }}><a className="page-link" href="/">Previous</a></li>
                                        <li className="page-item active" style={{ color: 'var(--bs-primary)' }}><a className="page-link" href="/">1</a></li>
                                        <li className="page-item" style={{ color: 'var(--bs-card-border-color)' }}><a className="page-link" href="/">2</a></li>
                                        <li className="page-item" style={{ color: 'var(--bs-card-border-color)' }}><a className="page-link" href="/">3</a></li>
                                        <li className="page-item" style={{ color: 'var(--bs-card-border-color)' }}><a className="page-link" aria-label="Next" href="/"> <span aria-hidden="true">»</span></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
                
                <div id="myModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={this.handleSubmit}>
                <div className="modal-header">
                  <h4>Ajouter un utilisateur</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">

                <div className="form-floating">
                  <input className="form-control" id="formEmailForgot"  onChange={(e)=> this.setState({name:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}} required />
                <label className="form-label text-secondary" for="formEmailForgot">name</label>
                  </div>

                  <div className="form-floating">
                  <input className="form-control" id="formEmailForgot"  onChange={(e)=> this.setState({familyName:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}} required />
                <label className="form-label text-secondary" for="formEmailForgot">first name</label>
                  </div>

                  <div className="form-floating">
                  <input className="form-control" id="formEmailForgot"  onChange={(e)=> this.setState({fullName:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}} required />
                <label className="form-label text-secondary" for="formEmailForgot">last name</label>
                  </div>

                  <div className="form-floating">
                  <input className="form-control" id="formEmailForgot"  onChange={(e)=> this.setState({email:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}} required />
                <label className="form-label text-secondary" for="formEmailForgot">Email</label>
                  </div>


                  <div className="form-floating">
                  <input className="form-control" id="formEmailForgot"  onChange={(e)=> this.setState({phoneNumber:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}} required />
                <label className="form-label text-secondary" for="formEmailForgot">Phone Number</label>
                  </div>

                  <div className="form-floating">
                  <input className="form-control" id="formEmailForgot"  onChange={(e)=> this.setState({password:e.target.value})} type="password" placeholder="Email" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}} required />
                <label className="form-label text-secondary" for="formEmailForgot">Password</label>
                  </div>
                  

                  <div className="form-floating">
                  <input className="form-control" id="formEmailForgot"  onChange={(e)=> this.setState({reference:e.target.value})} type="text" placeholder="Email" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}} required />
                <label className="form-label text-secondary" for="formEmailForgot">reference</label>
                  </div>


                </div>
                <div className="modal-footer">
                <button className="btn btn-light" type="button" data-bs-dismiss="modal">Annuler</button>
                <button className="btn btn-primary" type="submit">Soumettre</button>
                </div>
                </form>
              </div>
            </div>
          </div>
                    <FooterDashboard />

                    </div>

            </div></>
        
            )
        }
    }
export default Authentification;