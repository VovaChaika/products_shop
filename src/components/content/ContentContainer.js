import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {refreshShortProductsCreator} from "../../redux/content_reducer";
import {_productsIdArr, getProductsApi} from "../../api/api";

class ContentContainer extends React.Component {
    componentDidMount() {
        //get short product for category page
        this.props.refreshShortProducts()
        _productsIdArr.map((productId) => {
            this.props.getProducts(productId)
        })
    }

    state = {
        //in stock
        isVisibleButton: false
    };
    setIsVisibleButton = (isVisible) => {
        this.setState({isVisibleButton: isVisible});
    }

    render() {
        let filteredProducts = this.props.state.allProductsShort.filter((product) => {
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

                     setIsVisibleButton={this.setIsVisibleButton}
                     isVisibleButton={this.state.isVisibleButton}
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
        getProducts: (productId) => {
            dispatch(getProductsApi(productId))
        },
        refreshShortProducts: () => {
            dispatch(refreshShortProductsCreator())
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentContainer)

