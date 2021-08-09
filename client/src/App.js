import './App.css';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getCountries } from './Actions';
import axios from 'axios';
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home';
import Add from './Components/AddACtivity/Add';
import About from './Components/About/About';
import CountryDetails from './Components/CountryDetails/CountryDetails';
import NavBar from './Components/Nav/NavBar';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const data = async () => {
        let json = await axios('http://localhost:3001/countries')
        dispatch(getCountries(json.data))
        console.log('Datos cargados correctamente')
      }
      data()

    } catch (e) {
      console.log('No se puede acceder a la base de datos')
    }
  },[])


  return (
    <div className="App">
      
      <Route path='/' component={NavBar} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/about' component={About} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/Add' component={Add} />
      <Route  exact path="/country/:id"><CountryDetails/></Route>  
    </div>
  );
}

export default App;
