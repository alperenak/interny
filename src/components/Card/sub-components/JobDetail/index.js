import React, {Component, Fragment} from 'react';

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from "./jobDetail.scss";
import {getCookie} from "../../../../utils/cookie";

class JobDetail extends Component {
    renderDetailButtons(buttons) {
        return (
            <div className={`${styles.postButton}`}>
                {buttons.map((btn, i) => {
                    return (
                            <Button
                                key={i}
                                disabled={btn.disabled}
                                hoverIcon={btn.hoverIcon}
                                icon={btn.icon}
                                iconAutoWidth={btn.iconAutoWidth}
                                iconPosition={btn.iconPosition}
                                onButtonClick={btn.onButtonClick}
                                sizeName={btn.sizeName}
                                text={btn.text}
                                type={btn.type}
                                width={btn.width}
                                to={btn.to}
                            />
                    );
                })}
            </div>
        );
    }

    render() {
        let {posts} = this.props;
        return (
            <Fragment>
                {posts.map((pst, i) => {
                    return (
                        <div key={i} className={`${styles.jobDetail}`}>
                            <div className={styles.postHeaderWrapper}>
                                <div className={styles.postHeader}>{pst.position}</div>
                                <div className={styles.postDate}>{pst.date}</div>
                            </div>
                            <div v-if={pst.company} className={styles.postCompany}>
                                {pst.company}
                            </div>
                            {pst.buttons && this.renderDetailButtons(pst.buttons)}
                            <div className={styles.postDescription}>{pst.description}</div>
                            <div v-if={pst.qualifications} className={styles.postDescription}>Qualifications:</div>
                            <div v-if={pst.qualifications} className={styles.postNote}>
                                <div>{pst.qualifications}</div>
                            </div>
                            <div v-if={pst.languages} className={styles.postDescription}>Preferred Languages:</div>
                            <div v-if={pst.languages.length > 0} className={styles.postNote}>
                                <div v-for={(language, i) in pst.languages} key={i}>{`${language}${i + 1 === pst.languages.length ? '' : ','} `}</div>
                            </div>
                            <div v-if={pst.internLevel} className={styles.postDescription}>Preferred Intern Levels:</div>
                            <div v-if={pst.internLevel.length > 0} className={styles.postNote}>
                                <div v-for={(language, i) in pst.internLevel} key={i}>{`${language}${i + 1 === pst.internLevel.length ? '' : ','} `}</div>
                            </div>
                            <div className={styles.jobInfo}>
                                <div v-if={pst.gpa} className={styles.infoSection}>
                                    <div className={styles.title}>Minimum required GPA:</div>
                                    <div className={styles.value}>{pst.gpa}</div>
                                </div>
                                <div v-if={pst.internQuota} className={styles.infoSection}>
                                    <div className={styles.title}>Intern quota:</div>
                                    <div className={styles.value}>{pst.internQuota}</div>
                                </div>
                                <div v-if={pst.internshipLength} className={styles.infoSection}>
                                    <div className={styles.title}>Internship Length:</div>
                                    <div className={styles.value}>{pst.internshipLength}</div>
                                </div>
                                <div v-if={pst.minSalary && pst.maxSalary} className={styles.infoSection}>
                                    <div className={styles.title}>Salary Interval:</div>
                                    <div className={styles.value}>{`${pst.minSalary} - ${pst.maxSalary}`}</div>
                                </div>
                                <div v-if={pst.startDate || pst.endDate} className={styles.infoSection}>
                                    <div className={styles.title}>Job Start/End Date:</div>
                                    <div className={styles.value}>{pst.startDate && pst.endDate ? `${pst.startDate} - ${pst.endDate}` : pst.startDate || pst.endDate}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Fragment>
        );
    }
}

export default JobDetail;
