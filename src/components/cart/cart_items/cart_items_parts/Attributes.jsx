import React, {Component} from 'react';
import styles from "../CartItem.module.scss"

class Attributes extends Component {
    render() {
        return  <div className={styles.attributes}>
            {this.props.attributes?.map((attribute) => {
                return (<div>
                    <div className={styles.attrHeader}>{attribute.name}:</div>
                    {attribute.items.map((items) => {
                        let result = []
                        this.props.chosenValues?.map((values) => {
                            result.push({
                                value: values.value,
                                index: values.index,
                                name: values.name
                            })
                        })
                        if (attribute.name === "Color") {
                            return <button
                                className={[result.find(res => res.value === items.value) !== undefined
                                    ? styles.activeColor : styles.passiveColor,
                                    items.value === '#FFFFFF' ? styles.whiteColor : ''].join(' ')}
                                style={{backgroundColor: items.value}}
                            ></button>
                        } else {
                            if (result.find(res => res.value === items.value && attribute.name === res.name) !== undefined) {
                                return <button
                                    className={styles.active}
                                ><span>{items.value}</span></button>
                            } else {
                                return <button
                                    className={styles.passive}
                                ><span>{items.value}</span></button>
                            }


                        }
                    })}</div>)
            })
            }
        </div>

    }
}

export default Attributes