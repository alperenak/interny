import React, {Component} from 'react';

/*** Components ***/
import Card from "../Card";
import { PieChart, Pie, Sector ,Tooltip} from 'recharts';
/*** Styles ***/
import styles from './wfa.scss';

/*** Utils ***/
import store from "../../store";
import {getCookie} from "../../utils/cookie";
import LoadingModal from "../LoadingModal";

class WFA extends Component {
    state = {
        loading: true,
        data: {},
		activeIndex: 0,
    };

    async componentDidMount() {
        this.setState({ loading: true });
        let res = await store.getWFAData(this.props.internId);
        this.setState({ loading: false, data: res.data });
    }
	onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };
    isScreenMatch() {
        return window.matchMedia("(max-width: 576px)").matches;
    }
	getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
    render() {
        let { data, loading } = this.state;
		const renderActiveShape = (props) => {
		    const RADIAN = Math.PI / 180;
		    const {
		        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
		        fill, payload, percent, value,
		    } = props;
		    const sin = Math.sin(-RADIAN * midAngle);
		    const cos = Math.cos(-RADIAN * midAngle);
		    const sx = cx + (outerRadius + 10) * cos;
		    const sy = cy + (outerRadius + 10) * sin;
		    const mx = cx + (outerRadius + 30) * cos;
		    const my = cy + (outerRadius + 30) * sin;
		    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
		    const ey = my;
		    const textAnchor = cos >= 0 ? 'start' : 'end';

		    return (
		        <g>
		            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
		            <Sector
		                cx={cx}
		                cy={cy}
		                innerRadius={innerRadius}
		                outerRadius={outerRadius}
		                startAngle={startAngle}
		                endAngle={endAngle}
		                fill={fill}
		            />
		            <Sector
		                cx={cx}
		                cy={cy}
		                startAngle={startAngle}
		                endAngle={endAngle}
		                innerRadius={outerRadius + 6}
		                outerRadius={outerRadius + 10}
		                fill={fill}
		            />
		            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
		            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
		            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`TP ${value}`}</text>
		            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
		                {`(${(percent * 100).toFixed(0)}%)`}
		            </text>
		        </g>
		    );
		};
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
												<PieChart width={250} height={250}>
													<Pie dataKey="value"  data={
														[
															{name:"Completed Tasks",value:section.nofCompleted},
															{name:"Incomplete Tasks",value:section.nofIncomplete},
															{name:"Overdue Tasks",value:section.nofOverdue},
															{name:"All Tasks",value:section.nofTasks},
															{name:"Overall Score",value:section.overallScore}
														]
													} outerRadius={80} fill="#8884d8" label />
													<Tooltip />
  												</PieChart>


		                                        </div>
		                                    </div>
		                                </Card>
									</div>
	                            );
	                        })
	                    }
					</div>
				</div>

                <div className={"wfaWrapper__questions lastQu"}>
					<div class="container">
						<div class="row">
							{
		                        data?.evaluations?.map((question, j) => {
		                            return (
										<div class="col-md-3">
			                                <Card header={{text:question.question, position:'center'}} type={'wfaQuestion'}>
			                                    <div className={"wfaWrapper__question"}>
			                                        <div className={"averageScore"}>{`Average Score: ${question.averageScore}`}</div>

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
