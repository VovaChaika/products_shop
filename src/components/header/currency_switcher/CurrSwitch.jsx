import React, {useEffect} from 'react';
import styles from "./CurrSwitch.module.scss"

const CurrSwitch = (props) => {

    return (
        <>
            {props.isVisibleCurrSwitch &&
                (<div className={styles.position} onMouseLeave={() => {
                    props.setIsVisibleCurrSwitch(false)
                }
                }>
                    {
                        props.currencies?.[0].map((label) => {
                            return <button onClick={() => {
                                props.changeCurrency(label.currency.label)
                                //передаєм цілу хуйню, а треба рендерить ще на етапі appcontainer, бо не загрузить проект
                                props.changeArrayCurrency(props.currencies)
                            }}>{label.currency.symbol} {label.currency.label}
                            </button>

                        })
                    }
                </div>)


            }

            <button className={styles.button} onMouseMove={() => {
                if (props.isVisibleCart === true) {
                    props.setIsVisibleCart(false)
                    props.setVisible(false)
                }
                props.setIsVisibleCurrSwitch(true)
            }}>
                {props.state.currency}
            </button>

        </>
    );
};

export default CurrSwitch;