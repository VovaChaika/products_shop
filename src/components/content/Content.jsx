import styles from "./Content.module.scss"
import React from "react";
import ContentItemsContainer from "./content_items/ContentItemsContainer";


function Content(props) {
    let priceCounter = -1
    let startValues = []


    return (
        <div>
            <div className={styles.header}>{props.state.path ? props.state.path : "ALL"}</div>
            <div className={styles.item}>
                {
                    props.filteredProducts.map((product) => {
                            startValues = []
                            priceCounter++
                            return <span onMouseLeave={() => {
                                props.setIsVisibleButton(false)
                            }}><ContentItemsContainer
                                product={product}
                                startPriceValue={startValues}

                                state={props.state}

                                isVisibleButton={props.isVisibleButton}
                                setIsVisibleButton={props.setIsVisibleButton}

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
