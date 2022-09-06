import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Header from "../header/Header";
import {switchPathCreator} from "../../redux/content_reducer";
import {getAllProductsApi} from "../../api/api";


class HeaderContainer extends React.Component {
    componentDidMount() {
    }

    state = {
        headerUrl: window.location.pathname.split('/content/')[1]
    };
    splitHeaderUrl = (url) =>{
        this.setState({ headerUrl: url[1]});
    }
    render() {
        return <>
            <Header locations={this.props.locations}

                    switchPath={this.props.switchPath}

                    setVisible={this.props.setVisible}
                    isVisible={this.props.isVisible}

                    isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                    setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}

                    isVisibleCart={this.props.isVisibleCart}
                    setIsVisibleCart={this.props.setIsVisibleCart}

                    headerUrl={this.state.headerUrl}
                    splitHeaderUrl={this.splitHeaderUrl}

                    getAllProducts={this.props.getAllProducts}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        locations: state.products.locations
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        switchPath: (newPath) => {
            dispatch(switchPathCreator(newPath))
        },
        getAllProducts: (category) => {
            dispatch(getAllProductsApi(category))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(HeaderContainer)