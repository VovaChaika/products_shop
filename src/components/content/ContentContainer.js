import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Content from "./Content";
import {getAllProductsApi} from "../../api/api";

class ContentContainer extends React.Component {
    componentDidMount() {
        let path = window.location.pathname.split('/content/')
        this.props.getAllProducts(path[1] ? path[1] : "all")
    }

    state = {
        //in stock
        isVisibleButton: false,
    };
    setIsVisibleButton = (isVisible) => {
        this.setState({isVisibleButton: isVisible});
    }

    render() {
        return <>
            <Content filteredProducts={this.props.state.allProductsShort}

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
        getAllProducts: (category) => {
            dispatch(getAllProductsApi(category))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ContentContainer)

