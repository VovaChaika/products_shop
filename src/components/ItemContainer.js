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
        return <div>
            <Item
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
        </div>
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
        changeTotalCost: (price, plus) => {
            dispatch(changeTotalCostCreator(price, plus))
        },

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ItemContainer)