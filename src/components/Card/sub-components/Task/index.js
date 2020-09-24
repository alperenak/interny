import React, { Component } from 'react';

/*** Utils ***/
import { getCookie } from "../../../../utils/cookie";

/*** Styles ***/
import styles from './task.scss';

/*** Icons ***/
import editIcon from '../../../../icons/note-outlined-symbol-blue.svg';
import clockIcon from '../../../../icons/nine-oclock-on-circular-clock.svg';

class Task extends Component {
    onEditClick = async (e) => {
        e.stopPropagation();
        await this.props.onEditClick();
    };

    render() {
        let { item } = this.props;

        let user = getCookie('user');
        const { RenderMembers } = this.props;
        const labelClassName = `labelStyle${this.props.labelClass[item.label.toLowerCase()]}`;

        return (
            <div className={styles.Task}>
                <div className={styles.title}>{item.title}</div>
                <div className={`${styles.label} ${styles[labelClassName]}`}>{item.label}</div>
                <div
                    draggable={false}
                    v-if={user === 'employer'}
                    onClick={async (e) => await this.onEditClick(e)}
                    className={styles.editButton}
                >
                    <img draggable={false} src={editIcon} alt={'icon'} />
                </div>
                <div className={styles.users}>Reporter: <span>{item.Employer}</span></div>
                <div className={styles.users}>
                    Assignee:
                    <RenderMembers styles={styles} renderFor='name' {...this.props} />
                </div>
                <div className={styles.description}>{item.description}</div>
                <RenderMembers styles={styles} renderFor='avatar' {...this.props} />
                <div className={styles.deadline}>
                    <img src={clockIcon} alt={'clock'} /> <span>{(new Date(item.deadline)).toLocaleDateString()}</span>
                </div>
            </div>
        );
    }
}

export default Task;
