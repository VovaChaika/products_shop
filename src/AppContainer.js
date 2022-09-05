import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import App from "./App";
import {getLocations} from "./redux/content_reducer";
import {getCurrenciesApi} from "./api/api";

class AppContainer extends React.Component {

    componentDidMount() {
        this.props.getLocations()
        this.props.getCurrencies()
    }
    state = {
        isVisible: false,
        isVisibleCurrSwitch: false,
        isVisibleCart: false,
    };
    setIsVisible = (isVisible) => {
            this.setState({ isVisible: isVisible });
    }
    setIsVisibleCurrSwitch = (isVisible) => {
        this.setState({ isVisibleCurrSwitch: isVisible });
    }
    setIsVisibleCart = (isVisible) => {
        this.setState({ isVisibleCart: isVisible });
    }

    render() {
            return <>
                <App setIsVisible={this.setIsVisible}
                     isVisible={this.state.isVisible}

                     isVisibleCurrSwitch={this.state.isVisibleCurrSwitch}
                     setIsVisibleCurrSwitch={this.setIsVisibleCurrSwitch}

                     isVisibleCart={this.state.isVisibleCart}
                     setIsVisibleCart={this.setIsVisibleCart}
                />
            </>
    }

}

let mapStateToProps = () => {
    return {
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getLocations: () => {
            dispatch(getLocations())
        },
        getCurrencies: () => {
            dispatch(getCurrenciesApi())
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AppContainer)