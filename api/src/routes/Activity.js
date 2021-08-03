const express = require('express')
const {Activity} = require('../db')
const router = express.Router()

router.get('/', (req, res) => {
    return Activity.findAll({
        include: Episode
    })
    .then((activity) => {
        return res.json(activity)
    })
})

module.exports = router