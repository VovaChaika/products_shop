import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import ContentItems from "./ContentItems";
import {changeTotalCostCreator} from "../../../redux/cart_reducer";
import {getDefaultAttrApi} from "../../../api/api";


class ContentItemsContainer extends React.Component {
    state = {
        isVisible: false,
        isButton: false,
    };
    setIsVisible = (isVisible) => {
        this.setState({isVisible: isVisible});
    }
    setIsButton = (isVisible) => {
        this.setState({isButton: isVisible});
    }


    render() {
        const price = this.props.product.prices.filter((price) => {
            return price.currency.label === this.props.chosenLabel
        })
        return <>
            <ContentItems
                product={this.props.product}

                isVisibleButton={this.props.isVisibleButton}
                setIsVisibleButton={this.props.setIsVisibleButton}

                price={price[0]}

                setIsVisible={this.setIsVisible}
                isVisible={this.state.isVisible}

                setIsButton={this.setIsButton}
                isButton={this.state.isButton}

                changeTotalCost={this.props.changeTotalCost}

                getDefaultAttr={this.props.getDefaultAttr}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        chosenLabel: state.currency.chosenLabel
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeTotalCost: (price, plus) => {
            dispatch(changeTotalCostCreator(price, plus))
        },
        getDefaultAttr: (productId) => {
            dispatch(getDefaultAttrApi(productId))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentItemsContainer)