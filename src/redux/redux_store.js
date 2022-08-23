import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {content_reducer} from "./content_reducer";
import thunkMiddleware from "redux-thunk"
import {cart_reducer} from "./cart_reducer";
import {currency_reducer} from "./currency_reducer";

let reducers = combineReducers({
    products: content_reducer,
    cart: cart_reducer,
    currency: currency_reducer
})
let store = createStore(reducers , applyMiddleware(thunkMiddleware),
    )

//(localStorage['redux_store']) ? JSON.parse(localStorage['redux_store']) :
store.subscribe(()=>{
    localStorage['redux_store'] = JSON.stringify(store.getState())
})

export default store