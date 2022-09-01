import React, {Component} from 'react';
import styles from "./Header.module.scss"
import {images} from "../../constants"
import {NavLink} from "react-router-dom";
import CartOverlayContainer from "../cart/cart_overlay/CartOverlayContainer";
import CurrSwitchContainer from "../currency_switcher/CurrSwitchContainer";

class Header extends Component {
    render() {
        const changeVisibility = () => {
            if (this.props.isVisibleCurrSwitch === true || this.props.isVisibleCart === true) {
                this.props.setIsVisibleCurrSwitch(false)
                this.props.setIsVisibleCart(false)
                this.props.setVisible(false)
            }
        }

        return (
            <div className={styles.header_grid}>
                <span onClick={() => {
                    changeVisibility()
                }}>
                     <span className={styles.categories}>
                         {
                             this.props.locations.map((location) => {
                                     return <NavLink
                                         className={location.name === this.props.headerUrl ? styles.activeUrl : styles.category}
                                         onClick={
                                             () => {
                                                 this.props.switchPath(location.name)

                                             }
                                         }
                                         onMouseLeave={() => {
                                             if (window.location.pathname.split('/content/').length>1){
                                                 this.props.splitHeaderUrl(window.location.pathname.split('/content/'))
                                             }
                                         }
                                         } to={`/content/${location.name}`}>{location.name}</NavLink>
                                 }
                             )
                         }
                     </span>


                </span>
                <img className={styles.logo} src={images.logo} alt="" onClick={() => {
                    changeVisibility()
                }}/>

                <span className={styles.currency}><CurrSwitchContainer
                    setVisible={this.props.setVisible}
                    isVisible={this.props.isVisible}

                    isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                    setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                    isVisibleCart={this.props.isVisibleCart}
                    setIsVisibleCart={this.props.setIsVisibleCart}
                /></span>

                <span className={styles.cart}><CartOverlayContainer
                    setVisible={this.props.setVisible}
                    isVisible={this.props.isVisible}

                    isVisibleCart={this.props.isVisibleCart}
                    setIsVisibleCart={this.props.setIsVisibleCart}
                    isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                    setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                /></span>
            </div>
        );
    }


};

export default Header;