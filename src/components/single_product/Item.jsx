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
        const price = this.props.stateCurr.chosenPrices.filter((id)=>{
            return id.id === this.props.product.id
        })

        return <div className={styles.display}>
            <div className={styles.brand}>{this.props.product.brand}</div>
            <div className={styles.name}>{this.props.product.name}</div>

            <div className={styles.priceUSD}>
                <div>Price:</div>
                <span>{prices?.currency?.symbol
                } {prices?.amount}</span>
            </div>

            <div className={styles.description} style={{overflowX: 'hidden'}}
                 dangerouslySetInnerHTML={{__html: this.props.product.description}}
            />


            <div className={styles.attribute}>
                {this.props.product?.attributes.map((attribute) => {
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
                this.props.product.gallery.map((currImg, index) => {
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
                    disabled={!this.props.product.inStock || this.props.stateCart.chosenValues.length !== this.props.product?.attributes.length}
                    onClick={() => {
                        let localProduct = {id: this.props.product.id}
                        this.props.addFullProduct(localProduct,
                            Object.assign(localProduct, {count: 1}),
                            Object.assign(localProduct, {chosenValues: this.props.stateCart.chosenValues}),
                            Object.assign(localProduct, {identifier: this.props.stateCart.identifiers}))
                        this.props.changeTotalCost(pricesArr, true)
                        this.props.clearValues()
                    }
                    }>{this.props.product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
            </button>
        </div>
    }


};

export default Item;


