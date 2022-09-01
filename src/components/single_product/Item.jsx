import React, {Component} from 'react';
import styles from "./Item.module.scss";

class Item extends Component {
    render() {
        let a = window.location.pathname
        let b = a.split('/item/')

        let prices
        this.props.stateCurr.currencyArr?.map((price) => {
            if (price.id === b[1]) {
                prices = price
            }
        })
        let pricesArr
        this.props.state.priceArr.map((pricesAll) => {
            //here if comes an array
            if (pricesAll?.id === b[1]) {
                pricesArr = pricesAll
            }
        })

        let myIndex = 0

        return (
            this.props.state.usualArr.map((product) => {
                if (product.id === b[1]) {
                    let price = prices?.amount
                    let symbol = prices?.currency?.symbol

                    return <div className={styles.display}>
                        <div className={styles.brand}>{product.brand}</div>
                        <div className={styles.name}>{product.name}</div>

                        <div className={styles.priceUSD}>
                            <div>Price:</div>
                            <span>{symbol} {price}</span>
                        </div>

                        <div className={styles.description} style={{overflowX: 'hidden'}}
                             dangerouslySetInnerHTML={{__html: product.description}}
                        />


                        <div className={styles.attribute}>
                            {product?.attributes.map((attribute) => {
                                return (
                                    <div>
                                        <div className={styles.attrHeader}>{attribute.name}:</div>
                                        {
                                            attribute.items.map((items) => {
                                                myIndex = myIndex + 1
                                                const newIndex = myIndex
                                                let chosenArr = {}
                                                this.props.stateCart.chosenValues.map((value) => {
                                                    if (value.name === attribute.name
                                                        && value.index === newIndex
                                                        && value.value === items.value) {
                                                        chosenArr = value
                                                    }
                                                })
                                                //color to show color not string
                                                if (attribute.name === "Color") {
                                                    return <button
                                                        className={[chosenArr.value === items.value
                                                        && chosenArr.index === myIndex
                                                        && chosenArr.name === attribute.name
                                                            ? styles.activeColor : styles.passiveColor, items.value === '#FFFFFF' ? styles.whiteColor : ''].join(' ')}
                                                        style={{
                                                            backgroundColor: items.value
                                                        }}
                                                        onClick={() => {
                                                            this.props.handleClick()
                                                            this.props.addChosenValues(attribute.name, items.value, newIndex)
                                                        }
                                                        }
                                                    ></button>
                                                } else {
                                                    //other
                                                    return <button key={items.value}

                                                                   className={chosenArr.value === items.value
                                                                   && chosenArr.index === myIndex
                                                                   && chosenArr.name === attribute.name
                                                                       ? styles.active : styles.passive}
                                                                   onClick={() => {
                                                                       this.props.handleClick()
                                                                       this.props.addChosenValues(attribute.name, items.value, newIndex)
                                                                   }
                                                                   }

                                                    >{items.value}</button>
                                                }


                                            })}</div>)
                            })
                            }
                        </div>

                        {
                            product.gallery.map((currImg, index) => {
                                if (this.props.mainImg === index) {
                                    return <img className={styles.mainImg} src={currImg}/>
                                } else {
                                    return <img className={styles.commonImg} src={currImg} onClick={() => {
                                        this.props.setMainImg(index)
                                    }
                                    }/>
                                }
                            })
                        }
                        <button className={styles.button}
                                disabled={!product.inStock || this.props.stateCart.chosenValues.length !== product?.attributes.length}
                                onClick={() => {
                                    // if (props.stateCart.chosenValues.length !== product?.attributes.length){
                                    //    props.setDefaultAttributes(product?.attributes)
                                    // }
                                    let localProduct = structuredClone(product)
                                    this.props.addFullProduct(localProduct,
                                        Object.assign(localProduct, {count: 1}),
                                        Object.assign(localProduct, {chosenValues: this.props.stateCart.chosenValues}),
                                        Object.assign(localProduct, {identifier: this.props.stateCart.identifiers}))
                                    this.props.changeTotalCost(pricesArr, true)
                                    this.props.clearValues()
                                }
                                }>{product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                        </button>
                    </div>
                }
            })
        );
    }


};

export default Item;


