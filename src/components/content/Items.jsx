import React from 'react';
import {useNavigate} from "react-router-dom";
import styles from './Items.module.scss'
import '../../App.module.scss'
import {images} from "../../constants";


const Items = (props) => {
    const [isVisible, setIsVisible] = React.useState(false)
    let navigate = useNavigate();

    function changeCurrImage() {
        if (isVisible && props.data.img?.[1] !== undefined) {
            return props.data.img?.[1]
        } else return props.data.img?.[0]
    }
console.log(props.priceValues)
    return (
        <>
            <div className={styles.item} onMouseLeave={() => {
                setIsVisible(false)
            }}>
                <div onMouseMove={() => {
                    setIsVisible(true)
                    if (props.isVisibleButton === false) {
                        props.setIsVisibleButton(true)
                    }
                }

                }
                     onClick={() => {
                         // props.setCurrencyItem(props.priceValues)
                         navigate(`/item/${props.data.id}`)
                     }}
                >

                    <img src={
                        changeCurrImage()
                    } className={props.data.inStock ? styles.outOfOrder : ''}/>
                    {props.data.inStock &&
                        <div className={styles.outOfOrderSpan}>out of stock</div>
                    }
                    <div>
                        {props.data.name}
                    </div>
                    {
                        <div>{props.priceValues?.currency?.symbol} {props.priceValues?.amount}</div>
                    }
                </div>
                {isVisible && props.isVisibleButton &&
                    <input className={styles.img}
                           onClick={
                               () => {
                                   props.addProduct(props.data.id)
                               }
                           } type="image" src={images.addIcon}></input>
                }
            </div>


        </>
    );
};

export default Items;