import {locationsAPI} from "../api/api";
const GET_LOCATIONS = 'GET_LOCATIONS'
const SWITCH_PATH = 'SWITCH_PATH'
const GET_PRODUCTS_SHORT = 'GET_PRODUCTS_SHORT'
const REFRESH_PRODUCTS_SHORT = 'REFRESH_PRODUCTS_SHORT'

let initialState = {
    usualArr: [],
    priceArr: [],
    allProductsShort: [],
    locations: [],
    isFetching: true,
    path: ''
}

export const content_reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATIONS:
            return {...state, locations: action.data}
        case SWITCH_PATH:
            return {...state, path: action.newPath}
        case GET_PRODUCTS_SHORT:
            return {...state, allProductsShort: action.shortProduct}
        case REFRESH_PRODUCTS_SHORT:
            return {...state, allProductsShort: []}
    }
    return state

}

export const setLocationsCreator = (data) => ({
    type: GET_LOCATIONS,
    data
})

export const switchPathCreator = (newPath) => ({
    type: SWITCH_PATH,
    newPath
})

export const getShortProductsCreator = (shortProduct) => ({
    type: GET_PRODUCTS_SHORT,
    shortProduct
})

export const refreshShortProductsCreator = () => ({
    type: REFRESH_PRODUCTS_SHORT,
})

//thunk
export const getLocations = () => {
    return (dispatch) => {
        locationsAPI.GetLocationsAPI.then(res => res.json()).then(data => {
            dispatch(setLocationsCreator(data.data.categories))
        })
    }
}




