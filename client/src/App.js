import './App.css';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getCountries } from './Actions';
import axios from 'axios';
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home';
import About from './Components/About/About';
import CountryDetails from './Components/CountryDetails/CountryDetails';
import AddActivity from './Components/AddACtivity/AddActivity';

import ServerDown from './Components/ServerDown/ServerDown'
import Activities from './Components/Activities/Activities';
import HomeBack from './HomeBack.jpg'

function App() {
  const dispatch = useDispatch()
  const [err, setErr] = useState(false)
   
  let error = err
  useEffect(() => {
    const data = async () => {
      try {
        let json = await axios('http://localhost:3001/countries')
        dispatch(getCountries(json.data))
        console.log('Datos cargados correctamente')
      }
      catch (e) {
        setErr(true)
        console.log('No se puede acceder a la base de datos')
      }
    }
    data()
  }, [dispatch, err,error])

  return (
    <div className="App">
      <img src={HomeBack} className='homeBack'></img>
      {error ? <ServerDown />
        :
        < div >
          < Route exact path='/' component={Landing} />
          <Route exact path='/about' component={About} />
          <Route exact path='/home' component={Home} />
          <Route exact path="/country/:id"><CountryDetails /></Route>
          <Route exact path="/add"><AddActivity /></Route>
          <Route exact path='/activities' component={Activities} />
        </div>
      }
    </div>
  )
}

export default App;
