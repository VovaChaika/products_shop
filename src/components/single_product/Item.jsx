import React, {Component} from 'react';
import styles from "./Item.module.scss";
import Attributes from "./item_parts/Attributes";

class Item extends Component {
    render() {
        return <div className={styles.display}>
            <div className={styles.brand}>{this.props.product.brand}</div>
            <div className={styles.name}>{this.props.product.name}</div>

            <div className={styles.priceUSD}>
                <div>Price:</div>
                <span>{this.props.price?.currency?.symbol} {this.props.price?.amount}</span>
            </div>

            <div className={styles.description} style={{overflowX: 'hidden'}}
                 dangerouslySetInnerHTML={{__html: this.props.product.description}}
            />

            <Attributes attributes={this.props.product?.attributes}
                        chosenValues={this.props.stateCart.chosenValues}
                        handleClick={this.props.handleClick}
                        addChosenValues={this.props.addChosenValues}

            />
            {this.props.product.gallery.map((currImg, index) => {
                if (this.props.mainImg === index) {
                    return <div className={styles.mainImgContainer}><img src={currImg}/></div>
                } else {
                    return <div className={styles.commonImgContainer}><img src={currImg} onClick={() => {
                        this.props.setMainImg(index)
                    }}/></div>
                }
            })}
            <button className={styles.button}
                    disabled={!this.props.product.inStock || this.props.stateCart.chosenValues.length !== this.props.product?.attributes.length}
                    onClick={() => {
                        let localProduct = {id: this.props.product.id}
                        this.props.addFullProduct(localProduct, Object.assign(localProduct, {count: 1}), Object.assign(localProduct, {chosenValues: this.props.stateCart.chosenValues}), Object.assign(localProduct, {identifier: this.props.stateCart.identifiers}))
                        this.props.changeTotalCost(this.props.product.prices, true)
                        this.props.clearValues()
                    }}>{this.props.product.inStock ? 'add to cart' : 'out of stock'}
            </button>
        </div>
    }


};

export default Item;


