import React, {Component, Fragment} from 'react';

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from "./jobDetail.scss";

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
                            <div className={styles.postDescription}>Qualifications:</div>
                            <ul className={styles.postNote}>
                                <li v-for={(qualification, i) in pst.qualifications} key={i}>{qualification}</li>
                            </ul>
                            <div className={styles.postDescription}>Requirements:</div>
                            <ul className={styles.postNote}>
                                <li v-for={(education, i) in pst.requirements.education} key={i}>{education}</li>
                                <li v-for={(experience, i) in pst.requirements.experiences} key={i}>{experience}</li>
                            </ul>
                        </div>
                    );
                })}
            </Fragment>
        );
    }
}

export default JobDetail;
