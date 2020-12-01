import React, {Component} from 'react';
import fire from '../../firebase/config';
import '../../Styless/login.css';

class Login extends Component {


    login(){
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        fire.auth().signInWithEmailAndPassword(email, password).then((u) =>{
            console.log('logged')
        }).catch((err) => {
            console.log('Error: ' + err.toString());
        })
    }

    render(){
        return(
            <div class="login" id="login">
                <div class="login-box">
                    <h1>Login</h1>
                    <div class="textbox">
                        <i class="fas fa-user"></i>
                        <input id="email" type="text" placeholder="Username"/>
                    </div>
                    <div class="textbox">
                        <i class="fas fa-lock"></i>
                        <input id="password" type="password" placeholder="Password"/>
                    </div>
                    <input type="button" id="btn" value="Sign in" onClick={this.login}/>
                </div>
            </div>
        )
        }
}
export default Login;