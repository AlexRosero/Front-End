import React, { useState, useEffect, map } from "react";
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { FloatingLabel,Form } from "react-bootstrap";


function Index() {

    const  [peliculas,setPeliculas] =useState([])
    const [idPelicula, setIdPelicula] = useState('')
    const [nombrePelicula,setnombrePelicula]= useState('')
    const [tipoPelicula,setTipoPelicula]= useState('')
    const [duracion,setDuracion]= useState('')
    const [resumenPelicula,setResumen]= useState('')
    const [estado,setEstado]= useState([])
    const [estadoSelect,setEstadoSelect]= useState([])

    useEffect(() => {
       
        setEstado(['Disponible','Agotado'])
        setEstadoSelect(['Seleccionar'])
        

    },[])

    const guardar = async(e)=>{
        e.preventDefault()
        const peliculas = {
            nombrePelicula,
            tipoPelicula,
            duracion,
            resumenPelicula,
            estado : estadoSelect,

        }

        if(nombrePelicula === ""){

            Swal.fire({
                icon:'error',
                title:'Campo Obligatorio',
                showConfirmButton:false,
                timer: 1500
            })
        }
        
        else if(estado === ""){

            Swal.fire({
                icon:'error',
                title:'Campo Obligatorio',
                showConfirmButton:false,
                timer: 1500
            })
        }
        
        else{
            
            const respuesta = await Axios.post('/Peliculas/crear',peliculas)
            const mensaje = respuesta.data.mensaje
            console.log(mensaje)

            Swal.fire({
                icon: 'success',
                title: mensaje,
                showConfirmButton:false,
                timer: 1500
            })
            

            e.target.reset();
            setnombrePelicula("");
            setTipoPelicula("");
            setDuracion("");
            setResumen("");
         

        }
    }

  return (

    <body>

    <div className="container-fluid">
      <div className="row">

        <div className="col s3">
        
            <div className="card col-11" style={{borderRadius: "1rem", margin:"1rem", marginLeft:'4rem'}}>
                <div className="card-header text-white  text-center" style={{ background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'}}>
                    <h4>Registrar Producto </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={guardar}>
                        <div className="row">

                            <div className="col-md-6" >
                                <label>Nombre pelicula</label>
                                <input type="text" className="form-control d-grid required" onChange={(e)=>setnombrePelicula(e.target.value)} />
                            </div>

                            <div className="col-md-6" >
                                <label>Genero</label>
                                <input type="text" className="form-control d-grid required" onChange={(e)=>setTipoPelicula(e.target.value)} />
                            </div>

                            <div className="col-md-6" >
                                <label>Duracion</label>
                                <input type="text" className="form-control d-grid required" onChange={(e)=>setDuracion(e.target.value)} />
                            </div>        
                            
                            <div className="col-md-6" >
                                <label>Resumen</label>
                                <input type="text" className="form-control d-grid required" onChange={(e)=>setResumen(e.target.value)} />
                            </div>  

                            <div className="col-md-12" >
                                <label>Estado</label>
                                <select className="form-control " name="select" onChange={(e)=>setEstadoSelect(e.target.value)} >

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
                            
                            

                            <center>
                            <button type="submit" className="btn btn-info" style={{marginTop:'1rem',background: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',color:'white'}}>
                                <span className="fa fa-save"></span> Guardar
                            </button>
                            </center>
                        </div>
                    </form>
                </div>

            </div>
        </div>

         

     </div>
    </div>
    
    </body>

  );
}

export default Index
