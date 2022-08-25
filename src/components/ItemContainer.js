import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import {
    addChosenValuesCreator,
    addFullProductCreator, changeTotalCostCreator,
    clearValuesCreator,
} from "../redux/cart_reducer";
import Item from "./Item";


class ItemContainer extends React.Component {
    componentDidMount() {
        this.props.clearValues()
    }

    render() {
        let a = window.location.pathname
        // let b = a.split('/item/')
        // let currProduct
        // this.props.state.usualArr.map((product) => {
        //     if (product.id === b[1]) {
        //         currProduct = product
        //     }
        // })
        // let prices
        // this.props.stateCurr.currencyArr.map((price) => {
        //     if (price.id === b[1]) {
        //         prices = price
        //     }
        // })
        // //if no render currSwitch
        // if (prices === undefined) {
        //     prices = this.props.startPrice(currProduct?.id)
        //     console.log(prices)
        // }
        // if (currProduct === undefined) {
        //     //DO SMTH WHEN UNDEF, FOR EXAMPLE NAVIGATE TO /
        // }
        return <>
            <Item
                // currProduct={currProduct}
                // prices={prices}

                startPrice={this.props.startPrice}
                stateCurr={this.props.stateCurr}
                stateCart={this.props.stateCart}
                addFullProduct={this.props.addFullProduct}
                addChosenValues={this.props.addChosenValues}
                chosenValues={this.props.chosenValues}
                clearValues={this.props.clearValues}
                usualArr={this.props.usualArr}
                state={this.props.state}
                changeTotalCost={this.props.changeTotalCost}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        stateCurr: state.currency,
        stateCart: state.cart,
        chosenValues: state.cart.chosenValues,
        state: state.products
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
        changeTotalCost: (price, symbol, plus) => {
            dispatch(changeTotalCostCreator(price, symbol, plus))
        },

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ItemContainer)