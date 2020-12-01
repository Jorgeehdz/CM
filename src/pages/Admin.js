import React, { Component, Fragment } from 'react';
import fire, {db} from '../firebase/config';
import '../components/Admin.css';
import { Button, Form} from 'react-bootstrap';
import logo from '../images/Masterhub.png';

class Admin extends Component {
    state = {
        userData: []
      }

    componentDidMount(){
        this.getUserData();
    }

    singUp() {
        const correo = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const name = document.querySelector("#nombre").value;
        const APpaterno = document.querySelector("#paterno").value;
        const ApMaterno = document.querySelector("#materno").value;
        const Fecha = document.querySelector("#fecha").value;
        const tipoUsuario = document.querySelector("#userType").value;

     fire.auth().createUserWithEmailAndPassword(correo, password).then((u) => {
            console.log('Successfully Signed Up');
            db().collection('users').doc(u.user.uid).set({
                email: correo,
                fecha: Fecha,
                materno: ApMaterno,
                nombre: name,
                paterno: APpaterno,
                userType: tipoUsuario
            })
        }).catch((err) =>{
            console.log("Error: " + err.toString());
        })

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

    render(){
        return(
            <Fragment>
                <header  style = {{backgroundColor: 'red', fontSize: 30}}><fieldset id = "headerFieldSet" ><img id = "imagen" src={logo} /></fieldset>
                    <fieldset>
                        <label id = 'emailabel'>{this.getUserEmail()}</label>
                        <label id = 'userType'>{this.state.userData.userType}</label>
                    </fieldset>
                </header>
                <Form id = "registro">
                    <div>
                        <Form.Label id = "lNombre">Nombre</Form.Label>
                        <br></br>
                        <Form.Group controlId = "Nombre">
                            <Form.Control placeholder = 'Nombre' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label id = "lApaterno">Apellido Paterno</Form.Label>
                        <br></br>
                        <Form.Group controlId = "ApellidoPaterno">
                            <Form.Control   placeholder = 'Apellido Paterno' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label id = "lAmaterno">Apellido Materno</Form.Label>
                        <br></br>
                        <Form.Group controlId = "ApellidoMaterno">
                            <Form.Control   placeholder = 'Apellido Materno' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label id = "lEmail">Email</Form.Label>
                        <br></br>
                        <Form.Group controlId = "email">
                            <Form.Control   placeholder = 'Email' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label id = "lFecha">Fecha</Form.Label>
                        <br></br>
                        <Form.Group controlId = "fecha">
                            <Form.Control  placeholder = 'dia/mes/año' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label id = "lTypeUser">Tipo Usuario</Form.Label>
                        <br></br>
                        <Form.Group controlId = "usuario">
                            <Form.Control   placeholder = 'Tipo de usuario' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label id = "lPassword">Password</Form.Label>
                        <br></br>
                        <Form.Group controlId = "password">
                            <Form.Control id = 'password' placeholder = 'Enter password..' type = 'text' />
                        </Form.Group>
                    </div>
                    <Button id = "BtnSingUp" onClick = {this.singUp}>SignUp</Button>
                    <Button id = "BtnLogOut" onClick = {this.logout}>LogOut</Button>
                </Form>
            </Fragment>
        )
    }
}

export default Admin;