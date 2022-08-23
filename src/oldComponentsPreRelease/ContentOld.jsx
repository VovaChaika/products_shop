import './Category.css';
import Items from "./Items";
import React, {useEffect, useState} from "react";
import {productsAPI} from "../../api/api"
import {category} from "../header/Header";
import cart from "../cart/Cart";
import {updateProducts} from "../../redux/content_reducer";
import cloneDeep from 'lodash/cloneDeep';

// export function DisplayLocations(query) {
//     const {loading, error, data} = useQuery(query);
//
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error :(</p>;
//     const state = {id: data.product.id, name: data.product.name, img: data.product.gallery[0], price: data.product.prices[0].amount}
//
//     return state
// }

function ContentOld(props) {
    let filteredArr = []

    let usualArr = [...updateProducts()]

    useEffect(()=>{
        props.changeCategory(category)
    },[])

    if (props.state.category === "clothes") {
        usualArr.map((product) => {
                if (product.category === "clothes") {
                    filteredArr.push(product)
                }
            }
        )
    }
    else if (props.state.category === "tech") {
        usualArr.map((product) => {
                if (product.category === "tech") {
                    filteredArr.push(product)
                }
            }
        )
    }
    let curr = props.stateCurr.currency
    return (
        <>
            {curr}
            {props.state.category}
            {filteredArr.length ===0 &&
                usualArr.map((product) => (
                <Items data={product} addProduct={props.addProduct} curr={curr}/>
                ))
            }

            {filteredArr.length > 0 &&
                filteredArr.map((product) => (
                    <Items data={product} addProduct={props.addProduct} curr={curr}/>
                ))
            }
        </>
    );
}

export default ContentOld;
