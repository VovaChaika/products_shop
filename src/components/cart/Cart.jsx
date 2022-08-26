import React from 'react';
import CartItemContainer from "./cart_overlay/cart_items/CartItemContainer";

const Cart = (props) => {
    let curr = props.stateCurr.currency
    return (
        <>
            <h2>Cart</h2>
            <CartItemContainer state={props.state} curr={curr}/>
        </>
    );
};

export default Cart;