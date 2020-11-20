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
        const labelClassName = `labelStyle${item.label.toLowerCase()}`;

        return (
            <div className={"Task"}>
                <div className={"title"}>{item.title}</div>
                <div className={`${"label"} ${labelClassName}`}>{item.label}</div>
                <div
                    draggable={false}
                    v-if={user === 'employer'}
                    onClick={async (e) => await this.onEditClick(e)}
                    className={"editButton"}
                >
                    <img draggable={false} src={editIcon} alt={'icon'} />
                </div>
                <div className={"users"}>Reporter: <span>{item.Employer}</span></div>
                <div className={"users"}>
                    Assignee:
                    <RenderMembers styles={styles} renderFor='name' {...this.props} />
                </div>
                <div className={"description"}>{item.description}</div>
                <RenderMembers styles={styles} renderFor='avatar' {...this.props} />
                <div className={"deadline"}>
                    <img src={clockIcon} alt={'clock'} /> <span>{(new Date(item.deadline)).toLocaleDateString()}</span>
                </div>
            </div>
        );
    }
}

export default Task;
