import React, {Component} from 'react';
import styles from "./CartItem.module.scss"
import {images} from "../../../constants";
import {NavLink} from "react-router-dom";
import Attributes from "./cart_items_parts/Attributes";

class CartItem extends Component {
    render() {
        let totalCount = this.props.state.priceCount[this.props.stateCurr.chosenLabel]
        let tax = totalCount * 0.21 ? (totalCount * 0.21) : 0;
        return (<>
                {this.props.state.productFinal?.map((product, index) => {
                    const price = product.prices.filter((price) => {
                        return price.currency.label === this.props.stateCurr.chosenLabel
                    })
                    return <div className={!this.props.isCartOverlay ? styles.product : styles.productOverlay}>

                        <div className={styles.info_block}>
                            <div className={styles.brand}>{product.brand}</div>
                            <div className={styles.name}>{product.name}</div>

                            <div className={styles.price}>{price[0].currency.symbol} {price[0].amount}</div>
                        </div>

                        {/*//BUTTONS + - PRODUCT COUNT*/}
                        <div className={styles.counter}>
                            <button className={styles.buttonCount} onClick={() => {
                                this.props.increaseCount(product.identifier, true)
                                this.props.changeTotalCost(product.prices, true)
                            }}>+
                            </button>

                            <div className={styles.countText}>{product.count}</div>

                            <button className={styles.buttonCountMinus} onClick={() => {
                                this.props.increaseCount(product.identifier, false)
                                this.props.changeTotalCost(product.prices, false)
                            }}>-
                            </button>
                        </div>

                        {/*//ATTRIBUTES LOGIC*/}
                        <Attributes attributes={product.attributes}
                                    chosenValues={product.chosenValues}
                        />

                        {/*//IMAGE CAROUSEL*/}
                        {!this.props.doChange.includes(product.id) ? this.props.setIsChange(1, product.gallery.length, product.id, product.gallery) : ''}
                        {this.props.imgSrc.map((img, index) => {
                            if (img.id === product.id) {
                                return <div className={styles.imgContainer}>
                                    <img id='image' src={this.props.imgSrc[index].src}/>
                                </div>
                            }
                        })}

                        {/*//BUTTON IMAGE SWITCH*/}
                        {product.gallery.length > 1 && !this.props.isCartOverlay ?
                            <button className={styles.buttonImg2} onClick={() => {
                                this.props.setIsChange(false, product.gallery.length, product.id, product.gallery)
                            }}><img src={images.arrowRight}/></button> : ''}
                        {product.gallery.length > 1 && !this.props.isCartOverlay ?
                            <button className={styles.buttonImg1} onClick={() => {
                                this.props.setIsChange(true, product.gallery.length, product.id, product.gallery)
                            }}><img src={images.arrowLeft}/></button> : ''}
                    </div>
                })}
                {/*//COUNTERS*/}
                <div className={!this.props.isCartOverlay ? styles.cartCounts : styles.cartCountsOverlay}>
                    {!this.props.isCartOverlay &&
                        <div>Tax 21%: <span>{this.props.stateCurr.chosenSymbol} {tax.toFixed(2)}</span></div>}
                    {!this.props.isCartOverlay && <div>Quantity: <span>{this.props.state.productsCount}</span></div>}
                    <div className={styles.total}>Total{!this.props.isCartOverlay ? ':' : ''} <span>
                    {this.props.stateCurr.chosenSymbol} {totalCount ? totalCount.toFixed(2) : '0'}
                </span></div>
                </div>

                {/*//BUTTON ORDER & EMPTY CART*/}
                {!this.props.isCartOverlay && <NavLink to={'/content/all'} className={styles.button} onClick={() => {
                    alert("Ordered!")
                    this.props.deleteFromCart()
                }}>
                    <span>Order</span>
                </NavLink>}
            </>)
    }
}

export default CartItem;