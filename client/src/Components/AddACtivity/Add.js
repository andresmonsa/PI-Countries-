
import NavBar from "../Nav/NavBar"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
// import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import './Add.css'
export default function Add() {

    let countries = useSelector(state => state.countries)
    // const [options, setOptions] = useState([])


    let optCountries = countries.map(el => {
        return {
            value: el.code,
            label: el.name
        }
    })

    let optSeason = [
        { value: 'winter', label: 'Winter' },
        { value: 'summer', label: 'Summer' },
        { value: 'autumn', label: 'Autumn' },
        { value: 'spring', label: 'Spring' }
    ]

    let optDificulty = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },

    ]
    function onsubmitHandler(e) {
        e.preventDefault()
        //axios.post()
        console.log(e.value)
    }

    return (
        <div>
            <NavBar />

            <form className='form'>
                <div>
                    <label>Activity Name</label>
                    <input type='text' label='Activity Name'></input>
                </div>

                <div>
                    <label>Country</label>

                    <Select className='select'
                        isMulti
                        // value="0"
                        options={optCountries}
                    />

                </div>
                <div>
                    <label>Difficulty</label>
                    <Select className='select'

                        // value="0"
                        options={optDificulty}
                    />

                </div>

                <div>
                    <label>Season</label>
                    <Select className='select'
                        isMulti
                        // value="0"
                        options={optSeason}
                    />
                </div>


                <button type='submit' onClick={onsubmitHandler} >Add Activity</button>

            </form>
        </div>



    )
}
