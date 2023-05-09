import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Loading extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount(){
    fetch('http://localhost:9092/user/login/success')
    .then(response => response.json())
    .then(data => {
        if (data?.message =="ok"){
          console.log("jawek behi")
          window.localStorage.setItem("token",data?.token)
          window.localStorage.setItem("isLoggedIn",true)
          window.localStorage.setItem("provider",data?.provider)
          if (data?.firstLogin == true){
            window.location.href="/edit-profile"
          } else{

            window.location.href="/"
          }

        }else{
          console.log("ERROR")
        }
    })
    .catch(error => {
      console.error(error);
    }); 
}


 
    render() {
        return (
            <div className='container'>
                <h1>Redirecting to website...</h1>
            </div>
            
        )
    }
}
export default Loading;