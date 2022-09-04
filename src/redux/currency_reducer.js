const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
const SET_ARR_SINGLE_CURRENCY = 'SET_ARR_SINGLE_CURRENCY'
const SET_LABEL = 'SET_LABEL'
const SET_CURRENCIES = 'SET_CURRENCIES'
const SET_CHOSEN_VALUES = 'SET_CHOSEN_VALUES'
const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE'
const UDPATE_CURRENT_PRICE = 'UDPATE_CURRENT_PRICE'
const SET_CHOSEN_PRICES = 'SET_CHOSEN_PRICES'


let initialState = {
    currency: "$",
    label: 'USD',
    currencyArr: [],

    currencies: [],
    singleItemPrice: {},
    chosenPrices: [],
    chosenLabel: '',
    chosenSymbol: ''
}

export const currency_reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {...state, currency: action.newCurrency}
        //save only values with needed currency
        case SET_ARR_SINGLE_CURRENCY:
            if (action.newCurrency !== undefined && action.currency !== undefined) {
                let array = []
                action.newCurrency?.map((currItem) => {
                    currItem?.map((searchOnePrice) => {
                        if (searchOnePrice.currency.label === action.currency) {
                            Object.assign(searchOnePrice, {id: currItem.id})
                            array.push(searchOnePrice)
                        }
                    })
                })
                return {...state, currencyArr: [...array]}
            } else return {...state}

        case SET_LABEL:
            return {...state, label: action.label}

        //new
        case SET_CURRENCIES:
            return {...state, currencies: action.currencies}
        case SET_CHOSEN_VALUES:
            return {...state, chosenLabel: action.chosenValues.label, chosenSymbol: action.chosenValues.symbol}
        case SET_CHOSEN_PRICES:
            let chosenData = action.data.filter((price) => {
                return price.currency.label === state.chosenLabel
            })
            Object.assign(chosenData[0], {id:action.productId})
            console.log(state.chosenPrices)
            return {...state, chosenPrices: [...state.chosenPrices, chosenData[0]]}

        case SET_CURRENT_PRICE:
            let getCurrentPrice = action.currPrice.filter((price) => {
                return price.currency.label === state.chosenLabel
            })
            return {...state, singleItemPrice: getCurrentPrice[0]}
        case UDPATE_CURRENT_PRICE:
            return {...state, chosenPrices: []}


    }
    return state

}

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

//new
export const setCurrenciesCreator = (currencies) => ({
    type: SET_CURRENCIES,
    currencies
})
export const setChosenValuesCreator = (chosenValues) => ({
    type: SET_CHOSEN_VALUES,
    chosenValues
})
export const setChosenPricesCreator = (data, productId) => ({
    type: SET_CHOSEN_PRICES,
    data,
    productId,
})
export const setCurrentProductPriceCreator = (currPrice, productId) => ({
    type: SET_CURRENT_PRICE,
    currPrice,
    productId
})
export const updateCurrentPriceCreator = () => ({
    type: UDPATE_CURRENT_PRICE
})





