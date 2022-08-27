import React from 'react';
import CartItemContainer from "./cart_overlay/cart_items/CartItemContainer";
import styles from "./Cart.module.scss"
const Cart = (props) => {
    let curr = props.stateCurr.currency
    return (
        <>
            <div className={styles.header}>Cart</div>
            <CartItemContainer state={props.state} curr={curr}/>
        </>
    );
};

export default Cart;