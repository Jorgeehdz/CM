import React, {Component} from 'react';
import fire, {db}  from '../firebase/config';
class Coordinador extends Component {
    state = {
        details: []
    }

    logout() {
        fire.auth().signOut();
    }

    componentDidMount(){
        this.getUserData()
    }

    getUserEmail(){
        var user = fire.auth().currentUser;
        var email = '';
        email = user.email;
        return email;
    }

    getUserData(){
        var user = fire.auth().currentUser;
        if(user) {
            db().collection('users').doc(user.uid.toString()).get().then((snapshots) => {
              this.setState({userData: snapshots.data()})
            }) 
          } else {
            this.setState({user: null, userUid: null, userData: null});
          }
    }

    render() {
        return(
            <div>
                <h1>Pagina del Coordinador</h1>
                <button onClick= {this.logout}>Logout</button>
            </div>
        )
    }
}

export default Coordinador;