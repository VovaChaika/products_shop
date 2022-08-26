import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Items.module.scss'
import '../../App.module.scss'
import {images} from "../../constants";


const Items = (props) => {
    const [isVisible, setIsVisible] = React.useState(false)
    function changeCurrImage() {
        if (isVisible && props.product.gallery?.[1] !== undefined) {
            return props.product.gallery?.[1]
        } else return props.product.gallery?.[0]
    }
    // if (props.priceValues?.currency?.symbol===undefined){
    //     // return  props.priceValues?.currency?.symbol
    // }




    return (
        <>
            <div className={styles.item}
                 onMouseLeave={() => {
                     setIsVisible(false)
                 }}>
                {props.state.startPrice.amount}
                <NavLink className={styles.navLink} onMouseMove={() => {
                    setIsVisible(true)
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

                    {isVisible && props.isVisibleButton &&
                        <input className={styles.img}
                               onClick={
                                   () => {
                                       alert("set here button with start values")
                                   }
                               } type="image" src={images.addIcon}></input>
                    }
                </NavLink>
            </div>


        </>
    );
};

export default Items;