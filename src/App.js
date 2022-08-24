import React, {useEffect} from "react";
import styles from './App.module.scss';
import {Route, Routes} from "react-router-dom";
import CartContainer from "./components/cart/CartContainer";
import ItemContainer from "./components/ItemContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {currencyAPI} from "./api/api";

function App(props) {
    const [isVisible, setIsVisible] = React.useState(false)
    let currencies = currencyAPI.GetCurrenciesAPI()

    function startPrice(productId) {
        let startValues
        props.state.usualArr.map((product) => {
            if (product?.id === productId) {
                startValues = []
                startValues.push(product.prices?.[0].amount)
                startValues.push(product.prices?.[0].currency.symbol)
            }
        })
        return startValues
    }

    return (
        <div className={isVisible ? styles.AppDisable : ''}>
            <HeaderContainer stateCurr={props.stateCurr} setVisible={setIsVisible} isVisible={isVisible}
                             currencies={currencies} state={props.state}/>
            <div className={styles.App}>
                <Routes>
                    <Route path={"/"}
                           element={<ContentContainer
                               currencies={currencies}
                               startPrice={startPrice}
                               state={props.state}
                               stateCurr={props.stateCurr}
                               addProduct={props.addProduct}
                               changeCategory={props.changeCategory}
                               getCurrency={props.getCurrency}
                               getUsualArr={props.getUsualArr}
                           />}/>
                    <Route path="/content/*"
                           element={<ContentContainer
                               startPrice={startPrice}
                               currencies={currencies}
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
                                                   state={props.state}
                                                   addFullProduct={props.addFullProduct}
                                                   stateCart={props.stateCart}
                                                   addChosenValues={props.addChosenValues}
                                                   clearValues={props.clearValues}
                                                   usualArr={props.usualArr}
                                                   startPrice={startPrice}
                           />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

