import React, { Component, Fragment} from 'react';
import fire, {db}  from '../firebase/config';
import { Form, Table, Button, Navbar} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../Styless/Styles.css';
import FormCitas from'./FormCitas.js';
import logo from '../images/Masterhub.png';

class Asesor extends Component {
        state = {
          cita: [],
          details: [],
          loadingModal: true,
          userData: [],
          isOpen: false
        }

    closeModal = () => this.setState({ isOpen: false});

    componentDidMount(){
        this.getUserData()
        db().collection(`citas/Octubre 1, 2020/infocitas`).get().then((snapShots) => {
            this.setState({
                cita: snapShots.docs.map(doc =>{
                    return {id: doc.id, data: doc.data()};
                })
            })
        })
    }

    viewDetails = async data => {
        const snapshot = await db().collection(`citas/Octubre 1, 2020/infocitas`).get()
                snapshot.forEach(doc =>{
                    const asesor = doc.data()
                    data.asesor = asesor
                })
            this.setState({isOpen:true, details: data, loadingModal: false})
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
            this.setState({userData: null});
          }
    }



    logout(){
        fire.auth().signOut();
    }

    tableContent = (cita, i) =>(
        <tr key = {i}>
            <td style = {{width: 500}}>{new Date(cita.data.fecha.seconds*1000).toLocaleTimeString('en-US', { hour12: false })}</td>
            <td style = {{width: 500}}>{cita.data.cliente}</td>
            <td style = {{width: 500}}>{cita.data.vehiculo}</td>
            <td style = {{width: 500}}><Form.Control as = 'select'>
                {cita.data.servicio.map(c =>{
                    return (<option key = {c.toString() }>{(c).toString()}</option>)
                })}
                </Form.Control></td>
            <td style = {{width: 500}}>{cita.data.asesor}</td>
            <td style = {{width: 500}}>{cita.data.telefono}</td>
            <td style = {{width: 500}}><Button style = {{padding: 0, border: 'none', background: 'none'}} onClick = {() => this.viewDetails(cita)}>
                {cita.data.isComplete === false ? (<label style = {{color: "black"}}>{'No Terminado'}</label>) : (<label style = {{color: "black"}}>{'Terminado'}</label>)}
                </Button></td>
        </tr>
    )

    render(){ 
        const {cita, details, loadingModal, isOpen} = this.state;
        const date = new Date()
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"
];
        var options = {year: 'numeric', month: 'long', day: 'numeric'}
        var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

        return(
            <Fragment>
                <header  id = "headerAsesor"><fieldset id = "headerFieldSet"><img id = "imagen" src={logo} /></fieldset>
                    <fieldset onClick = {this.logout}>
                        <label id = 'emailabel' >{this.getUserEmail()}</label>
                        <label id = 'userType'>{this.state.userData.userType}</label>
                    </fieldset>
                </header>
                <Navbar id = "iconbar"> </Navbar>
                <div className = 'bodyAsesor'>
                    <h2 id = "h2table"><Form.Label style={{color: "white", float:"left", marginLeft: 30}}>Citas</Form.Label><Form.Label style={{color: "white", textAlign:"center", marginLeft: 70}}>{days[date.getDay()]} {date.getDate()} de {monthNames[date.getMonth()]} del {date.getFullYear()}</Form.Label>{<Button id = 'agregar' variant="primary">Agregar</Button>}</h2>
                    <Table striped bordered hover size = "lg" borderless>
                        <thead> 
                            <tr style = {{backgroundColor: 'yellow'}}>
                                <th>Hora</th>
                                <th>Cliente</th>
                                <th>Unidad</th>
                                <th>Servicios</th>
                                <th>Cito</th>
                                <th>Telefono</th>
                                <th>Status</th>
                                </tr>
                        </thead>
                        <tbody className = 'tBody' id = 'tBody'> 
                            {cita && cita !== undefined ? cita.map((cita, key) => (
                                this.tableContent(cita, key)
                                )) : (alert('No hay citas el dia de hoy'))}
                        </tbody>
                        <Modal show={isOpen} onHide={this.closeModal} size="lg" centered>
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">{loadingModal 
                                            ? 
                                                {details: ""}
                                            :
                                            <Fragment>
                                                <p id = "horaFecha"><label id = 'modalHora'>{new Date (details.data.fecha.seconds*1000).toLocaleTimeString('en-US').toLocaleLowerCase()}</label><label id = 'modalFecha' style={{marginLeft: 350, marginRight: 5}}>{new Date (details.data.fecha.seconds*1000).toLocaleDateString('en-US', options)}</label></p>
                                                    <label id = "asesorAsignado">Asesor Asignado:</label><label id = "nombreAsesor">{details.data.asesor}</label>
                                                    <br/>
                                                    <label id = "clienteAsignado">Cliente:</label><label id = "nombreCliente">{details.data.cliente}</label>
                                                    <br/>
                                                    <label id = "unidadAsignada">Unidad:</label><label id = "nombreUnidad">{details.data.vehiculo}</label>
                                                </Fragment>
                                        }
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{loadingModal 
                                            ? 
                                                {details: ""}
                                            :
                                            <Fragment>
                                                <label>{details.data.servicio.map(c =>{
                                                        return (<div><label id = "sevicio" key = {c.toString() }>{(c).toString()}:</label><br></br></div>)})
                                                        }
                                                </label>
                                                <label>{details.data.detalles.map(c =>{
                                                        return (<div><label id = "detalles" key = {c.toString() }>{(c).toString()}</label><br></br></div>)})}
                                                </label><br></br>
                                                <label id = "imagenesAdjuntas">Imagenes Adjuntas</label>
                                                <br></br>
                                            </Fragment>
                                        }
                            </Modal.Body>
                        </Modal>
                    </Table>
                </div>
        </Fragment>
    )}
}

export default Asesor;