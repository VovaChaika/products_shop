import React from "react";
import styles from './App.module.scss';
import {Route, Routes} from "react-router-dom";
import CartContainer from "./components/cart/CartContainer";
import ItemContainer from "./components/ItemContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {currencyAPI, productsAPI} from "./api/api";

function App(props) {
    const [isVisible, setIsVisible] = React.useState(false)
    let usualArr = productsAPI.GetProductsAPI()
    let currencies = currencyAPI.GetCurrenciesAPI()


    return (
        <div className={isVisible ? styles.AppDisable : ''}>
            <HeaderContainer stateCurr={props.stateCurr} setVisible={setIsVisible} isVisible={isVisible}
                             currencies={currencies}/>
            <div className={styles.App}>
                <Routes>
                    <Route path={"/"}
                           element={<ContentContainer
                               usualArr={usualArr}
                               state={props.state}
                               stateCurr={props.stateCurr}
                               addProduct={props.addProduct}
                               changeCategory={props.changeCategory}
                               getCurrency={props.getCurrency}
                               getUsualArr={props.getUsualArr}
                           />}/>
                    <Route path="/content/*"
                           element={<ContentContainer
                               usualArr={usualArr}
                               state={props.state}
                               stateCurr={props.stateCurr}
                               addProduct={props.addProduct}
                               changeCategory={props.changeCategory}
                               getCurrency={props.getCurrency}
                           />}/>
                    <Route path="/cart/*"
                           element={<CartContainer/>}/>
                    <Route path="/item/*"
                           element={<ItemContainer stateCurr={props.stateCurr}
                                                   addFullProduct={props.addFullProduct}
                                                   stateCart={props.stateCart}
                                                   addChosenValues={props.addChosenValues}
                                                   clearValues={props.clearValues}
                                                   usualArr={usualArr}
                           />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

