import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {addProductCreator} from "../../redux/cart_reducer";
import {changeArrayCurrencyCreator, getCurrencyCreator, setCurrencyItemCreator} from "../../redux/currency_reducer";
import {setUsualArrCreator} from "../../redux/content_reducer";


class ContentContainer extends React.Component {

    render() {
        let filteredArr = this.props.state.usualArr.filter((product) => {

                if (this.props.state.path !== "") {
                    if (this.props.state.path === "all") {
                        return product
                    } else return product.category === this.props.state.path
                } else return product
            }
        )
        return <>

            <Content state={this.props.state}
                     stateCurr={this.props.stateCurr}
                     addProduct={this.props.addProduct}
                     getCurrency={this.props.getCurrency}
                     usualArr={filteredArr}
                     setCurrencyItem={this.props.setCurrencyItem}
                     currencies={this.props.currencies}
                     changeArrayCurrency={this.props.changeArrayCurrency}
                     startPrice={this.props.startPrice}
            />
        </>
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
        addProduct: (id) => {
            dispatch(addProductCreator(id))
        },
        getCurrency: () => {
            dispatch(getCurrencyCreator())
        },
        setUsualArr: (data) => {
            dispatch(setUsualArrCreator(data))
        },
        setCurrencyItem: (oneItemData) => {
            dispatch(setCurrencyItemCreator(oneItemData))
        },
        changeArrayCurrency: (currencyArr, name) => {
            dispatch(changeArrayCurrencyCreator(currencyArr, name))
        },

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentContainer)

