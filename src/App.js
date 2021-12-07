import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navbar from './modules/NavBar';
import Peliculas from './modules/Peliculas';
import Index from './modules/Index';



function App() {
  return (
   
    <Router>

    <Navbar/>

    <Route path="/" exact component={Index}/>
    <Route path='/registrarProductos' exact component={Peliculas}/>


    </Router>

    

  );
}

export default App;
