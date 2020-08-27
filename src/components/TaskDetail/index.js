import React, {Component} from 'react';

/*** Styles ***/
import styles from './taskdetail.scss';

class TaskDetail extends Component {
    render() {
        let {item} = this.props;
        return (
            <div className={styles.TaskDetail}>
                <div className={styles.deadline}>Status: <span>{item.status}</span></div>
                <div className={styles.users}>Reporter: <span>{item.reporter}</span></div>
                <div className={styles.users}>Assignee: <span>{item.assignee}</span></div>
                <div className={styles.description}>{item.description}</div>
                <div className={styles.deadline}>Deadline: <span>{item.deadline}</span></div>
            </div>
        );
    }
}

export default TaskDetail;
