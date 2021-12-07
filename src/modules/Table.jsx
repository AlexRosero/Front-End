import React, { useState, useEffect, map } from "react";
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Row, Modal, Button, FloatingLabel,Form } from "react-bootstrap";




function BasicSearch() {

    const  [peliculas,setPeliculas] =useState([])
    const [idPelicula, setIdPelicula] = useState('')
    const [nombrePelicula,setnombrePelicula]= useState('')
    const [tipoPelicula,setTipoPelicula]= useState('')
    const [duracion,setDuracion]= useState('')
    const [resumenPelicula,setResumen]= useState('')
    const [estado,setEstado]= useState([])
    const [estadoSelect,setEstadoSelect]= useState([])


    useEffect(() => {

        optenerPeliculas()

        setEstado(['Disponible','Agotado'])
        setEstadoSelect(['Seleccionar'])
        

    }, [])

    // CREAR

    const optenerPeliculas = async () => {

        const respuesta = await Axios.get('/Peliculas/listarPeliculas')

        console.log(respuesta)
        setPeliculas(respuesta.data)
    }

    // ACTUALIZAR


    const optenerPelisActualizar = async (idParametro) => {


        setShow(true)
        const id = idParametro
        const respuesta = await Axios.get('/Peliculas/listar/'+id);

        console.log(respuesta.data)

        setIdPelicula(respuesta.data._id)
        setnombrePelicula(respuesta.data.nombrePelicula)
        setTipoPelicula(respuesta.data.tipoPelicula)
        setDuracion(respuesta.data.duracion)
        setResumen(respuesta.data.resumenPelicula)
        setEstadoSelect(respuesta.data.estado)

    }

    const actualizar = async(e)=>{

        e.preventDefault();
        const id = e 
        const pelicula = {
            nombrePelicula,
            tipoPelicula,
            duracion,
            resumenPelicula,
            estado : estadoSelect,

        }

        


        const respuesta = await Axios.put('/Peliculas/actualizar/'+id,pelicula)
        const mensaje = respuesta.data.mensaje
        optenerPelisActualizar()

        Swal.fire({
            icon:'success',
            title: mensaje,
            showConfirmButton: false,
            timer:1500
        })
        
        setShow(false)
    }



    const eliminar = async (id) =>{

        const respuesta = await Axios.delete('/Peliculas/eliminar/'+id)
        const mensaje= respuesta.data.mensaje
        Swal.fire({
            icon:'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })


    }



    // MAPEAR TODOS LOS CAMPOS REGISTRADOS


    const data = peliculas.map((pelicula) => ({
        _id:pelicula._id,
        nombrePelicula: pelicula.nombrePelicula,
        tipoPelicula: pelicula.tipoPelicula,
        duracion: pelicula.duracion,
        resumenPelicula: pelicula.resumenPelicula,
        estado: pelicula.estado
    }))

    // ACCIONES MODALES

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (

        <div>

            <MaterialTable
                title="Lista Peliculas"
                columns={[
                    { title: 'PELICULA', field: 'nombrePelicula' },
                    { title: 'GENERO', field: 'tipoPelicula' },
                    { title: 'DURACION', field: 'duracion' },
                    { title: 'ESTADO', field: 'estado', type: 'text' },


                ]}
                data={data}
                options={{
                    
                    search: false,
                    actionsColumnIndex: -1,
                    rowData:false


                }}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick:(event,rowData)=>eliminar(rowData._id)
                    },
                    
                ]}
            />

            <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

            show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>EDITAR PELICULAS</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="container-fluid">
                    <div className="row">

                    <div className="col s100">

                    <div className="card col-12" style={{borderRadius: "1rem", margin: ""}}>
                    <div className="card-header bg-dark text-white  text-center">
                    <h4>Editar Pelicula</h4>
                    </div>

                    <div className="card-body">
                    <form onSubmit={"guardar"}>
                    <div className="row">

                    <div className="col-md-6" >
                    <label>Nombre </label>
                    <input value={nombrePelicula} type ="text" className="form-control d-grid required" onChange={(e) => setnombrePelicula(e.target.value)} />
                    </div>

                    <div className="col-md-6" >
                    <label>Genero</label>
                    <input  value={tipoPelicula} type ="text" className="form-control d-grid required" onChange={(e) => setTipoPelicula(e.target.value)} />
                    </div>

                    <div className="col-md-6" >
                    <label>Duración</label>
                    <input  value={duracion} type ="text" className="form-control d-grid required" onChange={(e) => setDuracion(e.target.value)} />
                    </div>

                    <div className="col-md-6" >
                    <label>Resumen</label>
                    <input value={resumenPelicula} type ="text" className="form-control d-grid required" onChange={(e) => setResumen(e.target.value)} />
                    </div>

                    <div className="col-md-6" >
                    <label>Estado</label>
                    <select value={estado} className="form-control " name="select" onChange={(e) => setEstadoSelect(e.target.value)} >

                    <option selected="true" disabled="disabled">{estadoSelect}</option>

                {
                    estado.map(Estados => (

                    <option key={Estados}>
                {Estados}

                    </option>
                ))
                }

                    </select>
                    </div>
                    </div>
                    </form>
                    </div>

                    </div>
                    </div>
                    </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={actualizar}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}


export default BasicSearch;
