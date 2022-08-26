const ADD_FULL_PRODUCT = "ADD_FULL_PRODUCT"
const ADD_CHOSEN_VALUES = "ADD_CHOSEN_VALUES"
const CLEAR_VALUES = "CLEAR_VALUES"
const CHANGE_COUNT_BY_ID = "CHANGE_COUNT_BY_ID"
const TOTAL_COST_CHANGE = 'TOTAL_COST_CHANGE'
const DECREASE_PROD_COUNT = 'DECREASE_PROD_COUNT'

let initialState = {
    productAdded: [],
    product: [],
    chosenValues: [],
    identifiers: 0,
    productsCount: 0,
    //transfer product.prices and + to all price of all symbols
    priceCount: {USD: 0, GBP: 0, JPY: 0, AUD: 0, RUB: 0},
}

export const cart_reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FULL_PRODUCT:
            let doChangeProd = 0
            const saveCount = action.product.count
            state.productsCount = state.productsCount + 1

            state.product?.map((prod) => {

                action.product.count = prod.count
                let result = deepEqual(prod, action.product)
                let result2 = compareAttributes(prod.chosenValues, action.product.chosenValues)
                if (result || result2) {
                    doChangeProd = 1
                    prod.count = prod.count + 1
                    action.product.count = saveCount
                    return {...state}
                }
            })
            if (doChangeProd === 0) {
                action.product.count = saveCount
                return {...state, product: [...state.product, action.product], identifiers: state.identifiers + 1}
            }
            break;

        case CLEAR_VALUES:
            return {...state, chosenValues: []}
        case ADD_CHOSEN_VALUES:
            let doChange = 0
            state.chosenValues?.map((value) => {
                if (value.name === action.name) {
                    value.value = action.value
                    value.index = action.index
                    doChange = 1
                    return {...state}
                }
            })
            if (action.name === undefined || action.value === undefined) {
                doChange = 1
                return {...state}
            }
            if (doChange === 0) {
                return {...state,
                    chosenValues: [...state?.chosenValues, {
                        name: action?.name,
                        value: action?.value,
                        index: action.index
                    }]
                }
            }
            break
        case CHANGE_COUNT_BY_ID:
            let saveProductPlace = 0
            state.product?.map((product) => {
                if (product.identifier === action.identifier) {
                    if (action.increase === true){
                        state.productsCount = state.productsCount + 2
                        return {...state, product:[...state.product, state.product[saveProductPlace].count +=1]}
                    }
                    else if (action.increase === false){
                        if (product.count === 1) {
                           state.product.splice(saveProductPlace, 1)


                        }
                        else {
                            return {...state, product:[...state.product, state.product[saveProductPlace].count -=1]}
                        }

                    }
                    else {
                        console.log("error: no such product or identifier")
                        return {...state}}

                }
                saveProductPlace++
            })
            return {...state, productsCount: state.productsCount-1}

        //save price after product add
        case TOTAL_COST_CHANGE:
            action.price?.map((currency)=>{
                console.log(currency)
                console.log(action?.price?.[0])
                if (action.plus === false){
                    switch (currency.currency?.label){
                        case "USD":
                            if (state.priceCount.USD<currency.amount){
                                state.priceCount.USD = 0
                                break
                            }
                            state.priceCount.USD -= currency.amount; break
                        case "GBP":
                            if (state.priceCount.GBP<currency.amount){
                                state.priceCount.GBP = 0
                                break
                            }
                            state.priceCount.GBP -= currency.amount; break
                        case "JPY":
                            if (state.priceCount.JPY<currency.amount){
                                state.priceCount.JPY = 0
                                break
                            }
                            state.priceCount.JPY -= currency.amount; break
                        case "AUD":
                            if (state.priceCount.AUD<currency.amount){
                                state.priceCount.AUD = 0
                                break
                            }
                            state.priceCount.AUD -= currency.amount; break
                        case "RUB":
                            if (state.priceCount.RUB<currency.amount){
                                state.priceCount.RUB = 0
                                break
                            }
                            state.priceCount.RUB -= currency.amount; break
                        default :
                            if (state.priceCount.USD<action.price?.[0]){
                                state.priceCount.USD = 0
                                break
                            }
                            state.priceCount.USD -=action.price?.[0]
                    }
                }
                else switch (currency.currency?.label){
                    case "USD":
                        state.priceCount.USD += currency.amount; break
                    case "GBP":
                        state.priceCount.GBP += currency.amount; break
                    case "JPY":
                        state.priceCount.JPY += currency.amount; break
                    case "AUD":
                        state.priceCount.AUD += currency.amount; break
                    case "RUB":
                        state.priceCount.RUB += currency.amount; break
                    default : state.priceCount.USD +=action.price?.[0]
                }

            })
            break

    }
    return state
}

export const addFullProductCreator = (product) => {
    return {type: ADD_FULL_PRODUCT, product}
}

export const addChosenValuesCreator = (name, value, index) => {
    return {type: ADD_CHOSEN_VALUES, name, value, index}
}

export const clearValuesCreator = () => {
    return {type: CLEAR_VALUES}
}

export const increaseCountCreator = (identifier, increase) => {
    return {type: CHANGE_COUNT_BY_ID, identifier, increase}
}
export const decreaseProdCountCreator = () => {
    return {type: DECREASE_PROD_COUNT}
}
export const changeTotalCostCreator = (price, plus) => ({
    type: TOTAL_COST_CHANGE,
    price,
    plus
})

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
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i].name === array2[j].name && array1[i].value === array2[j].value) {
                count++;
            }
        }
    }
    if (count === array1.length) {
        return true
    } else return false
}

//thunk

