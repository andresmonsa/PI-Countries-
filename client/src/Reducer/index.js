let initialState = {
    countries: [],
    country: [],
    options :   {
        name: "",
        activity: "",
        region: "All",
        sort: "ASC",
        population: '',
    },
}

function rootReducer(state = initialState, {type, payload}) {  
    switch (type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: payload
            }
        case "SET_OPTIONS":
            return {
                ...state,
                options: payload
            }
        case 'GET_COUNTRY_ID':
            return {
                ...state,
                country: payload
            }
        default: return state
    }
}

export default rootReducer;