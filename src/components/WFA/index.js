import React, {Component} from 'react';

/*** Components ***/
import Card from "../Card";

/*** Styles ***/
import styles from './wfa.scss';

/*** Utils ***/
import store from "../../store";
import {getCookie} from "../../utils/cookie";
import LoadingModal from "../LoadingModal";

class WFA extends Component {
    state = {
        loading: true,
        data: {}
    };

    async componentDidMount() {
        this.setState({ loading: true });
        let res = await store.getWFAData(this.props.internId);
        this.setState({ loading: false, data: res.data });
    }

    render() {
        let { data, loading } = this.state;
        return (
            <div className={"wfaWrapper"}>
                <LoadingModal v-if={loading} text={'loading'} />
                <div className={"wfaWrapper__header"}>WORK FORCE ANALYTICS</div>
				<div class="container">
					<div className={"row"}>
						<div class="col">
							<Card type={'num'}>
		                        <div className={"wfaWrapper__numeric"}>
		                            <span>Completed Tasks</span>{data.nofCompleted}
		                        </div>
		                    </Card>
						</div>
	                    <div class="col">
							<Card type={'num'}>
							   <div className={"wfaWrapper__numeric"}>
								   <span>Incomplete Tasks</span>{data.nofIncomplete}
							   </div>
						   </Card>
						</div>
	                   	<div class="col">
							<Card type={'num'}>
		                        <div className={"wfaWrapper__numeric"}>
		                            <span>Overdue Tasks</span>{data.nofOverdue}
		                        </div>
		                    </Card>
						</div>
	                    <div class="col">
							<Card type={'num'}>
							   <div className={"wfaWrapper__numeric"}>
								   <span>All Tasks</span>{data.nofTasks}
							   </div>
						   </Card>
						</div>
	                    <div class="col">
							<Card type={'num'}>
		                        <div className={"wfaWrapper__numeric"}>
		                            <span>Overall Score</span>{data.overallScore}
		                        </div>
		                    </Card>
						</div>
	                </div>
				</div>
				<div class="container wfaQuestionWrapper">
					<div class="row">
						{
	                        data?.labelSections?.map((section, i) => {
	                            return (
									<div class="col-md-6">
		                                <Card type={'wfaQuestion'} key={i} header={{text: section.labelName, position: 'start'}}>
		                                    <div className={"wfaWrapper__label"}>
		                                        <div className={"wfaWrapper__items"}>
		                                            {section.evaluations.map((question, j) => {
		                                                return (
		                                                    <div key={j} className={"wfaWrapper__item"}>
		                                                        <span>{`Avarage score of Question${j+1}:`}</span>{` ${question.averageScore}`}
		                                                    </div>
		                                                );
		                                            })}
		                                        </div>
		                                        <div className={"wfaWrapper__items"}>
		                                            <div className={"wfaWrapper__item"}>
		                                                <span>Completed Tasks:</span>{` ${section.nofCompleted}`}
		                                            </div>
		                                            <div className={"wfaWrapper__item"}>
		                                                <span>Incomplete Tasks:</span>{` ${section.nofIncomplete}`}
		                                            </div>
		                                            <div className={"wfaWrapper__item"}>
		                                                <span>Overdue Tasks:</span>{` ${section.nofOverdue}`}
		                                            </div>
		                                            <div className={"wfaWrapper__item"}>
		                                                <span>All Tasks:</span>{` ${section.nofTasks}`}
		                                            </div>
		                                            <div className={"wfaWrapper__item"}>
		                                                <span>Overall Score:</span>{` ${section.overallScore}`}
		                                            </div>
		                                        </div>
		                                    </div>
		                                </Card>
									</div>
	                            );
	                        })
	                    }
					</div>
				</div>

                <div className={"wfaWrapper__questions"}>
					<div class="container">
						<div class="row">
							{
		                        data?.evaluations?.map((question, j) => {
		                            return (
										<div class="col-md-3">
			                                <Card header={{text:`Question ${j+1}`, position:'center'}} type={'wfaQuestion'}>
			                                    <div className={"wfaWrapper__question"}>
			                                        <div className={"averageScore"}>{`Average Score: ${question.averageScore}`}</div>
			                                        {question.question}
			                                    </div>
			                                </Card>
										</div>
		                            )
		                        })
		                    }
						</div>
					</div>
                </div>
            </div>
        );
    }
}

export default WFA;
