import React, { Component } from 'react';

/*** Styles ***/
import styles from './taskdetail.scss';
import clockIcon from "../../icons/nine-oclock-on-circular-clock.svg";
import store from '../../store';

class TaskDetail extends Component {

    state = {
        isEvaluated: false,
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
        ]
    }

    componentDidUpdate() {
    }

    async sendQuestions() {
        if (item.status != 'Done' || this.props.item.isEvaluated === true || this.state.isEvaluated) return;

        try {
            const { item } = this.props;
            const response = await store.sendQuestions(item.id, this.state.questions);
            if (response.status == '200') this.setState({ isEvaluated: true });

        } catch (error) {
            console.error(error);
        }
    }

    renderWFA() {
        // for static structure
        const { questions, isEvaluated } = this.state;
        const { item } = this.props;

        if (item.status != 'Done' || item.isEvaluated === true || isEvaluated) return <></>;

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

        console.log('avarage is', calcRateAverage('', true, 5));

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

    render() {
        let { item, RenderMembers } = this.props;
        const RenderWFA = this.renderWFA.bind(this);
        return (
            <div className={styles.TaskDetail}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.label}>{item.label}</div>
                <div className={styles.status}>Status: <span>{item.status}</span></div>
                <div className={styles.users}>Reporter: <span>'Reporter' is not defined(related to 'backend structure')</span></div>
                <div className={styles.users}>Assignee:
                    <div className={styles.userImage}>
                        <RenderMembers renderFor='avatarFromDetail' {...this.props} />
                    </div>
                    <RenderMembers renderFor='name' {...this.props} />
                </div>
                <div className={styles.description}>{item.description}</div>
                <div className={styles.deadline}>
                    <img src={clockIcon} alt={'clock'} /> <span>{(new Date(item.deadline)).toLocaleDateString()}</span>
                </div>
                <RenderWFA />
            </div>
        );
    }
}

export default TaskDetail;
