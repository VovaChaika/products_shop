const ADD_FULL_PRODUCT = "ADD_FULL_PRODUCT"
const ADD_PRODUCT_FINAL = "ADD_PRODUCT_FINAL"
const ADD_CHOSEN_VALUES = "ADD_CHOSEN_VALUES"
const CLEAR_VALUES = "CLEAR_VALUES"
const CHANGE_COUNT_BY_ID = "CHANGE_COUNT_BY_ID"
const TOTAL_COST_CHANGE = 'TOTAL_COST_CHANGE'
const SET_DEFAULT_ATTRIBUTES = 'SET_DEFAULT_ATTRIBUTES'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'

let initialState = {
    product: [],
    productFinal: [],
    chosenValues: [],
    identifiers: 0,
    productsCount: 0,
    priceCount: {},
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
                let result2 = compareAttributes(prod.chosenValues, state.chosenValues)
                if (result || result2) {
                    doChangeProd = 1
                    prod.count = prod.count + 1
                    action.product.count = saveCount
                    return {...state}
                }
            })
            if (doChangeProd === 0) {
                action.product.count = saveCount
                Object.assign(action.product, {chosenValues: state.chosenValues})
                Object.assign(action.product, {identifier: state.identifiers})
                return {...state, product: [...state.product, action.product], identifiers: state.identifiers + 1}
            }
            break;
        case ADD_PRODUCT_FINAL:
            let addProduct = structuredClone(action.product)
            Object.assign(addProduct, {count: action.count})
            Object.assign(addProduct, {chosenValues: action.chosenValues})
            Object.assign(addProduct, {identifier: action.identifier})
            return {...state, productFinal: [...state.productFinal, addProduct]}
        case CLEAR_PRODUCTS:
            return {...state, productFinal: []}
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
                return {
                    ...state,
                    chosenValues: [...state?.chosenValues, {
                        name: action?.name,
                        value: action?.value,
                        index: action.index
                    }]
                }
            }
            break
        case SET_DEFAULT_ATTRIBUTES:
            if (state.chosenValues.length === 0) {
                let allAttrArr = []
                action.attributes.map((allAttributes) => {
                    let chosenValue = {
                        name: allAttributes?.name,
                        value: allAttributes?.items[0].value,
                    }
                    allAttrArr.push(chosenValue)
                })
                state.chosenValues = allAttrArr
            } else {
                let allAttrArr = []
                state.chosenValues.map((attr) => {
                    allAttrArr.push(attr)
                })
                action.attributes.map((allAttributes) => {
                    state.chosenValues.map((attr) => {
                        if (attr.name !== allAttributes.name) {
                            let chosenValue = {
                                name: allAttributes?.name,
                                value: allAttributes?.items[0].value,
                            }
                            allAttrArr.push(chosenValue)
                        }
                    })
                })
                state.chosenValues = allAttrArr
            }
            return {...state}
        case CHANGE_COUNT_BY_ID:
            let saveProductPlace = 0
            state.productFinal?.map((product) => {
                if (product.identifier === action.identifier) {
                    if (action.increase === true) {
                        state.productsCount = state.productsCount + 2
                        return {...state, productFinal: [...state.productFinal, state.productFinal[saveProductPlace].count += 1],
                            product: [...state.product, state.product[saveProductPlace].count += 1]}
                    } else if (action.increase === false) {
                        if (product.count === 1) {
                            state.productFinal.splice(saveProductPlace, 1)
                            state.product.splice(saveProductPlace, 1)


                        } else {
                            return {...state, productFinal: [...state.productFinal, state.productFinal[saveProductPlace].count -= 1],
                                product: [...state.product, state.product[saveProductPlace].count -= 1]}
                        }

                    } else {
                        console.log("error: no such product or identifier")
                        return {...state}
                    }

                }
                saveProductPlace++
            })
            return {...state, productsCount: state.productsCount - 1}

        //save price after product add
        case TOTAL_COST_CHANGE:
            action.price?.map((currency) => {
                if (!state.priceCount.hasOwnProperty(currency.currency?.label)){
                    state.priceCount[currency.currency?.label] = 0
                }
                if (action.plus === false) {
                    if (state.priceCount[currency.currency?.label]*2 <= currency.amount) {
                        state.priceCount[currency.currency?.label] = 0
                    }
                    state.priceCount[currency.currency?.label] -= currency.amount
                }
                else {
                    state.priceCount[currency.currency?.label] += currency.amount
                }
            })
            break
        case DELETE_FROM_CART:
            return {
                ...state,
                product: [],
                chosenValues: [],
                identifiers: 0,
                productsCount: 0,
                priceCount: {USD: 0, GBP: 0, JPY: 0, AUD: 0, RUB: 0}
            }

    }
    return state
}

export const addFullProductCreator = (product) => {
    return {type: ADD_FULL_PRODUCT, product}
}
export const addFullProductCreator2 = (product, chosenValues, count, identifier) => {
    return {type: ADD_PRODUCT_FINAL, product, chosenValues, count, identifier}
}
export const clearCartProductsCreator = () => {
    return {type: CLEAR_PRODUCTS}
}

export const addChosenValuesCreator = (name, value, index) => {
    return {type: ADD_CHOSEN_VALUES, name, value, index}
}

export const setDefaultAttributesCreator = (attributes) => {
    return {type: SET_DEFAULT_ATTRIBUTES, attributes}
}

export const clearValuesCreator = () => {
    return {type: CLEAR_VALUES}
}
export const deleteFromCartCreator = () => {
    return {type: DELETE_FROM_CART}
}

export const increaseCountCreator = (identifier, increase) => {
    return {type: CHANGE_COUNT_BY_ID, identifier, increase}
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
    if (array1.length !== array2.length) {
        return false
    }
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

