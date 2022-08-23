import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Cart from "./Cart";
let mapStateToProps = (state) =>{
    return{
        state: state.cart,
        stateCurr: state.currency
    }
}


export default compose(
    connect(mapStateToProps)
)(Cart)