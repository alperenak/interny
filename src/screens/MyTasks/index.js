import React, { Component, Fragment } from 'react';

/*** Components ***/
import Card from "../../components/Card";
import TaskDetail from "../../components/TaskDetail";
import Input from "../../components/Input";

/*** Utils ***/
import { getCookie } from "../../utils/cookie";
import store from "../../store";
import { formButtons, formItems } from './formItems';
import { formTaskData, onTaskFormChange } from "../../utils/functions";

/*** Styles ***/
import styles from './mytasks.scss'

/*** Icon ***/
import createIcon from '../../icons/add-circular-outlined-white-button.svg'
import Button from "../../components/Button";

// Intern list
import InternList from "../../components/InternList";


class MyTasks extends Component {
    state = {
        to_do: [],
        in_progress: [],
        in_test: [],
        done: [],
        draggedItem: {},
        createFormData: formTaskData(),
        selectedInterns: [],
        selecedInternsForMultiSelect: [
            {
                label: "Oya Alyanak",
                selectedd: false,
                value: "5f5146f8cb4ec4130143bbd6",
            }
        ],
        internList: [],
        loading: false,
    };

    async componentDidMount() {
        const userType = getCookie('user');

        if (this.props.selectedJobID == null && userType === 'employer')
            this.props.history.push({
                pathname: '/myjobs',
                state: {
                    redirectInfo: {
                        redirected: true,
                        by: this.props.location.pathname,
                        redirectWhenFinished: true,
                    },
                }
            });
        else await this.getTasks();
    }

    async componentDidUpdate() {
        await this.getTasks();
        console.log('selamlar');
    }

    getTasks = async () => {
        if (this.state.loading) return;

        let userId = getCookie('user_id');
        let user = getCookie('user');
        let internList = {};
        let res = {};
        if (user === 'intern') {
            res = await store.getInternTasks(userId);
        } else {
            internList = await store.getInternForSavedJob(this.props.selectedJobID);
            internList = internList.map((val) => {
                const selected = this.state.selectedInterns.filter((id) => id === val.id);
                if (selected.length > 0) val.selected = true
                else val.selected = false;
                return val;
            });
            internList.sort(function (a, b) {
                return a.id - b.id || a.name.localeCompare(b.name);
            });
            if (this.state.selectedInterns.length > 0)
                res = await store.getEmployerTasksForInternID(this.props.selectedJobID, this.state.selectedInterns.join(','));
            else
                res = await store.getTasks(this.props.selectedJobID);
        }



        const newState = {
            to_do: res.to_do || [],
            in_progress: res.in_progress || [],
            in_test: res.in_test || [],
            done: res.done || [],
            internList: internList || [],
            loading: false,
        }

        // Sonsuz döngüyü engellemek için alınan geçici önlem
        if (
            !(
                newState.internList.length === this.state.internList.length
                && newState.to_do.length === this.state.to_do.length
                && newState.in_progress.length === this.state.in_progress.length
                && newState.in_test.length === this.state.in_test.length
                && newState.done.length === this.state.done.length
            )
        ) this.setState(newState)
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
        let { id } = this.state.draggedItem;
        let user = getCookie('user');
        if (user === 'intern') {
            let userId = getCookie('user_id');
            await store.moveInternTask(userId, { taskId: id, status: itemsKey });
        } else {
            await store.moveEmployerTask({ taskId: id, status: itemsKey });
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

    renderMembers(props) {
        const { item, renderFor = 'name', styles = {}, style = {} } = props;
        const { Members = [] } = item;

        if (renderFor === 'name')
            return Members.map((val, index) => (
                <span key={index} className={styles.assigneeName}>{val.name} {val.surname} {index + 1 !== Members.length && ', '}</span>
            ));
        else if (renderFor === 'avatar')
            return Members.map((val, index) => (
                <div className={styles.userImage} key={index} >
                    <img src={val.avatar} alt={'image'} />
                </div>
            ));
        else if (renderFor === 'avatarFromDetail')
            return Members.map((val, index) => (
                <span key={index} className={style.userIn} title={`${val.name} ${val.surname}`}>
                    <img src={val.avatar} key={index} alt={'image'} />
                </span>
            ));
        else
            return (<></>);
    }

    onTaskClick = (item) => {
        const userType = getCookie('user');
        this.props.createModal({ header: item.title, size: 'large', backgroundColor: '#F4F5F7', content: () => this.renderModalContent(item, userType) });
    };

    renderModalContent(item, userType) {
        return <TaskDetail userType={userType} item={item} RenderMembers={this.renderMembers} />;
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
                <Card RenderMembers={this.renderMembers} type={'task'} item={item} onEditClick={async () => await this.onEditClick(item)} />
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

    setSelecedInternsForMultiSelect(selecedInternsForMultiSelect) {
        console.log(selecedInternsForMultiSelect);
        this.setState({
            selecedInternsForMultiSelect
        });
    }

    onCreateClick = async () => {
        let createItems = await formItems();
        /*
        options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select"}
        */
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
                    <div key={item.key + i} className={styles[item.key]}>
                        <Input
                            label={item.label}
                            labelDescription={item.labelDescription}
                            placeholder={item.placeholder}
                            type={item.type}
                            multiple={item.multiple || false}
                            externalSource={item.externalSource}
                            size={item.size}
                            defaultValue={item.defaultValue}
                            validations={item.validations}
                            selecedInternsForMultiSelect={this.state.selecedInternsForMultiSelect}
                            setSelecedInternsForMultiSelect={this.setSelecedInternsForMultiSelect.bind(this)}
                            onChange={(value, sValue) => {
                                let vl = item.type !== 'select' ? value : sValue;
                                console.log(value, sValue, vl);
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
                    <div key={item.key + i} className={styles[item.key]}>
                        <Input
                            label={item.label}
                            labelDescription={item.labelDescription}
                            placeholder={item.placeholder}
                            type={item.type}
                            size={item.size}
                            defaultValue={item.defaultValue}
                            validations={item.validations}
                            externalSource={item.externalSource}
                            onChange={(value, sValue) => {
                                let vl = item.type !== 'select' ? value : sValue;
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

    /* toggle selecetedInterns */
    toggleIntern(internInfo) {
        if (this.state.loading) return;

        let alreadySelected = false;
        const internSelected = this.state.internList.filter(intern => intern.id === internInfo.id && intern.selected === true)

        if (Array.isArray(internSelected)) alreadySelected = internSelected.length > 0;
        let newInternInfo = internInfo;
        let internList = this.state.internList;

        const not_this_intern_from_selected = this.state.selectedInterns.filter((id) => id != internInfo.id);
        let selectedInterns = [];

        if (alreadySelected) {
            selectedInterns = [
                ...not_this_intern_from_selected,
            ]
        } else {
            selectedInterns = [
                ...not_this_intern_from_selected,
                internInfo.id,
            ]
        }

        newInternInfo.selected = !alreadySelected;

        internList = [
            ...this.state.internList.filter(intern => intern.id !== internInfo.id),
            newInternInfo
        ]

        internList.sort(function (a, b) {
            return a.id - b.id || a.name.localeCompare(b.name);
        });
        selectedInterns.sort(function (a, b) {
            return a - b;
        });

        this.setState({ internList, selectedInterns });
    }


    render() {
        const user = getCookie('user');
        return (
            <>
                <InternList
                    userType={user}
                    selectedInterns={this.state.selectedInterns}
                    internList={this.state.internList}
                    loading={this.state.loading}
                    toggleIntern={this.toggleIntern.bind(this)}
                />
                <div className={styles.MyTasks}>
                    {this.renderSection('To Do', 'to_do')}
                    {this.renderSection('In Progress', 'in_progress')}
                    {this.renderSection('In Test', 'in_test')}
                    {this.renderSection('Done', 'done')}
                    {user === 'employer' && <div onClick={() => this.onCreateClick()} className={styles.createIcon}><img src={createIcon} alt={'icon'} /></div>}
                </div>
            </>
        );
    }
}

export default MyTasks;
