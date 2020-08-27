import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";

/*** Styles ***/
import styles from './mytasks.scss'
import TaskDetail from "../../components/TaskDetail";

class MyTasks extends Component {
    state = {
        toDoTasks: [{id: 'task1', status: 'To Do', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title1',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task2', status: 'To Do', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title2',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task3', status: 'To Do', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title3',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        inProgressTasks: [{id: 'task4', status: 'In Progress', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title4',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task5', status: 'In Progress', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title5',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task6', status: 'In Progress', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title6',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        inTestTasks: [{id: 'task7', status: 'In Test', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title7',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task8', status: 'In Test', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title8',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task9', status: 'In Test', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title9',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        doneTasks: [{id: 'task*', status: 'Done', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title*',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task0', status: 'Done', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title0',deadline: '21.08.20',description: 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}, {id: 'task#', status: 'Done', assignee: 'Ahmet Boyacı', reporter: 'Ruken Boyacı' ,title: 'title#',deadline: '21.08.20',description: 'asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd asdasdasdasd'}],
        draggedItem: {},
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

    render() {
        return (
            <div className={styles.MyTasks}>
                {this.renderSection('To Do', 'toDoTasks')}
                {this.renderSection('In Progress', 'inProgressTasks')}
                {this.renderSection('In Test', 'inTestTasks')}
                {this.renderSection('Done', 'doneTasks')}
            </div>
        );
    }
}

export default MyTasks;
