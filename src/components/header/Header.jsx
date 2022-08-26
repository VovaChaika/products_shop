import React from 'react';
import styles from "./Header.module.scss"
import {images} from "../../constants"
import {NavLink} from "react-router-dom";
import CartOverlayContainer from "../cart/cart_overlay/CartOverlayContainer";
import CurrSwitchContainer from "./currency_switcher/CurrSwitchContainer";

const Header = (props) => {
    function changeVisibility() {
        if (props.isVisibleCurrSwitch === true || props.isVisibleCart === true) {
            props.setIsVisibleCurrSwitch(false)
            props.setIsVisibleCart(false)
            props.setVisible(false)
        }
    }

    return (
        <div className={styles.header_grid}>
                <span onMouseMove={() => {
                    changeVisibility()
                }}>
                     <span className={styles.categories}>
                         {
                             props.locations.map((location) => {
                                    return <NavLink className={styles.category} onClick={
                                         () => {
                                             props.switchPath(location.name)
                                         }
                                     } to={`/content/${location.name}`}>{location.name}</NavLink>
                                 }
                             )
                         }
                     </span>

                <img className={styles.logo} src={images.logo} alt=""/>

                </span>

            <span className={styles.currency}><CurrSwitchContainer
                setVisible={props.setVisible}
                isVisible={props.isVisible}

                isVisibleCurrSwitch={props.isVisibleCurrSwitch}
                setIsVisibleCurrSwitch={props.setIsVisibleCurrSwitch}
                isVisibleCart={props.isVisibleCart}
                setIsVisibleCart={props.setIsVisibleCart}

                currencies={props.currencies}
            /></span>

            <span className={styles.cart}><CartOverlayContainer
                currency={props.stateCurr}
                setVisible={props.setVisible}
                isVisible={props.isVisible}

                isVisibleCart={props.isVisibleCart}
                setIsVisibleCart={props.setIsVisibleCart}
                isVisibleCurrSwitch={props.isVisibleCurrSwitch}
                setIsVisibleCurrSwitch={props.setIsVisibleCurrSwitch}
            /></span>
        </div>
    );
};

export default Header;