import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Activity from '../Activity/Activity'
import acts from './Activities.module.css'
import NavBar from '../Nav/NavBar'
import axios from 'axios';

export default function Activities() {

    let countries = useSelector(state => state.countries)
    
    useEffect(() => {
        try {
            const data = async () => {
                let json = await axios('http://localhost:3001/activities/')
                setActivities(json.data)
                setActualPage(json.data)
            }
            data()
            
        } catch (e) {
            alert('No se puede acceder a la base de datos')
        }
    }, [])
    let opt = {
        activity: "",
        country: "All",
        sort: "ASC",
        season: 'All',
        duration: 'All',
        difficulty: 'All'
    }
    const [options, setOptions] = useState(opt);
    const [activities, setActivities] = useState([])
    const [actualPage, setActualPage] = useState([])
    // const [filtered, setFiltered] = useState([])


    useEffect(() => {
        let filteredByName = [];
        let filteredByCountry = []
        let filteredBySeason;
        let filteredByDifficulty;
        let filtered = activities
        // console.log(activities)
        if(options.activity !== ''){
            filteredByName = activities.filter(act => act.name.toLowerCase().includes(options.activity.toLowerCase()))
            filtered= filteredByName
        }
        
        // if (options.country === 'All') {
        //     filtered= activities
        //     // filteredByCountry = activities
        //     // setActualPage(filteredByCountry)
        // }
         if(options.country !== 'All') {
            for (let i = 0; i < activities.length; i++) {
                let pais = activities[i].countries;
                for (let j = 0; j < pais.length; j++) {
                    if (pais[j].code === options.country) {
                        filteredByCountry.push(activities[i])
                    }
                }
            }
            filtered = filteredByCountry
            // setActualPage(filteredByCountry)
        }
        if (options.season !== 'All') {
            filteredBySeason = activities.filter(act => act.season === options.season)
            filtered = filteredBySeason
            // setActualPage(filteredBySeason)
        }
        if (options.difficulty !== 'All') {
            // let actDifficulty = actualPage.map(act=> typeof act.difficulty === options.difficulty)
            filteredByDifficulty = activities.filter(act => act.difficulty === options.difficulty)
            filtered = filteredByDifficulty
            // setActualPage(filteredByDifficulty)
        }
        setActualPage(filtered)
    }, [options.season, options.difficulty, options.country, options.activity, activities])

    const handleSelect = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        setOptions((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }
    // const handleSearch = (e) => {
    //     console.log('SEACH')
    // }

    return (
        <div>
            <NavBar />
            <input
                type='text'
                className='input-text'
                placeholder='Search Activity'
                name="activity"
                value={options.activity}
                onChange={handleSelect}
            />

            <label htmlFor="season" >Choose a Season :</label>
            <select name="season" id="season" onChange={handleSelect} value={options.season} >
                <option value={'All'}>All</option>
                <option value={'winter'}>Winter</option>
                <option value={'autumn'}>Autumn</option>
                <option value={'spring'}>Spring</option>
                <option value={'summer'}>Summer</option>
            </select>

            <label>Dificulty</label>
            <select name="difficulty" id="difficulty" onChange={handleSelect} value={options.difficulty} >
                <option value={'All'}>All</option>
                <option value={'1'}>1</option>
                <option value={'2'}>2</option>
                <option value={'3'}>3</option>
                <option value={'4'}>4</option>
                <option value={'5'}>5</option>
            </select>

            <label>Select Country</label>
            <select name="country" id="Country" onChange={handleSelect} value={options.country}>
                <option value={'All'}>All</option>
                {countries && countries.map(el => (<option value={el.code} key={el.code}>{el.name}</option>))}
            </select>

            <div className={acts.activities}>

                {actualPage !== 'undefined' && actualPage.length === 0 ? <h2 className={acts.non}>Not Activities Created Yet</h2> :
                    actualPage.map((el, i) => (
                        <Activity key={el.name + i} name={el.name} duration={el.duration} season={el.season} countries={el.countries} difficulty={el.difficulty} />
                    ))
                }


            </div>
        </div>

    )
}