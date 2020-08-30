import React, {Component} from 'react';

/*** Utils ***/
import {getCookie} from "../../../../utils/cookie";

/*** Styles ***/
import styles from './task.scss';

/*** Icons ***/
import editIcon from '../../../../icons/note-outlined-symbol-blue.svg';
import clockIcon from '../../../../icons/nine-oclock-on-circular-clock.svg';

class Task extends Component {
    onEditClick = (e) => {
        e.stopPropagation();
        this.props.onEditClick();
    };

    render() {
        let {item} = this.props;
        let user = getCookie('user');

        return (
            <div className={styles.Task}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.label}>{item.label}</div>
                <div
                    draggable={false}
                    v-if={user === 'employer'}
                    onClick={(e) => this.onEditClick(e)}
                    className={styles.editButton}
                >
                    <img draggable={false} src={editIcon} alt={'icon'} />
                </div>
                <div className={styles.users}>Reporter: <span>{item.reporter}</span></div>
                <div className={styles.users}>Assignee: <span>{item.Intern[0].name} {item.Intern[0].surname}</span></div>
                <div className={styles.description}>{item.description}</div>
                <div className={styles.userImage}><img src={item.Intern[0].avatar} alt={'image'}/></div>
                <div className={styles.deadline}>
                    <img src={clockIcon} alt={'clock'} /> <span>{item.deadline}</span>
                </div>
            </div>
        );
    }
}

export default Task;
