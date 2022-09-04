import React, {Component} from 'react';
import styles from "./CartItem.module.scss"
import {images} from "../../../constants";
import {getCartItems} from "../../../api/api";

class CartItem extends Component{
    render() {
        let prices
        this.props.state.product2.map((searchCurr) => {
            searchCurr?.prices?.map((curr) => {
                console.log(curr)
                if (curr.currency.symbol === this.props.stateCurr.currency) {
                    prices = curr
                }
            })
        })
        console.log(prices)
        let pricesArr
        let tax = this.props.state.priceCount[prices?.currency.label] * 0.21 ?
            (this.props.state.priceCount[prices?.currency.label] * 0.21) : 0;

        console.log( this.props.state.product2)
        console.log( this.props.state.product)
        return (
            <>
                {
                    this.props.state.product2?.map((product, index) => {
                        console.log(index)
                        console.log(product)
                        console.log( this.props.state.product[index]?.chosenValues)
                        // let prices
                        // // this.props.getCartItems(product.id)
                        // this.props.stateCurr.currencyArr?.map((price) => {
                        //     if (price.id === product.id) {
                        //         prices = price
                        //     }
                        // })
                        let price = prices.amount
                        let symbol = prices.currency.symbol
                        this.props.stateProduct?.priceArr?.map((pricesAll) => {
                            //here if comes an array
                            if (pricesAll?.id === product.id) {
                                pricesArr = pricesAll
                            }
                        })
                        return <div className={!this.props.isCartOverlay ? styles.product : styles.productOverlay}>

                            <div className={styles.info_block}>
                                <div className={styles.brand}>{product.brand}</div>
                                <div className={styles.name}>{product.name}</div>

                                <div className={styles.price}>{symbol} {price}</div>
                            </div>


                            {/*//BUTTONS + - PRODUCT COUNT*/}
                            <div className={styles.counter}>
                                <button className={styles.buttonCount} onClick={() => {
                                    this.props.increaseCount(product.identifier, true)
                                    this.props.changeTotalCost(pricesArr, true)
                                    this.props.handleClick()
                                }
                                }>+
                                </button>

                                <div className={styles.countText}>{product.count}</div>

                                <button className={styles.buttonCountMinus} onClick={() => {
                                    this.props.increaseCount(product.identifier, false)
                                    this.props.changeTotalCost(pricesArr, false)
                                    this.props.handleClick()
                                }
                                }>-
                                </button>
                            </div>

                            {/*//ATTRIBUTES LOGIC*/}
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
                                                    className={[result.find(res => res.value === items.value) !== undefined
                                                        ? styles.activeColor : styles.passiveColor,
                                                        items.value === '#FFFFFF' ? styles.whiteColor : ''].join(' ')}
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

                            {/*//IMAGE CAROUSEL*/}
                            {!this.props.doChange.includes(product.id) ? this.props.setIsChange(1, product.gallery.length, product.id, product.gallery) : ''}

                            {this.props.imgSrc.map((img, index) => {
                                if (img.id === product.id) {
                                    return <img className={styles.img} src={this.props.imgSrc[index].src}/>
                                }
                            })}

                            {/*//BUTTON IMAGE SWITCH*/}
                            {product.gallery.length > 1 && !this.props.isCartOverlay ?
                                <button className={styles.buttonImg2} onClick={() => {
                                    this.props.setIsChange(false, product.gallery.length, product.id, product.gallery)
                                }
                                }><img src={images.arrowRight}/></button> : ''}
                            {product.gallery.length > 1 && !this.props.isCartOverlay ?
                                <button className={styles.buttonImg1} onClick={() => {
                                    this.props.setIsChange(true, product.gallery.length, product.id, product.gallery)
                                }
                                }><img src={images.arrowLeft}/></button> : ''}
                        </div>
                    })
                }

                {/*//COUNTERS*/}
                <div className={!this.props.isCartOverlay ? styles.cartCounts : styles.cartCountsOverlay}>
                    {!this.props.isCartOverlay &&
                        <div>Tax 21%: <span>{prices?.currency.symbol} {tax.toFixed(2)}</span></div>
                    }
                    {!this.props.isCartOverlay &&
                        <div>Quantity: <span>{this.props.state.productsCount}</span></div>
                    }
                    <div className={styles.total}>Total{!this.props.isCartOverlay ?':' : ''} <span>
                    {prices?.currency.symbol} {this.props.state.priceCount[prices?.currency.label]?.toFixed(2) ?
                        this.props.state.priceCount[prices?.currency.label]?.toFixed(2) : '0'
                    }
                </span></div>
                </div>

                {/*//BUTTON ORDER & EMPTY CART*/}
                {!this.props.isCartOverlay &&
                    <button className={styles.button} onClick={() => {
                        alert("Ordered!")
                        this.props.deleteFromCart()
                    }
                    }>Order</button>
                }


            </>
        );
    }
};

export default CartItem;