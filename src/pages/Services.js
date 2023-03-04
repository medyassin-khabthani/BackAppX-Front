import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Pricing extends Component {
  constructor(props){
    super(props);

  }

    render() {
        return (
            <div className="wrapper">
            <Header />
            <section id="services" className="services">
        <div className="container-md section-title pt-5">
          <div className="text-center">
            <h2 style={{color: '#75aadb'}}>Nous offrons les meilleurs<span style={{color: '#f15c57'}}><strong>&nbsp;Services</strong></span></h2>
            <p className="d-inline-block" style={{width: '50%'}}><strong>Ut possimus qui ut temporibus culpa velit eveniet modi omnis est adipisci expedita at voluptas atque vitae autem.</strong><br />&nbsp; &nbsp;&nbsp;</p>
          </div>
          <div className="row">
            <div className="col-12 text-center col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="text-center icon-box">
                <div className="icon"><i className="fa fa-lock" style={{marginBottom: '15px'}} />
                  <h4 className="title">Authentification<a href="#" /></h4>
                  <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi<br />&nbsp; &nbsp; &nbsp;&nbsp;</p>
                </div>
              </div>
            </div>
            <div className="col-12 text-center col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="text-center icon-box">
                <div className="icon"><i className="fa fa-database" style={{marginBottom: '15px'}} />
                  <h4 className="title">Storage<a href="#" /></h4>
                  <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi<br />&nbsp; &nbsp; &nbsp;&nbsp;</p>
                </div>
              </div>
            </div>
            <div className="col-12 text-center col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="text-center icon-box">
                <div className="icon"><i className="fa fa-link" style={{marginBottom: '15px'}} />
                  <h4 className="title">Générateur Api<a href="#" /></h4>
                  <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi<br />&nbsp; &nbsp; &nbsp;&nbsp;</p>
                </div>
              </div>
            </div>
            <div className="col-12 text-center col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="text-center icon-box">
                <div className="icon"><i className="fa fa-envelope" style={{marginBottom: '15px'}} />
                  <h4 className="title">Mailing<a href="#" /></h4>
                  <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi<br />&nbsp; &nbsp; &nbsp;&nbsp;</p>
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
export default Pricing;