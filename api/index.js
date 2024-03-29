//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js')
const { conn, Country } = require('./src/db')
const getCountries = require('./src/Loader/loader')

// Syncing all the models at once.

// const sincr = async () => {
//   try {
//     await conn.sync({ force: false })
//     console.log('base de datos conectada')
//   }
//   catch {
//     err => console.log('ERROR EN DB'.red)
//   }

//   await getCountries(Country)

//   server.listen(3001, () => {
//     console.log('Server listening at 3001'); // eslint-disable-line no-console
//   });

// }
// sincr()

conn.sync({ force: false })
  .then(() => {
    console.log('base de datos conectada')
    getCountries(Country)
      .then(() => {
        server.listen(3001, () => {
          console.log('Server listening at 3001') // eslint-disable-line no-console
        })
      })
  })
  .catch(err => console.log('ERROR: ', err))
