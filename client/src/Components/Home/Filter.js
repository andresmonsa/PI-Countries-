// const filters = (countries, critery, value) => {
//     if (value === 'All') {
//         const filtered = countries
//         console.log(filtered)
//         return filtered
//     }
//     const filtered = countries.filter(country => country[critery].toLowerCase().includes(value.toLowerCase()))

//     console.log(filtered)
//     return filtered
// }


const sortFunc = (arr, dir, key) => {

    if (dir === 'ASC') {
        arr.sort(function (a, b) {
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        return arr


    } else if (dir === 'DES') {
        arr.sort(function (a, b) {
            if (a[key] < b[key]) {
                return 1;
            }
            if (a[key] > b[key]) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        return arr

    }
    

}
module.exports = sortFunc