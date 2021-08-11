import React, { useEffect, useState } from 'react'
import NavBar from '../Nav/NavBar';
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'


export default function Home() {

    let countries = useSelector(state => state.countries)
    console.log(countries)
    const [currentPage, setcurrentPage] = useState(0)
    let [filter, setFilter] = useState({
        name: "",
        activity: "",
        region: "",
        sort: ""
    });


    const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.name.toLowerCase()))

    const filteredCountries = (countries) => {
        if (filter.name.length === 0) return countries.slice(currentPage, currentPage + 9)
        return filtered.slice(currentPage, currentPage + 9)
    }
    const nextPage = () => {
        if (filtered.length > currentPage + 9)
            setcurrentPage(currentPage + 9)
    }
    const prevPage = () => {
        if (currentPage > 0)
            setcurrentPage(currentPage - 9)
    }
    const onSearchChange = (e) => {
        setcurrentPage(0)
        setFilter(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    
    return (
        <div >
            <NavBar />

            {/* {console.log(countries)} */}<div>
                <button onClick={prevPage} className='btn'> Previous</button>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Search Country'
                    name="name"
                    value={filter.name}
                    onChange={onSearchChange}
                />
                <button onClick={nextPage} className='btn'> Next</button>
            </div>

            <div className='countries-ctn' >

                {filteredCountries(countries).map(element => {
                    return (
                        <div key={element.name} className='countries-ctn' >
                            {/* <p>{element.name}</p> */}
                            {/* <p>{element.name}</p> */}
                            <NavLink to={`/country/${element.code}`}>
                                <img className='flagImg' src={element.flagImg} alt={element.name} ></img>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
