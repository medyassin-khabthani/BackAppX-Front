import React, { useState, useEffect } from 'react';
import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

function GithubRepos() {
    const [userData, setUserData] = useState('');
    const [repositories,setRepositories] = useState([]);
    const [username,setUsername] = useState('');

    useEffect(() => {
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
                setUserData(data?.data);
                if(data?.data.provider === "github" || data?.data.githubUsername !== null ){
                    fetchGithubRepos(data?.data.githubUsername)
                }
            });
    }, []);

    function connectGithub(e){
        e.preventDefault()
        console.log(username)
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.login != null){
                    handleUpdate(data?.login,data?.id)
                }else{
                    alert("not found")
                }
            });
        }

    function fetchGithubRepos(usernameGit){
        fetch(`https://api.github.com/users/${usernameGit}/repos`)
            .then((res) => res.json())
            .then((data) => {

                const newArray = data?.map(obj => ({
                    full_name: obj.full_name.split("/")[1],
                    updated_at: obj.updated_at,
                    language: obj.language
                  }));
                  const sortedRepositories = newArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setRepositories(sortedRepositories);
            });
    }

    function handleUpdate(usernameGit,gitId){
console.log("1")
      
        fetch(`http://127.0.0.1:9092/user/profileGit/${userData._id}`,{
          method:"PUT",
          crossDomain:true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
          },
          body: JSON.stringify({
            githubUsername: usernameGit,
            gitId: gitId
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status == "updated"){ 
            console.log(data)
            window.localStorage.setItem("token",data?.token)
            console.log(usernameGit,gitId)

              window.location.href="./github-repos"
           }
          
    
        })
      }
      

    function timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 1) {
          return `${days} days ago`;
        } else if (days === 1) {
          return '1 day ago';
        } else if (hours > 1) {
          return `${hours} hours ago`;
        } else if (hours === 1) {
          return '1 hour ago';
        } else if (minutes > 1) {
          return `${minutes} minutes ago`;
        } else if (minutes === 1) {
          return '1 minute ago';
        } else {
          return 'just now';
        }
      }

    return (
           
  <><script src="assetsDash/bootstrap/js/bootstrap.min.js"></script><script src="assetsDash/js/chart.min.js"></script><script src="assetsDash/js/bs-init.js"></script><script src="assetsDash/js/theme.js"></script><script src="assetsDash/js/jquery.min.js"></script><script src="assetsDash/js/bootstrap.bundle.min.js"></script><script src="assetsDash/js/script.js"></script><link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /><link rel="stylesheet" href="assetsDash/bootstrap/css/bootstrap.min.css" /><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap" /><link rel="stylesheet" href="assetsDash/fonts/fontawesome-all.min.css" /><link rel="stylesheet" href="assetsDash/fonts/ionicons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/material-icons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/typicons.min.css" /><link rel="stylesheet" href="assetsDash/css/card-3-column-animation-shadows-images.css" /><link rel="stylesheet" href="assetsDash/css/animate.min.css" /><link rel="stylesheet" href="assetsDash/css/style.css" /><link rel="stylesheet" href="assetsDash/css/News-Cards.css" /><link rel="stylesheet" href="assetsDash/css/Tabbed-Panel-tabbed-panel.css" />
           <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                        <HeaderDashboard />
                 <div className="container-fluid">
                <h3 className="text-dark mb-4">Github Repositories</h3>
                { userData.githubUsername == null ?
                (
                <div className='container'>
                <center>
                <a href="#myModal"  data-bs-toggle="modal" style={{textDecoration: 'none'}}>
                <button type="button" className="btn btn-dark">Connect to Github</button>
                </a>
                </center>
                </div>
                )
                :
                (<div className="card shadow">
                    <div className="card-header py-3 d-flex">
                        <p className="text-primary m-0 fw-bold" style={{  bsprimary: '#00a0c4', bsprimaryrgb: '0,160,196' }}><span style={{ fontweight: 'normal !important', color: 'rgba(var(--bs-dark-rgb), var(--bs-text-opacity))' }}>{userData.githubUsername}</span></p>
                    </div>
                    <div className="card-body">
                        <section>
                        {repositories.map((repository) => (
                            <div className="container p-0 mb-3" key={repository.full_name}>

                            <div className="list-group">
                            <a className="list-group-item list-group-item-action flex-column align-items-start" href={`https://github.com/${userData.githubUsername}/${repository.full_name}`} target="_blank">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{repository.full_name}</h5>
                                <small>updated {timeAgo(repository.updated_at)}</small>
                            </div>
                            <small className="text-muted">{repository.language}</small>
                            </a>
                            </div>
                            </div>
                            
                                           
                        ))}
                        </section>
                    </div>
                </div>)
                }

                </div>
                </div>



                <div id="myModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={connectGithub}>
                <div className="modal-header">
                  <h4>Veuillez remplir les champs</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">

                        <div className="form-floating">
                        <input
                            className="form-control"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            style={{ marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px' }}
                        
                            
                            />
                        <label className="form-label text-secondary" htmlFor="username">Username</label>
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
    
export default GithubRepos;