const axios = require('axios');

const getCountries = async (Country) => {
    const apiUrl = 'https://restcountries.eu/rest/v2/all';
    const apiResponse = await axios.get(apiUrl)
    let apiCountries = apiResponse.data

    apiCountries = apiCountries.map(country => {
        const addCountry = {
            name: country.name,
            code: country.alpha3Code,
            region: country.region,
            subregion: country.subregion,
            flagImg: country.flag,
            capital: country.capital,
            population: country.population,
            area: country.area,
        }

     Country.findOrCreate({
         where: {
             name : addCountry.name
         },
         defaults: addCountry
     })
     .then( country => console.log('▄',country[0].dataValues.name, 'added correctly'.green))
     .catch( err => console.log(err, 'ERROR'.red))
    })
    // await Country.bulkCreate(apiCountries)
    const finder = await Country.findAll({})
    // console.log(finder, ' finder '.blue)
    console.log(`Base de datos cargada correctamente con ${finder.length} paises`)
}

module.exports = getCountries