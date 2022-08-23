import styles from "./Content.module.scss"
import "./Category.css"
import Items from "./Items";
import React from "react";



function Content(props) {
    const [isVisibleButton, setIsVisibleButton] = React.useState(false)
    let priceCounter = -1
    return (
        <>
            <h2>{props.state.category}</h2>
            <div className={styles.item}>
                {
                    props.usualArr.map((product) => {
                        priceCounter++
                       return <span onMouseLeave={()=>{
                            setIsVisibleButton(false)
                        }}><Items
                            data={product}
                            addProduct={props.addProduct}
                            curr={props.stateCurr.currency}
                            currentCurrency={props.stateCurr.currencyArr}
                            isVisibleButton={isVisibleButton}
                            setIsVisibleButton={setIsVisibleButton}

                            priceValues={props.stateCurr.currencyArr?.[priceCounter]}
                            setCurrencyItem={props.setCurrencyItem}
                        /></span>
                    }
                    )
                }
            </div>
        </>
    );
}

export default Content;
