import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    increaseCountCreator,
    changeTotalCostCreator, deleteFromCartCreator, clearCartProductsCreator
} from "../../../redux/cart_reducer";
import CartItem from "./CartItem";
import {getCartItems} from "../../../api/api";


class CartItemContainer extends React.Component {
    componentDidMount() {
            this.props.clearCartProducts()
            this.props.state.product?.map((product) => this.props.getCartItems(product));
    };

    state = {
        doChange: [],
        imgIndex: 0,
        imgSrc: [],
    };

    setIsChange = (increase, length, product, imgSrc) => {
        if (increase === true) {
            if (this.state.imgIndex !== length - 1) {
                this.setState({imgIndex: this.state.imgIndex + 1});
            } else {
                this.setState({imgIndex: 0});
            }
        } else if (increase === false) {
            if (this.state.imgIndex === 0) {
                this.setState({imgIndex: length - 1});
            } else {
                this.setState({imgIndex: this.state.imgIndex - 1});
            }

        } else {
            this.setState({imgIndex: this.state.imgIndex});
        }
        this.setState({doChange: [...this.state.doChange, product]});
        let shouldAdd = 0
        this.state.imgSrc.map((searchId, index) => {
            if (searchId.id === product) {
                shouldAdd = 1
                this.state.imgSrc[index].src = imgSrc[this.state.imgIndex]
            }
        })
        if (shouldAdd === 0) {
            this.setState({imgSrc: [...this.state.imgSrc, {src: imgSrc[this.state.imgIndex], id: product}]})
        }
    };

    render() {
        if ( this.props.state.productFinal !== undefined){
            return <>
                <CartItem state={this.props.state}
                          stateCurr={this.props.stateCurr}

                          increaseCount={this.props.increaseCount}
                          changeTotalCost={this.props.changeTotalCost}
                          deleteFromCart={this.props.deleteFromCart}

                          imgSrc={this.state.imgSrc}
                          doChange={this.state.doChange}
                          setIsChange={this.setIsChange}

                          isCartOverlay={this.props.isCartOverlay}
                />
            </>
        }
    }

}


let mapStateToProps = (state) => {
    return {
        state: state.cart,
        stateCurr: state.currency,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        increaseCount: (identifier, increase) => {
            dispatch(increaseCountCreator(identifier, increase))
        },
        changeTotalCost: (price, plus) => {
            dispatch(changeTotalCostCreator(price, plus))
        },
        deleteFromCart: () => {
            dispatch(deleteFromCartCreator())
        },
        getCartItems: (id) => {
            dispatch(getCartItems(id))
        },
        clearCartProducts: ()=>{
            dispatch(clearCartProductsCreator())
        },

    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CartItemContainer)