const axios = require('axios');

const getCountries = async (Country) => {
    const apiUrl = 'https://restcountries.eu/rest/v2/all';
    try {
        const apiResponse = await axios.get(apiUrl)
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
            
                Country.findOrCreate({
                    where: {
                        name: addCountry.name
                    },
                    defaults: addCountry
                })

         


            // console.log('▄'.green, country.name)   opcion : agregar una bandera para activar el log de la carga
        }
         console.log(`${apiCountries.length} paises cargados correctamente`.green)
    }
    catch (err) {
        console.log('ERROR en axios'.red)
    }   
}

module.exports = getCountries