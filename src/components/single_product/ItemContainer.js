import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";

import {
    addChosenValuesCreator,
    addFullProductCreator, changeTotalCostCreator,
    clearValuesCreator,
} from "../../redux/cart_reducer";
import Item from "./Item";
import {getItemApi} from "../../api/api";


class ItemContainer extends React.Component {
    componentDidMount() {
        const detectId = window.location.pathname.split('/item/')
        this.props.getItemApi(detectId[1])
        this.props.clearValues()
    }

    state = {
        mssg: "",
        mainImg: 0,
    };

    handleClick = () => {
        this.setState({ mssg: "Hi there!" });
    };
    setMainImg = (index) => {
        this.setState({mainImg: index})
    }


    render() {
        if (this.props.stateItem.currentItem.length !== 0){
            const price = this.props.stateItem.currentItem.prices.filter((price)=>{
                return price.currency.label === this.props.stateCurr.chosenLabel
            })
            return <div>
                <Item
                    stateCart={this.props.stateCart}
                    product={this.props.stateItem.currentItem}

                    addFullProduct={this.props.addFullProduct}
                    addChosenValues={this.props.addChosenValues}
                    clearValues={this.props.clearValues}
                    changeTotalCost={this.props.changeTotalCost}

                    handleClick={this.handleClick}
                    setMainImg={this.setMainImg}
                    mainImg={this.state.mainImg}

                    price={price[0]}
                />
            </div>
        }
    }

}

let mapStateToProps = (state) => {
    return {
        stateCurr: state.currency,
        stateCart: state.cart,
        stateItem: state.item
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addFullProduct: (product) => {
            dispatch(addFullProductCreator(product))
        },
        addChosenValues: (name, value, index) => {
            dispatch(addChosenValuesCreator(name, value, index))
        },
        clearValues: () => {
            dispatch(clearValuesCreator())
        },
        changeTotalCost: (price, plus) => {
            dispatch(changeTotalCostCreator(price, plus))
        },
        getItemApi: (itemData) => {
            dispatch(getItemApi(itemData))
        },

    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ItemContainer)