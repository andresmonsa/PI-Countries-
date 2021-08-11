import './App.css';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getCountries } from './Actions';
import axios from 'axios';
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home';
import Add from './Components/AddACtivity/Add';
import About from './Components/About/About';
import CountryDetails from './Components/CountryDetails/CountryDetails';
import ServerDown from './Components/ServerDown/ServerDown'

function App() {
  const dispatch = useDispatch()
  const [err, setErr] = useState(false)
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
  }, [dispatch, err])
 
  return (
    <div className="App">
      {err ? <ServerDown />
        :
        < div >
          < Route exact path='/' component={Landing} />
          <Route exact path='/about' component={About} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/Add' component={Add} />
          <Route exact path="/country/:id"><CountryDetails /></Route>
        </div>
      }
    </div>
  )
}

export default App;
