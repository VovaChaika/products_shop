import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import App from "./App";
import {getLocations, getProducts} from "./redux/content_reducer";
import {_productsIdArr, getCurrenciesApi, getPricesApi} from "./api/api";
import {updateCurrentPriceCreator} from "./redux/currency_reducer";

class AppContainer extends React.Component {

    componentDidMount() {
        this.props.getProducts()
        this.props.getLocations()
        this.props.getCurrencies()
        //temp
        this.props.updateCurrentPrice()
        _productsIdArr.map((productId)=>{
            this.props.getPrices(productId)
        })
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

        if (this.props.state.isFetching===false){
            return <>
                <App state={this.props.state}

                     setIsVisible={this.setIsVisible}
                     isVisible={this.state.isVisible}

                     isVisibleCurrSwitch={this.state.isVisibleCurrSwitch}
                     setIsVisibleCurrSwitch={this.setIsVisibleCurrSwitch}

                     isVisibleCart={this.state.isVisibleCart}
                     setIsVisibleCart={this.setIsVisibleCart}
                />
            </>
        }
    }

}

let mapStateToProps = (state) => {
    return {
        state: state.products,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => {
            dispatch(getProducts())
        },
        getLocations: () => {
            dispatch(getLocations())
        },
        getCurrencies: () => {
            dispatch(getCurrenciesApi())
        },
        getPrices: (productId) => {
            dispatch(getPricesApi(productId))
        },
        updateCurrentPrice: () => {
            dispatch(updateCurrentPriceCreator())
        }

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AppContainer)