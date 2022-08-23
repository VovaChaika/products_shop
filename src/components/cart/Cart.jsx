import React, {useState} from 'react';
import CartItem from "./cart_overlay/cart_items/CartItem";
import {updateProducts} from "../../redux/content_reducer";
import Items from "../content/Items";

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

    let usualArr = [...updateProducts()]
    let curr = props.stateCurr.currency
    return (
        <>
            <h2>Cart</h2>
            <CartItem state={props.state} usualArr={usualArr} curr={curr}/>
        </>
    );
};

export default Cart;