import React, {Component} from 'react';
import CartItemContainer from "./cart_items/CartItemContainer";
import styles from "./Cart.module.scss"
class Cart extends Component{
    render() {
        return (
            <>
                <div className={styles.header}>Cart</div>
                <CartItemContainer/>
            </>
        );
    }
};

export default Cart;