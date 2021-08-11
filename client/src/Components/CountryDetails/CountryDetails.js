import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getCountryID } from '../../Actions/'
import NavBar from '../Nav/NavBar'
import './CountryDetails.css'

export default function CountryDetails(props) {

    const dispatch = useDispatch()
    let { id: code } = useParams()
    let country = useSelector(state => state.country)

    useEffect(() => {
        try {
            const data = async () => {
                let json = await axios('http://localhost:3001/countries/' + code)
                dispatch(getCountryID(json.data))

            }
            data()

        } catch (e) {
            console.log('No se puede acceder a la base de datos')
        }
    }, [dispatch, code])

    console.log(country)

    if (country.length !== 0) {
        return (
            <div >
                <NavBar />
                {country[0].name ? (
                    <div className='container' >
                        <p> Country: {country[0].name}</p>
                        <img className='flagImgDet' src={country[0].flagImg} alt={country[0].name} ></img>
                        <p> Code: {country[0].code}</p>
                        <p> Sub-region: {country[0].subregion}</p>
                        <p> Population: {country[0].population} </p>
                        <p> Area: {country[0].area} km² </p>
                        <div>
                            {country[0].activities.map(el => {
                                return (
                                    <ul key={el.name}>
                                        <li>Activity : {el.name} </li>
                                        <li>Difficulty : {el.difficulty} </li>
                                    </ul>
                                )
                            })}

                        </div>
                        
                    </div>
                ) : (<p>No se encontró el país</p>)}
            </div>
        )
    }
    return (
        <div className='container'>
            <p>Loading...</p>

        </div>
    )
}