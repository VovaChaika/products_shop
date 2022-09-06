import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import styles from './ContentItems.module.scss'
import '../../../App.module.scss'
import {images} from "../../../constants";


class ContentItems extends Component {
    render() {
        const changeCurrImage = () => {
            if (this.props.isVisible && this.props?.product?.gallery?.[1] !== undefined) {
                return this.props.product?.gallery?.[1]
            } else return this.props.product?.gallery?.[0]
        }
        return (<div className={this.props.isVisible && this.props.isVisibleButton ? styles.border : ''}>
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


                    <span className={styles.imgContainer}><img src={changeCurrImage()}/></span>

                    {!this.props.product.inStock && <div className={styles.outOfOrderSpan}>out of stock</div>}

                    <div className={styles.prodName}>
                        {this.props.product.name} {this.props.product.brand}
                    </div>

                    <div className={styles.price}>{this.props.price?.currency?.symbol}
                        {this.props.price?.amount}
                    </div>
                    {this.props.isVisible && this.props.isVisibleButton &&
                        <img className={styles.imgBag}
                             onMouseMove={() => {
                                 this.props.setIsButton(true)
                             }}
                             onMouseLeave={() => {
                                 this.props.setIsButton(false)
                             }}
                             onClick={() => {
                                 if (this.props.product.inStock) {
                                     this.props.getDefaultAttr(this.props.product.id)
                                     this.props.changeTotalCost(this.props.product.prices, true)
                                 }
                             }} src={images.addIcon}></img>}
                </NavLink>

            </div>
        </div>);
    }
};

export default ContentItems;