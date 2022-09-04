import React, {Component} from 'react';
import styles from "./CurrSwitch.module.scss"
import {images} from "../../constants";
import {_productsIdArr} from "../../api/api";

class CurrSwitch extends Component{
    render() {
        let arr = []
        return (
            <>
                {this.props.isVisibleCurrSwitch &&
                    (<div className={styles.position}>
                        {this.props.stateProduct.usualArr.map((product) => {
                            Object.assign(product.prices, {id: product.id})
                            arr.push(product.prices)
                        })
                        }
                        {
                            this.props.state.currencies?.map((currency) => {
                                return <div><button onClick={() => {
                                    this.props.setIsVisibleCurrSwitch(false)
                                    this.props.changeArrayCurrency(arr, currency.label)
                                    this.props.changeCurrency(currency.symbol)
                                    this.props.setLabel(currency.label)

                                    //newOnclick
                                    this.props.setChosenValues(currency)
                                    this.props.updateCurrentPrice()
                                    _productsIdArr.map((productId)=>{
                                        console.log( this.props.stateProduct.allProductsShort)
                                        this.props.getPrices(productId)
                                    })
                                }}>
                                    {currency.symbol} {currency.label}
                                </button></div>
                            })
                        }
                    </div>)
                }
                <button className={styles.button} onClick={() => {
                    if (this.props.isVisibleCart === true) {
                        this.props.setIsVisibleCart(false)
                        this.props.setVisible(false)
                    }
                    this.props.setIsVisibleCurrSwitch(true)
                    console.log(this.props.isVisibleCurrSwitch)
                }}>
                    {this.props.state.chosenSymbol}<img src={this.props.isVisibleCurrSwitch ? images.arrowUp : images.arrowDown} alt=""/>
                </button>
            </>
        );
    }


};

export default CurrSwitch;