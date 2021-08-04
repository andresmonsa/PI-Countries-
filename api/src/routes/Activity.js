const express = require('express')
const { Activity, Country } = require('../db')
const  { Op } = require("sequelize");
// const Country = require('../models/Country')
const router = express.Router()
const colors = require('colors')

router.get('/', (req, res) => {

    return Activity.findAll({
        include: Country
    })
        .then((activity) => {
            return res.json(activity)
        })
})

router.post('/', async (req, res) => {
    const activityBody = req.body;
    // console.log(activityBody, 'activityBody'.red)

    const newActivity = await Activity.create(activityBody)
    
     Country.findAll({
        where: {
            code: {
                [Op.iLike]: activityBody.country
            }
        }
    }).then(country => {
        // console.log('country'.green ,country)
        //  country.addActivity(newActivity)
        newActivity.addCountry(country)
        console.log(`Se agregó correctamente ${activityBody.name} a la ${country[0].dataValues.name}`.bgGreen.red)
        // res.send(country.name)
        res.send(`Se agregó correctamente ${activityBody.name} a la ${country[0].dataValues.name}`)
    })

})
module.exports = router