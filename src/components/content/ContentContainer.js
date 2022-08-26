import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {getProducts, setStartPriceCreator} from "../../redux/content_reducer";
import {changeArrayCurrencyCreator} from "../../redux/currency_reducer";

class ContentContainer extends React.Component {
    state = {
        isSetCurrency: 0,
        isVisibleButton: false
    };
    handleCurrency = (arr) => {
        if (this.state.isSetCurrency === 0){
            this.props.changeArrayCurrency(arr, this.props.stateCurr.label)
            this.setState({ isSetCurrency: 1 });
        }
    }
    setIsVisibleButton = (isVisible) => {
        this.setState({ isVisibleButton: isVisible });
    }
    render() {

            let arr = []
            this.props.state?.usualArr?.map((product) => {
                Object.assign(product.prices, {id: product.id})
                arr.push(product.prices)
            })
            this.handleCurrency(arr)
            let filteredProducts = this.props.state.usualArr.filter((product) => {
                    if (this.props.state.path !== "") {
                        if (this.props.state.path === "all") {
                            return product
                        } else return product.category === this.props.state.path
                    } else return product
                }
            )
        if (this.props.stateCurr.currencyArr.length !== 0){
            return <>
                <Content filteredProducts={filteredProducts}

                         state={this.props.state}
                         stateCurr={this.props.stateCurr}

                         startPrice={this.props.startPrice}
                         setStartPrice={this.props.setStartPrice}

                         setIsVisibleButton={this.setIsVisibleButton}
                         isVisibleButton={this.state.isVisibleButton}
                />
            </>
        }

    }

}

let mapStateToProps = (state) => {
    return {
        state: state.products,
        stateCurr: state.currency
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setStartPrice: (productId) => {
            dispatch(setStartPriceCreator(productId))
        },
        changeArrayCurrency: (currencyArr, name )=>{
            dispatch(changeArrayCurrencyCreator(currencyArr, name ))
        },
        getProducts: () => {
            dispatch(getProducts())
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentContainer)

