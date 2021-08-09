import React, { useEffect, useState } from 'react'
import NavBar from '../Nav/NavBar';
import { useDispatch, useSelector } from 'react-redux'
import './Home.css'

export default function Home() {

    let countries = useSelector(state => state.countries)
    let [filter, setFilter] = useState({ name: "", activity: "", region: "", sort: "" });

    return (
        <div >
            {/* <NavBar /> */}

            {/* {console.log(countries)} */}
            <div className='countries-ctn' >
                {countries.map(element => {
                    return (
                        <div key={element.name} className='countries-ctn' >
                            {/* <p>{element.name}</p> */}
                            <img className='flagImg' src={element.flagImg} ></img>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
