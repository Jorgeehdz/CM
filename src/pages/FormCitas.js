import React, { Component, Fragment} from 'react';
import { Form, Table, Button, Navbar} from 'react-bootstrap';
import fire, {db}  from '../firebase/config';
import '../Styless/Styles.css';
import logo from '../images/Masterhub.png';
import '../Styless/NewCitas.css';

class FormCitas extends Component{
    state = {
        
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
        const data = '';
        var user = fire.auth().currentUser;
        if(user) {
            db().collection('users').doc(user.uid.toString()).get().then((snapshots) => {
              data: snapshots.data()
            }) 
          } else {
            this.setState({userData: 123});
          }
    }


    newCita(){
        const hora = document.querySelector('#Hora').value;
        const cliente = document.querySelector('#Cliente').value;
        const unidad = document.querySelector('#Unidad').value;
        const servicios = document.querySelector('#Servicios').value;
        const cito = document.querySelector('#Cito').value;
        const telefono = document.querySelector('#Telefono').value;
        const status = document.querySelector('#Status').value;
    }
    
    render(){
        const {userdata} = this.state;
        return(
            <Fragment>
                <header  id = "headerAsesor"><fieldset id = "headerFieldSet"><img id = "imagen" src={logo} /></fieldset>
                    <fieldset onClick = {this.logout}>
                        <label id = 'emailabel' >{this.getUserEmail()}</label>
                        {console.log(userdata)}
                        <label id = 'userType'>{}</label>
                    </fieldset>
                </header>
                <Form id = "AddCita">
                    <div>
                        <Form.Label>Hora</Form.Label>
                        <br></br>
                        <Form.Group controlId = 'Hora'>
                            <Form.Control placeholder = 'Hora' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label>Cliente</Form.Label>
                        <br></br>
                        <Form.Group controlId = 'Cliente'>
                            <Form.Control placeholder = 'Cliente' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label>Unidad</Form.Label>
                        <br></br>
                        <Form.Group controlId = 'Unidad'>
                            <Form.Control placeholder = 'Unidad' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label>Servicios</Form.Label>
                        <br></br>
                        <Form.Group controlId = 'Servicios'>
                            <Form.Control placeholder = 'Servicios' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label>Cito</Form.Label>
                        <br></br>
                        <Form.Group controlId = 'Cito'>
                            <Form.Control placeholder = 'Cito' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label>Telefono</Form.Label>
                        <br></br>
                        <Form.Group controlId = 'Telefono'>
                            <Form.Control placeholder = 'Telefono' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Label>Status</Form.Label>
                        <br></br>
                        <Form.Group controlId = 'Status'>
                            <Form.Control placeholder = 'Status' type = 'text' />
                        </Form.Group>
                    </div>
                    <div>
                        <Button>Agregar</Button>
                    </div>
                </Form>
            </Fragment>
        )
        }
}
export default FormCitas;