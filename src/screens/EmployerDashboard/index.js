import React, {Component} from 'react';
import Chart from "../../components/Chart";
import Card from "../../components/Card";

import styles from './employerdashboard.scss'

class Dashboard extends Component {
    render() {
        return (
            <div className={styles.Dashboard}>
                <div>
                    <div className={styles.tableContainer}>
                        <Card header={{text: 'Interns', position: 'start'}} type={'table'} />
                    </div>
                    <div className={styles.taskCardContainer}>
                        <Chart type={'pie'} header={'Task Progress'}/>
                    </div>
                </div>
                <div>
                    <div className={styles.numericCardContainer}>
                        <Card type={'numeric'}>
                            <div className={styles.numericDataContainer}>+165</div>
                        </Card>
                        <Card type={'numeric'}>
                            <div className={styles.numericDataContainer}>+165</div>
                        </Card>
                        <Card type={'numeric'}>
                            <div className={styles.numericDataContainer}>+165</div>
                        </Card>
                    </div>
                    <div className={styles.numericCardContainer}>
                        <Card type={'numeric'}>
                            <div className={styles.numericDataContainer}>+165</div>
                        </Card>
                        <Card type={'numeric'}>
                            <div className={styles.numericDataContainer}>+165</div>
                        </Card>
                        <Card type={'numeric'}>
                            <div className={styles.numericDataContainer}>+165</div>
                        </Card>
                    </div>
                    <div className={styles.applicationContainer}>
                        <Chart type={'line'} header={'Applications By Post'}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
