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
import errors from "../../utils/errorTexts"
import WFA from "../../components/WFA";

import "../ReferrenceLetter/referrenceLetter.scss";

// Components
import FooterAlternative from "../../components/FooterAlternative";

// Assets
import image from "../../assets/intern-ims_wait.png";


class MyTasks extends Component {
    state = {
        to_do: [],
        in_progress: [],
        in_test: [],
        done: [],
        draggedItem: {},
        createFormData: formTaskData(),
        selectedInterns: [],
        taskLabelClass: {
            'research': 'Green',
            'avaluation': 'Blue',
            'reorganization': 'Purple',
            'design': 'Orange',
            'application': 'Indigo',
            'reporting': 'Red',
        },
        selecedInternsForMultiSelect: [],
        internList: [],
        searchResults: [],
        loading: false,
        allCheck: false,
		activeTab: "todo"
    };

    async componentDidMount() {
        const userType = getCookie('user');

        if (this.props.selectedJobID == null && userType === 'employer')
            this.props.history.push({
                pathname: '/jobs',
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
                <span key={index} className={"assigneeName"}>{val.name} {val.surname} {index + 1 !== Members.length && ', '}</span>
            ));
        else if (renderFor === 'avatar')
            return Members.map((val, index) => (
                <div className={"userImage"} key={index} >
                    <img src={val.avatar} alt={'image'} />
                </div>
            ));
        else if (renderFor === 'avatarFromDetail')
            return Members.map((val, index) => (
                <span key={index} className={"TaskDetail__userIn"} title={`${val.name} ${val.surname}`}>
                    <img src={val.avatar} key={index} alt={'image'} />
                </span>
            ));
        else
            return (<></>);
    }
	renderNDAContent(){
		return(
			<div class="ndaContent">
				İşi üstünüze alabilmek için <a href="#">Gizlilik Sözleşmesini</a> onaylamanız gerekmektedir.
			</div>
		);
	}
	renderNDAButtons = (item) => [
      {
        type: "primary",
        text: "Onayla",
        sizeName: "default",
        onButtonClick: (key) => this.acceptTodoTask(item),
      },
    ];
    onTaskClick = (item) => {
        const userType = getCookie('user');
		if(item.status == "To Do"){
			if(userType == 'intern'){
				this.props.createModal({
				  header: `İş Onayı`,
				  content: () => this.renderNDAContent(),
				  buttons: this.renderNDAButtons(item),
				});
			}else{
				this.props.createModal({ header: item.title, size: 'large', backgroundColor: '#F4F5F7', content: () => this.renderModalContent(item, userType) });
			}

		}else{
			this.props.createModal({ header: item.title, size: 'large', backgroundColor: '#F4F5F7', content: () => this.renderModalContent(item, userType) });
		}
    };
	async acceptTodoTask(item){
		let user = getCookie('user');
		const userType = getCookie('user');
        if (user === 'intern') {
            let userId = getCookie('user_id');
            await store.moveInternTask(userId, { taskId: item.id, status: "in_progress" });
        } else {
            await store.moveEmployerTask({ taskId: item.id, status: "in_progress" });
        }
        await this.getTasks();
		this.props.createModal({ header: item.title, size: 'large', backgroundColor: '#F4F5F7', content: () => this.renderModalContent(item, userType) });
	}
    renderModalContent(item, userType) {
        return <TaskDetail createModal={this.props.createModal} user={this.props.user} userType={userType} resetTask={this.getTasks} labelClass={this.state.taskLabelClass} userId={getCookie('user_id')} item={item} RenderMembers={this.renderMembers} />;
    }

    renderSectionItem(itemsKey) {
        let items = this.state[itemsKey];
        return items.map((item, i) => {
            return <div
                key={i}
                class="col-xl-4 col-lg-4 col-md-6"
            >
				<div className={"taskItem"} onClick={() => this.onTaskClick(item)}>
                	<Card RenderMembers={this.renderMembers} labelClass={this.state.taskLabelClass} type={'task'} item={item} onEditClick={async () => await this.onEditClick(item)} />
				</div>
            </div>
        })
    }

    renderSection(title, itemsKey) {
        return (
            <div class="row">
                {this.renderSectionItem(itemsKey)}
            </div>
        );
    }

    setSelecedInternsForMultiSelect(selecedInternsForMultiSelect) {
        this.setState({
            selecedInternsForMultiSelect
        });
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
        return <div className={"formWrapper"}>
            {items.map((item, i) => {
                return (
                    <div key={item.key + i} className={item.key}>
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
                                this.setState(state => {
                                    onTaskFormChange(vl, state.createFormData, item.key);
                                    return state;
                                });
                            }}
                        />
                    </div>
                )
            })}
            <div className={"formButtons"}>
                {this.renderFormButtons()}
            </div>
        </div>
    };

    renderEditTaskForm = (items) => {
        return <div className={"formWrapper"}>
            {items.map((item, i) => {
                return (
                    <div key={item.key + i} className={item.key}>
                        <Input
                            label={item.label}
                            labelDescription={item.labelDescription}
                            placeholder={item.placeholder}
                            type={item.type}
                            size={item.size}
                            multiple={item.multiple || false}
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
            <div className={"formButtons"}>
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
        let newPayload = Object.assign({}, payload);

        if (Array.isArray(newPayload.Members)) {
            newPayload.Members = payload.Members.map((v) => {

                return v.key || '';
            });
        }


        if (typeof newPayload.label !== 'string') {
            newPayload.label = payload.label.value;
        }
        await store.createTask({
            ...newPayload,
            Job: this.props.selectedJobID
        });
        this.props.closeModal();
        this.setState({ createFormData: formTaskData() });
        await this.getTasks();
    };

    onEditFormSubmit = async (payload) => {
        let newPayload = Object.assign({}, payload);

        if (Array.isArray(newPayload.Members)) {
            newPayload.Members = payload.Members.map((v) => {
                return v.key || '';
            });
        }


        if (typeof newPayload.label !== 'string' && Array.isArray(newPayload.label)) {
            newPayload.label = payload.label.value;
        }


        await store.updateTask({
            ...newPayload,
            Job: this.props.selectedJobID
        });
        this.setState({ createFormData: formTaskData() });
        this.props.closeModal();
        await this.getTasks();
    };

    /* toggle selecetedInterns */
    toggleIntern(internInfo) {
        if (this.state.loading) return;

        let alreadySelected = false;
        const internSelected = this.state.selectedInterns.filter(id => id === internInfo.id)
        if (Array.isArray(internSelected)) alreadySelected = internSelected.length > 0;
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
        selectedInterns.sort(function (a, b) {
            return a - b;
        });

        let allCheck = selectedInterns.length === internList.length;

        this.setState({ selectedInterns, allCheck });
    }

    toggleAllCheck() {
        this.setState((state) => {
            const oldAllCheckVal = state.allCheck;
            let selectedInterns = [];
            if (!oldAllCheckVal) {
                // yeni state true ise
                selectedInterns = this.state.internList.map(v => v.id);
            } else selectedInterns = [];

            return { selectedInterns, allCheck: !oldAllCheckVal };
        });
    }
    /**
     * search to in internList (defined in state)
     * @param {string} query
     */
    searchInInternList(query = '') {
        // only searching interns name (or|and) surname
        let { internList, searchResults } = this.state;
        const searchOptions = {
            length: {
                min: 1,
                max: 35,
            },
            errors,
        };

        if (!(internList.length > 0) || query.length === 0) {
            this.setState({ searchResults: [] });
            return;
        }

        if (!(query.length >= searchOptions.length.min && query.length <= searchOptions.length.max)) return;
        searchResults = [];

        if (typeof internList.filter === 'undefined') return;


        searchResults = internList.filter((v) => {
            if (
                !(
                    typeof v.name === 'string'
                    && typeof v.surname === 'string'
                )
            ) return false;

            const searchfc = (searchIn) => {
                if (typeof searchIn.search === 'undefined') return false;
                return searchIn.search(query) != -1 || searchIn.toLowerCase().search(query.toLowerCase()) != -1
            };

            const controller = (
                searchfc(v.name)
                || searchfc(v.surname)
                || searchfc(`${v.name} ${v.surname}`)
            );

            return controller;
        });

        if (typeof searchResults === 'undefined') searchResults = []
        else searchResults = Array.isArray(searchResults) ? searchResults : [searchResults];


        this.setState({ searchResults });
    }


    render() {
        const user = getCookie('user');
        /*
        return (
            <div class="MyTasks">
				<div class="container">
	                <InternList
	                    userType={user}
	                    selectedInterns={this.state.selectedInterns}
	                    internList={this.state.searchResults.length > 0 ? this.state.searchResults : this.state.internList}
	                    loading={this.state.loading}
	                    allCheck={this.state.allCheck}
	                    toggleAllCheck={this.toggleAllCheck.bind(this)}
	                    toggleIntern={this.toggleIntern.bind(this)}
	                    searchInInternList={this.searchInInternList.bind(this)}
	                />
					<div class="taskTabs">
						<ul class="nav nav-tabs">
							<li class={this.state.activeTab == "todo" ? ("active taskTabs__tab"):("taskTabs__tab")}><a data-toggle="tab" href="#todo" onClick={() => this.setState({activeTab:"todo"})}>To Do</a></li>
							<li class={this.state.activeTab == "progress" ? ("active taskTabs__tab"):("taskTabs__tab")}><a data-toggle="tab" href="#progress" onClick={() => this.setState({activeTab:"progress"})}>In Progress</a></li>
							<li class={this.state.activeTab == "test" ? ("active taskTabs__tab"):("taskTabs__tab")}><a data-toggle="tab" href="#test" onClick={() => this.setState({activeTab:"test"})}>In Test</a></li>
							<li class={this.state.activeTab == "done" ? ("active taskTabs__tab"):("taskTabs__tab")}><a data-toggle="tab" href="#done" onClick={() => this.setState({activeTab:"done"})}>Done</a></li>
						</ul>
					</div>
					<div class="tab-content">
						<div id="todo"  class={this.state.activeTab == "todo" ? ("active tab-pane"):("tab-pane")}>
							{this.renderSection('To Do', 'to_do')}
						</div>
						<div id="progress"  class={this.state.activeTab == "progress" ? ("active tab-pane"):("tab-pane")}>
							{this.renderSection('In Progress', 'in_progress')}
						</div>
						<div id="test"  class={this.state.activeTab == "test" ? ("active tab-pane"):("tab-pane")}>
							{this.renderSection('In Test', 'in_test')}
						</div>
						<div id="done"  class={this.state.activeTab == "done" ? ("active tab-pane"):("tab-pane")}>
							{this.renderSection('Done', 'done')}
						</div>
					</div>
            		{user === 'employer' && <div onClick={() => this.onCreateClick()} className={"createIcon"}><img src={createIcon} alt={'icon'} /></div>}
				</div>
            </div>
        );
        */
        return(
            <div className="pageWrapper">
				<div className={"referrenceLetter"}>
					<LoadingModal text="Loading" v-if={this.state.processing} />
					<div class="container">
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<img className="referrenceLetter__image" src={image} alt="My Tasks" />
						</div>
						<div className={"referrenceLetter__modal"}>
							<div class="row">
								<div class="col-md-12">
									<div className={"referrenceLetter__header"}>My Tasks</div>
									<div className={"referrenceLetter__description"}>
                                        Welcome to the Interny Management System: iMS™. You do not have a task assignment yet. Click to apply for internships.
									</div>
								</div>
								<div class="col-md-12">
									<div className={"referrenceLetter__buttonWrapper"} >
										<Button
											type='secondary'
											text='Learn More'
											to={"/internyInterns"} 
											textClass='referrenceLetter__buttonWrapper__text'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<FooterAlternative />
			</div>
        );
    }
}

export default MyTasks;
