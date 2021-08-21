import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setearOptions } from '../../Actions/'
import NavBar from '../Nav/NavBar'
import Country from '../Country/Country'
import home from './Home.module.css'
import Paginate from '../Paginate/Paginate'

export default function Home () {
  const dispatch = useDispatch()
  const sortFunc = require('./Filter')

  const countries = useSelector(state => state.countries)
  const [filteredList, setFilteredList] = useState(countries)
  const [paginate, setPaginate] = useState(0)
  const [actualPage, setActualPage] = useState()
  const optionsRedux = useSelector(state => state.options)
  const [options, setOptions] = useState(optionsRedux)

  useEffect(() => {
    const filteredByName = countries.filter(country => country.name.toLowerCase().includes(options.name.toLowerCase()))
    const filteredByRegion = countries.filter(country => country.region.toLowerCase().includes(options.region.toLowerCase()))
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

    setFilteredList(filtered)
    setActualPage(filtered.slice(paginate, paginate + 9))
    dispatch(setearOptions(options))
  }, [options.region, options.name, options.sort, options.population, paginate, countries, filteredList.length, sortFunc, options, dispatch])

  const onSearchChange = (e) => {
    setPaginate(0)
    setOptions(prev => ({

      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const onSelectChange = (e) => {
    setPaginate(0)
    if (e.target.name === 'region') {
      document.getElementById('population').value = e.target.value
    }
    if (e.target.name === 'sort') {
      document.getElementById('population').value = ''
      options.population = ''
    }
    if (e.target.name === 'population') {
      options.sort = ''
      document.getElementById('sort').value = ''
    }

    setOptions(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  const nextPage = () => {
    if (filteredList.length > paginate + 9) { setPaginate(paginate + 9) }
  }
  const prevPage = () => {
    if (paginate > 0) { setPaginate(paginate - 9) }
  }

  return (
    <div>
      <NavBar />
      <div>
        <input
          type='text'
          className={home.inputText}
          placeholder='Search Country'
          name='name'
          value={options.name}
          onChange={onSearchChange}
          autoComplete='off'
        />

        {!options.name
          ? (
            <div className={home.selectHome}>

              <label htmlFor='region'>Choose a region:</label>
              <select name='region' value={options.region} id='region' onChange={onSelectChange}>
                <option value='All'>All</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Africa'>Africa</option>
                <option value='Oceania'>Oceania</option>
                <option value='Americas'>Americas</option>
                <option value='Polar'>Polar</option>
              </select>

              <label htmlFor='sort'>Order by Name </label>
              <select name='sort' id='sort' value={options.sort} onChange={onSelectChange}>
                <option value='' />
                <option value='ASC'>ASC</option>
                <option value='DES'>DES</option>
              </select>

              <label htmlFor='population'>Order by Population </label>
              <select name='population' value={options.population} id='population' onChange={onSelectChange}>
                <option value='' />
                <option value='ASC'>ASC</option>
                <option value='DES'>DES</option>
              </select>

              <div className={home.filtrerOrder}>
                {options.region ? <h4 className={home.filtering}> Filtering by: {options.region}</h4> : null}
                <p className={home.filtering}> Showing Page : {paginate / 9 + 1} </p>
                {options.sort ? <h4 className={home.filtering}> Ordering By Name: {options.sort}</h4> : null}
                {options.population ? <h4 className={home.filtering}> Ordering By Population: {options.population}</h4> : null}
              </div>
            </div>
            )
          : <h2>Search Result</h2>}
      </div>

      <div className={home.countriesCtn}>
        {actualPage && actualPage.map(element => {
          return (
            <div key={element.name} className='countries-ctn'>
              <NavLink to={`/country/${element.code}`}>
                <Country name={element.name} flag={element.flagImg} region={element.region} />
              </NavLink>
            </div>
          )
        })}
      </div>
      <div className={home.buttons}>
        {/* {console.log((paginate / 9 + 1))} */}
        {/* { console.log(actualPage)} */}
        {(paginate / 9 + 1) > 1 ? <button onClick={prevPage} className={home.btn}> Previous</button> : <button onClick={prevPage} disabled className={home.btnDisabled}> Previous</button>}

        <Paginate
          itemsPerPage={9}
          allItems={filteredList.length}
          pagin={setPaginate}
        />

        {actualPage && actualPage.length > 8 ? <button onClick={nextPage} className={home.btn}> Next</button> : <button onClick={nextPage} disabled className={home.btnDisabled}> Next</button>}

      </div>
    </div>

  )
}
