import React, {Component} from 'react';

/*** Styles ***/
import styles from './taskdetail.scss';
import clockIcon from "../../icons/nine-oclock-on-circular-clock.svg";

class TaskDetail extends Component {
    render() {
        let {item} = this.props;
        return (
            <div className={styles.TaskDetail}>
                <div className={styles.title}>{item.Task.title}</div>
                <div className={styles.label}>{item.Task.label}</div>
                <div className={styles.status}>Status: <span>{item.status}</span></div>
                <div className={styles.users}>Reporter: <span>{item.Employer}</span></div>
                <div className={styles.users}>Assignee:
                    <div className={styles.userImage}><img src={item.Intern.avatar} alt={'image'}/></div>
                    <span>{item.Intern.name} {item.Intern.surname}</span></div>
                <div className={styles.description}>{item.Task.description}</div>
                <div className={styles.deadline}>
                    <img src={clockIcon} alt={'clock'} /> <span>{(new Date(item.Task.deadline)).toLocaleDateString()}</span>
                </div>
            </div>
        );
    }
}

export default TaskDetail;
