import React, {Component} from 'react';
import styles from "./CurrSwitch.module.scss"
import {images} from "../../constants";

class CurrSwitch extends Component{
    render() {
        let arr = []
        return (
            <>
                {this.props.isVisibleCurrSwitch &&
                    (<div className={styles.position} onMouseLeave={() => {
                        this.props.setIsVisibleCurrSwitch(false)
                    }
                    }>
                        {this.props.stateProduct?.usualArr?.map((product) => {
                            Object.assign(product.prices, {id: product.id})
                            arr.push(product.prices)
                        })
                        }
                        {
                            arr?.[0].map((label) => {
                                return <div><button onClick={() => {
                                    this.props.changeArrayCurrency(arr, label.currency.label)
                                    this.props.changeCurrency(label.currency.symbol)
                                    this.props.setLabel(label.currency.label)
                                }}>
                                    {label.currency.symbol} {label.currency.label}
                                </button></div>
                            })
                        }
                    </div>)
                }
                <button className={styles.button} onMouseMove={() => {
                    if (this.props.isVisibleCart === true) {
                        this.props.setIsVisibleCart(false)
                        this.props.setVisible(false)
                    }
                    this.props.setIsVisibleCurrSwitch(true)
                }}>
                    {this.props.state.currency}<img src={this.props.isVisibleCurrSwitch ? images.arrowUp : images.arrowDown} alt=""/>
                </button>
            </>
        );
    }


};

export default CurrSwitch;