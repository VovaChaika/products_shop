import React, {useState} from 'react';
import styles from "./Item.module.scss";

const Item = (props) => {
    let a = window.location.pathname
    let b = a.split('/item/')

    let prices
    props.stateCurr.currencyArr?.map((price) => {
        if (price.id === b[1]) {
            prices = price
        }
    })
    let isHaveId = 0
    let pricesArr
    props.state.priceArr.map((pricesAll) => {
        //here if comes an array
            if (pricesAll?.id === b[1]) {
                pricesArr = pricesAll
                isHaveId = 1
            }
    })



    let mainPage = 0;
    let myIndex = 0
    const [color, changeColor] = useState()
    return (
        props.state.usualArr.map((product) => {
            if (product.id === b[1]) {
                if (prices === undefined) {
                    prices = props.startPrice(product?.id)
                    //here is one value when initialized
                    if (isHaveId === 0){
                        pricesArr = prices
                    }
                    console.log(pricesArr)
                }
                let price = prices?.amount ? prices?.amount : prices[0]
                let symbol = prices?.currency?.symbol ? prices?.currency?.symbol : prices[1]

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
                                                        changeColor(items.value)
                                                        props.addChosenValues(attribute.name, items.value, newIndex)
                                                    }
                                                    }
                                                ></button>
                                            } else {
                                                //other
                                                const newIndex = myIndex
                                                return <button key={items.value}

                                                    className={result.includes(items.value) && result.includes(myIndex) && result.includes(attribute.name)
                                                        ? styles.active : ''}
                                                    onClick={() => {
                                                        changeColor(items.value)
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
                        props.changeTotalCost(pricesArr, true)
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