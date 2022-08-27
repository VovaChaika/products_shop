import React from 'react';
import styles from "./Header.module.scss"
import {images} from "../../constants"
import {NavLink} from "react-router-dom";
import CartOverlayContainer from "../cart/cart_overlay/CartOverlayContainer";
import CurrSwitchContainer from "./currency_switcher/CurrSwitchContainer";

const Header = (props) => {
    let a = window.location.pathname
    let b = a.split('/content/')

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
                                     return <NavLink
                                         className={location.name === props.headerUrl ? styles.activeUrl : styles.category}
                                         onClick={
                                             () => {
                                                 props.switchPath(location.name)

                                             }
                                         }
                                         onMouseLeave={() => {
                                             props.splitHeaderUrl(window.location.pathname.split('/content/'))
                                         }
                                         } to={`/content/${location.name}`}>{location.name}</NavLink>
                                 }
                             )
                         }
                     </span>


                </span>
            <img className={styles.logo} src={images.logo} alt=""/>

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