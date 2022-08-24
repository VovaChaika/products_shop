import {locationsAPI, productsAPI, testAPI} from "../api/api";

const GET_PRODUCTS_ARR = 'GET_PRODUCTS_ARR'
const GET_PRICES_ARR = 'GET_PRICES_ARR'
const GET_LOCATIONS = 'GET_LOCATIONS'
const SWITCH_PATH = 'SWITCH_PATH'


let initialState = {
    usualArr: [],
    priceArr: [],
    locations: [],
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


export const updateProducts = () => {
    return productsAPI.GetProductsAPI()
}


//thunk

//export const getProducts = () => {
//     return (dispatch) => {
//         testAPI[0].GetLocationsAPI.then(res => res.json()).then(data => {
//             dispatch(setLocationsCreator(data.data.locations))
//             console.log(data.data.locations)
//         })
//         for (let i = 1; i < testAPI.length; i++) {
//             testAPI[i].GetProductsAPI?.then(res => res.json()).then(data => {
//                 dispatch(setUsualArrCreator(data.data.product))
//                 dispatch(setPricesCreator(data.data.product.prices))
//             })
//         }
//     }
// }
export const getProducts = () => {
    return (dispatch) => {
        for (let i = 0; i < testAPI.length; i++) {
            testAPI[i].GetProductsAPI?.then(res => res.json()).then(data => {
                dispatch(setUsualArrCreator(data.data.product))
                dispatch(setPricesCreator(data.data.product.prices))
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

