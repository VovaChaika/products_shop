import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {switchPathCreator} from "../../redux/content_reducer";
import Items from "./Items";
import {
    addFullProductCreator,
    changeTotalCostCreator,
    clearValuesCreator,
    setDefaultAttributesCreator
} from "../../redux/cart_reducer";


class ItemsContainer extends React.Component {
    state = {
        isVisible: false,
    };
    setIsVisible = (isVisible) => {
        this.setState({ isVisible: isVisible });
    }

    render() {
        return <>
            <Items
                product={this.props.product}
                startPriceValue={this.props.startPriceValue}

                state={this.props.state}
                stateCart={this.props.stateCart}

                isVisibleButton={this.props.isVisibleButton}
                setIsVisibleButton={this.props.setIsVisibleButton}

                setStartPrice={this.props.setStartPrice}
                priceValues={this.props.priceValues}

                setIsVisible={this.setIsVisible}
                isVisible={this.state.isVisible}

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
        switchPath: (newPath) => {
            dispatch(switchPathCreator(newPath))
        },
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
)(ItemsContainer)