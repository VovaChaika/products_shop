import React from 'react';
import styles from './CartOverlay.module.scss'
import {NavLink} from "react-router-dom";
import {images} from "../../../constants";
import CartItemContainer from "../cart_items/CartItemContainer";

const CartOverlay = (props) => {

    return (
        <>
            <button className={styles.button} onMouseMove={() => {
                if (props.isVisibleCurrSwitch === true) {
                    props.setIsVisibleCurrSwitch(false)
                }
                props.setIsVisibleCart(true)
                props.setVisible(true)
            }}

            >
                <img className={props.state.productsCount === 0 ? styles.cartImgNone : styles.cartImg} src={images.cart}
                     alt=""/>
                {props.state.productsCount === 0 ? '' :
                    <img className={styles.circleImg} src={images.blackCircle} alt=""/>}
                <span
                    className={styles.numberCount}>{props.state.productsCount === 0 ? '' : props.state.productsCount}</span>

            </button>
            {props.isVisibleCart &&

                <div className={styles.position} onMouseLeave={() => {
                    props.setIsVisibleCart(false)
                    props.setVisible(false)
                }
                }>
                    <div><span className={styles.attrHeader}>My Bag,</span> {props.state.productsCount === 1 ?
                        <span className={styles.spanHeader}>{props.state.productsCount} item</span> :
                        <span className={styles.spanHeader}>{props.state.productsCount} items</span>}</div>
                    <div className={styles.cart_items}>
                        <CartItemContainer isCartOverlay={true}/>
                    </div>
                    <button className={styles.bag}>
                        <NavLink to={'/cart'} className={styles.navbar} onClick={() => {
                            props.setIsVisibleCart(false)
                            props.setVisible(false)
                        }
                        }>
                            view bag
                        </NavLink>
                    </button>
                    <button className={styles.button} onClick={() => {
                        props.setIsVisibleCart(false)
                        props.setVisible(false)
                    }
                    }>
                        <NavLink to={'/cart'} className={styles.navbar}>
                            check out
                        </NavLink>
                    </button>
                </div>
            }
        </>

    );
};

export default CartOverlay;