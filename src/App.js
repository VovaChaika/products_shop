import React, {Component} from "react";
import styles from './App.module.scss';
import {Route, Routes} from "react-router-dom";
import ItemContainer from "./components/single_product/ItemContainer";
import ContentContainer from "./components/content/ContentContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Cart from "./components/cart/Cart";

class App extends Component {
    render() {
        return (
            <div >
                <HeaderContainer setVisible={this.props.setIsVisible}
                                 isVisible={this.props.isVisible}

                                 isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                                 setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}

                                 isVisibleCart={this.props.isVisibleCart}
                                 setIsVisibleCart={this.props.setIsVisibleCart}
                />

                <div className={this.props.isVisible ? styles.AppDisable : styles.App} onClick={() => {
                    if (this.props.isVisibleCurrSwitch === true || this.props.isVisibleCart === true) {
                        document.querySelector("#myBody").style.backgroundColor="white"
                        this.props.setIsVisibleCurrSwitch(false)
                        this.props.setIsVisibleCart(false)
                        this.props.setIsVisible(false)
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


}

export default App;

