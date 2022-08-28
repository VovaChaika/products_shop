const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
const SET_ARR_SINGLE_CURRENCY = 'SET_ARR_SINGLE_CURRENCY'
const SET_LABEL = 'SET_LABEL'


let initialState = {
    currency: "$",
    label: 'USD',
    currencyArr: [],
}

export const currency_reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {...state, currency: action.newCurrency}
        //save only values with needed currency
        case SET_ARR_SINGLE_CURRENCY:
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
    type: SET_ARR_SINGLE_CURRENCY,
    newCurrency,
    currency
})



