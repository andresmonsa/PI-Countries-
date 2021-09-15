import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCountryID } from '../../Actions/'
import NavBar from '../Nav/NavBar'
import cardDet from './CountryDetails.module.css'
export default function CountryDetails (props) {
  const dispatch = useDispatch()
  const { id: code } = useParams()
  const country = useSelector(state => state.country)

  useEffect(() => {
    try {
      const data = async () => {
        const json = await axios('http://localhost:3001/countries/' + code)
        dispatch(getCountryID(json.data))
      }
      data()
    } catch (e) {
      console.log('No se puede acceder a la base de datos')
    }
  }, [dispatch, code])

  if (country.length !== 0) {
    return (
      <div>
        <NavBar />
        {country[0].name
          ? (
            <div>
              <div>
                <h1> Country: {country[0].name}</h1>
                <img className={cardDet.flagImg} src={country[0].flagImg} alt={country[0].name} />
                <p> <span className={cardDet.span}>Code:</span> {country[0].code}</p>
                <p> <span className={cardDet.span}>Sub-region:</span>  {country[0].subregion}</p>
                <p> <span className={cardDet.span}>Population:</span> {country[0].population} habs. </p>
                <p> <span className={cardDet.span}>Area:</span>  {country[0].area} km² </p>

              </div>
              <div>
                {country[0].activities.length > 0 ? <h1>Activities</h1> : null}
                <div className={cardDet.activitiesCard}>
                  {country[0].activities.map((el, i) => {
                    return (

                      <ul key={el.name} className={cardDet.activities}> Activity:  {i + 1}
                        <li><span className={cardDet.span}>Name:</span> {el.name} </li>
                        <li><span className={cardDet.span}>Season:</span> {el.season}</li>
                        <li><span className={cardDet.span}>Duration:</span> {el.duration}</li>
                        <li><span className={cardDet.span}>Difficulty:</span> {el.difficulty}</li>
                      </ul>

                    )
                  })}
                </div>
              </div>

            </div>
            )
          : (
            <div>
              <NavLink to='/home'> Home  </NavLink>
              <p>No se encontró el país</p>

            </div>
            )}
      </div>
    )
  }
  return (
    <div className='container'>
      <p>Loading...</p>

    </div>
  )
}
