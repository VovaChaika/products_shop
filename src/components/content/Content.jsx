import styles from "./Content.module.scss"
import React, {Component} from "react";
import ContentItemsContainer from "./content_items/ContentItemsContainer";


class Content extends Component{
    render() {
        let priceCounter = -1

        return (
            <div>
                <div className={styles.header}>{this.props.state.path ? this.props.state.path : "ALL"}</div>
                <div className={styles.item}>
                    {
                        this.props.filteredProducts.map((product, index) => {
                                priceCounter++
                                return <span onMouseLeave={() => {
                                    this.props.setIsVisibleButton(false)
                                }}><ContentItemsContainer
                                    product={product}

                                    state={this.props.state}

                                    isVisibleButton={this.props.isVisibleButton}
                                    setIsVisibleButton={this.props.setIsVisibleButton}

                                    priceValues={this.props.stateCurr.currencyArr?.[index]}
                                /></span>

                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Content;
