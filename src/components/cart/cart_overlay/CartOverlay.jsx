import React from 'react';
import styles from './CartOverlay.module.scss'
import CartItem from "./cart_items/CartItem";
import {NavLink} from "react-router-dom";
import {images} from "../../../constants";
import CartItemContainer from "./cart_items/CartItemContainer";

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

                <input type="image" src={images.cart}></input>
                {props.state.productsCount === 0 ? '' : props.state.productsCount}
            </button>
            {props.isVisibleCart &&

                <div className={styles.position} onMouseLeave={() => {
                    props.setIsVisibleCart(false)
                    props.setVisible(false)
                }
                }>
                    <div>My Bag, {props.state.productsCount === 1 ?
                        <span>{props.state.productsCount} item</span> :
                        <span>{props.state.productsCount} items</span>}</div>
                    <div className={styles.cart_items}>
                        <CartItemContainer/>
                    </div>
                    <button>
                        <NavLink to={'/cart'} className={styles.navbar}>
                            view bag
                        </NavLink>
                    </button>
                    <button>
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