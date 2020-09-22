import React, { Component } from 'react';

/*** Styles ***/
import styles from './taskdetail.scss';
import SendCommentShortcut from '../SendCommentShortcut'
import store from '../../store';

class TaskDetail extends Component {

    state = {
        isEvaluated: false,
        doRate: false,
        questions: [
            {
                question: 'Question 1',
                key: 'q_1',
                rate: 0,
            },
            {
                question: 'Question 2',
                key: 'q_2',
                rate: 0,
            },
            {
                question: 'Question 3',
                key: 'q_3',
                rate: 0,
            },
            {
                question: 'Question 4',
                key: 'q_4',
                rate: 0,
            }
        ],
        labelClass: {
            'reporting': 'Orange',
        }
    }

    componentDidUpdate() {
    }

    async sendQuestions() {
        const { item, userType = 'intern' } = this.props;
        const { isEvaluated = false } = item;
        if (item.status != 'Done' || isEvaluated === true || this.state.isEvaluated || userType === 'intern') return;

        try {
            const response = await store.sendQuestions(item.id, this.state.questions);
            if (response.status == '200') this.setState({ isEvaluated: true });

        } catch (error) {
            console.error(error);
        }
    }

    renderWFA() {
        // for static structure
        const { questions, isEvaluated } = this.state;
        const { item = {}, userType = 'intern' } = this.props;
        if (typeof item.isEvaluated === 'undefined') item.isEvaluated = false;
        if (item.status != 'Done' || isEvaluated === true || this.state.isEvaluated || userType === 'intern') return <></>;

        const allDone = () => {
            if (item.status != 'Done' || item.isEvaluated === true || isEvaluated) return false;
            let response = true;

            questions.forEach(v => {
                if (v.rate === 0) response = false;
            });

            return response;
        }

        const changeRate = (item, newValue = 0) => {
            const notThis = questions.filter((val, index) => val.key !== item.key);
            item.rate = newValue;

            const questionsNew = [
                ...notThis,
                item
            ]

            questionsNew.sort(function (a, b) {
                return a.key.localeCompare(b.key) || a.question.localeCompare(b.question);
            });

            this.setState({ questions: questionsNew });

        }

        const Master = ({ children }) => {
            if (!this.state.doRate)
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

        const Rates = ({ item }) => (
            [1, 2, 3, 4, 5].map(
                (v, i) => (
                    <span onClick={() => changeRate(item, v)} className={item.rate >= v ? styles.pointActive : ''} key={i}>{v}</span>
                )
            )
        );

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

        const calcRateAverage = (type = '', fillThemAll = false, defaultVal = 5) => {
            if (!(questions.length > 0)) return defaultVal;

            let totalRate = 0,
                error = false;

            questions.forEach(v => {
                if (v.rate === 0 && fillThemAll) error = true;
                totalRate += v.rate
            });

            if (error) return defaultVal;

            let average = totalRate / questions.length;

            if (
                type === 'ceil'
                || type === 'floor'
                || type === 'round'
            ) average = Math[type](average)

            return average;
        }

        const buttonClassNameGenerator = () => {
            const rate = calcRateAverage('', true, 0);
            let className = styles.questionsSubmitButton;

            if (rate < 2) {
                // red
                className += ` ${styles.questionSubmitButtonRed}`;
            } else if (rate < 3) {
                // orange
                className += ` ${styles.questionSubmitButtonOrange}`;
            } else if (rate < 4) {
                // light green
                className += ` ${styles.questionSubmitButtonLightGreen}`;
            } else if (rate < 5) {
                //green
                className += ` ${styles.questionSubmitButtonGreen}`;
            }

            return className;
        }
        return (
            <Master>
                {questions.map((v, i) => <Child key={i} item={v} />)}
                {
                    allDone() && (
                        <button
                            className={buttonClassNameGenerator()}
                            disabled={!allDone()}
                            onClick={this.sendQuestions.bind(this)}>
                            Submit
                        </button>
                    )
                }
            </Master>
        );
    }

    // TODO: finish this function
    renderLogsAndComments() {
        return (
            <div className={styles.logsArea}>
                <div className={styles.logsHeader}>
                    <h3>Logs</h3>
                    <button type={'button'} className={styles.logsOpenButton}>
                        Show Details
                    </button>
                </div>
                <SendCommentShortcut />
            </div>
        );
    }

    render() {
        let { item, RenderMembers } = this.props;
        console.log('item', item)
        const RenderWFA = this.renderWFA.bind(this);
        const RenderLogsAndComments = this.renderLogsAndComments.bind(this);
        const labelClassName = `labelStyle${this.state.labelClass[item.label.toLowerCase()]}`;

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
