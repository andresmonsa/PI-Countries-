const axios = require('axios');

const getCountries = async (Country) => {
    const apiUrl = 'https://restcountries.eu/rest/v2/all';
    const apiResponse = await axios.get(apiUrl)
    let apiCountries =  apiResponse.data
    apiCountries =  apiCountries.map(country => {
        // console.log(country.name)
        return {
            name: country.name,
            code: country.alpha3Code,
            region: country.region,
            subregion: country.subregion,
            flagImg: country.flag,
            capital: country.capital,
            population: country.population,
            area: country.area,
        }
    })  
    Country.bulkCreate(apiCountries)
    console.log(`Base de datos cargada correctamente con ${apiCountries.length} paises` )
}

module.exports = getCountries