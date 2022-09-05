import styles from "./Content.module.scss"
import React, {Component} from "react";
import ContentItemsContainer from "./content_items/ContentItemsContainer";


class Content extends Component {
    render() {
        return (
            <div>
                <div className={styles.header}>{this.props.state.path ? this.props.state.path : "ALL"}</div>
                <div className={styles.item}>
                    {
                        this.props.filteredProducts.map((product, index) => {
                                return <span onMouseLeave={() => {
                                    this.props.setIsVisibleButton(false)
                                }}><ContentItemsContainer
                                    product={product}

                                    isVisibleButton={this.props.isVisibleButton}
                                    setIsVisibleButton={this.props.setIsVisibleButton}
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
