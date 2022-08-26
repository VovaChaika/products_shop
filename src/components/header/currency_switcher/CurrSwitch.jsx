import React from 'react';
import styles from "./CurrSwitch.module.scss"
import {images} from "../../../constants";

const CurrSwitch = (props) => {
    let arr = []
    return (
        <>
            {props.isVisibleCurrSwitch &&
                (<div className={styles.position} onMouseLeave={() => {
                    props.setIsVisibleCurrSwitch(false)
                }
                }>
                    {props.stateProduct?.usualArr?.map((product) => {
                        Object.assign(product.prices, {id: product.id})
                        arr.push(product.prices)
                    })
                    }
                    {
                        arr?.[0].map((label) => {
                            return <button onClick={() => {
                                props.changeArrayCurrency(arr, label.currency.label)
                                props.changeCurrency(label.currency.symbol)
                                props.setLabel(label.currency.label)
                            }}>
                                {label.currency.symbol} {label.currency.label}
                            </button>
                        })
                    }
                </div>)
            }
            <button className={styles.button} onMouseMove={() => {
                if (props.isVisibleCart === true) {
                    props.setIsVisibleCart(false)
                    props.setVisible(false)
                }
                props.setIsVisibleCurrSwitch(true)
            }}>
                {props.state.currency}<img src={props.isVisibleCurrSwitch ? images.arrowUp : images.arrowDown} alt=""/>
            </button>
        </>
    );
};

export default CurrSwitch;