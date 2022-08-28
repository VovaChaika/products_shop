import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Header from "../header/Header";
import {switchPathCreator} from "../../redux/content_reducer";


class HeaderContainer extends React.Component {
    state = {
        headerUrl: "all"
    };
    splitHeaderUrl = (url) =>{
        this.setState({ headerUrl: url[1]});
    }
    render() {
        return <>
            <Header stateCurr={this.props.stateCurr}
                    locations={this.props.state}

                    switchPath={this.props.switchPath}

                    setVisible={this.props.setVisible}
                    isVisible={this.props.isVisible}

                    isVisibleCurrSwitch={this.props.isVisibleCurrSwitch}
                    setIsVisibleCurrSwitch={this.props.setIsVisibleCurrSwitch}

                    isVisibleCart={this.props.isVisibleCart}
                    setIsVisibleCart={this.props.setIsVisibleCart}

                    headerUrl={this.state.headerUrl}
                    splitHeaderUrl={this.splitHeaderUrl}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        stateCurr: state.currency,
        state: state.products.locations
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        switchPath: (newPath) => {
            dispatch(switchPathCreator(newPath))
        },
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(HeaderContainer)