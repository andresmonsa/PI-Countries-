const express = require('express')
const countryRoutes = require('./Country')
const activityRoutes = require('./Activity')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryRoutes) 
// router.use('/activities', activityRoutes)

module.exports = router;
