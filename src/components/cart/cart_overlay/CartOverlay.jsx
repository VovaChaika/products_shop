import React from 'react';
import styles from './CartOverlay.module.scss'
import CartItem from "./cart_items/CartItem";
import {updateProducts} from "../../../redux/content_reducer";
import {NavLink} from "react-router-dom";
import {images} from "../../../constants";

const CartOverlay = (props) => {
    let usualArr = [...updateProducts()]

    return (
        <>
            <button className={styles.button} onMouseMove={() => {
                if (props.isVisibleCurrSwitch===true){
                    props.setIsVisibleCurrSwitch(false)
                }
                props.setIsVisibleCart(true)
                props.setVisible(true)
            }}

            >
                <input type="image" src={images.cart}></input>
            </button>
            {props.isVisibleCart &&
                <div className={styles.position} onMouseLeave={() => {
                    props.setIsVisibleCart(false)
                    props.setVisible(false)
                }
                }>
                    <div className={styles.cart_items}>
                        <CartItem state={props.state} usualArr={usualArr} curr={props.stateCurr.currency}/>
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