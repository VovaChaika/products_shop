import styles from "./Content.module.scss"
import "./Category.css"
import Items from "./Items";
import React from "react";


function Content(props) {
    const [isVisibleButton, setIsVisibleButton] = React.useState(false)
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
                            return <span onMouseLeave={() => {
                                setIsVisibleButton(false)
                            }}><Items
                                product={product}
                                startPriceValue={startValues}

                                state={props.state}

                                isVisibleButton={isVisibleButton}
                                setIsVisibleButton={setIsVisibleButton}

                                setStartPrice={props.setStartPrice}
                                priceValues={props.stateCurr.currencyArr?.[priceCounter] ?
                                    props.stateCurr.currencyArr?.[priceCounter] :
                                    startValues}
                            /></span>
                        }
                    )
                }
            </div>
        </div>
    );
}

export default Content;
