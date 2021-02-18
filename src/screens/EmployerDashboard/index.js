import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Card from "../../components/Card";
import Chart from "../../components/Chart";

/*** Utils ***/
import {getCookie} from "../../utils/cookie";
import store from "../../store";

/*** Style ***/
import styles from './employerdashboard.scss'

class Dashboard extends Component {
    state = {
        interns: []
    };

    async componentDidMount() {
        let id = getCookie('user_id');
        let res = await store.getInterns(id);
        this.setState({ interns: res.data });
    }

    render() {
        let {interns} = this.state;
        return (
            <div className={styles.Dashboard}>
                <div className={styles.col1}>
                    <Card header={{text: 'Interns', position: 'start'}} type={'table'}>
                        <div className={styles.tableContainer}>
                            {interns.map((intern, i) => {
                                return (
                                    <Fragment key={i}>
                                        <Link to={`/interndetail/${intern.id}`} className={styles.rowContainer}>
                                            <div className={styles.avatar}><img src={intern.avatar} alt={'avatar'}/></div>
                                            <div className={styles.internName}>{intern.name} {intern.surname}</div>
                                        </Link>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </Card>
                    <div className={styles.taskCardContainer}>
                        <Chart type={'pie'} header={'Task Progress'}/>
                    </div>
                </div>
                <div className={styles.col2}> 
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
