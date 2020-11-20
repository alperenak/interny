import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";

/*** Components ***/
import Card from "../../components/Card";
import Chart from "../../components/Chart";

/*** Utils ***/
import {getCookie} from "../../utils/cookie";
import store from "../../store";

/*** Style ***/
import styles from './employerdashboard.scss'

class Dashboard extends Component {
    state = {
        interns: []
    };

    async componentDidMount() {
        let id = getCookie('user_id');
        let res = await store.getInterns(id);
        this.setState({ interns: res.data });
    }

    render() {
        let {interns} = this.state;
        return (
            <div className={"dashboard"}>
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<Card header={{text: 'Interns', position: 'start'}} type={'table'}>
								<div className={"dashboard__tableContainer"}>
									{interns.map((intern, i) => {
										return (
											<Fragment key={i}>
												<Link to={`/interndetail/${intern.id}`} className={"dashboard__rowContainer"}>
													<div className={"dashboard__avatar"}><img src={intern.avatar} alt={'avatar'}/></div>
													<div className={"dashboard__internName"}>{intern.name} {intern.surname}</div>
												</Link>
											</Fragment>
										)
									})}
								</div>
							</Card>
						</div>
						<div class="col-md-6" style={{"display":"flex","justify-content":"space-between","flex-direction":"column"}}>
							<div className={"row"}>
								<div class="col-md-4">
									<Card type={'numeric'}>
										<div className={"dashboard__numericDataContainer"}>+165</div>
									</Card>
								</div>
								<div class="col-md-4">
									<Card type={'numeric'}>
										<div className={"dashboard__numericDataContainer"}>+165</div>
									</Card>
								</div>
								<div class="col-md-4">
									<Card type={'numeric'}>
										<div className={"dashboard__numericDataContainer"}>+165</div>
									</Card>
								</div>
							</div>
							<div className={"row"}>
								<div class="col-md-4">
									<Card type={'numeric'}>
										<div className={"dashboard__numericDataContainer"}>+165</div>
									</Card>
								</div>
								<div class="col-md-4">
									<Card type={'numeric'}>
										<div className={"dashboard__numericDataContainer"}>+165</div>
									</Card>
								</div>
								<div class="col-md-4">
									<Card type={'numeric'}>
										<div className={"dashboard__numericDataContainer"}>+165</div>
									</Card>
								</div>
							</div>
						</div>
					</div>
					<div class="row" style={{"margin-top":"50px"}}>
						<div class="col-md-6">
							<div className={"dashboard__taskCardContainer"}>
								<Chart type={'pie'} header={'Task Progress'}/>
							</div>
						</div>
						<div class="col-md-6">
							<div className={"dashboard__applicationContainer"}>
								<Chart type={'line'} header={'Applications By Post'}/>
							</div>
						</div>
					</div>
				</div>

            </div>
        );
    }
}

export default Dashboard;
