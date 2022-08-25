import React from 'react';
import styles from "./Item.module.scss";

const Item = (props) => {
    console.log( JSON.parse(localStorage['redux_store']))
    let a = window.location.pathname
    let b = a.split('/item/')
    // let currProduct
    // props.state.usualArr.map((product) => {
    //     if (product.id === b[1]) {
    //         currProduct = product
    //     }
    // })
    let prices
    props.stateCurr.currencyArr.map((price) => {
        if (price.id === b[1]) {
            prices = price
        }
    })
    //if no render currSwitch


    let mainPage = 0;
    let myIndex = 0
    console.log(prices)
    return (
        props.state.usualArr.map((product) => {
            if (product.id === b[1]) {
                if (prices === undefined) {
                    prices = props.startPrice(product?.id)
                }
                let price = prices?.amount ? prices?.amount : prices[0]
                let symbol = prices?.currency?.symbol ? prices?.currency?.symbol : prices[1]
                let label = prices?.currency?.label ? prices?.currency?.label : prices[2]

                return <div className={styles.display}>
                    <div className={styles.brand}>{product.brand}</div>
                    <div className={styles.name}>{product.name}</div>

                    <div className={styles.priceUSD}>
                        {symbol}
                        {price}
                    </div>

                    <div className={styles.description} style={{overflowX: 'hidden'}}
                         dangerouslySetInnerHTML={{__html: product.description}}
                    />


                    <div className={styles.attribute}>
                        {product?.attributes.map((attribute) => {
                            return (
                                <div>{attribute.name}:
                                    <div></div>
                                    {
                                        attribute.items.map((items) => {
                                            myIndex = myIndex + 1
                                            let result = [];
                                            props.stateCart.chosenValues?.map((value) => {
                                                result.push(attribute.name)
                                                result.push(value.value)
                                                result.push(value.index)
                                            })
                                            //color to show color not string
                                            if (attribute.name === "Color") {
                                                const newIndex = myIndex
                                                return <button
                                                    className={result.includes(items.value) && result.includes(myIndex) && result.includes(attribute.name)
                                                        ? styles.active : ''}
                                                    style={{backgroundColor: items.value}}
                                                    onClick={() => {
                                                        props.addChosenValues(attribute.name, items.value, newIndex)
                                                    }
                                                    }
                                                ></button>
                                            } else {
                                                //other
                                                const newIndex = myIndex
                                                return <button

                                                    className={result.includes(items.value) && result.includes(myIndex) && result.includes(attribute.name)
                                                        ? styles.active : ''}
                                                    onClick={() => {
                                                        props.addChosenValues(attribute.name, items.value, newIndex)
                                                    }
                                                    }

                                                >{items.value}</button>
                                            }


                                        })}</div>)
                        })
                        }
                    </div>

                    {
                        product.gallery.map((currImg) => {
                            if (mainPage === 0) {
                                mainPage = 1
                                return <img className={styles.mainImg} src={currImg}/>
                            } else {
                                return <img className={styles.commonImg} src={currImg}/>
                            }
                        })
                    }

                    <button className={styles.button} onClick={() => {
                        let localProduct = structuredClone(product)
                        props.addFullProduct(localProduct,
                            Object.assign(localProduct, {count: 1}),
                            Object.assign(localProduct, {chosenValues: props.stateCart.chosenValues}),
                            Object.assign(localProduct, {identifier: props.stateCart.identifiers}))
                        props.changeTotalCost(price, label, true)
                        props.clearValues()
                    }
                    }>ADD TO CART
                    </button>
                </div>
            }
        })

    );
};

export default Item;