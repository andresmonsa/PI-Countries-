const filters = (countries, critery, value) => {
    if(value === 'All') {
        const filtered = countries
        console.log(filtered)
        return filtered
    }     
    const filtered = countries.filter(country => country[critery].toLowerCase().includes(value.toLowerCase()))

    console.log(filtered)
    return filtered
}

module.exports = filters