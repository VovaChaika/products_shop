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
                state={this.props.state}
                stateCurr={this.props.stateCurr}
                stateCart={this.props.stateCart}
                chosenValues={this.props.chosenValues}

                addFullProduct={this.props.addFullProduct}
                addChosenValues={this.props.addChosenValues}
                clearValues={this.props.clearValues}
                changeTotalCost={this.props.changeTotalCost}

                startPrice={this.props.startPrice}
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