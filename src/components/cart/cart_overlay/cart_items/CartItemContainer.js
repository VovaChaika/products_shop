import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    decreaseProdCountCreator,
    increaseCountCreator,
    changeTotalCostCreator
} from "../../../../redux/cart_reducer";
import CartItem from "./CartItem";


class CartItemContainer extends React.Component {
    state = {
        mssg: ""
    };

    handleClick = () => {
        this.setState({ mssg: "Hi there!" });
    };
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
                      stateProduct={this.props.stateProduct}
                         stateCurr={this.props.stateCurr}
                         isVisible={this.props.isVisible}
                         setVisible={this.props.setVisible}
                         isVisibleCart={this.props.isVisibleCart}
                         setIsVisibleCart={this.props.setIsVisibleCart}
                         setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}
                         isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                         increaseCount={this.props.increaseCount}
                      handleClick={this.handleClick}
                      decreaseProdCount={this.props.decreaseProdCount}
                      changeTotalCost={this.props.changeTotalCost}

                      prices={prices}
            />
        </>
    }

}


let mapStateToProps = (state) =>{
    return{
        state: state.cart,
        stateCurr: state.currency,
        stateProduct: state.products
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        increaseCount: (identifier, increase) => {
            dispatch(increaseCountCreator(identifier, increase))
        },
        decreaseProdCount: ()=>{
            dispatch(decreaseProdCountCreator())
        },
        changeTotalCost: (price, plus)=>{
            dispatch(changeTotalCostCreator(price, plus))
        }
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CartItemContainer)