import React from 'react';
import styles from "./Header.module.scss"
import {images} from "../../constants"
import {NavLink} from "react-router-dom";
import CartOverlayContainer from "../cart/cart_overlay/CartOverlayContainer";
import CurrSwitchContainer from "./currency_switcher/CurrSwitchContainer";

const Header = (props) => {
    const [isVisibleCurrSwitch, setIsVisibleCurrSwitch] = React.useState(false)
    const [isVisibleCart, setIsVisibleCart] = React.useState(false)

    function changeVisibility() {
        if (isVisibleCurrSwitch === true || isVisibleCart === true) {
            setIsVisibleCurrSwitch(false)
            setIsVisibleCart(false)
            //isvisible props???
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
                isVisibleCurrSwitch={isVisibleCurrSwitch}
                setIsVisibleCurrSwitch={setIsVisibleCurrSwitch}
                isVisibleCart={isVisibleCart}
                setIsVisibleCart={setIsVisibleCart}
                currencies={props.currencies}
            /></span>

            <span className={styles.cart}><CartOverlayContainer
                currency={props.stateCurr}
                setVisible={props.setVisible}
                isVisible={props.isVisible}
                isVisibleCart={isVisibleCart}
                setIsVisibleCart={setIsVisibleCart}
                isVisibleCurrSwitch={isVisibleCurrSwitch}
                setIsVisibleCurrSwitch={setIsVisibleCurrSwitch}
            /></span>
        </div>
    );
};

export default Header;