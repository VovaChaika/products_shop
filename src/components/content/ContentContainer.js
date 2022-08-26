import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {setStartPriceCreator} from "../../redux/content_reducer";

class ContentContainer extends React.Component {

    render() {
        let filteredProducts = this.props.state.usualArr.filter((product) => {
                if (this.props.state.path !== "") {
                    if (this.props.state.path === "all") {
                        return product
                    } else return product.category === this.props.state.path
                } else return product
            }
        )
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
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentContainer)

