import styles from "./Content.module.scss"
import "./Category.css"
import React from "react";
import ItemsContainer from "./ItemsContainer";


function Content(props) {
    let priceCounter = -1
    let startValues = []


    return (
        <div>
            <h2>{props.state.path ? props.state.path : "ALL"}</h2>
            <div className={styles.item}>
                {
                    props.filteredProducts.map((product) => {
                            startValues = []
                            if (!props.stateCurr.currencyArr[priceCounter]) {
                                startValues = props.startPrice(product.id)
                            }
                            priceCounter++
                             props.setStartPrice(product.id)
                        {console.log(props.stateCurr.currencyArr)}
                            return <span onMouseLeave={() => {
                                props.setIsVisibleButton(false)
                            }}><ItemsContainer
                                product={product}
                                startPriceValue={startValues}

                                state={props.state}

                                isVisibleButton={props.isVisibleButton}
                                setIsVisibleButton={props.setIsVisibleButton}

                                setStartPrice={props.setStartPrice}
                                priceValues={props.stateCurr.currencyArr?.[priceCounter]}
                            /></span>
                        }
                    )
                }
            </div>
        </div>
    );
}

export default Content;
