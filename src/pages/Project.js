import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Project extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects:[],
            name:"",
            description:"",
            id:"",

        }
        this.handleSubmit=this.handleSubmit.bind(this);
      }
      
      addToUser(id,ProjectId){
        fetch(`http://127.0.0.1:9092/user/myProject/${id}`,{
          method:"PUT",
          crossDomain:true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body: JSON.stringify({
            ProjectId
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user,"user updated")
          if (data?.status == "ok"){
            this.setState({userData:data.user})
            alert('project Added !');
            window.location.href="./project"
           }
          
    
        })

      }

      handleSubmit(e){
        e.preventDefault();
        const {id,name,description}=this.state;
        fetch("http://127.0.0.1:9092/project/project",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body: JSON.stringify({
            name,
            description
          }),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data?.status == "created")
          console.log(data?.newProject._id);
          this.addToUser(id,data?.newProject._id)


        })
      }


      componentDidMount(){

        fetch("http://127.0.0.1:9092/project/project")
        .then((res) => res.json())
        .then((data) => {

          })

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
              
              this.setState({id:data?.data._id,projects:data?.data.myProject});
              console.log(this.state)
            })
        }


    render() {
        const { projects } = this.state;

        return (
            <div>
        <Header/>
        <div data-bss-parallax-bg="true" style={{height: '500px', background: 'url("assets/img/Groupe%2022.png") center / cover'}} />
        <div className="row m-4">
          <div className="col col-md-4 mb-3">
            <div className="card" style={{borderRadius: '20px'}}><a href="#myModal" data-bs-toggle="modal" style={{textDecoration: 'none'}}>
                <div className="card-body d-flex align-items-center" style={{boxShadow: '0px 2px 20px rgba(33,37,41,0.52)', height: '220px', borderRadius: '20px'}}>
                  <div className="mx-auto"><i className="fa fa-plus text-center mx-auto" style={{fontSize: '60px', color: 'var(--bs-blue)', display: 'block'}} />
                    <h4 className="mt-2" style={{color:"#007bff"}}>Ajouter un projet</h4>
                  </div>
                </div>
              </a></div>
          </div>
          {projects.reverse().map((project) => (
            <div key={project.id} className="col col-md-4 mb-3">
            <div className="card" style={{borderRadius: '20px'}}>
                <a>
              <div className="card-body" style={{boxShadow: '0px 2px 20px rgba(33,37,41,0.52)', height: '220px', borderRadius: '20px'}}>
                <h4 className="card-title">{project.name}</h4>
                <p className="text-muted" style={{fontSize:'10px'}}>{project.reference}</p>
                <p className="card-text mb-5">{project.description}</p>
              </div>
              </a>
            </div>
          </div>
               ))}
{/*           <div className="col col-md-4 mb-3">
            <div className="card" style={{borderRadius: '20px'}}>
              <div className="card-body" style={{boxShadow: '0px 2px 20px rgba(33,37,41,0.52)', height: '220px', borderRadius: '20px'}}>
                <h4 className="card-title">Title</h4>
                <p className="card-text mb-5">Nullam id dolo</p>
              </div>
            </div>
          </div>
          <div className="col col-md-4 mb-3">
            <div className="card" style={{borderRadius: '20px'}}>
              <div className="card-body" style={{boxShadow: '0px 2px 20px rgba(33,37,41,0.52)', height: '220px', borderRadius: '20px'}}>
                <h4 className="card-title">Title</h4>
                <p className="card-text mb-5">Nullam id dolo</p>
              </div>
            </div>
          </div> */}
        </div>
        <div><div id="myModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={this.handleSubmit}>
                <div className="modal-header">
                  <h4 >Ajouter un projet</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <input className="form-control" onChange={(e)=> this.setState({name:e.target.value})} type="text" placeholder="Titre" style={{marginBottom: '20px', paddingTop: '12px', paddingBottom: '12px'}} />
                  <textarea className="form-control" onChange={(e) => this.setState({description:e.target.value})} placeholder="Description" style={{ paddingTop: '12px', paddingBottom: '12px'}} defaultValue={""} />
                </div>
                {/* color button */}
                <h6 className='mx-4 mt-0'>Choisir une couleur</h6>
                <div className='row px-5' >
                <div className="form-check col-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />

                <div className="form-check-label" htmlFor="flexRadioDefault1" style={{width:"50px",height:"20px",background:"#7BC46C",borderRadius:"5px",marginTop:"2px"}}/>

              </div>
              <div className="form-check col-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />

              <div className="form-check-label" htmlFor="flexRadioDefault2" style={{width:"50px",height:"20px",background:"#F2DF21",borderRadius:"5px",marginTop:"2px"}}/>
              </div>
              <div className="form-check col-3">
                <input className="form-check-input"  type="radio" name="flexRadioDefault" id="flexRadioDefault3"  />

              <div className="form-check-label" htmlFor="flexRadioDefault3" style={{width:"50px",height:"20px",background:"#FBAE42",borderRadius:"5px",marginTop:"2px"}}/>
              </div>
              <div className="form-check col-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"  />

              <div className="form-check-label" htmlFor="flexRadioDefault4" style={{width:"50px",height:"20px",background:"#F07464",borderRadius:"5px",marginTop:"2px"}}/>
              </div>
              </div>
              <div className='row my-3 px-5' >
                <div className="form-check col-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />

                <div className="form-check-label" htmlFor="flexRadioDefault1" style={{width:"50px",height:"20px",background:"#BD8FC1",borderRadius:"5px",marginTop:"2px"}}/>

              </div>
              <div className="form-check col-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />

              <div className="form-check-label" htmlFor="flexRadioDefault2" style={{width:"50px",height:"20px",background:"#59A4D0",borderRadius:"5px",marginTop:"2px"}}/>
              </div>
              <div className="form-check col-3">
                <input className="form-check-input"  type="radio" name="flexRadioDefault" id="flexRadioDefault3"  />

              <div className="form-check-label" htmlFor="flexRadioDefault3" style={{width:"50px",height:"20px",background:"#ED91BD",borderRadius:"5px",marginTop:"2px"}}/>
              </div>
              <div className="form-check col-3">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"  />

              <div className="form-check-label" htmlFor="flexRadioDefault4" style={{width:"50px",height:"20px",background:"#40C4DE",borderRadius:"5px",marginTop:"2px"}}/>
              </div>
              </div>
                {/* color button */}

                <div className="modal-footer">
                <button className="btn btn-light" type="button" data-bs-dismiss="modal">Annuler</button>
                <button className="btn btn-primary" type="submit">Soumettre</button>
                </div>
                </form>
              </div>
            </div>
          </div></div>
        <hr className="mx-4" />
        <div className="mb-5">
          <h1 className="text-center">Getting started</h1>
          <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><button className="btn btn-primary mx-auto mt-5 btn-lg" type="button" style={{display: 'block', fontSize: '24px'}}>Accédez à la documentation</button>
        </div>
        <Footer/>

      </div>
        )
    }
}
export default Project;