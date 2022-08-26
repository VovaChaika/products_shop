import React, {useState} from 'react';
import styles from "./CartItem.module.scss"

const CartItem = (props) => {

    let prices
    props.state.product.map((searchCurr)=>{
        searchCurr.prices.map((curr)=>{
            if (curr.currency.symbol === props.stateCurr.currency){
                prices = curr
            }
        })
    })
    let pricesArr
    console.log(prices)
    let tax = props.state.priceCount[prices?.currency.label] * 0.21 ?
        (props.state.priceCount[prices?.currency.label] * 0.21) : 0;
    return (
        <>
            {
                props.state.product?.map((product) => {
                    console.log(product)
                    console.log(props.stateProduct)
                    let prices
                    props.stateCurr.currencyArr?.map((price) => {
                        if (price.id === product.id) {
                            prices = price
                        }
                    })
                    let price = prices?.amount
                    let symbol = prices?.currency?.symbol
                    console.log(prices)
                    props.stateProduct?.priceArr?.map((pricesAll) => {
                        //here if comes an array
                        if (pricesAll?.id === product.id) {
                            pricesArr = pricesAll
                        }
                    })
                    return <div className={styles.product}>
                        <div className={styles.brand}>{product.brand}</div>
                        <div className={styles.name}>{product.name}</div>

                        <div className={styles.price}>{symbol} {price}</div>


                        <div className={styles.counter}>
                            <button onClick={() => {
                              props.increaseCount(product.identifier, true)
                                props.changeTotalCost(pricesArr, true)
                                props.handleClick()
                            }
                            }>+
                            </button>
                            <div></div>
                            {product.count}
                            <div></div>
                            <button onClick={() => {
                                props.increaseCount(product.identifier, false)
                                props.changeTotalCost(pricesArr, false)
                                props.handleClick()
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
        </>
    );
};

export default CartItem;