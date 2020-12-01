import React, { Component} from 'react'
import './App.css'
import Login from  './login/components/FormLogin'
import Cliente from './pages/Clientes'
import Asesor from './pages/Asesor'
import Admin from './pages/Admin'
import FormCitas from'./pages/FormCitas.js';
import Coordinador from './pages/Coordinador'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import fire, {db} from './firebase/config.js'
import backImage from './images/bg.jpg';

class App extends Component {
  constructor(props)  {
    super(props);
    this.wrapper = React.createRef();

    this.state = {
      user: null,
      userData: null
    }
  }

  componentDidMount(){
    this.authListener();
  }
  
  componentWillUnmount(){
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        db().collection('users').doc(user.uid.toString()).get().then((snapshots) => {
          this.setState({userData: snapshots.data(),
            user})
        }) 
      } else {
        this.setState({user: null, userUid: null, userData: null});
      }
    })
  }

  render() {
    const {user, userData} = this.state;
    return (
        <div className= 'App' ref={this.wrapper}>
            <body className = 'bodyapp'>
              {user ? (userData.userType === 'admin' ? (<Asesor />) : (
                userData.userType === 'coordinador' ? (<Coordinador />) : (
                  userData.userType === 'asesor' ? (<Asesor />) : (
                    userData.userType === 'cliente' ? (<Cliente />) :(<Login/>))))) : (<Login/>)}
            </body>
        </div>
      )
  }
}

export default App;