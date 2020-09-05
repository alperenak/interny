import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";

/*** Utils ***/
import store from "../../store";
import {getCookie} from "../../utils/cookie";

/*** Styles ***/
import styles from './mycourses.scss';

class MyCourses extends Component {
    state = {
        courses: [],
        company: {}
    };

    async componentDidMount() {
        let courses = await store.getCourses();
        let resCompany = {};
        if (getCookie('user') === 'employer') {
            resCompany = await store.getEmployer(getCookie('user_id'));
        } else {
            let job = await store.getPost(this.props.user.ApprovedJob);
            resCompany = await store.getEmployer(job.Employer.id);
        }
        let company = resCompany.data;
        this.setState({
            courses: courses,
            company: {
                logo: company.logo,
                header: company.legalName,
                location: `${''} - ${''}`,
                sector: '',
                jobType: '',
                empNum: company?.employeeNumber,
                description: '',
            }
        });
    }

    createCourse = () => {
        this.props.createModal({
            header: 'Create Course',
        });
    };

    render() {
        let userType = getCookie('user');
        let {courses, company} = this.state;
        return (
            <div className={styles.MyCourses}>
                <div className={styles.cards}>
                    <div className={styles.courses}>
                        <Card
                            type={'course'}
                            course={course}
                            v-for={(course, i) in courses}
                            key={i}
                        />
                    </div>
                    <div className={styles.profileSection}>
                        <Card
                            type={'companyProfile'}
                            profileObject={company}
                            getUser={this.getPost}
                        />
                        <Button
                            v-if={userType === 'employer'}
                            text={'Create a course'}
                            type={'primary'}
                            sizeName={'default'}
                            width={'105px'}
                            onButtonClick={() => this.createCourse()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MyCourses;
