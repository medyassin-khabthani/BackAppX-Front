import React, { useState, useEffect } from 'react';
import { Viewer,Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

const Storage = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [defaultScale] = useState(1);
  useEffect(() => {
    let projectId = window.localStorage.getItem("projectId");
    fetch(`http://127.0.0.1:9092/project/images/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status == "ok"){
          setFiles(data?.images);
        }
      });
  }, []);

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append('file', file);
    let projectId = window.localStorage.getItem("projectId");

    fetch(`http://127.0.0.1:9092/project/upload/${projectId}`, {
      method: 'PUT',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status == "ok") {
          console.log("worked!!!!!")
          /* window.location.href="./storage" */
        }
      });
  };

  const handleFileClick = (file) => {
    let projectId = window.localStorage.getItem("projectId");
    setUrl(`http://localhost:9092/project/file/${projectId}/${file.name}`);
    setFileType(file.type);
    console.log(url, fileType)
  };

  const deleteFile = (id) => {
    let projectId = window.localStorage.getItem("projectId");
    fetch(`http://127.0.0.1:9092/project/image/${projectId}/${id}`, {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status == "deleted") {
          window.location.href = "./storage";
        }
      });
  };

  return (
            <><script src="assetsDash/bootstrap/js/bootstrap.min.js"></script><script src="assetsDash/js/chart.min.js"></script><script src="assetsDash/js/bs-init.js"></script><script src="assetsDash/js/theme.js"></script><script src="assetsDash/js/jquery.min.js"></script><script src="assetsDash/js/bootstrap.bundle.min.js"></script><script src="assetsDash/js/script.js"></script><link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /><link rel="stylesheet" href="assetsDash/bootstrap/css/bootstrap.min.css" /><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap" /><link rel="stylesheet" href="assetsDash/fonts/fontawesome-all.min.css" /><link rel="stylesheet" href="assetsDash/fonts/ionicons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/material-icons.min.css" /><link rel="stylesheet" href="assetsDash/fonts/typicons.min.css" /><link rel="stylesheet" href="assetsDash/css/card-3-column-animation-shadows-images.css" /><link rel="stylesheet" href="assetsDash/css/animate.min.css" /><link rel="stylesheet" href="assetsDash/css/style.css" /><link rel="stylesheet" href="assetsDash/css/News-Cards.css" /><link rel="stylesheet" href="assetsDash/css/Tabbed-Panel-tabbed-panel.css" />
               <div id="wrapper">
                <NavLeftDashboard />
                <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                        <HeaderDashboard />
                <div className="container-fluid">
                <h3 className="text-dark mb-4">Storage</h3>

                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold" style={{ bsprimary: '#00a0c4', bsprimaryrgb: '0,160,196' }}><span style={{ fontweight: 'normal !important', color: 'rgba(var(--bs-dark-rgb), var(--bs-text-opacity))' }}>Storage</span></p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 col-xxl-7 text-nowrap"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" style={{ width: '326.825px' }} /></div>
                            <div className="col-md-6 col-xxl-4">
                                <div className="text-end text-md-end dataTables_filter" id="dataTable_filter">
                                    <div></div><a href="#myModal"  data-bs-toggle="modal" style={{textDecoration: 'none'}}><button className="btn" type="button" style={{ background: 'rgb(241, 92, 87)',color:'white', padding: '6px 12px', primary: '#00a0c4', bsprimaryrgb: '0,160,196', bordercolor: '#00a0c4', paddingleft: '15px', marginleft: '-3px', paddingtop: '3px', width: '176.587px' }}>Ajouter un fichier</button></a><label className="form-label"></label>
                                </div>
                            </div>

                        </div>
                        <div className="table-responsive table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                            <table className="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Nom du fichier</th>
                                        <th>Taille</th>
                                        <th>Type</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                    {files.reverse().map((file) => (

                                    <tr key={file._id}>
                                        <td>
                                        <a href="#fileModal" data-bs-toggle="modal" onClick={() => handleFileClick(file)}>
                                        {
                                            file.type === "png" || file.type === "jpg" || file.type === "jpeg" || file.type === "gif" ?
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-64 0 512 512" width="1em" height="1em" fill="currentColor">
                                            <path d="M224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128zM96 224c17.67 0 32 14.33 32 32S113.7 288 96 288S64 273.7 64 256S78.33 224 96 224zM318.1 439.5C315.3 444.8 309.9 448 304 448h-224c-5.9 0-11.32-3.248-14.11-8.451c-2.783-5.201-2.479-11.52 .7949-16.42l53.33-80C122.1 338.7 127.1 336 133.3 336s10.35 2.674 13.31 7.125L160 363.2l45.35-68.03C208.3 290.7 213.3 288 218.7 288s10.35 2.674 13.31 7.125l85.33 128C320.6 428 320.9 434.3 318.1 439.5zM256 0v128h128L256 0z"></path>
                                        </svg> 
                                            :
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-pdf" viewBox="0 0 16 16"> <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/> <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"/> </svg> 
                                        }
                                        &nbsp;{file.name}</a></td>
                                        <td>{file.sizeInKB}KB</td>
                                        <td>{file.type}</td>
                                        <td><a onClick={()=> setId(file.name) } href="#deleteModal" data-bs-toggle="modal"><i className='far fa-trash-alt' style={{fontSize:"16px" ,color:"rgb(241, 92, 87)",marginLeft:"auto",marginRight:"10px"}} /></a></td>

                                    </tr>
                                                   ))}

                                </tbody>
                                <tfoot>
                                    <tr></tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
                </div>

                <div id="myModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h4>Ajouter un fichier</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    <div className='center my-3'>
                    <input className="form-control d-inline form-control" style={{width:"400px"}} type="file" onChange={handleImageUpload} name="avatar-file" accept="image/*,application/pdf" required/>
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

          <div id="deleteModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form >
                <div className="modal-header">
                  <h4>Voulez vous supprimer ce fichier ?</h4><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                </div>

                <div className="modal-footer">
                <button className="btn btn-light" type="button" data-bs-dismiss="modal">Annuler</button>
                <button className="btn btn-primary" onClick={deleteFile(id)} type="submit">Confirmer</button>
                </div>
                </form>
              </div>
            </div>
          </div>

            <div id="fileModal" className="modal fade" role="dialog" tabIndex={-1}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
              {
            fileType == "pdf" ?
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={url} />
            </Worker>
                            :
            <img src={url} />


              }
              </div>
            </div>
          </div>

          

                    


                    <FooterDashboard />

                    </div>

            </div></>
              

            )
        }
    
export default Storage;