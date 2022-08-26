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
    function startPrice(productId) {
        let startValues
        props.state.usualArr.map((product) => {
            if (product?.id === productId) {
                startValues = []
                console.log(product.prices?.[0])
                startValues.push(product.prices?.[0].amount)
                startValues.push(product.prices?.[0].currency.symbol)
                startValues.push(product.prices?.[0].currency.label)
            }
        })
        return startValues
    }

    return (
        <div className={isVisible ? styles.AppDisable : ''}>

            <HeaderContainer setVisible={setIsVisible}
                             isVisible={isVisible}/>

            <div className={styles.App}>
                <Routes>
                    <Route path={"/"}
                           element={<ContentContainer
                               startPrice={startPrice}
                           />}/>
                    <Route path="/content/*"
                           element={<ContentContainer
                               startPrice={startPrice}
                           />}/>
                    <Route path="/cart/*"
                           element={<CartContainer/>}/>

                    <Route path="/item/*"
                           element={<ItemContainer
                               startPrice={startPrice}
                           />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

