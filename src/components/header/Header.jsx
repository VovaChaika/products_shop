import React, {useEffect, useState} from 'react';
import styles from "./Header.module.scss"
import {gql, useQuery} from '@apollo/client';
import {images} from "../../constants"
import {NavLink, useNavigate} from "react-router-dom";
import CartOverlayContainer from "../cart/cart_overlay/CartOverlayContainer";
import CurrSwitchContainer from "./currency_switcher/CurrSwitchContainer";


const GET_LOCATIONS = gql`
query Query {
  categories {
    name
  }
}
`;

const Header = (props) => {
    const [isVisibleCurrSwitch, setIsVisibleCurrSwitch] = React.useState(false)
    const [isVisibleCart, setIsVisibleCart] = React.useState(false)

    function DisplayLocations() {
        const {loading, error, data} = useQuery(GET_LOCATIONS);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.categories.map(({name}) => (

            <NavLink className={styles.category} onClick={
                () => {
                    props.switchPath(name)
                    console.log(props.state.path)
                }
            } to={`/content/${name}`}>{name}</NavLink>

        ));
    }

    function changeVisibility() {
        if (isVisibleCurrSwitch === true || isVisibleCart === true) {
            setIsVisibleCurrSwitch(false)
            setIsVisibleCart(false)
            //isvisible props???
            props.setVisible(false)
        }
    }

    return (
        <div className={styles.header_grid}>
                <span onMouseMove={() => {
                    changeVisibility()
                }}>
                     <span className={styles.categories}><DisplayLocations/></span>

                <img className={styles.logo} src={images.logo} alt=""/>

                </span>

            <span className={styles.currency}><CurrSwitchContainer
                setVisible={props.setVisible}
                isVisible={props.isVisible}
                isVisibleCurrSwitch={isVisibleCurrSwitch}
                setIsVisibleCurrSwitch={setIsVisibleCurrSwitch}
                isVisibleCart={isVisibleCart}
                setIsVisibleCart={setIsVisibleCart}
                currencies={props.currencies}
            /></span>

            <span className={styles.cart}><CartOverlayContainer
                currency={props.stateCurr}
                setVisible={props.setVisible}
                isVisible={props.isVisible}
                isVisibleCart={isVisibleCart}
                setIsVisibleCart={setIsVisibleCart}
                isVisibleCurrSwitch={isVisibleCurrSwitch}
                setIsVisibleCurrSwitch={setIsVisibleCurrSwitch}
            /></span>
        </div>
    );
};

export default Header;