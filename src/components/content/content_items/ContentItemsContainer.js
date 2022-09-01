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
        return <>
            <ContentItems
                product={this.props.product}

                state={this.props.state}
                stateCart={this.props.stateCart}

                isVisibleButton={this.props.isVisibleButton}
                setIsVisibleButton={this.props.setIsVisibleButton}

                priceValues={this.props.priceValues}

                setIsVisible={this.setIsVisible}
                isVisible={this.state.isVisible}

                setIsButton={this.setIsButton}
                isButton={this.state.isButton}

                setDefaultAttributes={this.props.setDefaultAttributes}
                clearValues={this.props.clearValues}
                addFullProduct={this.props.addFullProduct}
                changeTotalCost={this.props.changeTotalCost}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.products,
        stateCart: state.cart,
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
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentItemsContainer)