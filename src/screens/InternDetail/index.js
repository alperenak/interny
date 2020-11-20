import React, {Component, Fragment} from 'react';

/*** Components ***/
import Card from "../../components/Card";
import LoadingModal from "../../components/LoadingModal";
import WFA from "../../components/WFA";

/*** Styles ***/
import styles from './interndetail.scss';

/*** Utils ***/
import store from "../../store";

class InternDetail extends Component {
    state = {
        processing: true,
        intern: {}
    };

    async componentDidMount() {
        this.setState({ processing: true });
        let res = await store.getIntern(this.props.match.params.internId);
        this.setState({ intern: res.data, processing: false });
    }

    render() {
        let { processing, intern } = this.state;
        let duration = (((intern?.Internship?.duration - intern?.Internship?.dayLeft) / intern?.Internship?.duration) * 100);
		if(duration > 100){
			duration = 100;
		}
        return (
            <Fragment>

                <div className={"internDetailWrapper"}>
                    <LoadingModal text="Loading" v-if={processing} />
					<div class="container">
						<div class="row">
							<div class="col-md-6" style={{"margin-bottom":"30px"}}>
								<Card type={'internDetail'}>
			                        <div className={"internDetailWrapper__internInfo"}>
			                            <div className={"internDetailWrapper__internInfo__userImage"}><img src={intern?.avatar} alt={'avatar'}/></div>
			                            <div className={"internDetailWrapper__internInfo__name"}>{`${intern?.name} ${intern?.surname}`}</div>
			                            <div className={`${"internDetailWrapper__internInfo__infoFields"} ${styles.email}`}>
			                                <span>Email:</span>
			                                <span className={"value"}>{intern?.email}</span>
			                            </div>
			                            <div className={`${"internDetailWrapper__internInfo__infoFields"} ${styles.phone}`}>
			                                <span>Phone:</span>
			                                <span className={"value"}>{intern?.phone}</span>
			                            </div>
			                            <div className={`${"internDetailWrapper__internInfo__infoFields"} ${styles.gradStatus}`}>
			                                <span>Graduation Status:</span>
			                                <span className={"value"}>{intern?.gradStatus}</span>
			                            </div>
			                            <div className={`${"internDetailWrapper__internInfo__infoFields"} ${styles.location}`}>
			                                <span>Address:</span>
			                                <span className={"value"}>{`${intern?.location?.country} - ${intern?.location?.city}`}</span>
			                            </div>
			                        </div>
			                    </Card>
							</div>
							<div class="col-md-6" style={{"margin-bottom":"30px"}}>
								<Card type={'internInfo'}>
			                        <div className={"internDetailWrapper__internship"}>
			                            <div className={"internDetailWrapper__internship__internshipHeader"}>Internship</div>
			                            <div className={"internDetailWrapper__internship__internshipField"}>
			                                <span>Position: </span>
			                                <span className={"value"}>{intern?.Internship?.position}</span>
			                            </div>
			                            <div className={"internDetailWrapper__internship__internshipField"}>
			                                <span>Start Date: </span>
			                                <span className={"value"}>{intern?.Internship?.startDate}</span>
			                            </div>
			                            <div className={"internDetailWrapper__internship__internshipField"}>
			                                <span>End Date: </span>
			                                <span className={"value"}>{intern?.Internship?.endDate}</span>
			                            </div>
			                            <div className={"internDetailWrapper__internship__internshipField"}>
			                                <span>Duration: </span>
			                                <div className={"bar"}>
			                                    <div
			                                        style={{width: duration+'%'}}
			                                        className={"duration"}
			                                    />
			                                </div>
			                            </div>
			                            <div className={"internDetailWrapper__internship__internshipField"}>
			                                <span>Day(s) Left: </span>
			                                <span className={"value"}>{intern?.Internship?.dayLeft}</span>
			                            </div>
			                            <div className={"internDetailWrapper__internship__internshipField"}>
			                                <span>Internship Length: </span>
			                                <span className={"value"}>{intern?.Internship?.internshipLength}</span>
			                            </div>
			                            <div className={"internDetailWrapper__internship__internshipField"}>
			                                <span>Overall Score: </span>
			                                <span className={"value"}>{intern?.Internship?.overAllScore}</span>
			                            </div>
			                        </div>
			                    </Card>
							</div>
						</div>
	                    <div class="row">
							<div class="col-md-6" style={{"margin-bottom":"30px"}}>
								<Card type={'internDetail'}>
									<div className={"internDetailWrapper__employer"}>
										<div className={"internDetailWrapper__employer__empImage"}><img src={intern?.Internship?.Employer?.logo} alt={'avatar'}/></div>
										<div className={"internDetailWrapper__employer__name"}>{intern?.Internship?.Employer?.legalName}</div>
										<div className={`${"internDetailWrapper__employer__infoFields"} ${"internDetailWrapper__employer__empNum"}`}>
											<span>Employee Number:</span>
											<span className={"value"}>{intern?.Internship?.Employer?.employeeNumber}</span>
										</div>
									</div>
								</Card>
							</div>
							<div class="col-md-6" style={{"margin-bottom":"30px"}}>
								<Card type={'internInfo'}>
			                        <div className={"internDetailWrapper__university"}>
			                            <div className={"internDetailWrapper__university__uniHeader"}>{intern?.university?.university}</div>
			                            <div className={"internDetailWrapper__university__uniField"}>
			                                <span>Student Number: </span>
			                                <span className={"value"}>{intern?.university?.studentNumber}</span>
			                            </div>
			                            <div className={"internDetailWrapper__university__uniField"}>
			                                <span>University Mail: </span>
			                                <span className={"value"}>{intern?.university?.universityMail}</span>
			                            </div>
			                            <div className={"internDetailWrapper__university__uniField"}>
			                                <span>Department: </span>
			                                <span className={"value"}>{intern?.university?.department}</span>
			                            </div>
			                            <div className={"internDetailWrapper__university__uniField"}>
			                                <span>Faculty: </span>
			                                <span className={"value"}>{intern?.university?.faculty}</span>
			                            </div>
			                        </div>
			                    </Card>
							</div>
						</div>
					</div>
                </div>
                <WFA internId={this.props.match.params.internId}/>
            </Fragment>
        );
    }
}

export default InternDetail;
