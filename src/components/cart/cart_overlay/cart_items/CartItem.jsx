import React, {useState} from 'react';
import Items from "../../../content/Items";
import styles from "./CartItem.module.scss"

const CartItem = (props) => {
    return (
        <>
            {
                props.state.product?.map((product) => {
                    return <div className={styles.product}>
                        <div className={styles.brand}>{product.brand}</div>
                        <div className={styles.name}>{product.name}</div>
                        <div className={styles.price}>{product.priceUSD}{props.curr}</div>
                        <div>Count: {product.count}</div>
                        <div className={styles.attributes}>
                            {product.attribute?.map((attribute) => {
                                return (<div>{attribute.name}:{attribute.items.map((items) => {
                                    let result = []
                                    product.chosenValues?.map((values) => {
                                        result.push({value: values.value, index: values.index, name: values.name})

                                    })
                                    if (attribute.name === "Color") {
                                        return <button
                                            className={result.find(res=>res.value === items.value)!==undefined ? styles.active : ''}
                                            style={{backgroundColor: items.value}}
                                        ></button>
                                    } else {
                                        if (result.find(res=> res.value === items.value && attribute.name === res.name)!==undefined ){
                                            return <button
                                                className={styles.active}
                                            >{items.value}</button>
                                        }
                                        else {
                                            return <button
                                                className={''}
                                            >{items.value}</button>
                                        }





                                    }
                                })}</div>)
                            })
                            }
                        </div>
                        <img src={product.img[0]}/>


                    </div>
                })
            }
            <button onClick={() => {
                alert("Your order:")
            }
            }>
                Submit
            </button>
        </>
    );
};

export default CartItem;