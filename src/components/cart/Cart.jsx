import React from 'react';
import CartItemContainer from "./cart_items/CartItemContainer";
import styles from "./Cart.module.scss"
const Cart = () => {
    return (
        <>
            <div className={styles.header}>Cart</div>
            <CartItemContainer/>
        </>
    );
};

export default Cart;