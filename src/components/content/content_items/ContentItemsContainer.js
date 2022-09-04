import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import ContentItems from "./ContentItems";
import {
    addFullProductCreator,
    changeTotalCostCreator,
    clearValuesCreator,
    setDefaultAttributesCreator
} from "../../../redux/cart_reducer";
import {getDefaultAttrApi} from "../../../api/api";


class ContentItemsContainer extends React.Component {
    state = {
        isVisible: false,
        isButton: false,
    };
    setIsVisible = (isVisible) => {
        this.setState({ isVisible: isVisible });
    }
    setIsButton = (isVisible) => {
        this.setState({ isButton: isVisible });
    }


    render() {
        const price = this.props.stateCurr.chosenPrices.filter((price)=>{
            return price.id === this.props.product.id
        })
        return <>
            <ContentItems
                product={this.props.product}

                state={this.props.state}
                stateCart={this.props.stateCart}
                stateCurr={this.props.stateCurr}

                isVisibleButton={this.props.isVisibleButton}
                setIsVisibleButton={this.props.setIsVisibleButton}

                priceValues={this.props.priceValues}
                price={price[0]}

                setIsVisible={this.setIsVisible}
                isVisible={this.state.isVisible}

                setIsButton={this.setIsButton}
                isButton={this.state.isButton}

                setDefaultAttributes={this.props.setDefaultAttributes}
                clearValues={this.props.clearValues}
                addFullProduct={this.props.addFullProduct}
                changeTotalCost={this.props.changeTotalCost}

                getDefaultAttr={this.props.getDefaultAttr}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.products,
        stateCart: state.cart,
        stateCurr: state.currency
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setDefaultAttributes: (attributes) => {
            dispatch(setDefaultAttributesCreator(attributes))
        },
        clearValues: () => {
            dispatch(clearValuesCreator())
        },
        addFullProduct: (product) => {
            dispatch(addFullProductCreator(product))
        },
        changeTotalCost: (price, plus) => {
            dispatch(changeTotalCostCreator(price, plus))
        },
        getDefaultAttr: (productId)=>{
            dispatch(getDefaultAttrApi(productId))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentItemsContainer)