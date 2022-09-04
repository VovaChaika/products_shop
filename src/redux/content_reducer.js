import {getProductsApi, locationsAPI, testAPI} from "../api/api";

const GET_PRODUCTS_ARR = 'GET_PRODUCTS_ARR'
const GET_PRICES_ARR = 'GET_PRICES_ARR'
const GET_LOCATIONS = 'GET_LOCATIONS'
const SWITCH_PATH = 'SWITCH_PATH'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
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
        case GET_PRODUCTS_ARR:
            return {...state, usualArr: [...state.usualArr, action.data]}
        case GET_PRICES_ARR:
            return {...state, priceArr: [...state.priceArr, action.data]}
        case GET_LOCATIONS:
            return {...state, locations: action.data}
        case SWITCH_PATH:
            return {...state, path: action.newPath}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case GET_PRODUCTS_SHORT:
            console.log(state.allProductsShort)
            return {...state, allProductsShort: [...state.allProductsShort, action.shortProduct]}
        case REFRESH_PRODUCTS_SHORT:
            return {...state, allProductsShort: []}
    }
    return state

}

//AC

export const setUsualArrCreator = (data) => ({
    type: GET_PRODUCTS_ARR,
    data
})

export const setPricesCreator = (data) => ({
    type: GET_PRICES_ARR,
    data
})
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


export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching})


//thunk
export const getProducts = () => {
    return (dispatch) => {
        for (let i = 0; i < testAPI.length; i++) {
            testAPI[i].GetProductsAPI?.then(res => res.json()).then(data => {
                dispatch(setUsualArrCreator(data.data.product))
                dispatch(setPricesCreator(data.data.product.prices))
                if (i===testAPI.length-1){
                    dispatch(toggleIsFetching(false))
                }
            })
        }
    }
}
//thunk
export const getLocations = () => {
    return (dispatch) => {
        locationsAPI.GetLocationsAPI.then(res => res.json()).then(data => {
            dispatch(setLocationsCreator(data.data.categories))
        })
    }
}




