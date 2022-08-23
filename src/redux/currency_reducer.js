import React from "react";

const CHANGE_CURRENCY = 'CHANGE_CURRENCY'
const GET_CURRENCY = 'GET_CURRENCY'
const ADD_CURRENCY = 'ADD_CURRENCY'
const UPDATE_COST = 'UPDATE_COST'
const CURRENCY_CHANGE = 'CURRENCY_CHANGE'
const SET_CURRENCY_DATA = 'SET_CURRENCY_DATA'

let initialState = {
    currency: "USD",
    currencyArr:[],
    oneItemData: {}
}

export const currency_reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {...state, currency: action.newCurrency}
        case GET_CURRENCY:
            return initialState.currency
        case ADD_CURRENCY:
            return {...state, currencyArr: [...action.currArr]}
        case UPDATE_COST:
            state.currencyArr?.map((productCurr)=>{
                console.log(initialState.currencyArr)
                console.log(productCurr)
                productCurr?.map((price)=>{
                    if(price.currency.label===state.currency){
                        console.log(price)
                    }
                })
            })
            //save only values with needed currency
        case CURRENCY_CHANGE:
            let array = []
            action.newCurrency?.map((currItem)=>{
                 currItem?.map((searchOnePrice)=>{
                     if (searchOnePrice.currency.label === state.currency){
                         array.push(searchOnePrice)
                     }
                })
            })
            return {...state, currencyArr: [...array]}
        //save for one item data
        case SET_CURRENCY_DATA:
            console.log(action.oneItemData)
            return {...state, oneItemData: action.oneItemData}


    }
    return state

}

//AC
export const changeCurrencyCreator = (newCurrency) => ({
    type: CHANGE_CURRENCY,
    newCurrency
})
export const getCurrencyCreator = () => ({
    type: GET_CURRENCY
})

//save only values with needed currency
export const changeArrayCurrencyCreator = (newCurrency) => ({
    type: CURRENCY_CHANGE,
    newCurrency
})
export const setCurrencyItemCreator = (oneItemData) => ({
    type: SET_CURRENCY_DATA,
    oneItemData
})

