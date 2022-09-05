import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {setChosenValuesCreator} from "../../redux/currency_reducer";
import CurrSwitch from "./CurrSwitch";


class CurrSwitchContainer extends React.Component {
    render() {
        return <>
            <CurrSwitch state={this.props.state}

                        setVisible={this.props.setVisible}
                        setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                        isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                        isVisibleCart={this.props.isVisibleCart}
                        setIsVisibleCart={this.props.setIsVisibleCart}

                        setChosenValues={this.props.setChosenValues}
            />
        </>
    }

}

let mapStateToProps = (state) => {
    return {
        state: state.currency,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setChosenValues: (chosenValues) => {
            dispatch(setChosenValuesCreator(chosenValues))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CurrSwitchContainer)