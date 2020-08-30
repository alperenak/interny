import React, {Component, Fragment} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import TaskDetail from "../../components/TaskDetail";
import Input from "../../components/Input";

/*** Utils ***/
import {getCookie} from "../../utils/cookie";
import {formButtons, formItems} from './formItems';

/*** Styles ***/
import styles from './mytasks.scss'

/*** Icon ***/
import createIcon from '../../icons/add-circular-outlined-white-button.svg'
import {formTaskData, onTaskFormChange} from "../../utils/functions";
import Button from "../../components/Button";

class MyTasks extends Component {
    state = {
        toDoTasks: [{id: 'task1', status: 'To Do', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title1',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task2', status: 'To Do', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title2',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task3', status: 'To Do', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title3',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        inProgressTasks: [{id: 'task4', status: 'In Progress', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title4',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task5', status: 'In Progress', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title5',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task6', status: 'In Progress', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title6',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        inTestTasks: [{id: 'task7', status: 'In Test', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title7',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task8', status: 'In Test', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title8',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task9', status: 'In Test', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title9',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        doneTasks: [{id: 'task*', status: 'Done', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title*',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task0', status: 'Done', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title0',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task#', status: 'Done', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title#',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        draggedItem: {},
        createFormData: formTaskData()
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

    onDropItem = (itemsKey) => {
        this.setState(state => {
            const sourceKey = Object.keys(state).find(key => {
                return Array.isArray(state[key]) ? state[key].some((el) => Object.is(el, state.draggedItem)) : false
            });

            let index = state[sourceKey].indexOf(state.draggedItem);

            if (index > -1) {
                state[sourceKey].splice(index, 1);
            }

            state[itemsKey] = [...state[itemsKey], state.draggedItem];

            state.draggedItem = {};

            return state;
        });
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
                <Card type={'task'} item={item} />
            </div>
        })
    }

    renderSection(title, itemsKey) {
        return (
            <div
                onDrop={() => this.onDropItem(itemsKey)}
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
        this.props.createModal({ header: 'Create Task', content: this.renderCreateTaskForm });
    };

    renderCreateTaskForm = () => {
        let items = formItems();
        return <div className={styles.formWrapper}>
            {items.map((item, i) => {
                return (
                    <div className={styles[item.key]}>
                        <Input
                            key={item.key+i}
                            label={item.label}
                            labelDescription={item.labelDescription}
                            placeholder={item.placeholder}
                            type={item.type}
                            size={item.size}
                            defaultValue={item.defaultValue}
                            validations={item.validations}
                            onChange={(value, sValue) =>{
                                let vl = item.type !== 'select' ? value :  sValue.value;
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

    renderFormButtons() {
        let buttons = formButtons();
        return buttons.map(btn => {
            return <Button
                key={btn.key}
                type={btn.type}
                text={btn.text}
                sizeName={btn.sizeName}
                width={btn.width}
                onButtonClick={async () => {
                    if (btn.key === 'create') {
                        await this.onCreateFormSubmit(this.state.createFormData);
                    }
                    this.props.closeModal();
                }}
            />
        });
    }

    onCreateFormSubmit = async (payload) => {
        // await store.createTask(payload);
        console.log(payload);
        this.props.closeModal();
        // await this.getJobTasks();
    };

    render() {
        let user = getCookie('user');
        return (
            <div className={styles.MyTasks}>
                {this.renderSection('To Do', 'toDoTasks')}
                {this.renderSection('In Progress', 'inProgressTasks')}
                {this.renderSection('In Test', 'inTestTasks')}
                {this.renderSection('Done', 'doneTasks')}
                {user === 'employer' && <div onClick={() => this.onCreateClick()} className={styles.createIcon}><img src={createIcon} alt={'icon'} /></div>}
            </div>
        );
    }
}

export default MyTasks;
