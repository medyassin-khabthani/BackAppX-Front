import React, {Component} from 'react';


import FooterDashboard from '../components/FooterDashboard';
import NavLeftDashboard from '../components/NavLeftDashboard';
import HeaderDashboard from '../components/HeaderDashboard';

class Authentification extends Component {

    render() {
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
                            <div className="col text-center"><button className="btn" type="button" style={{ background: 'rgb(241, 92, 87)',color:'white', padding: '6px 12px', primary: '#00a0c4', bordercolor: '#00a0c4', paddingleft: '15px', marginleft: '-3px', height: '31px', paddingtop: '3px' }}>Add User</button></div>
                        </div>
                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                            <table className="table my-0" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Identifiant</th>
                                        <th>Email</th>
                                        <th>Signed in</th>
                                        <th>Created at</th>
                                        <th>Rôle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img className="rounded-circle me-2" width="30" height="30" src="assetsDash/img/avatars/avatar1.jpeg" alt="avatar" />Airi Satou</td>
                                        <td>Airisatou@gmail.com</td>
                                        <td>2008/11/28</td>
                                        <td>2008/11/28</td>
                                        <td>Admin</td>
                                    </tr>
                                    <tr>
                                        <td><img className="rounded-circle me-2" width="30" height="30" src="assetsDash/img/avatars/avatar2.jpeg" alt="avatar" />Angelica Ramos</td>
                                        <td>Angelicaramos@gmail.com</td>
                                        <td>2009/10/09</td>
                                        <td>2009/10/09</td>
                                        <td>User</td>
                                    </tr>
                                    <tr></tr>
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

                    <FooterDashboard />

                    </div>

            </div></>
        
            )
        }
    }
export default Authentification;