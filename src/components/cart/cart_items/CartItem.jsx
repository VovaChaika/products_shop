import React from 'react';
import styles from "./CartItem.module.scss"
import {images} from "../../../constants";

const CartItem = (props) => {
    let prices
    props.state.product.map((searchCurr) => {
        searchCurr.prices.map((curr) => {
            if (curr.currency.symbol === props.stateCurr.currency) {
                prices = curr
            }
        })
    })
    let pricesArr
    let tax = props.state.priceCount[prices?.currency.label] * 0.21 ?
        (props.state.priceCount[prices?.currency.label] * 0.21) : 0;


    return (
        <>
            {
                props.state.product?.map((product) => {
                    let prices

                    props.stateCurr.currencyArr?.map((price) => {
                        if (price.id === product.id) {
                            prices = price
                        }
                    })
                    let price = prices?.amount
                    let symbol = prices?.currency?.symbol
                    props.stateProduct?.priceArr?.map((pricesAll) => {
                        //here if comes an array
                        if (pricesAll?.id === product.id) {
                            pricesArr = pricesAll
                        }
                    })
                    return <div className={!props.isCartOverlay ? styles.product : styles.productOverlay}>
                        <div className={styles.brand}>{product.brand}</div>
                        <div className={styles.name}>{product.name}</div>

                        <div className={styles.price}>{symbol} {price}</div>


                        <div className={styles.counter}>
                            <button className={styles.buttonCount} onClick={() => {
                                props.increaseCount(product.identifier, true)
                                props.changeTotalCost(pricesArr, true)
                                props.handleClick()
                            }
                            }>+
                            </button>

                            <div className={styles.countText}>{product.count}</div>

                            <button className={styles.buttonCount} onClick={() => {
                                props.increaseCount(product.identifier, false)
                                props.changeTotalCost(pricesArr, false)
                                props.handleClick()
                            }
                            }>-
                            </button>
                        </div>

                        <div className={styles.attributes}>
                            {product.attributes?.map((attribute) => {
                                return (<div>
                                    <div className={styles.attrHeader}>{attribute.name}:</div>
                                    {attribute.items.map((items) => {
                                        let result = []
                                        product.chosenValues?.map((values) => {
                                            result.push({value: values.value, index: values.index, name: values.name})

                                        })
                                        if (attribute.name === "Color") {
                                            return <button
                                                className={result.find(res => res.value === items.value) !== undefined ? styles.activeColor : styles.passiveColor}
                                                style={{backgroundColor: items.value}}
                                            ></button>
                                        } else {
                                            if (result.find(res => res.value === items.value && attribute.name === res.name) !== undefined) {
                                                return <button
                                                    className={styles.active}
                                                >{items.value}</button>
                                            } else {
                                                return <button
                                                    className={styles.passive}
                                                >{items.value}</button>
                                            }


                                        }
                                    })}</div>)
                            })
                            }
                        </div>
                        {!props.doChange.includes(product.id) ? props.setIsChange(1, product.gallery.length, product.id, product.gallery) : ''}

                        {props.imgSrc.map((img, index) => {
                            if (img.id === product.id) {
                                return <img className={styles.img} src={props.imgSrc[index].src}/>
                            }
                        })}

                        {product.gallery.length > 1 && !props.isCartOverlay ?
                            <button className={styles.buttonImg2} onClick={() => {
                                props.setIsChange(false, product.gallery.length, product.id, product.gallery)
                            }
                            }><img src={images.arrowRight}/></button> : ''}
                        {product.gallery.length > 1 && !props.isCartOverlay ?
                            <button className={styles.buttonImg1} onClick={() => {
                                props.setIsChange(true, product.gallery.length, product.id, product.gallery)
                            }
                            }><img src={images.arrowLeft}/></button> : ''}


                    </div>
                })
            }
                <div className={!props.isCartOverlay ? styles.cartCounts : styles.cartCountsOverlay}>
                    {!props.isCartOverlay &&
                        <div>Tax 21%: <span>{prices?.currency.symbol} {tax.toFixed(2)}</span></div>
                    }
                    {!props.isCartOverlay &&
                        <div>Quantity: <span>{props.state.productsCount}</span></div>
                    }
                    <div className={styles.total}>Total: <span>
                    {prices?.currency.symbol} {props.state.priceCount[prices?.currency.label]?.toFixed(2) ?
                        props.state.priceCount[prices?.currency.label]?.toFixed(2) : '0'
                    }
                </span></div>
                </div>
            {!props.isCartOverlay &&
                <button className={styles.button} onClick={() => {
                    alert("Ordered!")
                    props.deleteFromCart()
                }
                }>Order</button>
            }


        </>
    );
};

export default CartItem;