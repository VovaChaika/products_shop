import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import App from "./App";
import {
    addChosenValuesCreator,
    addFullProductCreator,
    addProductCreator,
    clearValuesCreator
} from "./redux/cart_reducer";
import { setUsualArrCreator} from "./redux/content_reducer";
import {changeArrayCurrencyCreator, getCurrencyCreator} from "./redux/currency_reducer";


class AppContainer extends React.Component {

    render() {
        return <>
            <App state={this.props.state}
                 stateCurr={this.props.stateCurr}
                 stateCart={this.props.stateCart}
                 addProduct={this.props.addProduct}
                 getCurrency={this.props.getCurrency}
                 addFullProduct={this.props.addFullProduct}
                 addChosenValues={this.props.addChosenValues}
                 clearValues={this.props.clearValues}
                 setUsualArr={this.props.setUsualArr}
                 changeArrayCurrency={this.props.changeArrayCurrency}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        state: state.products,
        stateCurr: state.currency,
        stateCart: state.cart,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (id) => {
            dispatch(addProductCreator(id))
        },
        getCurrency: () => {
            dispatch(getCurrencyCreator())
        },
        addFullProduct: (product) => {
            dispatch(addFullProductCreator(product))
        },
        addChosenValues: (name, value) => {
            dispatch(addChosenValuesCreator(name, value))
        },
        clearValues: () => {
            dispatch(clearValuesCreator())
        },
        setUsualArr: (data) => {
            dispatch(setUsualArrCreator(data))
        },
        changeArrayCurrency: (newCurrency) => {
            dispatch(changeArrayCurrencyCreator(newCurrency))
        },

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AppContainer)