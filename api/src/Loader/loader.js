const axios = require('axios');
const {API_URL} =  process.env;

const getCountries = async (Country) => {
    
    try {
        const apiResponse = await axios.get(API_URL)
        let apiCountries = apiResponse.data

        for (let i = 0; i < apiCountries.length; i++) {
            let country = apiCountries[i]

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
            //try {
                Country.findOrCreate({
                    where: {
                        name: addCountry.name
                    },
                    defaults: addCountry
                })
            // }
            // catch(err)
                    // console.log('▄'.green, country.name)   //opcion : agregar una bandera para activar el log de la carga
                
        }
         console.log(`${apiCountries.length} paises cargados correctamente`.green)
    }
    catch (err) {
        console.log('ERROR en axios'.red)
    }   
}

module.exports = getCountries