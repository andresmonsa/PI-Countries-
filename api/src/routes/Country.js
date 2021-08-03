const express = require('express')
const { Country } = require('../db')
const router = express.Router()

router.get('/', (req, res) => {
    return Country.findAll({
        
    })
        .then((country) => {
            return res.json(country)
        })
})


module.exports = router