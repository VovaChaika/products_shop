import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {getProducts, setStartPriceCreator} from "../../redux/content_reducer";
import {changeArrayCurrencyCreator} from "../../redux/currency_reducer";

class ContentContainer extends React.Component {
componentDidMount() {
    // let arr = []
    // let isSetCurrency = 0
    // console.log(this.props.state)
    // this.props.state?.usualArr?.map((product) => {
    //     console.log(product)
    //     Object.assign(product.prices, {id: product.id})
    //     arr.push(product.prices)
    // })
    // console.log(arr)
    // this.props.changeArrayCurrency(arr, "USD")
}
    state = {
        isSetCurrency: 0
    };
    handleCurrency = (arr) => {
        if (this.state.isSetCurrency === 0){
            this.props.changeArrayCurrency(arr, this.props.stateCurr.label)
            this.setState({ isSetCurrency: 1 });
        }
    }
    render() {

            let arr = []
            this.props.state?.usualArr?.map((product) => {
                Object.assign(product.prices, {id: product.id})
                arr.push(product.prices)
            })
        console.log(arr)
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

