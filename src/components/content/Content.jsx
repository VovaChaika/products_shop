import styles from "./Content.module.scss"
import React, {Component} from "react";
import ContentItemsContainer from "./content_items/ContentItemsContainer";


class Content extends Component {
    render() {
        let path = window.location.pathname.split('/content/')
        return (
            <div>
                <div className={styles.header}>{path[1] ? path[1] : 'all'}</div>
                <div className={styles.item}>
                    {
                        this.props.filteredProducts.map((product) => {
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
