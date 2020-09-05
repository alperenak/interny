import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from './course.scss';

class Course extends Component {
    render() {
        let {course} = this.props;
        return (
            <Link to={`/coursedetail/${course._id}`} className={styles.Course}>
                <div className={styles.image}><img src={course.image ? course.image : ''} alt={'image'}/></div>
                <div className={styles.name}><div className={styles.header}>{course.name}</div></div>
                <div className={styles.language}>{course.language}</div>
                <div className={styles.description}>{course.description}</div>
                <div className={styles.duration}>{course.duration}</div>
            </Link>
        );
    }
}

export default Course;
