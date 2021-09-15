export function getCountries (data) {
  return {
    type: 'GET_COUNTRIES',
    payload: data
  }
}

export function getCountryID (id) {
  return {
    type: 'GET_COUNTRY_ID',
    payload: id
  }
}

export function setearOptions (obj) {
  return {
    type: 'SET_OPTIONS',
    payload: obj
  }
}
