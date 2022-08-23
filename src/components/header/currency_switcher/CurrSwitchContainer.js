import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import {
    changeArrayCurrencyCreator,
    changeCurrencyCreator
} from "../../../redux/currency_reducer";
import CurrSwitch from "./CurrSwitch";


class CurrSwitchContainer extends React.Component {
    componentDidMount() {
        this.props.changeArrayCurrency(this.props.currencies)
    }

    render() {
        return <>
            <CurrSwitch state={this.props.state}
                        currencies={this.props.currencies}


                        setVisible={this.props.setVisible}
                        setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                        isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                        isVisibleCart={this.props.isVisibleCart}
                        setIsVisibleCart={this.props.setIsVisibleCart}


                        changeArrayCurrency={this.props.changeArrayCurrency}
                        changeCurrency={this.props.changeCurrency}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        state: state.currency
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeCurrency: (newCurrency) => {
            dispatch(changeCurrencyCreator(newCurrency))
        },
        changeArrayCurrency: (newCurrency) => {
            dispatch(changeArrayCurrencyCreator(newCurrency))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CurrSwitchContainer)