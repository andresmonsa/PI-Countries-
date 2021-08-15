const express = require('express')
const router = express.Router();
const countryRoutes = require('./Country')
const activityRoutes = require('./Activity')
const test = require('./test')

router.use('/countries', countryRoutes) 
router.use('/activities', activityRoutes)
// router.use('/test', test)


module.exports = router;
