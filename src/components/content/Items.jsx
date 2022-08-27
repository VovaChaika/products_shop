import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Items.module.scss'
import '../../App.module.scss'
import {images} from "../../constants";


const Items = (props) => {
    function changeCurrImage() {
        if (props.isVisible && props.product.gallery?.[1] !== undefined) {
            return props.product.gallery?.[1]
        } else return props.product.gallery?.[0]
    }
    let pricesArr

    return (
        <div className={props.isVisible && props.isVisibleButton ? styles.border : ''}>
            <div className={styles.item}
                 onMouseLeave={() => {
                     props.setIsVisible(false)
                 }}>
                {props.state.startPrice.amount}
                <NavLink className={styles.navLink} onMouseMove={() => {
                    props.setIsVisible(true)
                    if (props.isVisibleButton === false) {
                        props.setIsVisibleButton(true)
                    }
                }} to={`/item/${props.product.id}`}>


                    <img src={changeCurrImage()} className={!props.product.inStock ? styles.outOfOrder : ''}/>

                    {!props.product.inStock &&
                        <div className={styles.outOfOrderSpan}>out of stock</div>
                    }

                    <div>
                        {props.product.name}
                    </div>

                    <div>{
                        props.priceValues?.currency?.symbol
                    }
                        {
                            props.priceValues?.amount
                        }
                    </div>
                </NavLink>
                {props.isVisible && props.isVisibleButton &&
                    <input className={styles.img}
                           onClick={
                               () => {
                                   props.state.priceArr.map((pricesAll) => {
                                       //here if comes an array
                                       if (pricesAll?.id === props.product.id) {
                                           pricesArr = pricesAll
                                       }
                                   })
                                   console.log(props.product.attributes)
                                   props.setDefaultAttributes(props.product.attributes)
                                   let localProduct = structuredClone(props.product)
                                   props.addFullProduct(localProduct,
                                       Object.assign(localProduct, {count: 1}),
                                       Object.assign(localProduct, {chosenValues: props.stateCart.chosenValues}),
                                       Object.assign(localProduct, {identifier: props.stateCart.identifiers}))
                                   props.changeTotalCost(pricesArr, true)
                                   props.clearValues()
                               }
                           } type="image" src={images.addIcon}></input>
                }
            </div>


        </div>
    );
};

export default Items;