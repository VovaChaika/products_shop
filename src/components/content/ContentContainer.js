import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {addProductCreator} from "../../redux/cart_reducer";
import {getCurrencyCreator, setCurrencyItemCreator} from "../../redux/currency_reducer";
import {setUsualArrCreator} from "../../redux/content_reducer";


class ContentContainer extends React.Component {

    render() {
        let filteredArr = this.props.usualArr.filter((product) => {
                if (this.props.state.path !== "") {
                    if (this.props.state.path === "all") {
                        return product
                    }
                    else return product.category === this.props.state.path
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

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentContainer)

