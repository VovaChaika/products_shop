import {productsAPI} from "../api/api";
import {category} from "../components/header/Header";

const ADD_PRODUCT = "ADD_PRODUCT"
const ADD_FULL_PRODUCT = "ADD_FULL_PRODUCT"
const ADD_CHOSEN_VALUES = "ADD_CHOSEN_VALUES"
const CLEAR_VALUES = "CLEAR_VALUES"
const CHANGE_COUNT_BY_ID = "CHANGE_COUNT_BY_ID"

let initialState = {
    productAdded: [],
    product:[],
    chosenValues:[],
    identifiers:0,
    productsCount:0,
    priceCount:0

}

export const cart_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            let ifCount = false
            let whichId = 0
            state.productAdded.map((product) => {
                whichId++
                if (product.idProduct === action.id) {
                    ifCount = true
                }
            })
            if (ifCount) return (
                {productAdded: [...state.productAdded, state.productAdded[whichId - 1].count++]}
            )
            else return {productAdded: [...state.productAdded, {idProduct: action.id, count: 1}]}

        case ADD_FULL_PRODUCT:
            let doChangeProd = 0
            const saveCount = action.product.count
            state.productsCount=state.productsCount+1
            state.product?.map((prod)=>{
                action.product.count = prod.count
                const result = deepEqual(prod, action.product)
                if(result || compareAttributes(prod.chosenValues, action.product.chosenValues)){
                    doChangeProd = 1
                    prod.count=prod.count+1
                    action.product.count = saveCount
                }
            })
            if (doChangeProd === 0){
                action.product.count = saveCount
                return {...state, product:[...state?.product, action.product], identifiers: state.identifiers+1}
            }
        case CLEAR_VALUES:
            return {...state, chosenValues: []}
        case ADD_CHOSEN_VALUES:
            let doChange = 0
            state.chosenValues?.map((value)=>{
                if (value.name === action.name){
                    value.value = action.value
                    value.index = action.index
                    doChange = 1
                    return {...state}
                }
            })
            if (action.name===undefined || action.value===undefined){
                doChange=1
                return {...state}
            }
            if (doChange===0){
                return {...state, chosenValues: [...state?.chosenValues, {name:action?.name, value:action?.value, index: action.index }]}
            }
        case CHANGE_COUNT_BY_ID:
            console.log(action.identifier)
            let saveProductPlace = 0
            state.product?.map((product)=>{
                if (product.identifier === action.identifier){
                    action.increase === true ? product.count = product.count+1 : product.count = product.count-1
                    if (product.count <= 0){
                        let check = state.product?.splice(saveProductPlace)
                        state.productsCount = state.productsCount-1
                    }
                }
                saveProductPlace++
            })


    }
    return {...state}
}

export const addProductCreator = (id) => {
    return {type: ADD_PRODUCT, id}
}

export const addFullProductCreator = (product) => {
    return{type: ADD_FULL_PRODUCT, product}
}

export const addChosenValuesCreator = (name, value, index) => {
    return{type: ADD_CHOSEN_VALUES, name, value, index}
}

export const clearValuesCreator = () => {
    return{type: CLEAR_VALUES}
}

export const increaseCountCreator = (identifier, increase) => {
    return{type: CHANGE_COUNT_BY_ID, identifier, increase}
}

function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}
function isObject(object) {
    return object != null && typeof object === 'object';
}
function compareAttributes(array1, array2) {
    let count = 0
    for (let i = 0; i<array1.length; i++){
        for (let j = 0; j<array2.length; j++){
            if (array1[i].name===array2[j].name && array1[i].value===array2[j].value){
                count++;
            }
        }
    }
    if (count===array1.length){
        return true
    }
    else return false
}
//thunk

