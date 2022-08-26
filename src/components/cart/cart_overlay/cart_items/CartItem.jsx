import React, {useState} from 'react';
import styles from "./CartItem.module.scss"

const CartItem = (props) => {

    const [color, changeColor] = useState()

    let prices
    props.state.product.map((searchCurr)=>{
        searchCurr.prices.map((curr)=>{
            if (curr.currency.symbol === props.stateCurr.currency){
                prices = curr
            }
        })
    })
    let tax = props.state.priceCount[prices?.currency.label] * 0.21;
    return (
        <>
            {
                props.state.product?.map((product) => {
                    return <div className={styles.product}>
                        <div className={styles.brand}>{product.brand}</div>
                        <div className={styles.name}>{product.name}</div>

                        <div className={styles.price}>{prices.currency.symbol} {prices.amount}</div>


                        <div className={styles.counter}>
                            <button onClick={() => {
                              props.increaseCount(product.identifier, true)
                                changeColor(product.count)
                            }
                            }>+
                            </button>
                            <div></div>
                            {product.count}
                            <div></div>
                            <button onClick={() => {
                                props.increaseCount(product.identifier, false)
                                changeColor(product.count)
                            }
                            }>-
                            </button>
                        </div>

                        <div className={styles.attributes}>
                            {product.attributes?.map((attribute) => {
                                return (<div>{attribute.name}:{attribute.items.map((items) => {
                                    let result = []
                                    product.chosenValues?.map((values) => {
                                        result.push({value: values.value, index: values.index, name: values.name})

                                    })
                                    if (attribute.name === "Color") {
                                        return <button
                                            className={result.find(res => res.value === items.value) !== undefined ? styles.active : ''}
                                            style={{backgroundColor: items.value}}
                                        ></button>
                                    } else {
                                        if (result.find(res => res.value === items.value && attribute.name === res.name) !== undefined) {
                                            return <button
                                                className={styles.active}
                                            >{items.value}</button>
                                        } else {
                                            return <button
                                                className={''}
                                            >{items.value}</button>
                                        }


                                    }
                                })}</div>)
                            })
                            }
                        </div>
                        <img src={product.gallery?.[0]}/>


                    </div>
                })
            }
            <div>Total price: {prices?.currency.symbol} {props.state.priceCount[prices?.currency.label]?.toFixed(2) ?
                props.state.priceCount[prices?.currency.label]?.toFixed(2) : '0'
            }</div>
            <div>Tax 21%: {prices?.currency.symbol} {tax.toFixed(2)}</div>
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