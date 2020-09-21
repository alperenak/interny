import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import LoadingModal from "../../components/LoadingModal";

/*** Utils ***/
import intern from '../../utils/internDetail';
import {getCookie} from "../../utils/cookie";

/*** Styles ***/
import styles from './interndetail.scss';

class InternDetail extends Component {
    state = {
        processing: true
    };

    componentDidMount() {
        setInterval(() => this.setState({ processing: false }),1000);
    }

    render() {
        let { processing } = this.state;
        let duration = (((intern.Internship.duration - intern.Internship.dayLeft) / intern.Internship.duration) * 100);
        return (
            <div className={styles.InternDetail}>
                {processing && <LoadingModal text="Loading" />}
                <Card type={'internDetail'}>
                    <div className={styles.internInfo}>
                        <div className={styles.userImage}><img src={intern.avatar} alt={'avatar'}/></div>
                        <div className={styles.name}>{`${intern.name} ${intern.surname}`}</div>
                        <div className={`${styles.infoFields} ${styles.email}`}>
                            <span>Email:</span>
                            <span className={styles.value}>{intern.email}</span>
                        </div>
                        <div className={`${styles.infoFields} ${styles.phone}`}>
                            <span>Phone:</span>
                            <span className={styles.value}>{intern.phone}</span>
                        </div>
                        <div className={`${styles.infoFields} ${styles.gradStatus}`}>
                            <span>Graduation Status:</span>
                            <span className={styles.value}>{intern.gradStatus}</span>
                        </div>
                        <div className={`${styles.infoFields} ${styles.location}`}>
                            <span>Address:</span>
                            <span className={styles.value}>{`${intern.location.country} - ${intern.location.city}`}</span>
                        </div>
                    </div>
                </Card>
                <Card type={'internInfo'}>
                    <div className={styles.internship}>
                        <div className={styles.internshipHeader}>Internship</div>
                        <div className={styles.internshipField}>
                            <span>Position: </span>
                            <span className={styles.value}>{intern.Internship.position}</span>
                        </div>
                        <div className={styles.internshipField}>
                            <span>Start Date: </span>
                            <span className={styles.value}>{intern.Internship.startDate}</span>
                        </div>
                        <div className={styles.internshipField}>
                            <span>End Date: </span>
                            <span className={styles.value}>{intern.Internship.endDate}</span>
                        </div>
                        <div className={styles.internshipField}>
                            <span>Duration: </span>
                            <div className={styles.bar}>
                                <div
                                    style={{width: duration+'%'}}
                                    className={styles.duration}
                                />
                            </div>
                        </div>
                        <div className={styles.internshipField}>
                            <span>Day(s) Left: </span>
                            <span className={styles.value}>{intern.Internship.dayLeft}</span>
                        </div>
                        <div className={styles.internshipField}>
                            <span>Internship Length: </span>
                            <span className={styles.value}>{intern.Internship.internshipLength}</span>
                        </div>
                        <div className={styles.internshipField}>
                            <span>Overall Score: </span>
                            <span className={styles.value}>{intern.Internship.overAllScore}</span>
                        </div>
                    </div>
                </Card>
                <Card type={'internDetail'}>
                    <div className={styles.employer}>
                        <div className={styles.empImage}><img src={intern.Internship.Employer.logo} alt={'avatar'}/></div>
                        <div className={styles.name}>{intern.Internship.Employer.legalName}</div>
                        <div className={`${styles.infoFields} ${styles.empNum}`}>
                            <span>Employee Number:</span>
                            <span className={styles.value}>{intern.Internship.Employer.employeeNumber}</span>
                        </div>
                    </div>
                </Card>
                <Card type={'internInfo'}>
                    <div className={styles.university}>
                        <div className={styles.uniHeader}>{intern.university.university}</div>
                        <div className={styles.uniField}>
                            <span>Student Number: </span>
                            <span className={styles.value}>{intern.university.studentNumber}</span>
                        </div>
                        <div className={styles.uniField}>
                            <span>University Mail: </span>
                            <span className={styles.value}>{intern.university.universityMail}</span>
                        </div>
                        <div className={styles.uniField}>
                            <span>Department: </span>
                            <span className={styles.value}>{intern.university.department}</span>
                        </div>
                        <div className={styles.uniField}>
                            <span>Faculty: </span>
                            <span className={styles.value}>{intern.university.faculty}</span>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default InternDetail;
