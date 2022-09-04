import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {content_reducer} from "./content_reducer";
import {cart_reducer} from "./cart_reducer";
import {currency_reducer} from "./currency_reducer";
import thunkMiddleware from "redux-thunk"
import {item_reducer} from "./item_reducer";

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['products']
}
let reducers = combineReducers({
    products: content_reducer,
    cart: cart_reducer,
    currency: currency_reducer,
    item: item_reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(reducers , applyMiddleware(thunkMiddleware))

export const persistor = persistStore(store)
export default store