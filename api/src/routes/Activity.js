const express = require('express')
const { Activity, Country } = require('../db')
const { Op } = require('sequelize')
// const Country = require('../models/Country')
const router = express.Router()
const colors = require('colors')

router.get('/', (req, res) => {
  return Activity.findAll({
    attributes: [
      'id', 'name', 'duration', 'season', 'difficulty'
    ],
    include: {
      model: Country,
      attributes: ['code', 'name', 'flagImg']
    }
  })
    .then((activity) => {
      // console.log(activity[0].countries)
      return res.json(activity)
    }).catch(err => console.log('error al cargar actividad'.red))
})

router.post('/', async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body

  const seasons = ['summer', 'autumn', 'spring', 'winter']
  const difficulties = ['1', '2', '3', '4', '5']

  if (name === '') return (res.send('Must include a name'))
  if (typeof name !== 'string' || (!isNaN(name))) return res.send('Must include valid a name')
  if (difficulty === '' || (!difficulties.includes(difficulty))) return res.send('Must include a  valid  difficulty')
  if (country === '') return res.send('Must include a country')
  if (duration === '') return res.send('Must include a duration')
  if (season === '' || (!seasons.includes(season))) return res.send('Must include a valid season')

  const createActivity = await Activity.findOne({
    where: {
      name,
      difficulty,
      duration,
      season
    }
  })

  if (createActivity === null) {
    const createActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season
    })
    country.map(el => {
      Country.findAll({
        where: {
          code: {
            [Op.eq]: el
          }
        }
      }).then(country => {
        console.log(createActivity.dataValues)
        createActivity.addCountry(country)
          .then(e => console.log(`Se agregó ${createActivity.dataValues.name}  a ${country[0].name} correctamente`))
          .catch(e => console.log(`No se pudo agregar ${createActivity.dataValues.name}  `))
      }).catch(err => {
        console.log('No se encontró el país'.red, err)
      })
    })
    res.send(createActivity)
  } else {
    res.send('La actividad ya existe')
    console.log('la actividad ya existe '.red, createActivity.name) // true
    console.log(createActivity instanceof Activity) // true
    console.log(createActivity.name) // 'My Title'
  }

  // const createActivity = await Activity.findOrCreate({
  //     where: {
  //         name,
  //         difficulty,
  //         duration,
  //         season,
  //     }
  // });

  // console.log(Array.isArray(country))
  // country = country.split(',')
  // country.map(el => {
  //     Country.findAll({
  //         where: {
  //             code: {
  //                 [Op.eq]: el
  //             }
  //         }
  //     }).then(country => {
  //         console.log(createActivity.dataValues)
  //         createActivity.addCountry(country)
  //             .then(e => console.log(`Se agregó ${createActivity.dataValues.name}  a ${country[0].name} correctamente`))
  //             .catch(e => console.log(`No se pudo agregar ${createActivity.dataValues.name}  `))
  //     }).catch(err => {
  //         console.log('No se encontró el país'.red, err)
  //     })
  // })

  // res.send(createActivity)
})
module.exports = router
