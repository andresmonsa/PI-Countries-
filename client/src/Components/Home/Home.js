import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import NavBar from '../Nav/NavBar';
import Country from '../Country/Country';
import './Home.css'


export default function Home() {
    // const filters = require('./Filter')
    let countries = useSelector(state => state.countries)
    const [filteredList, setFilteredList] = useState(countries)
    const [paginate, setPaginate] = useState(0)
    const [actualPage, setActualPage] = useState()
    const [options, setOptions] = useState({
        name: "",
        activity: "",
        region: "All",
        sort: "ASC",
        population: 'ASC',
    });

    let filteredByName = countries.filter(country => country.name.toLowerCase().includes(options.name.toLowerCase()))

    useEffect(() => {
        let filteredByRegion

        if (!options.name) {
            if (options.region == 'All') {
                filteredByRegion = countries
            } else {
                filteredByRegion = countries.filter(country => country.region.toLowerCase().includes(options.region.toLowerCase()))
            }
        } else {
            filteredByRegion = filteredByName
        }
        //paginar antes 

        setFilteredList(filteredByRegion)
        setActualPage(filteredByRegion.slice(paginate, paginate + 9))  // los paises ya filtrados y paginados

    }, [options.region, options.name, paginate, countries, filteredList.length])

    const onSearchChange = (e) => {
        setPaginate(0)
        if(e.target.value === ''){
            setOptions(prev => ({
                ...prev, 
                region: 'All'
            }))
        }
        setOptions(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }
    const onSelectChange = (e) => {
        setPaginate(0)
        console.log(e.target)
        setOptions(prev => ({
            ...prev, [e.target]: e.value
        }))
    }

    const optOrder = [
        { value: 'ASC', label: 'ASC', target: { name: 'order' } },
        { value: 'DES', label: 'DES', target: { name: 'order' } }
    ]

    const optRegion = [
        { value: 'All', label: 'All', target: 'region' },
        { value: 'Asia', label: 'Asia', target: 'region' },
        { value: 'Europe', label: 'Europe', target: 'region' },
        { value: 'Africa', label: 'Africa', target: 'region' },
        { value: 'Oceania', label: 'Oceania', target: 'region' },
        { value: 'Americas', label: 'Americas', target: 'region' },
        { value: 'Polar', label: 'Polar', target: 'region' }
    ]



    // const filteredCountries = (countries) => {
    //     if (filterCountry.name.length === 0) return countries.slice(paginate, paginate + 9)
    //     return filteredByName.slice(paginate, paginate + 9)
    // }
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
            {/* {console.log(countries)} */}
            <div>
                <button onClick={prevPage} className='btn'> Previous</button>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Search Country'
                    name="name"
                    value={options.name}
                    onChange={onSearchChange}
                />
                <button onClick={nextPage} className='btn'> Next</button>


                {/* 
                    <span>Order</span>
                    <Select className='selectOrder'
                    value={filterCountry.sort}
                    onChange={onSearchChange}
                    defaultValue={optOrder[0]}
                    options={optOrder}
                /> */}

                {!options.name ?
                    <div className='selectHome'>
                        <span>Filter by Continent</span>
                        <Select className='selectRegion'
                            placeholder='Continent...'
                            onChange={onSelectChange}
                            defaultValue={optRegion[0]}
                            options={optRegion}
                        />

                        {/* <h1> Continent : {options.region}</h1> */}

                    </div>
                    :
                    <h2>Search Result</h2>
                }


                {/* <span>Order by Population Size</span>
                    <Select className='selectPopulation'
                        value={filterCountry.region}
                        onChange={onSearchChange}
                        defaultValue={optOrder[0]}
                        options={optOrder}
                    /> */}

            </div>


            <div className='countries-ctn' >

                {actualPage && actualPage.map(element => { //RENDERIZAR SOLO 9 PAISES YA FILTRADOS Y ORDENADOS
                    return (
                        <div key={element.name} className='countries-ctn' >

                            <NavLink to={`/country/${element.code}`}>
                                <Country name={element.name} flag={element.flagImg} region={element.region} />
                                {/* <img className='flagImg' src={element.flagImg} alt={element.name} ></img> */}
                            </NavLink>
                        </div>
                    )
                })
                }


            </div>
        </div>

    )
}
