
const SET_CURRENCIES = 'SET_CURRENCIES'
const SET_CHOSEN_VALUES = 'SET_CHOSEN_VALUES'


let initialState = {
    currencies: [],
    chosenLabel: 'USD',
    chosenSymbol: '$'
}

export const currency_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCIES:
            return {...state, currencies: action.currencies}
        case SET_CHOSEN_VALUES:
            return {...state, chosenLabel: action.chosenValues.label, chosenSymbol: action.chosenValues.symbol}
    }
    return state

}

export const setCurrenciesCreator = (currencies) => ({
    type: SET_CURRENCIES,
    currencies
})
export const setChosenValuesCreator = (chosenValues) => ({
    type: SET_CHOSEN_VALUES,
    chosenValues
})





