import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import App from "./App";
import {getLocations, getProducts} from "./redux/content_reducer";

class AppContainer extends React.Component {

    componentDidMount() {
        console.log("hi")
        this.props.getProducts()
        this.props.getLocations()
    }

    render() {

        if (this.props.state.isFetching===false){
            console.log(this.props.state.usualArr)
            return <>
                <App state={this.props.state}
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