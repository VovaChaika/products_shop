import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {getProducts, refreshShortProductsCreator} from "../../redux/content_reducer";
import {changeArrayCurrencyCreator} from "../../redux/currency_reducer";
import {_productsIdArr, getProductsApi} from "../../api/api";

class ContentContainer extends React.Component {
    componentDidMount() {
        //get short product for category page
        this.props.refreshShortProducts()
        _productsIdArr.map((productId)=>{
            this.props.getProductsApi(productId)
        })
    }

    state = {
        isSetCurrency: 0,
        //in stock
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
            let filteredProducts = this.props.state.allProductsShort.filter((product) => {
                    if (this.props.state.path !== "") {
                        if (this.props.state.path === "all") {
                            return product
                        } else return product.category === this.props.state.path
                    } else return product
                }
            )
        if (this.props.stateCurr.currencyArr.length !== 0 ){
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
        changeArrayCurrency: (currencyArr, name )=>{
            dispatch(changeArrayCurrencyCreator(currencyArr, name ))
        },
        getProducts: () => {
            dispatch(getProducts())
        },
        getProductsApi: (productId) => {
            dispatch(getProductsApi(productId))
        },
        refreshShortProducts: () => {
            dispatch(refreshShortProductsCreator())
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentContainer)

