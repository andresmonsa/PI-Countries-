const express = require('express')
const router = express.Router()
const { Activity, Country } = require('../db')

router.post('/', (req, res) => {
console.log(req.body)
  res.send('TEST OK')
})
module.exports = router