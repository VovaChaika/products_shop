import React, {useState} from 'react';
import CartItem from "./cart_overlay/cart_items/CartItem";
import {updateProducts} from "../../redux/content_reducer";
import Items from "../content/Items";
import CartItemContainer from "./cart_overlay/cart_items/CartItemContainer";

const Cart = (props) => {
    // const [totalPrice, setTotalPrice] = useState(0)
    // const quantity = 0
    // const taxCount = totalPrice * 0.21
    // const [isVisible, setIsVisible] = React.useState(false)

    // function componentWillReceiveProps(nextProps) {
    //     if (props.data.img !== undefined && props.data.name !== undefined && props.data.price !== undefined) {
    //         setIsVisible(true)
    //     }
    // }

    let curr = props.stateCurr.currency
    return (
        <>
            <h2>Cart</h2>
            <CartItemContainer state={props.state} curr={curr}/>
        </>
    );
};

export default Cart;