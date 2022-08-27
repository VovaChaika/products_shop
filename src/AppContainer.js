import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import App from "./App";
import {getLocations, getProducts} from "./redux/content_reducer";

class AppContainer extends React.Component {

    componentDidMount() {
        this.props.getProducts()
        this.props.getLocations()
    }
    state = {
        isVisible: false
    };
    setIsVisible = (isVisible) => {
            this.setState({ isVisible: isVisible });
    }

    render() {

        if (this.props.state.isFetching===false){
            return <>
                <App state={this.props.state}
                     setIsVisible={this.setIsVisible}
                     isVisible={this.state.isVisible}
                />
            </>
        }
    }

}

let mapStateToProps = (state) => {
    return {
        state: state.products,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => {
            dispatch(getProducts())
        },
        getLocations: () => {
            dispatch(getLocations())
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AppContainer)