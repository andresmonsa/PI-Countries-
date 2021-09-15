import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ActivitiesView from './ActivitiesView'

export default function Activities () {
  const countries = useSelector(state => state.countries)

  useEffect(() => {
    try {
      const data = async () => {
        const json = await axios('http://localhost:3001/activities/')
        setActivities(json.data)
        setActualPage(json.data)
      }
      data()
    } catch (e) {
      window.alert('No se puede acceder a la base de datos')
    }
  }, [])

  const opt = {
    activity: '',
    country: 'All',
    sort: 'ASC',
    season: 'All',
    duration: 'All',
    difficulty: 'All'
  }
  const [options, setOptions] = useState(opt)
  const [activities, setActivities] = useState([])
  const [actualPage, setActualPage] = useState([])

  useEffect(() => {
    let filteredByName = []
    let filteredByCountry = []
    let filteredBySeason
    let filteredByDifficulty

    // FILTRO POR NOMBRE
    if (options.activity === 'All') {
      filteredByName = activities
    } else {
      filteredByName = activities.filter(act => act.name.toLowerCase().includes(options.activity.toLowerCase()))
    }

    // FILTRO POR PAIS
    if (options.country === 'All') {
      filteredByCountry = filteredByName
    } else {
      for (let i = 0; i < filteredByName.length; i++) {
        const pais = filteredByName[i].countries
        for (let j = 0; j < pais.length; j++) {
          if (pais[j].code === options.country) {
            filteredByCountry.push(filteredByName[i])
          }
        }
      }
      filteredByName = filteredByCountry
    }

    // FILTRO POR TEMPORADA
    if (options.season === 'All') {
      filteredBySeason = filteredByCountry
    } else {
      filteredBySeason = filteredByCountry.filter(act => act.season === options.season)
    }

    // FILTRO POR DIFICULTAD
    if (options.difficulty === 'All') {
      filteredByDifficulty = filteredBySeason
    } else {
      filteredByDifficulty = filteredBySeason.filter(act => act.difficulty === options.difficulty)
    }

    setActualPage(filteredByDifficulty)
  }, [options.season, options.difficulty, options.country, options.activity, activities])

  const handleSelect = (e) => {
    setOptions((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  return (

    <ActivitiesView
      actualPage={actualPage}
      handleSelect={handleSelect}
      options={options}
      countries={countries}
    />
  )
}
