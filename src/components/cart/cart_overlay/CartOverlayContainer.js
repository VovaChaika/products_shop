import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import CartOverlay from "./CartOverlay";
import {deleteFromCartCreator} from "../../../redux/cart_reducer";


class CartOverlayContainer extends React.Component {
    render() {
        return <>
            <CartOverlay state={this.props.state}

                         isVisible={this.props.isVisible}
                         setVisible={this.props.setVisible}
                         isVisibleCart={this.props.isVisibleCart}
                         setIsVisibleCart={this.props.setIsVisibleCart}
                         setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                         isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}

                         deleteFromCart={this.props.deleteFromCart}
            />
        </>
    }

}


let mapStateToProps = (state) =>{
    return{
        state: state.cart,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        deleteFromCart: () => {
            dispatch(deleteFromCartCreator())
        },
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CartOverlayContainer)

