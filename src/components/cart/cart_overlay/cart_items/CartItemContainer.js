import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    increaseCountCreator
} from "../../../../redux/cart_reducer";
import CartItem from "./CartItem";


class CartItemContainer extends React.Component {
    render() {
        let prices
        this.props.state.product.map((searchCurr)=>{
           searchCurr.prices.map((curr)=>{
               if (curr.currency.symbol === this.props.stateCurr.currency){
                   prices = curr
               }
           })
        })
        return <>
            <CartItem state={this.props.state}
                         stateCurr={this.props.stateCurr.priceCount}
                         isVisible={this.props.isVisible}
                         setVisible={this.props.setVisible}
                         isVisibleCart={this.props.isVisibleCart}
                         setIsVisibleCart={this.props.setIsVisibleCart}
                         setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                         isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                         increaseCount={this.props.increaseCount}

                      prices={prices}
            />
        </>
    }

}


let mapStateToProps = (state) =>{
    return{
        state: state.cart,
        stateCurr: state.currency
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        increaseCount: (identifier, increase) => {
            dispatch(increaseCountCreator(identifier, increase))
        },
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CartItemContainer)