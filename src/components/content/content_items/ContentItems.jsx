import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styles from './ContentItems.module.scss'
import '../../../App.module.scss'
import {images} from "../../../constants";


class ContentItems extends Component{

    render() {
        const changeCurrImage = () => {
            if (this.props.isVisible && this.props?.product?.gallery?.[1] !== undefined) {
                return this.props.product?.gallery?.[1]
            } else return this.props.product?.gallery?.[0]
        }

        let pricesArr

        return (
            <div className={this.props.isVisible && this.props.isVisibleButton ? styles.border : ''}>
                <div className={!this.props.product.inStock ? styles.outOfOrder : styles.item}
                     onMouseLeave={() => {
                         this.props.setIsVisible(false)
                         this.props.setIsVisibleButton(false)
                     }}>
                    <NavLink className={styles.navLink} onMouseMove={() => {
                        this.props.setIsVisible(true)
                        if (this.props.isVisibleButton === false) {
                            this.props.setIsVisibleButton(true)
                        }
                    }} to={!this.props.isButton ? `/item/${this.props.product.id}` : ''}>


                        <img className={styles.img} src={changeCurrImage()}/>

                        {!this.props.product.inStock &&
                            <div className={styles.outOfOrderSpan}>out of stock</div>
                        }

                        <div className={styles.prodName}>
                            {this.props.product.name} {this.props.product.brand}
                        </div>

                        <div className={styles.price}>{
                            this.props.priceValues?.currency?.symbol
                        }
                            {
                                this.props.priceValues?.amount
                            }
                        </div>
                        {this.props.isVisible && this.props.isVisibleButton &&
                            <img className={styles.imgBag}
                                 onMouseMove={()=>{
                                     this.props.setIsButton(true)
                                 }
                                 }
                                 onMouseLeave={()=>{
                                     this.props.setIsButton(false)
                                 }
                                 }
                                 onClick={
                                     () => {
                                         if (this.props.product.inStock) {
                                             this.props.state.priceArr.map((pricesAll) => {
                                                 //here if comes an array
                                                 if (pricesAll?.id === this.props.product.id) {
                                                     pricesArr = pricesAll
                                                 }
                                             })
                                             this.props.setDefaultAttributes(this.props.product.attributes)
                                             let localProduct = structuredClone(this.props.product)
                                             this.props.addFullProduct(localProduct,
                                                 Object.assign(localProduct, {count: 1}),
                                                 Object.assign(localProduct, {chosenValues: this.props.stateCart.chosenValues}),
                                                 Object.assign(localProduct, {identifier: this.props.stateCart.identifiers}))
                                             this.props.changeTotalCost(pricesArr, true)
                                             this.props.clearValues()
                                         }
                                     }
                                 }src={images.addIcon}></img>
                        }
                    </NavLink>

                </div>


            </div>
        );
    }


};

export default ContentItems;