import React, {Component, Fragment} from 'react';
/*
import Card from "../../components/Card";
import LoadingModal from "../../components/LoadingModal";
import WFA from "../../components/WFA";

import styles from './interndetail.scss';

import store from "../../store";
*/
import WFA from "../../components/WFA";

import store from "../../store";

import "../ReferrenceLetter/referrenceLetter.scss";

// Components
import Input from "../../components/Input";
import LoadingModal from "../../components/LoadingModal";
import FooterAlternative from "../../components/FooterAlternative";
import Button from "../../components/Button";

// Assets
import wfa from "../../assets/intern-WFA_wait.png";

class InternDetail extends Component {
    state = {
        processing: true,
		intern: {},
		renderSec: true
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
		console.log(this.state.renderSec)
		/*
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
		*/
		return (
			<div className="pageWrapper">
				<div className={"referrenceLetter"}>
					<LoadingModal text="Loading" v-if={this.state.processing} />
					<div class="container">
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<img className="referrenceLetter__image" src={wfa} alt="Referrence Letter" />
						</div>
						<div className={"referrenceLetter__modal"}>
							<div class="row">
								<div class="col-md-12">
									<div className={"referrenceLetter__header"}>WFA</div>
									<div className={"referrenceLetter__description"}>
										Welcome to the Workforce Analytics: WFA. You must first complete an internship to access the WFA report and reference letter.
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

export default InternDetail;
