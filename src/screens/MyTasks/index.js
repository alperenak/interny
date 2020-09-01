import React, {Component, Fragment} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import TaskDetail from "../../components/TaskDetail";
import Input from "../../components/Input";

/*** Utils ***/
import {getCookie} from "../../utils/cookie";
import store from "../../store";
import {formButtons, formItems} from './formItems';
import {formTaskData, onTaskFormChange} from "../../utils/functions";

/*** Styles ***/
import styles from './mytasks.scss'

/*** Icon ***/
import createIcon from '../../icons/add-circular-outlined-white-button.svg'
import Button from "../../components/Button";

class MyTasks extends Component {
    state = {
        to_do: [],
        in_progress: [],
        in_test: [],
        done: [],
        draggedItem: {},
        createFormData: formTaskData(),
    };

    async componentDidMount() {
        await this.getTasks();
    }

    getTasks = async () => {
        let userId = getCookie('user_id');
        let user = getCookie('user');
        let res = {};
        if (user === 'intern') {
            res = await store.getInternTasks(userId);

        } else {
            res = await store.getTasks(userId);
        }
        this.setState({
            to_do: res.to_do,
            in_progress: res.in_progress,
            in_test: res.in_test,
            done: res.done,
        })
    };

    onDragOver = (e) => {
        e.preventDefault();
    };

    onDragItemStart = (item) => {
        this.setState(state => {
            state.draggedItem = item;

            return state;
        });
    };

    onDropItem = async (itemsKey) => {
        let {Intern, Task} = this.state.draggedItem;
        let user = getCookie('user');
        if (user === 'intern') {
            let userId = getCookie('user_id');
            await store.moveInternTask(userId, {internId: Intern.id, taskId: Task.id, status: itemsKey});
        } else {
            await store.moveEmployerTask({internId: Intern.id, taskId: Task.id, status: itemsKey});
        }

        await this.getTasks();
        // this.setState(state => {
        //     const sourceKey = Object.keys(state).find(key => {
        //         return Array.isArray(state[key]) ? state[key].some((el) => Object.is(el, state.draggedItem)) : false
        //     });
        //
        //     let index = state[sourceKey].indexOf(state.draggedItem);
        //
        //     if (index > -1) {
        //         state[sourceKey].splice(index, 1);
        //     }
        //
        //     state[itemsKey] = [state.draggedItem, ...state[itemsKey]];
        //
        //     state.draggedItem = {};
        //
        //     return state;
        // });
    };

    onTaskClick = (item) => {
        this.props.createModal({ header: item.title, content: () => this.renderModalContent(item) });
    };

    renderModalContent(item) {
        return <TaskDetail item={item}/>;
    }

    renderSectionItem(itemsKey) {
        let items = this.state[itemsKey];
        return items.map((item, i) => {
            return <div
                key={i}
                draggable
                onDragStart={() => this.onDragItemStart(item, itemsKey)}
                className={styles.taskItem}
                onClick={() => this.onTaskClick(item)}
            >
                <Card type={'task'} item={item} onEditClick={async () => await this.onEditClick(item)} />
            </div>
        })
    }

    renderSection(title, itemsKey) {
        return (
            <div
                onDrop={async () => await this.onDropItem(itemsKey)}
                onDragOver={(e) => this.onDragOver(e)}
                className={`${styles.gridItem} ${styles[itemsKey]}`}
            >
                <div className={styles.sectionHeader}>
                    {title}
                </div>
                {this.renderSectionItem(itemsKey)}
            </div>
        );
    }

    onCreateClick = async () => {
        let createItems = await formItems();
        this.props.createModal({ header: 'Create Task', content: () => this.renderCreateTaskForm(createItems) });
    };

    onEditClick = async (item) => {
        let editItems = await formItems(item);
        this.setState({ createFormData: formTaskData(item) });
        this.props.createModal({ header: 'Edit Task', content: () => this.renderEditTaskForm(editItems) });
    };

    renderCreateTaskForm = (items) => {
        return <div className={styles.formWrapper}>
            {items.map((item, i) => {
                return (
                    <div key={item.key+i} className={styles[item.key]}>
                        <Input
                            label={item.label}
                            labelDescription={item.labelDescription}
                            placeholder={item.placeholder}
                            type={item.type}
                            externalSource={item.externalSource}
                            size={item.size}
                            defaultValue={item.defaultValue}
                            validations={item.validations}
                            onChange={(value, sValue) =>{
                                let vl = item.type !== 'select' ? value :  sValue;
                                this.setState(state => {
                                    onTaskFormChange(vl, state.createFormData, item.key);
                                    return state;
                                });
                            }}
                        />
                    </div>
                )
            })}
            <div className={styles.formButtons}>
                {this.renderFormButtons()}
            </div>
        </div>
    };

    renderEditTaskForm = (items) => {
        return <div className={styles.formWrapper}>
            {items.map((item, i) => {
                return (
                    <div key={item.key+i} className={styles[item.key]}>
                        <Input
                            label={item.label}
                            labelDescription={item.labelDescription}
                            placeholder={item.placeholder}
                            type={item.type}
                            size={item.size}
                            defaultValue={item.defaultValue}
                            validations={item.validations}
                            externalSource={item.externalSource}
                            onChange={(value, sValue) =>{
                                let vl = item.type !== 'select' ? value :  sValue;
                                this.setState(state => {
                                    onTaskFormChange(vl, state.createFormData, item.key);
                                    return state;
                                });
                            }}
                        />
                    </div>
                )
            })}
            <div className={styles.formButtons}>
                {this.renderFormButtons(true)}
            </div>
        </div>
    };

    renderFormButtons(isEdit) {
        let buttons = formButtons(isEdit);
        return buttons.map(btn => {
            return <Button
                key={btn.key}
                type={btn.type}
                text={btn.text}
                sizeName={btn.sizeName}
                width={btn.width}
                onButtonClick={async () => {
                    if (btn.key === 'create') {
                        if (isEdit)
                            await this.onEditFormSubmit(this.state.createFormData);
                        else
                            await this.onCreateFormSubmit(this.state.createFormData);
                    }
                    this.props.closeModal();
                }}
            />
        });
    }

    onCreateFormSubmit = async (payload) => {
        await store.createTask(payload);
        this.props.closeModal();
        this.setState({ createFormData: formTaskData() });
        await this.getTasks();
    };

    onEditFormSubmit = async (payload) => {
        await store.updateTask(payload);
        this.setState({ createFormData: formTaskData() });
        this.props.closeModal();
        await this.getTasks();
    };

    render() {
        let user = getCookie('user');
        return (
            <div className={styles.MyTasks}>
                {this.renderSection('To Do', 'to_do')}
                {this.renderSection('In Progress', 'in_progress')}
                {this.renderSection('In Test', 'in_test')}
                {this.renderSection('Done', 'done')}
                {user === 'employer' && <div onClick={() => this.onCreateClick()} className={styles.createIcon}><img src={createIcon} alt={'icon'} /></div>}
            </div>
        );
    }
}

export default MyTasks;
