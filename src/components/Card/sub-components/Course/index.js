import React, {Component} from 'react';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from './course.scss';

class Course extends Component {
    render() {
        let {course} = this.props;
        return (
            <Link to={`/coursedetail/${course._id}`} className={"Course"}>
                <div className={"image"}><img src={course.image ? course.image : ''} alt={'image'}/></div>
                <div className={"name"}><div className={styles.header}>{course.name}</div></div>
                <div className={"language"}>{course.language}</div>
                <div className={"description"}>{course.description}</div>
                <div className={"duration"}>{course.duration}</div>
            </Link>
        );
    }
}

export default Course;
