let initialState = {
    countries: [],
    country: []
}



function rootReducer(state = initialState, action) {  //destructuring de action para usar solo type y 
    switch (action.type) {
        case 'GET_COUNTRIES':
            // console.log('reducer')
            // console.log(state)
            // console.log(action.payload)
            return {
                ...state,
                countries: action.payload
            }
        case "GET_BY_NAME":
            return {
                ...state,
                countries: action.payload
            }
        case 'GET_COUNTRY_ID':
            return {
                ...state,
                country: action.payload
            }
        default: return state
    }
}

export default rootReducer;