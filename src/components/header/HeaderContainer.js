import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Header from "../header/Header";
import {getCurrencyCreator} from "../../redux/currency_reducer";
import {switchPathCreator} from "../../redux/content_reducer";


class HeaderContainer extends React.Component {

    render() {
        return <>
            <Header stateCurr={this.props.stateCurr}
                    setVisible={this.props.setVisible}
                    isVisible={this.props.isVisible}
                    switchPath={this.props.switchPath}
                    state={this.props.state}
                    currencies={this.props.currencies}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        stateCurr: state.currency,
        state: state.products
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        switchPath: (newPath) => {
            dispatch(switchPathCreator(newPath))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(HeaderContainer)