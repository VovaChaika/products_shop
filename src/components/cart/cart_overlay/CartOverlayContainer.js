import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import CartOverlay from "./CartOverlay";


class CartOverlayContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return <>
            <CartOverlay state={this.props.state}
                     stateCurr={this.props.currency}
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


export default compose(
    connect(mapStateToProps, {})
)(CartOverlayContainer)

