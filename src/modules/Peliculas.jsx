import React, { useState , useEffect } from "react";
import {FloatingLabel,Form} from 'react-bootstrap';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import BasicSearch from "./Table";
import Swal from 'sweetalert2';
import Axios from 'axios';



function Phone() {

  return (

    <body>

    <div className="container-fluid">
      <div className="row">

            <div className="col s2" style={{ marginTop:"1rem", }}>
            
            
                <Router>

                    <BasicSearch/>

                </Router>

             
            </div>

     </div>
    </div>
    
    </body>

  
  );
}

export default Phone;
