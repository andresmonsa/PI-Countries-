const express = require('express')
const countryRoutes = require('./Country')
const activityRoutes = require('./Activity')
const router = express.Router();

router.use('/countries', countryRoutes) 
router.use('/activities', activityRoutes)


module.exports = router;
