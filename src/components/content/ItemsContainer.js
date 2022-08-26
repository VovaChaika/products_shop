import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {switchPathCreator} from "../../redux/content_reducer";
import Items from "./Items";


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

                isVisibleButton={this.props.isVisibleButton}
                setIsVisibleButton={this.props.setIsVisibleButton}

                setStartPrice={this.props.setStartPrice}
                priceValues={this.props.priceValues}

                setIsVisible={this.setIsVisible}
                isVisible={this.state.isVisible}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.products,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        switchPath: (newPath) => {
            dispatch(switchPathCreator(newPath))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ItemsContainer)