import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import axios from 'axios'
import NavBar from "../Nav/NavBar"
import './AddActivity.css'


const AddActivity = () => {

    const [InputActivity, setInputActivity] = useState(
        {
            name: '',
            difficulty: '',
            duration: '',
            season: '',
        }

    )
    let countries = useSelector(state => state.countries)
    // console.log("Countries:", countries)
    const [InputCountries, setInputCountries] = useState([])

    function handlerOnChange(e) {
        setInputActivity({
            ...InputActivity,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {

    }, []);

    async function handlerSubmit(e) {
        e.preventDefault()
        let countriesRes = InputCountries.map(e => e.id)
        if (countriesRes.length === 0) {
            alert('DEBES AGREGAR UN PAIS')
        } else {
            console.log(countriesRes)
            const res = {
                name: `${InputActivity.name}`,
                difficulty: InputActivity.difficulty,
                duration: InputActivity.duration,
                season: `${InputActivity.season}`,
                country: countriesRes
            }
            let response = await axios.post("http://localhost:3001/activities", res)


            if (typeof response.data === 'string') {
                alert(response.data)
            }
            else {
                alert("ACTIVIDAD CREADA")
                setInputActivity({
                    name: '',
                    difficulty: '',
                    duration: '',
                    season: '',
                })
                setInputCountries([])
            }
        }
    }

    function handlerOnChangeP(e) {
        let aux = e.target.value.split(' ')
        if (InputCountries.length === 0) {
            setInputCountries([
                ...InputCountries, { id: aux[0], name: aux[1] }
            ])
        }
        InputCountries.forEach(el => {
            if (el.id !== aux[0]) {
                setInputCountries([
                    ...InputCountries, { id: aux[0], name: aux[1] }
                ])
            }
        })

    }
    function RemoveCountry(id) {
        const newCountries = InputCountries.filter((e) => e.id !== id);
        setInputCountries(newCountries);
    }
    return (
        <div>
            <NavBar />
            <div className="formulario">
                <div>
                    <form onSubmit={handlerSubmit}>
                        <label>Activity Name</label>
                        <input name='name' value={InputActivity.name} onChange={handlerOnChange} required />

                        <label>Duration</label>
                        <input name='duration' type="number" min="1" max="365" value={InputActivity.duration} onChange={handlerOnChange} required />

                        <label>Dificulty</label>
                        <select name="difficulty" id="difficulty1" onChange={handlerOnChange} value={InputActivity.difficulty} required>
                            <option value={''}></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>



                        <label>Season</label>
                        <select name="season" id="season1" onChange={handlerOnChange} value={InputActivity.season}>
                            <option value={''}></option>
                            <option value={'winter'}>Winter</option>
                            <option value={'autumn'}>Autumn</option>
                            <option value={'spring'}>Spring</option>
                            <option value={'summer'}>Summer</option>
                        </select>


                        <label>Select Country</label>
                        <select name="Country" id="Country1" value={InputCountries} onChange={handlerOnChangeP} value=''>
                            <option  value={InputCountries}></option>
                            {countries && countries.map(el => (<option value={el.code + ' ' + el.name} key={el.code}>{el.name}</option>))}
                        </select>

                        <button className="Button-Create" type='submit'>Create</button>

                        {InputCountries ? InputCountries.map((el) => (<p key={el.id}>  {el.name}<button onClick={() => RemoveCountry(el.id)}>X</button> </p>)) : null}
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AddActivity;
