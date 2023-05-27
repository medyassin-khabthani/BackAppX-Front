import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeaderDashbaord = () => {

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectName,setProjectName] = useState('');

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      fetch('https://backappx.onrender.com/user/userData', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          token: window.localStorage.getItem('token'),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToken(window.localStorage.getItem('token'));
          setUserData(data?.data);
        });
    }
    const projectId = window.localStorage.getItem('projectId');
    fetch(`https://backappx.onrender.com/project/project/${projectId}`)
    .then((res) => res.json())
    .then((data) => {
        setProjectName(data?.project.name);
      })
  }, []);

  function disconnect() {
    window.localStorage.clear();
    window.location.href = './';
  }

  const isLoggedIn = window.localStorage.getItem('isLoggedIn');


  return (
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top border-0">
                    <div className="container-fluid">
                    <h4 className='d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search'>
                            {projectName}
                        </h4>
                            
                        <ul className="navbar-nav flex-nowrap ms-auto">

                            <div className="d-none d-sm-block topbar-divider"></div>
                            <li className="nav-item dropdown no-arrow">
                                <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="index.html"><span className="d-none d-lg-inline me-2 text-gray-600 small">{userData.name}</span><img className="border rounded-circle img-profile" src={userData.image} alt="avatar" /></a>
                                    <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a className="dropdown-item" href="/"><i className="fas fa-globe fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;BackAppx</a><a className="dropdown-item" href="./edit-profile"><i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Profile</a><a className="dropdown-item" href="https://back-app-x-documentation.vercel.app" target="_blank"><i className="fas fa-hashtag fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Docs</a>
                                        <div className="dropdown-divider"></div><a className="dropdown-item" onClick={disconnect}><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>&nbsp;Logout</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                      </div>
                   </nav>
                  )
            }
        
export default HeaderDashbaord;
