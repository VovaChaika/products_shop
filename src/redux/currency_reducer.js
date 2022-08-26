const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
const ADD_CURRENCY = 'ADD_CURRENCY'
const UPDATE_COST = 'UPDATE_COST'
const CURRENCY_CHANGE = 'CURRENCY_CHANGE'
const SET_LABEL = 'SET_LABEL'


let initialState = {
    currency: "$",
    label: 'GBP',
    currencyArr: [],
    oneItemData: {},
}

export const currency_reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {...state, currency: action.newCurrency}
        case ADD_CURRENCY:
            return {...state, currencyArr: [...action.currArr]}
        case UPDATE_COST:
            state.currencyArr?.map((productCurr) => {
                console.log(initialState.currencyArr)
                console.log(productCurr)
                productCurr?.map((price) => {
                    if (price.currency.label === state.currency) {
                        console.log(price)
                    }
                })
            })
            return {...state}
        //save only values with needed currency
        case CURRENCY_CHANGE:
            console.log(action.newCurrency)
            console.log(action.currency)
            if (action.newCurrency !== undefined && action.currency!==undefined){
                let array = []
                action.newCurrency?.map((currItem) => {
                    currItem?.map((searchOnePrice) => {
                        if (searchOnePrice.currency.label === action.currency) {
                            Object.assign(searchOnePrice, {id: currItem.id})
                            array.push(searchOnePrice)
                        }
                    })
                })
                console.log(array)
                return {...state, currencyArr: [...array]}
            }
            else return {...state}

        case SET_LABEL:
            return {...state, label: action.label}

    }
    return state

}

//AC
export const changeCurrencyCreator = (newCurrency) => ({
    type: CHANGE_CURRENCY,
    newCurrency
})
export const setLabelCreator = (label) => ({
    type: SET_LABEL,
    label
})

//save only values with needed currency
export const changeArrayCurrencyCreator = (newCurrency, currency) => ({
    type: CURRENCY_CHANGE,
    newCurrency,
    currency
})



