import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import NavBar from "../Nav/NavBar"
import addACt from './AddActivity.module.css'


const AddActivity = () => {

    const [InputActivity, setInputActivity] = useState(
        {
            name: '',
            difficulty: '',
            duration: '',
            season: '',
        }
    )
    const [errors, setErrors] = useState({})
    let countries = useSelector(state => state.countries)
    // console.log("Countries:", countries)
    const [InputCountries, setInputCountries] = useState([])


    function validate(value, target) {
        if (target === 'name') {
            setErrors((prev) => ({ ...prev, name: null }))
            const nameformat = /^[a-zA-Z ]{3,12}$/
            if (!value) {
                // errors.name = 'Name is required'; // errors = { username: 'Username is required' }
                setErrors((prev) => ({ ...prev, name: 'Name is required' }))
            } else if (!value.match(nameformat)) {
                setErrors((prev) => ({ ...prev, name: 'Name is invalid' }))
                // errors.name = 'Name is invalid';   // errors = { username: 'Username is invalid' }
            }
        }

    };

    function handlerOnChange(e) {    
            validate(e.target.value, e.target.name )

        setInputActivity({
            ...InputActivity,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {

    }, [InputCountries]);

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
        let includeCountry = false
        InputCountries.forEach(el => {
            if (el.id === aux[0]) {
                includeCountry = true
            }
        })
        if (!includeCountry) {
            setInputCountries([
                ...InputCountries, { id: aux[0], name: aux[1] }
            ])

        }
    }
    function RemoveCountry(id) {
        const newCountries = InputCountries.filter((e) => e.id !== id);
        setInputCountries(newCountries);
    }
    return (
        <div>
            <NavBar />
            <div className={addACt.formulario}>
                <div>
                    <form onSubmit={handlerSubmit}>
                        <label>Activity Name</label>
                        {errors.name ? <p> {errors.name}</p> : null}
                        <input name='name' value={InputActivity.name} onChange={handlerOnChange} required />
                        <div>
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

                        </div>

                        <label>Season</label>
                        <select name="season" id="season1" onChange={handlerOnChange} value={InputActivity.season}>
                            <option value={''}></option>
                            <option value={'winter'}>Winter</option>
                            <option value={'autumn'}>Autumn</option>
                            <option value={'spring'}>Spring</option>
                            <option value={'summer'}>Summer</option>
                        </select>


                        <label>Select Country</label>
                        <select name="Country" id="Country1" onChange={handlerOnChangeP} value=''>
                            <option value={InputCountries}></option>
                            {countries && countries.map(el => (<option value={el.code + ' ' + el.name} key={el.code}>{el.name}</option>))}
                        </select>

                        <button className={addACt.buttonCreate} type='submit'>Create</button>
                        <div className={addACt.selected}>
                            {InputCountries ? InputCountries.map((el) => (<p key={el.id} className={addACt.selectedItem} >  {el.name}<button className={addACt.buttonDelete} type='button' onClick={() => RemoveCountry(el.id)}>X</button> </p>)) : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AddActivity;
