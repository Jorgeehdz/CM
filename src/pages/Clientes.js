import React, {Component, Fragment} from 'react';
import fire, {db}  from '../firebase/config';

class Cliente extends Component{

    state = {
        details: []
    }

    componentDidMount(){
        this.getUserData()
    }

    logout(){
        fire.auth().signOut();
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
            <Fragment>

                <div>
                    <h1>Pagina del Cliente</h1>
                    <button onClick= {this.logout}>Logout</button>
                </div>
            </Fragment>
        )
    }
}

export default Cliente;