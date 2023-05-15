import React, { useState, useEffect } from 'react';
import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';
import Select from "react-select";

function ApiGenerator() {
    const [userData, setUserData] = useState('');
    const [alertText,setAlertText] = useState('');
    const [provider,setProvider] = useState('');
    const [username,setUsername] = useState('');
/*     const [repository,setRepository] = useState('');
 */    const [token,setToken] = useState('');
    const [checkCrud,setCheckCrud] = useState(false);
    const [checkPayment,setCheckPayment] = useState(false)
    const [repositories,setRepositories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState([]);

  

    useEffect(() => {
        fetch("https://backappx.onrender.com/user/userData",{
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
                console.log(data?.data.apiGen)
                if (data?.data.apiGen == 3){
                    setCheckCrud(true)
                    setCheckPayment(true)
                }
                if (data?.data.provider == "github" || data?.data.githubUsername != null ){
                    setUsername(data?.data.githubUsername)
                    console.log(data?.data.provider);
                    fetchGithubRepos(data?.data.githubUsername)                    
                }
            });
    }, []);

    function fetchGithubRepos(usernameGit){
        fetch(`https://api.github.com/users/${usernameGit}/repos`)
            .then((res) => res.json())
            .then((data) => {

                const newArray = data?.map(obj => ({
                    full_name: obj.full_name.split("/")[1],
                    updated_at: obj.updated_at,
                    language: obj.language,
                    size: obj.size
                  }));
                  const sortedRepositories = newArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                  const optionsRep = sortedRepositories
                    .filter((repository) => repository.size === 0)
                    .map((repository) => ({
                    value: repository.full_name,
                    label: repository.full_name
                    }));
                    console.log(optionsRep);
                    setOptions(optionsRep);
                  setRepositories(sortedRepositories);
            });
    }

    function apiGen(apiType,userID){
        fetch("https://backappx.onrender.com/apiGenerator/",{
            method:"POST",
            crossDomain:true,
            headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
            body: JSON.stringify({
            api_type:apiType,
            user_id:userID
        }),
        })
            .then((res) => res.json())
            .then((data) => {
                setAlertText(data);
            });
    }
    // const pushApi = (e) =>{
    //     e.preventDefault();

        
    //     const repository = selectedOptions.value;
    //     console.log(repository,username,token,userData._id)
    //     fetch("http://127.0.0.1:9092/apiGenerator/push",{
    //         method:"POST",
    //         crossDomain:true,
    //         headers:{
    //         "Content-Type":"application/json",
    //         Accept:"application/json",
    //         "Access-Control-Allow-Origin":"*",
    //     },
    //         body: JSON.stringify({
    //         username:username,
    //         repository:repository,
    //         token:token,
    //         user_id:userData._id
    //     }),
    //     })
    //         .then((res) => {
    //             res.json()

    //         })
    //         .then((data) => {
    //             setAlertText(data);
    //             alert(data?.message);
    //             console.log(data)

    //         });
    // }
    
     const pushApi = (e) =>{
         e.preventDefault();

        
         const repository = selectedOptions.value;
    fetch("https://backappx.onrender.com/apiGenerator/push",{
    method:"POST",
    crossDomain:true,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
    },
    body: JSON.stringify({
        username:username,
        repository:repository,
        token:token,
        user_id:userData._id
    }),
})
.then((res) => {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res.json();
})
.then((data) => {
    setAlertText(data);
    alert(data?.message);
    if (data?.message == "Git commands executed successfully!"){
    window.location.href="./apigene"
    }
    console.log(data);
})
.catch((error) => {
    console.error(error);
    alert('Please try again.');
});
     }

/*     const restart = (e) =>{
        e.preventDefault();

        
        const repository = selectedOptions.value;
        console.log(repository,username,token,userData._id)
        fetch("http://127.0.0.1:9092/apiGenerator/restart",{
            method:"POST",
            crossDomain:true,
            headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
            body: JSON.stringify({
            user_id:userData._id
        }),
        })
            .then((res) => {
                res.json()

            })
            .then((data) => {
                setAlertText(data);
                alert(data);
            });
    } */
/*     const run = (e) =>{
        e.preventDefault();

        
        const repository = selectedOptions.value;
        console.log(repository,username,token,userData._id)
        fetch("http://127.0.0.1:9092/apiGenerator/deploy",{
            method:"POST",
            crossDomain:true,
            headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
            body: JSON.stringify({
            user_id:userData._id
        }),
        })
            .then((res) => {
                res.json()

            })
            .then((data) => {
                setAlertText(data);
                alert(data);
            });
    } */
/*     const stop = (e) =>{
        e.preventDefault();

        
        const repository = selectedOptions.value;
        console.log(repository,username,token,userData._id)
        fetch("http://127.0.0.1:9092/apiGenerator/stop",{
            method:"POST",
            crossDomain:true,
            headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
            body: JSON.stringify({
            user_id:userData._id
        }),
        })
            .then((res) => {
                res.json()

            })
            .then((data) => {
                setAlertText(data);
                alert(data);
            });
    } */

    const run = (e) =>{
        e.preventDefault();

        
   fetch("https://backappx.onrender.com/apiGenerator/deploy",{
   method:"POST",
   crossDomain:true,
   headers:{
       "Content-Type":"application/json",
       Accept:"application/json",
       "Access-Control-Allow-Origin":"*",
   },
   body: JSON.stringify({
       user_id:userData._id
   }),
})
.then((res) => {
   if (!res.ok) {
       throw new Error(res.statusText);
   }
   return res.json();
})
.then((data) => {
   setAlertText(data);
   alert("API is running");

   console.log(data);
})
.catch((error) => {
   console.error(error);
   alert('Please try again');
});
    
    }

    const restart = (e) =>{
        e.preventDefault();

        
   fetch("https://backappx.onrender.com/apiGenerator/restart",{
   method:"POST",
   crossDomain:true,
   headers:{
       "Content-Type":"application/json",
       Accept:"application/json",
       "Access-Control-Allow-Origin":"*",
   },
   body: JSON.stringify({
       user_id:userData._id
   }),
})
.then((res) => {
   if (!res.ok) {
       throw new Error(res.statusText);
   }
   return res.json();
})
.then((data) => {
   setAlertText(data);
   alert("API has restarted");
   console.log(data);
})
.catch((error) => {
   console.error(error);
   alert('please try again');
});
    
    }

    const stop = (e) =>{
        e.preventDefault();

        
   fetch("https://backappx.onrender.com/apiGenerator/stop",{
   method:"POST",
   crossDomain:true,
   headers:{
       "Content-Type":"application/json",
       Accept:"application/json",
       "Access-Control-Allow-Origin":"*",
   },
   body: JSON.stringify({
       user_id:userData._id
   }),
})
.then((res) => {
   if (!res.ok) {
       throw new Error(res.statusText);
   }
   return res.json();
})
.then((data) => {
   setAlertText(data);
   alert("API stopped successfully");
   console.log(data);
})
.catch((error) => {
   console.error(error);
   alert("Please try again");
});
    
    }

    function generateCrud(){
        apiGen("crud",userData._id);
        window.location.href="/apiGene"
    } 
    function generatePayment(){
        apiGen("payment",userData._id);
        window.location.href="/apiGene"
    } 
    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        console.log(selectedOptions);
      };
    return (
           
  <><script src="assetsDash/bootstrap/js/bootstrap.min.js"></script><script src="assetsDash/js/chart.min.js"></script><script src="assetsDash/js/bs-init.js"></script><script src="assetsDash/js/theme.js"></script><script src="assetsDash/js/jquery.min.js"></script><script src="assetsDash/js/bootstrap.bundle.min.js"></script><script src="assetsDash/js/script.js"></script><link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /><link rel="stylesheet" href="assetsDash/bootstrap/css/bootstrap.min.css" /><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap" /><link rel="stylesheet" href="assetsDash/fonts/fontawesome-all.min.css" /><link rel="stylesheet" href="assetsDash/fonts/ionicons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/material-icons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/typicons.min.css" /><link rel="stylesheet" href="assetsDash/css/card-3-column-animation-shadows-images.css" /><link rel="stylesheet" href="assetsDash/css/animate.min.css" /><link rel="stylesheet" href="assetsDash/css/style.css" /><link rel="stylesheet" href="assetsDash/css/News-Cards.css" /><link rel="stylesheet" href="assetsDash/css/Tabbed-Panel-tabbed-panel.css" />
           <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                        <HeaderDashboard />
                 <div className="container-fluid">
                <h3 className="text-dark mb-4">Api Generator</h3>
                <div className="card shadow">
                    <div className="card-header py-3 d-flex">
                        <p className="text-primary m-0 fw-bold" style={{  bsprimary: '#00a0c4', bsprimaryrgb: '0,160,196' }}><span style={{ fontweight: 'normal !important', color: 'rgba(var(--bs-dark-rgb), var(--bs-text-opacity))' }}>Api Generator</span></p>
                            {
                                userData.apiGen == 0?
                                <div></div>
                                :  
                                <div>

                        <button className="btn btn-sm" onClick={stop} type="button" style={{ marginLeft:"60px", color:'white', background:'rgb(241, 92, 87)'}}><i className="fa fa-stop" /></button><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button>
                        <button className="btn btn-sm" onClick={restart} type="button" style={{ marginLeft:"auto", color:'white', background:'rgb(241, 92, 87)'}}><i className="fa fa-repeat" /></button><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button>
                        <button className="btn btn-sm" onClick={run} type="button" style={{ marginLeft:"auto", color:'white', background:'rgb(241, 92, 87)'}}><i className="fa fa-play" /></button><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button>
                        </div>

                            }

                        
                        {
                            userData.apiGen > 0 && userData.apiGen < 3? 
                            (<div style={{ marginLeft:"auto"}}>
                                <a href="#myModal"  data-bs-toggle="modal" style={{textDecoration: 'none'}}>
                            <button disabled={checkCrud} title='you need to generate to be able to push' className="btn" type="button" style={{ marginLeft:"auto", color:'white', background:'rgb(241, 92, 87)'}}>Push</button><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button>
                            </a>
                            </div>
                            )
                            :
                            (
                            <div style={{ marginLeft:"auto"}}>
                            <button disabled title='you need to generate to be able to push' className="btn" type="button" style={{ marginLeft:"auto", color:'white', background:'rgb(241, 92, 87)'}}>Push</button><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button>
                            </div>
                            )
                        }
                    </div>
                    <div className="card-body">
                        <section>
                            <div className="container">
                                <div className="row">
                                    
                                    <div className="col-auto col-sm-12 col-md-12 col-lg-4 col-xl-4" style={{ paddingtop: '15px', paddingbottom: '15px', paddingright: '15px', paddingleft: '15px' }}>
                                        <div id="cardEntrada-2" className="p-4 text-center shadow-lg m-5 rounded-5" style={{ background: 'linear-gradient(171deg, #00a0c4 0%, var(--bs-indigo) 100%), var(--bs-purple)', width: '280px' }}><img className="pt-2 w-50" src="assetsDash/img/téléchargé-removebg-preview.png" alt="item" />
                                            <h3 className="text-white text-center pt-2">Crud Api</h3>
                                            <hr className="text-white" />
                                            {
                                                userData.apiGen === 1 ? (<div className="text-start col-12"><span className='text-success'>Generated</span><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button></div>):(<div className="text-start col-12"><button className="btn w-100 text-center" hidden={checkCrud} style={{ color:'white', background:'rgb(241, 92, 87)'}} onClick={generateCrud} type="button">Generate</button><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button></div>)

                                             }
                                            
                                        </div>
                                    </div>
                                    <div className="col-auto col-sm-12 col-md-12 col-lg-4 col-xl-4" style={{ paddingtop: '15px', paddingbottom: '15px', paddingright: '15px', paddingleft: '15px', marginright: '0px', marginbottom: '0px' }}>
                                        <div id="cardEntrada-1" className="p-4 text-center shadow-lg m-5 rounded-5" style={{ background: 'linear-gradient(171deg, #00a0c4 0%, var(--bs-indigo) 100%), #00a0c4', width: '280px' }}><img className="pt-2 w-50" src="assetsDash/img/147-1471182_credit-card-icon-circle.png" alt="item" />
                                            <h3 className="text-white text-center pt-2">Payement Api</h3>
                                            <hr className="text-white" />
                                             {
                                                userData.apiGen == 2 ? (<div className="text-start col-12"><span className='text-success'>Generated</span><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button></div>):(<div className="text-start col-12"><button className="btn w-100 text-center" type="button" hidden={checkPayment} onClick={generatePayment} style={{ color:'white', background:'rgb(241, 92, 87)'}}>Generate</button><button className="btn" type="button" data-bs-target="#modalRecibirCadaber" data-bs-toggle="modal"></button></div>)
                                             }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                </div>
                </div>


                <div id="myModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={pushApi}>
                <div className="modal-header">
                  <h4>Veuillez remplir les champs</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
     {/*            {showAlert && (
                  <div className={`alert ${alertColor} alert-dismissible w-100 fade show `} role="alert">
                    {alertText}
                    <button type="button" className="btn-close" onClick={() => this.setState({showAlert:false})}></button>
                  </div>
                      )} */}

 

                        <div className="form-floating">
                        <input
                            className="form-control"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            style={{ marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px' }}
                        
                            value={userData.provider === 'github' || userData.githubUsername != null ? username : ""}
                            
                            />
                        <label className="form-label text-secondary" htmlFor="username">Username</label>
                        </div>

                  

{/*                   <div className="form-floating">
                  <input className="form-control" id="repository"  onChange={(e)=> setRepository(e.target.value)} type="text" placeholder="Repository" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}}  />
                <label className="form-label text-secondary" htmlFor="repository">Repository</label>
                  </div> */}
                    <label className="form-label text-secondary" htmlFor="recipient">
                            Repository
                        </label>
                        <Select
                            options={options}
                            value={selectedOptions}
                            onChange={handleChange}
                            className="basic-multi-select mb-4"
                            classNamePrefix="select"
                        />
                  <div className="form-floating">
                  <input className="form-control" id="email"  onChange={(e)=> setToken(e.target.value)} type="text" placeholder="Github token" style={{marginBottom: '20px', paddingTop: '25px', paddingBottom: '12px'}}  />
                <label className="form-label text-secondary" htmlFor="email">Github token</label>
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
    
export default ApiGenerator;
