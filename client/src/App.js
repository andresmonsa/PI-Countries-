import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getCountries } from './Actions';
import axios from 'axios';
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home';
import About from './Components/About/About';
import CountryDetails from './Components/CountryDetails/CountryDetails';
import AddActivity from './Components/AddACtivity/AddActivity';
import NotFound from './Components/NotFound/NotFound'
import ServerDown from './Components/ServerDown/ServerDown'
import Activities from './Components/Activities/Activities';
import HomeBack from './HomeBack.jpg'

import Loading from './Loading.gif'

function App() {
  const dispatch = useDispatch()
  const [err, setErr] = useState(true)
  const [loading, setLoading] = useState(true)

  let error = err
  useEffect(() => {
    const data = async () => {
      try {
        let json = await axios('http://localhost:3001/countries')
        dispatch(getCountries(json.data))
        setErr(false)
        console.log('Datos cargados correctamente')
        setTimeout(() => setLoading(false), 2000)

      }
      catch (e) {
        setErr(true)
        setLoading(false)
        console.log('No se puede acceder a la base de datos')
      }
    }
    data()
  }, [dispatch, err, error])

  if (loading) return <img src={Loading} alt='loading' className="loading" />
  else {
    return (
      <div className="App">
        <img src={HomeBack} className='homeBack' alt='HOMEBACK'></img>
        {error ? <ServerDown />
          :
          < div >
            <Switch>
              < Route exact path='/' component={Landing} />
              <Route exact path='/about' component={About} />
              <Route exact path='/home' component={Home} />
              <Route exact path="/country/:id"><CountryDetails /></Route>
              <Route exact path="/add"><AddActivity /></Route>
              <Route exact path='/activities' component={Activities} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        }
      </div>
    )
  }
}
export default App;
