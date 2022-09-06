import React, {Component} from 'react';
import styles from "../Item.module.scss";

class Attributes extends Component {
    render() {
        let myIndex = 0;
        return <div className={styles.attribute}>
            {this.props.attributes.map((attribute) => {
                return (<div>
                    <div className={styles.attrHeader}>{attribute.name}:</div>
                    {attribute.items.map((items, index) => {
                        myIndex = myIndex + 1
                        const newIndex = myIndex
                        let chosenArr = {}
                        this.props.chosenValues.map((value) => {
                            if (value.name === attribute.name && value.index === newIndex && value.value === items.value) {
                                chosenArr = value
                            }
                        })
                        //color to show color not string
                        if (attribute.name === "Color") {

                            return <button
                                className={[chosenArr.value === items.value && chosenArr.index === myIndex && chosenArr.name === attribute.name ? styles.activeColor : styles.passiveColor, items.value === '#FFFFFF' ? styles.whiteColor : ''].join(' ')}
                                style={{
                                    backgroundColor: items.value
                                }}
                                onClick={() => {
                                    this.props.handleClick()
                                    this.props.addChosenValues(attribute.name, items.value, newIndex)
                                }}
                            ></button>
                        } else {
                            //other
                            return <button key={items.value}
                                           className={chosenArr.value === items.value && chosenArr.index === myIndex && chosenArr.name === attribute.name ? styles.active : styles.passive}
                                           onClick={() => {
                                               this.props.handleClick()
                                               this.props.addChosenValues(attribute.name, items.value, newIndex)
                                           }}

                            >{items.value}</button>
                        }


                    })}</div>)
            })}
        </div>
    }
}

export default Attributes