import React, { Component } from 'react';

/*** Styles ***/
import styles from './taskdetail.scss';
import SendCommentShortcut from '../SendCommentShortcut'
import Activity from '../Activity'
import store from '../../store';

class TaskDetail extends Component {

    state = {
        show: true,
        isEvaluated: false,
        doRate: false,
        questions: [],
        showLogs: false,
        item: {},
    }

    async componentDidMount() {
        const { userType = 'intern', userId = '' } = this.props;
        let detail = {};

        const wfaQuestions = await store.getWFAForTask(this.props.item.id);
        if (userType === 'employer')
            detail = await store.getTaskDetailEmployer(this.props.item.id);
        else if (userType === 'intern')
            detail = await store.getTaskDetailIntern(this.props.item.id, userId);


        ///
        const taskItem = Object.assign({}, detail.data);
        const taskQuestions = Object.assign([], wfaQuestions.data);
        let wfaQues = false
        let isEvaluated = false;

        if (userType === 'employer' && taskItem.isEvaluatedByEmployer) {
            isEvaluated = true;
            wfaQues = taskItem.wfaEmployer;
        } else if (userType === 'intern' && taskItem.isEvaluatedByIntern) {
            isEvaluated = true;
            wfaQues = taskItem.wfaIntern;
        }

        if (isEvaluated) {
            taskQuestions.sort(function (a, b) {
                return a.question.localeCompare(b.question);
            });
            wfaQues.sort(function (a, b) {
                return a.question.localeCompare(b.question);
            });

            let same = true;
            wfaQues.forEach((v, i) => {
                if (!(Object.is(taskQuestions[i], v))) {
                    same = false;
                    return;
                };
            })
            if (!same && wfaQues !== false) {
                wfaQuestions.data = wfaQues
            }
        }

        ///
        if (isEvaluated !== this.state.isEvaluated) this.setState({ questions: wfaQuestions.data, item: detail.data, isEvaluated })
        else this.setState({ questions: wfaQuestions.data, item: detail.data })


    }

    componentDidUpdate() {
        // /task/:taskId/wfa (intern)
        // /task/:taskId/wfa (intern)
    }



    async sendQuestions() {
        const { item } = this.state;
        if (!this.wfaControl()) return;

        try {
            const response = await store.sendQuestions(item.id, this.state.questions);
            if (response.status == '204') this.setState({ isEvaluated: true });
        } catch (error) {
            console.error(error);
        }
    }

    wfaControl() {
        const { item = {} } = this.state;

        if (typeof item.isEvaluated === 'undefined') item.isEvaluated = false;

        if (item.status != 'Done' || !this.state.show) return false;

        return true;
    }

    renderWFA() {
        // for static structure
        if (!this.wfaControl()) return <></>;
        const questions = this.state.questions;
        const { isEvaluated = false } = this.state;


        const allDone = () => {
            if (!this.wfaControl()) return false;
            let response = true;

            questions.forEach(v => {
                if (v.rate === 0) response = false;
            });

            return response;
        }

        const changeRate = (item, newValue = 0) => {
            const notThis = questions.filter((val) => val.key !== item.key);
            item.rate = newValue;

            const questionsNew = [
                ...notThis,
                item
            ];

            questionsNew.sort(function (a, b) {
                return a.key.localeCompare(b.key) || a.question.localeCompare(b.question);
            });

            this.setState({ questions: questionsNew });
        }

        const Master = ({ children }) => {
            if (!this.state.doRate && !isEvaluated)
                return (
                    <div className={styles.doRateArea}>
                        <div className={styles.doRateAreaString}>
                            <span>do you want to rate this task?</span>
                        </div>
                        <div className={styles.doRateAreaButtons}>
                            <button type={'button'} className={styles.doRateAreaButtonGreen} onClick={() => this.setState({ doRate: true })}>
                                yes, i'll do
                            </button>
                        </div>
                    </div>
                );
            else
                return (
                    <div className={styles.questionsContainer}>
                        {children}
                    </div>
                );
        }

        const Rates = ({ item }) => {
            return [1, 2, 3, 4, 5].map(
                (v, i) => (
                    <span
                        onClick={!isEvaluated ? () => changeRate(item, v) : () => { }}
                        className={item.rate >= v ? styles.pointActive : ''}
                        key={i}>
                        {v}
                    </span>
                )
            )
        };

        const Child = ({ item }) => {
            return (
                <div className={styles.questionArea}>
                    <div className={styles.questionTitle}>
                        <span>{item.question}</span>
                    </div>
                    <div className={styles.questionRateArea}>
                        <div className={styles.questionRate}>
                            <Rates item={item} />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <Master>
                {questions.map((v, i) => <Child key={i} item={v} />)}
                {
                    (allDone() && !isEvaluated) && (
                        <button
                            className={styles.questionsSubmitButton}
                            disabled={!allDone()}
                            onClick={this.sendQuestions.bind(this)}>
                            Submit
                        </button>
                    )
                }
            </Master>
        );
    }

    renderLogsAndComments() {
        return (
            <div className={styles.logsArea}>
                <div className={styles.logsHeader}>
                    <h3>Logs</h3>
                    <button type={'button'} className={styles.logsOpenButton} onClick={() => this.setState({ showLogs: !this.state.showLogs })}>
                        {this.state.showLogs ? 'Hide Details' : 'Show Details'}
                    </button>
                </div>
                <SendCommentShortcut user={this.props.user} />
                <Activity items={this.state.item.activity} showLogs={this.state.showLogs} />
            </div>
        );
    }

    render() {
        let { item, RenderMembers } = this.props;
        const RenderWFA = this.renderWFA.bind(this);
        const RenderLogsAndComments = this.renderLogsAndComments.bind(this);
        const labelClassName = `labelStyle${this.props.labelClass[item.label.toLowerCase()]}`;

        return (
            <div className={styles.TaskDetail}>
                <div className={`${styles.in} ${styles.inStretch}`}>
                    <div>
                        <RenderMembers renderFor='avatarFromDetail' style={styles} {...this.props} />
                    </div>
                </div>
                <div className={styles.in}>
                    <div>
                        <b>in</b>
                        <span>{item.status}</span>
                    </div>
                    <div>
                        <b>label</b>
                        <span className={styles[labelClassName]}>{item.label}</span>
                    </div>
                    <div>
                        <b>deadline</b>
                        <span>{(new Date(item.deadline)).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className={styles.taskDetailGroup}>
                    <div className={styles.taskDetailTitle}>
                        <h3>Description</h3>
                    </div>
                    <div className={styles.taskDetailContent}>
                        <span>
                            {item.description}
                        </span>
                    </div>
                </div>
                <RenderLogsAndComments />
                <RenderWFA />
            </div>
        );
    }
}

export default TaskDetail;
