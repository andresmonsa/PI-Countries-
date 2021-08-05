const express = require('express')
const { Country, Activity } = require('../db')
const { Op } = require("sequelize");
const router = express.Router()

router.get('/', (req, res) => {
    let name = req.query.name;

    if (name) {
        Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            // order: [
            //     ['name', 'ASC']
            // ],
            // attributes: [
            //     'name', 'code',
            // ],
            include: Activity
        })
            .then((country) => {
                if (country.length === 0) {
                    return res.send('No se encontró el país')

                }
                return res.send(country)
            })
    }
    else {
        Country.findAll({
            order: [
                ['name', 'ASC']
            ],
            attributes: [
                'name', 'code',
            ],
            // include: Activity 
        })
            .then((country) => {
                return res.json(country)
            })
    }
})

router.get('/:id', (req, res) => {
    const idCountry = req.params.id.toUpperCase()
    console.log(idCountry)
    Country.findAll({   //findONE
        where: {
            code: {
                [Op.eq]: idCountry
            }
        },
        include: Activity,
        attributes: [
            'name', 'code',
        ],
        // include: Activity 
    })
        .then((country) => {

            if (country.length === 0) {
                return res.send('No se encontró el país')
            } else {

                return res.json(country)
            }
        })
})


module.exports = router