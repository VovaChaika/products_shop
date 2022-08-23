import React from 'react';
import styles from "./Item.module.scss";

const Item = (props) => {
    let a = window.location.pathname
    let b = a.split('/item/')
    let mainPage = 0;
    let countPrice = 0
    let currPrice = [];
    let myIndex=0
    function SetPrice() {
        if (countPrice === 0) {
            countPrice++
            if (props.stateCurr.currency === "USD") {
                return <div>{currPrice[0]} {props.stateCurr.currency}</div>
            } else if (props.stateCurr.currency === "GBP") {
                return <div>{currPrice[1]} {props.stateCurr.currency}</div>
            } else if (props.stateCurr.currency === "AUD") {
                return <div>{currPrice[2]} {props.stateCurr.currency}</div>
            } else if (props.stateCurr.currency === "JPY") {
                return <div>{currPrice[3]} {props.stateCurr.currency}</div>
            } else if (props.stateCurr.currency === "RUB") {
                return <div>{currPrice[4]} {props.stateCurr.currency}</div>
            } else {
                return <div>no value price</div>
            }
        }
    }

    return (
        <div>
            {
                props.usualArr.map((product) => {
                        if (product.id === b[1]) {
                            currPrice.push(product.priceUSD)
                            currPrice.push(product.priceGBP)
                            currPrice.push(product.priceAUD)
                            currPrice.push(product.priceJPY)
                            currPrice.push(product.priceRUB)
                            return <div className={styles.display}>
                                <div className={styles.brand}>{product.brand}</div>
                                <div className={styles.name}>{product.name}</div>

                                <div className={styles.priceUSD}>{
                                    SetPrice()

                                }</div>

                                <div className={styles.description} style={{overflowX: 'hidden'}}
                                     dangerouslySetInnerHTML={{__html: product.description}}
                                />


                                <div className={styles.attribute}>
                                    {product.attribute?.map((attribute) => {
                                        return (
                                            <div>{attribute.name}:
                                                <div></div>
                                                {
                                                    attribute.items.map((items,indexX) => {
                                                        myIndex = myIndex+1
                                                        let result = [];
                                                        props.stateCart.chosenValues?.map((value)=>{
                                                            result.push(attribute.name)
                                                            result.push(value.value)
                                                            result.push(value.index)
                                                        })
                                                        if (attribute.name === "Color") {
                                                            const newIndex = myIndex
                                                                return <button
                                                                    className={result.includes(items.value) && result.includes(myIndex) && result.includes(attribute.name) ? styles.active : ''}
                                                                    style={{backgroundColor: items.value}}
                                                                    onClick={() => {
                                                                        props.addChosenValues(attribute.name, items.value, newIndex)
                                                                    }
                                                                    }
                                                                ></button>
                                                        }
                                                        else {
                                                            const newIndex = myIndex
                                                            return <button

                                                            className={result.includes(items.value) && result.includes(myIndex) && result.includes(attribute.name) ? styles.active : ''}
                                                                onClick={() => {
                                                                props.addChosenValues(attribute.name, items.value, newIndex)
                                                            }
                                                            }

                                                        >{items.value}</button>}



                                                    })}</div>)
                                    })
                                    }
                                </div>


                                {
                                    product.img.map((currImg) => {
                                        if (mainPage === 0) {
                                            mainPage = 1
                                            return <img className={styles.mainImg} src={currImg}/>
                                        } else {
                                            return <img className={styles.commonImg} src={currImg}/>
                                        }
                                    })
                                }
                                <button className={styles.button} onClick={() => {
                                    props.addFullProduct(product, Object.assign(product, {count:1}), Object.assign(product, {chosenValues:props.stateCart.chosenValues}))
                                    props.clearValues()
                                    console.log("CHOSEN VALUES")
                                    console.log(props.stateCart.chosenValues)
                                    console.log(" CHOSEN VALUES END")
                                    console.log("ARRAY PRODUCT")
                                    console.log(props.stateCart.product)
                                    console.log("END")
                                }
                                }>Pres me
                                </button>
                            </div>
                        }
                    }
                )
            }

        </div>
    );
};

export default Item;