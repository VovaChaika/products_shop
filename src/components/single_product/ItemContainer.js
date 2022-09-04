import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import {
    addChosenValuesCreator,
    addFullProductCreator, changeTotalCostCreator,
    clearValuesCreator,
} from "../../redux/cart_reducer";
import Item from "./Item";
import {getItemApi, getProductPriceApi} from "../../api/api";


class ItemContainer extends React.Component {
    componentDidMount() {
        const detectId = window.location.pathname.split('/item/')
        this.props.getItemApi(detectId[1])
        this.props.clearValues()
        console.log(this.props.stateCurr.chosenLabel)
        this.setPrice(this.props.stateCurr.chosenLabel)
    }

    state = {
        mssg: "",
        mainImg: 0,
        price: {}
    };

    handleClick = () => {
        this.setState({ mssg: "Hi there!" });
    };
    setMainImg = (index) => {
        this.setState({mainImg: index})
    }
    setPrice = (label) => {
        const price = this.props.product?.prices.filter((price)=>{
            console.log(price.currency.label)
            console.log(label)
            return price.currency.label === label
        })
        this.setState({price: price?.[0]})
    }

    render() {
        if (this.props.stateItem.currentItem.length !== 0){
            return <div>
                <Item
                    state={this.props.state}
                    stateCurr={this.props.stateCurr}
                    stateCart={this.props.stateCart}
                    product={this.props.stateItem.currentItem}

                    addFullProduct={this.props.addFullProduct}
                    addChosenValues={this.props.addChosenValues}
                    clearValues={this.props.clearValues}
                    changeTotalCost={this.props.changeTotalCost}

                    handleClick={this.handleClick}
                    setMainImg={this.setMainImg}

                    mainImg={this.state.mainImg}
                    price={this.state.price}
                    setPrice={this.setPrice}
                />
            </div>
        }
    }

}

let mapStateToProps = (state) => {
    return {
        stateCurr: state.currency,
        stateCart: state.cart,
        state: state.products,
        stateItem: state.item
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addFullProduct: (product) => {
            dispatch(addFullProductCreator(product))
        },
        addChosenValues: (name, value, index) => {
            dispatch(addChosenValuesCreator(name, value, index))
        },
        clearValues: () => {
            dispatch(clearValuesCreator())
        },
        changeTotalCost: (price, plus) => {
            dispatch(changeTotalCostCreator(price, plus))
        },
        getItemApi: (itemData) => {
            dispatch(getItemApi(itemData))
        },
        getProductPriceApi: (productId) => {
            dispatch(getProductPriceApi(productId))
        },

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ItemContainer)