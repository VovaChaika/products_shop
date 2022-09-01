import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import {
    changeArrayCurrencyCreator,
    changeCurrencyCreator, setLabelCreator
} from "../../redux/currency_reducer";
import CurrSwitch from "./CurrSwitch";


class CurrSwitchContainer extends React.Component {
    componentDidMount() {
        this.props.changeArrayCurrency(this.props.currencies)
    }

    render() {
        return <>
            <CurrSwitch state={this.props.state}
                        currencies={this.props.currencies}
                        stateProduct={this.props.stateProduct}

                        setVisible={this.props.setVisible}
                        setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                        isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                        isVisibleCart={this.props.isVisibleCart}
                        setIsVisibleCart={this.props.setIsVisibleCart}


                        changeArrayCurrency={this.props.changeArrayCurrency}
                        changeCurrency={this.props.changeCurrency}
                        setLabel={this.props.setLabel}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        state: state.currency,
        stateProduct: state.products,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeCurrency: (newCurrency) => {
            dispatch(changeCurrencyCreator(newCurrency))
        },
        changeArrayCurrency: (currencyArr, name ) => {
            dispatch(changeArrayCurrencyCreator(currencyArr, name))
        },
        setLabel: (label) => {
            dispatch(setLabelCreator(label))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CurrSwitchContainer)