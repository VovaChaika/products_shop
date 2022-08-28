import React from "react";
import styles from './App.module.scss';
import {Route, Routes} from "react-router-dom";
import ItemContainer from "./components/single_product/ItemContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Cart from "./components/cart/Cart";

function App(props) {

    return (
        <div>
            <HeaderContainer setVisible={props.setIsVisible}
                             isVisible={props.isVisible}

                             isVisibleCurrSwitch={props.isVisibleCurrSwitch}
                             setIsVisibleCurrSwitch={props.setIsVisibleCurrSwitch}

                             isVisibleCart={props.isVisibleCart}
                             setIsVisibleCart={props.setIsVisibleCart}
            />

            <div className={props.isVisible ? styles.AppDisable : styles.App} onClick={()=>{
                if (props.isVisibleCurrSwitch === true || props.isVisibleCart === true) {
                    props.setIsVisibleCurrSwitch(false)
                    props.setIsVisibleCart(false)
                    props.setIsVisible(false)
                }
            }}>
                <Routes>
                    <Route path={"/"}
                           element={<ContentContainer/>}/>
                    <Route path="/content/*"
                           element={<ContentContainer/>}/>
                    <Route path="/cart/*"
                           element={<Cart/>}/>

                    <Route path="/item/*"
                           element={<ItemContainer/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

