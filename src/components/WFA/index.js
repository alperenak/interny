import React, {Component} from 'react';

/*** Components ***/
import Card from "../Card";

/*** Styles ***/
import styles from './wfa.scss';

/*** Utils ***/
import store from "../../store";
import {getCookie} from "../../utils/cookie";
import LoadingModal from "../LoadingModal";

class WFA extends Component {
    state = {
        loading: true,
        data: {}
    };

    async componentDidMount() {
        this.setState({ loading: true });
        let res = await store.getWFAData(this.props.internId);
        this.setState({ loading: false, data: res.data });
    }

    render() {
        let { data, loading } = this.state;
        return (
            <div className={styles.WFA}>
                <LoadingModal v-if={loading} text={'loading'} />
                <div className={styles.header}>WORK FORCE ANALYTICS</div>
                <div className={styles.numerics}>
                    <Card type={'num'}>
                        <div className={styles.numeric}>
                            <span>Completed Tasks</span>{data.nofCompleted}
                        </div>
                    </Card>
                    <Card type={'num'}>
                        <div className={styles.numeric}>
                            <span>Incomplete Tasks</span>{data.nofIncomplete}
                        </div>
                    </Card>
                    <Card type={'num'}>
                        <div className={styles.numeric}>
                            <span>Overdue Tasks</span>{data.nofOverdue}
                        </div>
                    </Card>
                    <Card type={'num'}>
                        <div className={styles.numeric}>
                            <span>All Tasks</span>{data.nofTasks}
                        </div>
                    </Card>
                    <Card type={'num'}>
                        <div className={styles.numeric}>
                            <span>Overall Score</span>{data.overallScore}
                        </div>
                    </Card>
                </div>
                <div className={styles.labels}>
                    {
                        data?.labelSections?.map((section, i) => {
                            return (
                                <Card type={'wfaQuestion'} key={i} header={{text: section.labelName, position: 'start'}}>
                                    <div className={styles.label}>
                                        <div className={styles.items}>
                                            {section.evaluations.map((question, j) => {
                                                return (
                                                    <div key={j} className={styles.item}>
                                                        <span>{`Avarage score of Question${j+1}:`}</span>{` ${question.averageScore}`}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={styles.items}>
                                            <div className={styles.item}>
                                                <span>Completed Tasks:</span>{` ${section.nofCompleted}`}
                                            </div>
                                            <div className={styles.item}>
                                                <span>Incomplete Tasks:</span>{` ${section.nofIncomplete}`}
                                            </div>
                                            <div className={styles.item}>
                                                <span>Overdue Tasks:</span>{` ${section.nofOverdue}`}
                                            </div>
                                            <div className={styles.item}>
                                                <span>All Tasks:</span>{` ${section.nofTasks}`}
                                            </div>
                                            <div className={styles.item}>
                                                <span>Overall Score:</span>{` ${section.overallScore}`}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })
                    }
                </div>
                <div className={styles.questions}>
                    {
                        data?.evaluations?.map((question, j) => {
                            return (
                                <Card header={{text:`Question ${j+1}`, position:'center'}} type={'wfaQuestion'}>
                                    <div className={styles.question}>
                                        <div className={styles.averageScore}>{`Average Score: ${question.averageScore}`}</div>
                                        {question.question}
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default WFA;
