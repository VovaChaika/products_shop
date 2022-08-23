import {productsAPI} from "../api/api";

const GET_USUAL_ARR = 'GET_USUAL_ARR'
const SWITCH_PATH = 'SWITCH_PATH'

let initialState = {
    usualArr: [],
    path: ''
}

export const content_reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USUAL_ARR:
            console.log(action.data)
            return {...state, usualArr: action.data}
        case SWITCH_PATH:
            return {...state, path: action.newPath}

    }
    return state

}

//AC

export const setUsualArrCreator = (data) => ({
    type: GET_USUAL_ARR,
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