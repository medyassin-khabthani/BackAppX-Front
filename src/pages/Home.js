import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends Component {
    render() {
        return (
            <div className="wrapper">
            <Header />
            <section>
          {/* Start: Parallax Background */}
          <div data-bss-parallax-bg="true" style={{height: '600px', background: 'url("assets/img/Groupe%2022.png") center / cover no-repeat'}}>
            <div className="row h-100">
              <div className="col-md-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                <div>
                  <h2 className="text-uppercase fw-bold text-light mb-3">Biben dum<br />fringi dictum, augue purus</h2>
                  <p className="text-light mb-4">Etiam a rutrum, mauris lectus aptent convallis. Fusce vulputate aliquam, sagittis odio metus. Nulla porttitor vivamus viverra laoreet, aliquam netus.</p><button className="btn btn-primary fs-5 border-primary me-2 py-2 px-4" type="button" style={{borderRadius: 0, borderTopLeftRadius: '16px', borderBottomRightRadius: '16px', background: '#F15C57'}}>Start Building</button>
                </div>
              </div>
            </div>
          </div>{/* End: Parallax Background */}
        </section>
        <section style={{padding: '20px', paddingTop: '16px'}}>
          {/* Start: 1 Row 2 Columns */}
          <div className="container" style={{paddingTop: '28px', paddingBottom: '6px', margin: '0px'}}>
            <div className="row">
              <div className="col-md-6">
                <h3 className="fw-bold" data-aos="fade-right" data-aos-once="true">BIBEN DUM</h3>
                <p data-aos="fade-right" data-aos-delay={50} data-aos-once="true">Erat netus est hendrerit, nullam et quis ad cras porttitor iaculis. Bibendum vulputate cras aenean.</p><a className="btn btn-outline-primary btn-sm fs-6 border rounded-pill border-2 border-primary py-2 px-4" role="button" data-aos="fade-right" data-aos-delay={100} data-aos-once="true" style={{width: '265.4px'}}>Discover our features</a>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center align-items-md-start align-items-xl-center" data-aos="fade-left" data-aos-once="true">
                  <div className="bs-icon-xl bs-icon-circle d-flex flex-shrink-0 justify-content-center align-items-center me-4 d-inline-block bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg></div>
                  <div>
                    <h4>Title</h4>
                    <p>Erat netus est hendrerit, nullam et quis ad cras porttitor iaculis. Bibendum vulputate cras aenean.</p><a href="#">Learn More&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg></a>
                  </div>
                </div>
                <hr className="my-5" />
                <div className="d-flex align-items-center align-items-md-start align-items-xl-center" data-aos="fade-left" data-aos-delay={50} data-aos-once="true">
                  <div className="bs-icon-xl bs-icon-circle d-flex flex-shrink-0 justify-content-center align-items-center me-4 d-inline-block bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-inbox-fill">
                      <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z" />
                    </svg></div>
                  <div>
                    <h4>Title</h4>
                    <p>Erat netus est hendrerit, nullam et quis ad cras porttitor iaculis. Bibendum vulputate cras aenean.</p><a href="#">Learn More&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg></a>
                  </div>
                </div>
                <hr className="my-5" />
                <div className="d-flex align-items-center align-items-md-start align-items-xl-center" data-aos="fade-left" data-aos-delay={100} data-aos-once="true">
                  <div className="bs-icon-xl bs-icon-circle d-flex flex-shrink-0 justify-content-center align-items-center me-4 d-inline-block bs-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-window-fullscreen">
                      <path fillRule="evenodd" d="M.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H.5ZM1 5V2h14v3H1Zm0 1h14v8H1V6Zm2-2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
                    </svg></div>
                  <div>
                    <h4>Title</h4>
                    <p>Erat netus est hendrerit, nullam et quis ad cras porttitor iaculis. Bibendum vulputate cras aenean.</p><a href="#">Learn More&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg></a>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* End: 1 Row 2 Columns */}
        </section>
        <section>
          {/* Start: Pricing Duo */}
          <div data-bss-parallax-bg="true" style={{height: '500px', background: 'url("assets/img/Groupe%2024.png") center / cover no-repeat'}}>
            <div className="container py-4 py-xl-5">
              {/*             <div class="row mb-5">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h2 data-aos="fade-up" data-aos-once="true" style="color:white;">Heading</h2>
                    <p data-aos="fade-up" data-aos-delay="100" data-aos-once="true" style="color:white;">Curae hendrerit donec commodo hendrerit egestas tempus, turpis facilisis nostra nunc. Vestibulum dui eget ultrices.</p>
                </div>
            </div> */}
              <div className="card mx-auto px-4 shadow rounded-5" style={{width: '900px'}}>
                <div className="card-body">
                  <div className="bs-icon-xl bs-icon-circle d-flex flex-shrink-0 justify-content-center align-items-center mb-2 mx-auto d-inline-block bs-icon ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                      <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                    </svg>
                  </div>
                  <h2 className="card-subtitle mb-2 text-center fw-bold" style={{color: '#F15C57'}}>Premium Pack</h2>
                  <p className="card-text text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                  <hr style={{borderTop: '1px solid #8c8b8b'}} className="mx-5 my-5" />
                  <h2 className="text-center" style={{color: '#EC1D6A'}}>40.00 <span style={{fontSize: 'larger'}}>$</span></h2><h2>
                    <div>
                      <div className="mt-3 text-center mx-auto "><a className="btn btn-primary fs-5 border-primary me-2 py-2 px-4 rounded-4" role="button" target="_blank" style={{background: '#F15C57', width: '300px'}}>J'en profite</a></div>
                    </div>
                  </h2></div>
              </div>
            </div>{/* End: Pricing Duo */}
          </div>
        </section>
        <section>
          <div className="row my-3">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>Heading</h2>
              <p>Curae hendrerit donec commodo hendrerit egestas tempus, turpis facilisis nostra nunc. Vestibulum dui eget ultrices.</p>
            </div>
          </div>
          <div className="container">
            {/* Start: List-group show-hide div content on-click */}
            <div className="row">
              <div className="col-lg-4" style={{paddingRight: 0}}>
                <div className="list-group rounded-left" style={{backgroundColor: '#F8F8F8'}}>
                  <a className="list-group-item list-group-item-action py-4 text-center" href="#list-auth" data-bs-toggle="list">Authentification</a>
                  <a className="list-group-item list-group-item-action py-4 text-center" href="#list-api" data-bs-toggle="list">Api Usage</a>
                  <a className="list-group-item list-group-item-action py-4 text-center" href="#list-image" data-bs-toggle="list">Save Image</a>
                  <a className="list-group-item list-group-item-action py-4 text-center" href="#list-data" data-bs-toggle="list">Querying Data</a>
                  <a className="list-group-item list-group-item-action py-4 text-center" href="#list-func" data-bs-toggle="list">Calling functions</a>
                </div>
              </div>
              <div className="col" style={{paddingLeft: 0}}>
                <div className="border-1 tab-content">
                  <div className="bg-muted bg-gradient shadow-sm tab-pane fade" id="list-auth" role="tabpanel" style={{padding: '10px', height: '366px', backgroundColor: '#F1F3F4'}}>
                    <p>first</p>
                  </div>
                  <div className="bg-muted bg-gradient shadow-sm tab-pane fade" id="list-api" role="tabpanel" style={{padding: '10px', height: '366px', backgroundColor: '#F1F3F4'}}>
                    <p>second</p>
                  </div>
                  <div className="bg-muted bg-gradient shadow-sm tab-pane fade" id="list-image" role="tabpanel" style={{padding: '10px', height: '366px', backgroundColor: '#F1F3F4'}}>
                    <p>third</p>
                  </div>
                  <div className="bg-muted bg-gradient shadow-sm tab-pane fade" id="list-data" role="tabpanel" style={{padding: '10px', height: '366px', backgroundColor: '#F1F3F4'}}>
                    <p>fourth</p>
                  </div>
                  <div className="bg-muted bg-gradient shadow-sm tab-pane fade" id="list-func" role="tabpanel" style={{padding: '10px', height: '366px', backgroundColor: '#F1F3F4'}}>
                    <p>fifth</p>
                  </div>
                </div>
              </div>
            </div>{/* End: List-group show-hide div content on-click */}
          </div>
          <div className="row mb-5" style={{marginTop: '16px'}}>
            <div className="col-md-8 col-xl-6 text-center mt-3 mx-auto"><a className="btn btn-primary fs-5  me-2 py-2 px-4" role="button" target="_blank" style={{background: '#1C7BA5', borderColor: '#1C7BA5'}}>Visit Documentation</a></div>
          </div>
        </section>{/* Start: Hero Banner Color */}
        <section className="py-2">
          <div data-bss-parallax-bg="true" style={{height: '500px', backgroundImage: 'url("assets/img/Groupe%2025.png")', backgroundRepeat: 'repeat', backgroundSize: 'cover', backgroundPosition: ''}}>
            <div className="container h-100">
              <div className="row h-100">
                <div className="col-md-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                  <div>
                    <img className="img-fluid" src="assets/img/logo.png" style={{width: '300px'}} />
                    <h2 className="my-4 fw-bold">Don't waste your time</h2>
                    <h5 className="my-4">We will make it easy for you</h5>
                    <div>
                      <div className="mt-3 text-center mx-auto "><a className="btn btn-primary fs-5 border-primary me-2 py-2 px-4 rounded-4" role="button" target="_blank" style={{background: '#F15C57', width: '300px'}}>Start building</a></div>
                    </div>                        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
            <Footer />
            </div>
        )
    }
}
export default Home;