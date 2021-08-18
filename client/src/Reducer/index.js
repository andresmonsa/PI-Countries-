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



function rootReducer(state = initialState, action) {  
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }
        case "SET_OPTIONS":
            return {
                ...state,
                options: action.payload
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