import React, { PureComponent } from 'react';

/*** Components ***/
import Card from "../Card";
import PieDiagram from "./sub-components/PieChart";
import LineDiagram from "./sub-components/LineChart";

/*** Styles ***/
import styles from "./chart.scss";

export default class Chart extends PureComponent {
    render() {
        let {type, header} = this.props;
        return (
            <Card type={'chart'}>
                <div className={styles.Chart}>
                    <div className={`${styles.header} ${styles[type]}`} v-if={header}>{header}</div>
                    <PieDiagram v-if={type === 'pie'}/>
                    <LineDiagram v-if={type === 'line'}/>
                </div>
            </Card>
        );
    }
}
