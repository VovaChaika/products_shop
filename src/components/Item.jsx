import React from 'react';
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

    let pricesArr
    props.state.priceArr.map((pricesAll) => {
        //here if comes an array
            if (pricesAll?.id === b[1]) {
                pricesArr = pricesAll
            }
    })



    let mainPage = 0;
    let myIndex = 0
    return (
        props.state.usualArr.map((product) => {
            if (product.id === b[1]) {
                let price = prices?.amount
                let symbol = prices?.currency?.symbol

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
                                            const newIndex = myIndex
                                            let chosenArr = {}
                                            props.stateCart.chosenValues.map((value)=>{
                                                if (value.name === attribute.name
                                                    && value.index === newIndex
                                                    && value.value === items.value){
                                                    chosenArr = value
                                                }
                                            })
                                            //color to show color not string
                                            if (attribute.name === "Color") {
                                                return <button
                                                    className={chosenArr.value === items.value
                                                    && chosenArr.index === myIndex
                                                    && chosenArr.name === attribute.name
                                                        ? styles.active : ''}
                                                    style={{backgroundColor: items.value}}
                                                    onClick={() => {
                                                        props.handleClick()
                                                        props.addChosenValues(attribute.name, items.value, newIndex)
                                                    }
                                                    }
                                                ></button>
                                            } else {
                                                //other
                                                return <button key={items.value}

                                                    className={chosenArr.value === items.value
                                                    && chosenArr.index === myIndex
                                                    && chosenArr.name === attribute.name
                                                        ? styles.active : ''}
                                                    onClick={() => {
                                                        props.handleClick()
                                                        props.addChosenValues(attribute.name, items.value, newIndex)
                                                        console.log(props.stateCart.chosenValues)
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
                    <button className={styles.button} disabled={!product.inStock} onClick={() => {
                        if (props.stateCart.chosenValues.length !== product?.attributes.length){
                           props.setDefaultAttributes(product?.attributes)
                        }
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


