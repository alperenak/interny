import React, { Component } from 'react';

/*** Styles ***/
import styles from './taskdetail.scss';
import SendCommentShortcut from '../SendCommentShortcut'
import Activity from '../Activity'
import store from '../../store';
import { getCookie } from "../../utils/cookie";
import Input from "../Input";
import editIcon from '../../icons/note-outlined-symbol-blue.svg';
import Button from "../../components/Button";
class TaskDetail extends Component {

    state = {
        show: true,
        isEvaluated: false,
        doRate: false,
        questions: [],
        showLogs: false,
        item: {},
        selectedCommentId: null,
        commentMode: 'CREATE',
        commentOpen: false,
        commentLoading: false,
        commentText: '',
        commentSelectedFiles: [],
		statusEdit:false
    }

    async getItemInfo() {
        const { userType = 'intern', userId = '' } = this.props;
        let detail = {};
		this.setState({
			item:this.props.item
		})
        const wfaQuestions = await store.getWFAForTask(this.props.item.id);
        if (userType === 'employer')
            detail = await store.getTaskDetailEmployer(this.props.item.id);
        else if (userType === 'intern')
            detail = await store.getTaskDetailIntern(this.props.item.id, userId);


        ///
        const taskItem = Object.assign({}, detail.data);
        const taskQuestions = Object.assign([], wfaQuestions.data);
        let wfaQues = false
        let isEvaluated = false;

        if (userType === 'employer' && taskItem.isEvaluatedByEmployer) {
            isEvaluated = true;
            wfaQues = taskItem.wfaEmployer;
        } else if (userType === 'intern' && taskItem.isEvaluatedByIntern) {
            isEvaluated = true;
            wfaQues = taskItem.wfaIntern;
        }

        if (isEvaluated) {
            taskQuestions.sort(function (a, b) {
                return a.question.localeCompare(b.question);
            });
            wfaQues.sort(function (a, b) {
                return a.question.localeCompare(b.question);
            });

            let same = true;
            wfaQues.forEach((v, i) => {
                if (!(Object.is(taskQuestions[i], v))) {
                    same = false;
                    return;
                };
            })
            if (!same && wfaQues !== false) {
                wfaQuestions.data = wfaQues
            }
        }

        const commentState = {
            selectedCommentId: null,
            commentMode: 'CREATE',
            commentOpen: false,
            commentLoading: false,
            commentText: '',
            commentSelectedFiles: []
        };

        //
        if (isEvaluated !== this.state.isEvaluated) this.setState({ questions: wfaQuestions.data, item: detail.data, isEvaluated, ...commentState })
        else this.setState({ questions: wfaQuestions.data, item: detail.data, ...commentState })
    }

    async componentDidMount() {
        this.getItemInfo();
    }

    componentDidUpdate() {
    }

    async sendQuestions() {
        const { item } = this.state;
        if (!this.wfaControl()) return;

        try {
            const response = await store.sendQuestions(item.id, this.state.questions);
            if (response.status == '204') this.setState({ isEvaluated: true });
        } catch (error) {
            console.error(error);
        }
    }

    async sendComment(taskId, text) {
        const files = this.state.commentSelectedFiles.map((v) => {
            return {
                name: v.name,
                key: v.key,
            }
        });
        if (this.state.commentMode === 'CREATE')
            await store.sendComment(taskId, text, files);
        else if (this.state.commentMode === 'EDIT')
            await store.editComment(taskId, text, files, this.state.selectedCommentId);


        this.getItemInfo();
    }

    wfaControl() {
        const { item = {} } = this.state;

        if (typeof item.isEvaluated === 'undefined') item.isEvaluated = false;

        if (item.status != 'Done' || !this.state.show) return false;

        return true;
    }

    renderWFA() {
        if (!this.wfaControl()) return <></>;
        const questions = this.state.questions;
        const { isEvaluated = false } = this.state;


        const allDone = () => {
            if (!this.wfaControl()) return false;
            let response = true;

            questions.forEach(v => {
                if (v.rate === 0) response = false;
            });

            return response;
        }

        const changeRate = (item, newValue = 0) => {
            const notThis = questions.filter((val) => val.key !== item.key);
            item.rate = newValue;

            const questionsNew = [
                ...notThis,
                item
            ];

            questionsNew.sort(function (a, b) {
                return a.key.localeCompare(b.key) || a.question.localeCompare(b.question);
            });

            this.setState({ questions: questionsNew });
        }

        const Master = ({ children }) => {
			return (
				<div className={"questionsContainer"}>
					{children}
				</div>
			);
        }

        const Rates = ({ item }) => {
            return [1, 2, 3, 4, 5].map(
                (v, i) => (
                    <span
                        onClick={!isEvaluated ? () => changeRate(item, v) : () => { }}
                        className={item.rate >= v ? "pointActive" : ''}
                        key={i}>
                        {v}
                    </span>
                )
            )
        };

        const Child = ({ item }) => {
            return (
                <div className={"questionArea"}>
                    <div className={"questionTitle"}>
                        <span>{item.question}</span>
                    </div>
                    <div className={"questionRateArea"}>
                        <div className={"questionRate"}>
                            <Rates item={item} />
                        </div>
                    </div>
                </div>
            );
        }

        const calcRateAverage = (type = '', fillThemAll = false, defaultVal = 5) => {
            if (!(questions.length > 0)) return defaultVal;

            let totalRate = 0,
                error = false;

            questions.forEach(v => {
                if (v.rate === 0 && fillThemAll) error = true;
                totalRate += v.rate
            });

            if (error) return defaultVal;

            let average = totalRate / questions.length;

            if (
                type === 'ceil'
                || type === 'floor'
                || type === 'round'
            ) average = Math[type](average)

            return average;
        }

        const buttonClassNameGenerator = () => {
            const rate = calcRateAverage('', true, 0);
            let className = "questionsSubmitButton";

            if (rate < 2) {
                // red
                className += ` ${"questionSubmitButtonRed"}`;
            } else if (rate < 3) {
                // orange
                className += ` ${"questionSubmitButtonOrange"}`;
            } else if (rate < 4) {
                // light green
                className += ` ${"questionSubmitButtonLightGreen"}`;
            } else if (rate < 5) {
                //green
                className += ` ${"questionSubmitButtonGreen"}`;
            }

            return className;
        }
        return (
            <Master>
                {questions.map((v, i) => <Child key={i} item={v} />)}
                {
                    (allDone() && !isEvaluated) && (
                        <button
                            className={buttonClassNameGenerator()}
                            disabled={!allDone()}
                            onClick={this.sendQuestions.bind(this)}>
                            Submit
                        </button>
                    )
                }
            </Master>
        );
    }

    async deleteComment(payload) {
        await store.deleteComment(this.props.item.id, payload);
        this.getItemInfo();
    }
	renderFileButtons = (item) => [
      {
        type: "primary",
        text: "Yükle",
        sizeName: "default",
        onButtonClick: (key) => this.acceptTestTask(item),
      },
    ];
	async acceptTestTask(item){
		let user = getCookie('user');
		const userType = getCookie('user');
		item.status = "Test";
		if (user === 'intern') {
			let userId = getCookie('user_id');
			await store.moveInternTask(userId, { taskId: item.id, status: "in_test" });
		} else {
			await store.moveEmployerTask({ taskId: item.id, status: "in_test" });
		}
		this.setState({
			statusEdit:false,
			item:item
		})
		await this.props.resetTask();
		document.getElementById("modalWrapper__closeIcon").click();
	}
	renderFileContent(){
		return(
			<div class="fileContent">
				<input type="file" />
			</div>
		);
	}
	async changeStatus(item,value){

		let user = getCookie('user');
		const userType = getCookie('user');
		item.status = value;

		if(value == "test"){
			document.getElementById("modalWrapper__closeIcon").click();
			this.props.createModal({
			  header: `Dosya Yükle`,
			  content: () => this.renderFileContent(),
			  buttons: this.renderFileButtons(item),
			});
		}else{
			if (user === 'intern') {
	            let userId = getCookie('user_id');
	            await store.moveInternTask(userId, { taskId: item.id, status: value });
	        } else {
	            await store.moveEmployerTask({ taskId: item.id, status: value });
	        }
			this.setState({
				statusEdit:false,
				item:item
			})
	        await this.props.resetTask();
		}

	}
    setCommentMode(commentMode = 'CREATE') {

        if (!(
            commentMode === 'CREATE'
            || commentMode === 'EDIT'
            || commentMode === 'DELETE'
        )) return;

        this.setState({ commentMode });

    }

    renderLogsAndComments() {
        return (
            <div className={"TaskDetail__logsArea"}>

                <Activity
                    items={this.state.item.activity}
                    user={this.props.user}
                    userType={this.props.userType}
                    setterText={(commentText) => { this.setState({ commentText }) }}
                    deleteComment={this.deleteComment.bind(this)}
                    setSelectedFiles={(commentSelectedFiles) => this.setState({ commentSelectedFiles })}
                    commentMode={this.state.commentMode}
                    selectedId={this.state.selectedCommentId}

                    setSelectedId={(selectedCommentId) => { this.setState({ selectedCommentId }) }}
                    setCommentMode={this.setCommentMode.bind(this)}
                    showLogs={this.state.showLogs}
					showLogFunc={() => this.setState({ showLogs: !this.state.showLogs })}
				/>
            </div>
        );
    }

    render() {
        let { item, RenderMembers } = this.props;
        const RenderWFA = this.renderWFA.bind(this);
        const RenderLogsAndComments = this.renderLogsAndComments.bind(this);
        const labelClassName = `labelStyle${this.props.labelClass[item.label.toLowerCase()]}`;
		const selectItems = [
			{ key: "to_do", value: "To Do" },
			{ key: "in_progress", value: "In Progress" },
			{ key: "test", value: "Test" },
		];
		if(getCookie('user') != 'intern'){
			selectItems.push({
				key:'done',value:'Done'
			})
		}
        return (
            <div className={"TaskDetail"}>
				<div class="row">
					<div class="col-md-12">
						<div class="TaskDetail__header">
							<div class="TaskDetail__header__infoDiv">
								<span><b>Assignee:</b></span>
								<div class="TaskDetail__header__avatarDiv">
									<RenderMembers renderFor='avatarFromDetail' style={styles} {...this.props} />
								</div>
							</div>
							{this.state.item.status =="In Test" && getCookie('user') != 'intern' ? (
								<Button
									type={"ghost"}
									text={"Done"}
									sizeName={"small"}
									width={"115px"}
									onButtonClick={() => this.changeStatus(this.state.item,"done")}
								/>
							):(
								<div class="TaskDetail__header__infoDiv">
									{this.state.item.status  == "In Progress" ? (
										<Button
											type={"ghost"}
											text={"Send for Approval"}
											sizeName={"small"}
											width={"115px"}
											onButtonClick={() => this.changeStatus(this.state.item,"test")}
										/>
									):(
										<>
											<span><b>List:</b></span>
											<a class="status" href="javascript:void(0);">{this.state.item.status}</a>
										</>
									)}

								</div>
							)}


							<div class="TaskDetail__header__infoDiv">
								<span><b>Type:</b></span>
								<span className={"label"}>{item.label}</span>
							</div>
							<div class="TaskDetail__header__infoDiv">
								<span><b>Deadline:</b></span>
								<span class="deadline">{(new Date(item.deadline)).toLocaleDateString()}</span>
							</div>
						</div>
					</div>
				</div>
                <div className={"taskDetailGroup"}>
                    <div className={"taskDetailTitle"}>
                        <h3>Description</h3>
                    </div>
                    <div className={"taskDetailContent"}>
                        <span>
                            {item.description}
                        </span>
                    </div>
                </div>
				<SendCommentShortcut
                    open={this.state.commentOpen}
                    setOpen={(commentOpen) => this.setState({ commentOpen })}
                    textA={this.state.commentText}
                    setterText={(commentText) => { this.setState({ commentText }) }}
                    loading={this.state.commentLoading}
                    sendComment={this.sendComment.bind(this)}
                    setLoading={(commentLoading) => this.setState({ commentLoading })}
                    selectedFiles={this.state.commentSelectedFiles}
                    setSelectedFiles={(commentSelectedFiles) => this.setState({ commentSelectedFiles })}
                    reload={this.getItemInfo.bind(this)}
                    commentMode={this.state.commentMode}
                    setCommentMode={this.setCommentMode.bind(this)}
                    user={this.props.user}
                    taskId={this.props.item.id}
				/>
                <RenderLogsAndComments />
                <RenderWFA />
            </div>
        );
    }
}

export default TaskDetail;
