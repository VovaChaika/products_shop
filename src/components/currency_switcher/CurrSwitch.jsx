import React, {Component} from 'react';
import styles from "./CurrSwitch.module.scss"
import {images} from "../../constants";

class CurrSwitch extends Component{
    render() {
        return (
            <>
                {this.props.isVisibleCurrSwitch &&
                    (<div className={styles.position}>
                        {
                            this.props.state.currencies?.map((currency) => {
                                return <div><button onClick={() => {
                                    this.props.setIsVisibleCurrSwitch(false)
                                    //newOnclick
                                    this.props.setChosenValues(currency)
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
                    if (this.props.isVisibleCurrSwitch === true){
                        this.props.setIsVisibleCurrSwitch(false)
                    }
                    else{
                        this.props.setIsVisibleCurrSwitch(true)
                    }
                }}>
                    {this.props.state.chosenSymbol}<img src={this.props.isVisibleCurrSwitch ? images.arrowUp : images.arrowDown} alt=""/>
                </button>
            </>
        );
    }


};

export default CurrSwitch;