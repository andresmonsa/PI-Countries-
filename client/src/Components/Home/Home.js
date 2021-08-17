import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import Select from 'react-select'
import NavBar from '../Nav/NavBar';
import Country from '../Country/Country';
import './Home.css'




// CORREGIR DESP BUSCAR POR NOMBRE, QUE VUELVA A FILTRAR CORRECTAMENTE

export default function Home() {

    const sortFunc = require('./Filter')
    let countries = useSelector(state => state.countries)
    const [filteredList, setFilteredList] = useState(countries)
    const [paginate, setPaginate] = useState(0)
    const [actualPage, setActualPage] = useState()
    // const [errors, setErrors] = useState({})
    const [options, setOptions] = useState({
        name: "",
        activity: "",
        region: "All",
        sort: "ASC",
        population: '',
    });
    
    
    useEffect(() => {
        let filteredByName = countries.filter(country => country.name.toLowerCase().includes(options.name.toLowerCase()))
        let filteredByRegion = countries.filter(country => country.region.toLowerCase().includes(options.region.toLowerCase()))
        let filtered
        if (!options.name) {
            if (options.region === 'All') {
                filtered = countries
            } else {
                filtered = filteredByRegion
            }
        } else {
            filtered = filteredByName
        }

        if (options.sort === 'ASC') {
            sortFunc(filtered, 'ASC', 'name')
        } else if (options.sort === 'DES') {
            sortFunc(filtered, 'DES', 'name')
        } else if (options.population === 'ASC') {
            sortFunc(filtered, 'ASC', 'population')
        } else if (options.population === 'DES') {
            sortFunc(filtered, 'DES', 'population')
        }
        //paginar antes 

        setFilteredList(filtered)
        setActualPage(filtered.slice(paginate, paginate + 9))  // los paises ya filtrados y paginados

    }, [options.region, options.name, options.sort, options.population, paginate, countries, filteredList.length,sortFunc])

    const onSearchChange = (e) => {
        setPaginate(0)

        // if (e.target.value === '') {
        //     setOptions(prev => ({
        //         ...prev,
        //         region: 'All',
        //         sort: 'ASC',
        //         population: ''
        //     }))
        // }
        setOptions(prev => ({
            ...prev,
            // sort: 'ASC',
            [e.target.name]: e.target.value
        }))
    }

    const onSelectChange = (e) => {
        setPaginate(0)
        if(e.target.name === 'region'){
            document.getElementById("population").value = e.target.value
        }
        if (e.target.name === 'sort') {
            document.getElementById("population").value = "";
            options.population = ''
        }
        if (e.target.name === 'population') {
            options.sort = ''
            document.getElementById("sort").value = "";
        }
        console.log(e.target.value)
        setOptions(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    // const optAlpha = [
    //     { value: 'ASC', label: 'ASC', target: 'sort' },
    //     { value: 'DES', label: 'DES', target: 'sort' }
    // ]
    // const optPopulat = [
    //     { value: 'ASC', label: 'ASC', target: 'population' },
    //     { value: 'DES', label: 'DES', target: 'population' }
    // ]

    // const optRegion = [
    //     { value: 'All', label: 'All', target: 'region' },
    //     { value: 'Asia', label: 'Asia', target: 'region' },
    //     { value: 'Europe', label: 'Europe', target: 'region' },
    //     { value: 'Africa', label: 'Africa', target: 'region' },
    //     { value: 'Oceania', label: 'Oceania', target: 'region' },
    //     { value: 'Americas', label: 'Americas', target: 'region' },
    //     { value: 'Polar', label: 'Polar', target: 'region' }
    // ]

    const nextPage = () => {
        if (filteredList.length > paginate + 9)
            setPaginate(paginate + 9)
    }
    const prevPage = () => {
        if (paginate > 0)
            setPaginate(paginate - 9)
    }

    return (
        <div >
            <NavBar />

            <div>

                <input
                    type='text'
                    className='input-text'
                    placeholder='Search Country'
                    name="name"
                    value={options.name}
                    onChange={onSearchChange}
                />


                {!options.name ?
                    <div className='selectHome'>

                        {/*  SELECT TRADICIONAL    */}

                        <label htmlFor="region">Choose a region:</label>
                        <select name="region" value={options.region} id="region" onChange={onSelectChange} >
                            <option value="All">All</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Africa">Africa</option>
                            <option value="Oceania">Oceania</option>
                            <option value="Americas">Americas</option>
                            <option value="Polar">Polar</option>
                        </select>

                        {/*                             REACT-SELECT
                        <span>Filter by Continent</span>
                        <Select className='selectRegion'
                            placeholder='Continent...'
                            onChange={onSelectChange}
                            defaultValue={optRegion[0]}
                            options={optRegion}
                        /> */}


                        {/* SELECT TRADICIONAL */}

                        <label htmlFor="sort">Order by Name </label>
                        <select name="sort" id="sort" value={options.sort} onChange={onSelectChange} >
                            <option value=""></option>
                            <option value="ASC">ASC</option>
                            <option value="DES">DES</option>
                        </select>



                        {/* REACT-SELECT */}
                        {/* <span>Order By Name</span>
                        <Select className='selectOrder'
                            onChange={onSelectChange}
                            defaultValue={optAlpha[0]}
                            options={optAlpha}
                        /> */}

                        <label htmlFor="population">Order by Population </label>
                        <select name="population"  value={options.population} id="population" onChange={onSelectChange} >
                            <option value=""></option>
                            <option value="ASC">ASC</option>
                            <option value="DES">DES</option>
                        </select>

                        {/* REACT-SELECT */}
                        {/* <span>Order by Population Size</span>
                        <Select className='selectPopulation'
                            onChange={onSelectChange}
                            defaultValue={optPopulat[0]}
                            options={optPopulat}
                        /> */}

                        {options.region ? <h4> Filtering by: {options.region}</h4> : null}
                        {options.sort ? <h4> Ordering By Name: {options.sort}</h4> : null}
                    </div>
                    :
                    <h2>Search Result</h2>
                }

            </div>


            {options.population ? <h4> Ordering By Population: {options.population}</h4> : null}
            <div className='countries-ctn' >
                {actualPage && actualPage.map(element => { //RENDERIZAR SOLO 9 PAISES YA FILTRADOS Y ORDENADOS
                    return (
                        <div key={element.name} className='countries-ctn' >
                            <NavLink to={`/country/${element.code}`}>
                                <Country name={element.name} flag={element.flagImg} region={element.region} />
                            </NavLink>
                        </div>
                    )
                })
                }
            </div>
            <div className='buttons '>
                <button onClick={prevPage} className='btn'> Previous</button>
                <button onClick={nextPage} className='btn'> Next</button>
            </div>
        </div>

    )
}
