import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";

/*** Utils ***/
import store from "../../store";

/*** Styles ***/
import styles from './mycourses.scss';
import {getCookie} from "../../utils/cookie";

class MyCourses extends Component {
    state = {
        courses: [],
        company: {}
    };

    async componentDidMount() {
        let courses = await store.getCourses();
        let resCompany = await store.getEmployer(getCookie('user_id'));
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
        })
    }

    render() {
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
                    </div>
                </div>
            </div>
        );
    }
}

export default MyCourses;
