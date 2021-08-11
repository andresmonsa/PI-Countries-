const express = require('express')
const { Activity, Country } = require('../db')
const { Op } = require("sequelize");
// const Country = require('../models/Country')
const router = express.Router()
const colors = require('colors')

router.get('/', (req, res) => {

    return Activity.findAll({
        include: Country
    })
        .then((activity) => {
            // console.log(activity[0].countries)
            return res.json(activity[0].countries[0])
        }).catch(err => console.log('error al cargar actividad'.red))
})

router.post('/', async (req, res) => {
    let { name, difficulty, duration, season, country } = req.body
    const createActivity = await Activity.findOrCreate({
        where: {
            name,
            difficulty,
            duration,
            season,
        }
    });
    // console.log(Array.isArray(country))
    // country = country.split(',')
    country.map(el => {
        Country.findAll({
            where: {
                code: {
                    [Op.iLike]: el
                }
            }
        }).then(country => {
            createActivity[0].addCountry(country)
                .then(e => console.log(`Se agregó ${createActivity[0].name}  a ${country[0].name} correctamente`))
                .catch(e => console.log(`No se pudo agregar ${createActivity[0].name}  `))
        }).catch(err => {
            console.log('No se encontró el país'.red, err)
        })
    })

    res.send(createActivity)
})
module.exports = router