import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getCountryID } from '../../Actions/'

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
    }, [])

    console.log(country)

    if (country.length != 0) {
        return (
            <div >
                {country[0].name ? (
                    <div className='container' >
                        <p> Country: {country[0].name}</p>
                        <img className='flagImgDet' src={country[0].flagImg} ></img>
                        <p> Code: {country[0].code}</p>
                        <p> Sub-region: {country[0].subregion}</p>
                        <p> Population: {country[0].population} </p>
                        <p> Area: {country[0].area} km² </p>
                        <p> Activities: {country[0].activities} </p>




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