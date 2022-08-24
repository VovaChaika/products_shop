import React from 'react';
import styles from "./Item.module.scss";

const Item = (props) => {
    let a = window.location.pathname
    let b = a.split('/item/')
    let mainPage = 0;
    let myIndex=0

    return (

                             <div className={styles.display}>
                                <div className={styles.brand}>{props.currProduct.brand}</div>
                                <div className={styles.name}>{props.currProduct.name}</div>

                                <div className={styles.priceUSD}>
                                    {props.prices?.currency?.symbol ? props.prices?.currency?.symbol : props.prices[1]}
                                    {props.prices?.amount ? props.prices?.amount : props.prices[0]}
                                </div>

                                <div className={styles.description} style={{overflowX: 'hidden'}}
                                     dangerouslySetInnerHTML={{__html: props.currProduct.description}}
                                />


                                <div className={styles.attribute}>
                                    {props.currProduct?.attributes.map((attribute) => {
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
                                                                    console.log(newIndex)
                                                            }
                                                            }

                                                        >{items.value}</button>}



                                                    })}</div>)
                                    })
                                    }
                                </div>


                                {
                                    props.currProduct.gallery.map((currImg) => {
                                        if (mainPage === 0) {
                                            mainPage = 1
                                            return <img className={styles.mainImg} src={currImg}/>
                                        } else {
                                            return <img className={styles.commonImg} src={currImg}/>
                                        }
                                    })
                                }
                                <button className={styles.button} onClick={() => {
                                    props.addFullProduct(props.currProduct,
                                        Object.assign(props.currProduct, {count:1}),
                                        Object.assign(props.currProduct, {chosenValues:props.stateCart.chosenValues}),
                                        Object.assign(props.currProduct, {identifier:props.stateCart.identifiers}))
                                    props.clearValues()
                                    console.log("CHOSEN VALUES")
                                    console.log(props.stateCart.chosenValues)
                                    console.log(" CHOSEN VALUES END")
                                    console.log("ARRAY PRODUCT")
                                    console.log(props.stateCart.product)
                                    console.log("END")
                                }
                                }>ADD TO CART
                                </button>
                            </div>
    );
};

export default Item;