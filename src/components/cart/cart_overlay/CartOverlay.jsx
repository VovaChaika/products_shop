import React, {Component} from 'react';
import styles from './CartOverlay.module.scss'
import {NavLink} from "react-router-dom";
import {images} from "../../../constants";
import CartItemContainer from "../cart_items/CartItemContainer";

class CartOverlay extends Component{
    render() {
        return (
            <div>
                <button className={styles.button} onClick={() => {
                    if (this.props.isVisibleCurrSwitch === true) {
                        this.props.setIsVisibleCurrSwitch(false)
                    }
                    if (this.props.isVisibleCart === true){
                        document.querySelector("#myBody").style.backgroundColor="white"
                        this.props.setIsVisibleCart(false)
                        this.props.setVisible(false)
                    }
                    else {
                        this.props.setIsVisibleCart(true)
                        document.querySelector("#myBody").style.backgroundColor="#39374838"
                        this.props.setVisible(true)
                    }

                }}

                >
                    <img className={this.props.state.productsCount === 0 ? styles.cartImgNone : styles.cartImg} src={images.cart}
                         alt=""/>
                    {this.props.state.productsCount === 0 ? '' :
                        <img className={styles.circleImg} src={images.blackCircle} alt=""/>}
                    <span
                        className={this.props.state.productsCount > 9 ? styles.numberCountMore : styles.numberCount}>{this.props.state.productsCount === 0 ? '' : this.props.state.productsCount}</span>

                </button>
                {this.props.isVisibleCart &&

                    <div className={styles.position}>
                        <div className={styles.headerPosition}><span className={styles.attrHeader}>My Bag,</span> {this.props.state.productsCount === 1 ?
                            <span className={styles.spanHeader}>{this.props.state.productsCount} item</span> :
                            <span className={styles.spanHeader}>{this.props.state.productsCount} items</span>}</div>
                        <div className={styles.cart_items}>
                            <CartItemContainer isCartOverlay={true}/>
                        </div>
                        <NavLink to={'/cart'} className={styles.bag} onClick={()=>{
                            document.querySelector("#myBody").style.backgroundColor="white"
                            this.props.setIsVisibleCart(false)
                            this.props.setVisible(false)
                        }
                        }>
                                <span>view bag</span>
                        </NavLink>
                        <button className={styles.button} onClick={() => {
                            document.querySelector("#myBody").style.backgroundColor="white"
                            this.props.setIsVisibleCart(false)
                            this.props.setVisible(false)
                            alert("Ordered!")
                            this.props.deleteFromCart()
                        }
                        }>
                                check out
                        </button>
                    </div>
                }
            </div>

        );
    }
};

export default CartOverlay;