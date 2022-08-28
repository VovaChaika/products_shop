import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import CartOverlay from "./CartOverlay";


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
            />
        </>
    }

}


let mapStateToProps = (state) =>{
    return{
        state: state.cart,
    }
}
let mapDispatchToProps = () => {
    return {
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CartOverlayContainer)

