import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";

import FooterAlternative from "../../components/FooterAlternative";
import styles from "./style.scss";
import handshake from "../../assets/help-center.jpg";
import worldwide from "../../assets/worldwide.png";
import review_applicant from "../../assets/review-applicant.png";
import start_internship from "../../assets/start-internship.png";
import manage_program from "../../assets/manage-program.png";

import companyBg from "../../assets/companyBg.png";


class BusinessPage extends Component {
	state = {

	  pri1: false,
	  pri2: false,
	  pri3: false,

	};

	componentDidMount(){

	}
    render() {
        return (
			<>
            <div class="internyPage">
				<div class="affiliate__header">
					<div class="container" style={{"background-image":"url("+companyBg+")"}}>
						<p>INTERNY FOR BUSINESS</p>
					</div>
				</div>
				<div class="internyPage__why">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="internyPage__why__title">
									<span>WHY USE INTERNY</span>
								</div>
							</div>
							<div class="col-md-12">
								<p class="internyPage__why__desc">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="internyPage__steps">
					<div class="container">
						<div class="row internyPage__step">
							<div class="col-md-6">
								<img src={worldwide}  style={{"width":"90%"}}/>
							</div>
							<div class="col-md-6">
								<div class="internyPage__step__title">
									<span>Post an Internship Application Worldwide</span>
								</div>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
							</div>
						</div>
						<div class="row internyPage__step">
							<div class="col-md-6">
								<div class="internyPage__step__title">
									<span>Review-Contact Applicants</span>
								</div>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
							</div>
							<div class="col-md-6">
								<img src={review_applicant}  style={{"width":"90%"}}/>
							</div>
						</div>
						<div class="row internyPage__step">
							<div class="col-md-6">
								<img src={start_internship}  style={{"width":"90%"}}/>
							</div>
							<div class="col-md-6">
								<div class="internyPage__step__title">
									<span>Start Internship Program</span>
								</div>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
							</div>
						</div>
						<div class="row internyPage__step">
							<div class="col-md-6">
								<div class="internyPage__step__title">
									<span>Manage Internship Programs</span>
								</div>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
							</div>
							<div class="col-md-6">
								<img src={manage_program}  style={{"width":"90%"}}/>
							</div>
						</div>
						<div class="row internyPage__step">
							<div class="col-md-6">
								<img src={start_internship}  style={{"width":"90%"}}/>
							</div>
							<div class="col-md-6">
								<div class="internyPage__step__title">
									<span>Be Reference to Interns</span>
								</div>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div id={"packages-section"} className={"home__packagesSection"}>
					<div class="container">
						<div className={"home__packagesSection__packagesTitle"}>See the Intern Packages</div>
						<div className={"home__packagesSection__packagesSubTitle"}>
							Click to see detail of packages
						</div>
						<div class="row home__packagesSection__row">
							<div class="col-md-4">
								<div
									onMouseLeave={() => this.setState({ pri1: false })}
									onMouseOver={() => this.setState({ pri1: true })}
									className={styles.frontier}
								>
									<Card type={"pricing"}>
										<div className={"home__packagesSection__packageCard"}>
											<div className={"home__packagesSection__packageCard__headerDiv"}>
												<div className={"home__packagesSection__packageCard__packageTitle"}>FREEMIUM</div>
												<div className={"home__packagesSection__packageCard__packagePrice"}>$0.00</div>
												<div className={"home__packagesSection__packageCard__packagePaymentDate"}>Per Month</div>
											</div>
											<div className={"home__packagesSection__packageCard__stroke"} />
											<div className={"home__packagesSection__packageCard__descriptionDiv"}>
												<div className={"home__packagesSection__packageCard__packageDescription"}>
													<div>Sign up!</div>
													<div>Create CV</div>
													<div>Search Internships</div>
												</div>
												<Button
													v-if={this.state.pri1}
													type={"primary"}
													text={"Buy Now"}
													sizeName={"default"}
												/>
												<Button
													v-if={!this.state.pri1}
													type={"ghost"}
													text={"Buy Now"}
													sizeName={"default"}
												/>
											</div>
										</div>
									</Card>
								</div>
							</div>
							<div class="col-md-4">
								<div
									onMouseLeave={() => this.setState({ pri2: false })}
									onMouseOver={() => this.setState({ pri2: true })}
									className={styles.frontier}
								>
									<Card type={"pricing"}>
										<div className={"moneyGuarenteed"}>
										{/* Money Back Guarenteed */}
										</div>
										<div className={"home__packagesSection__packageCardGuaranteed"}>
											<div className={"home__packagesSection__packageCardGuaranteed__headerDiv"}>
												<div className={"home__packagesSection__packageCardGuaranteed__packageTitle"}>INTERN</div>
												<div className={"home__packagesSection__packageCardGuaranteed__packagePrice"}>$24.99</div>
												<div className={"home__packagesSection__packageCardGuaranteed__packagePaymentDate"}>Per Month</div>
											</div>
											<div className={"home__packagesSection__packageCardGuaranteed__stroke"} />
											<div className={"home__packagesSection__packageCardGuaranteed__descriptionDiv"}>
												<div className={"home__packagesSection__packageCardGuaranteed__packageDescription"}>
													<div>Apply for Internships</div>
													<div data-toggle="tooltip" title="Interny Management System">İMSᵖᵐ</div>
													<div data-toggle="tooltip" title="Workforce Analytics">WFA Report</div>
													<div>Reference Letter</div>
												</div>
												<Button
												v-if={this.state.pri2}
												type={"primary"}
												text={"Buy Now"}
												sizeName={"default"}
												/>
												<Button
												v-if={!this.state.pri2}
												type={"ghost"}
												text={"Buy Now"}
												sizeName={"default"}
												/>
											</div>
										</div>
									</Card>
								</div>
							</div>
							<div class="col-md-4">
								<div
									onMouseLeave={() => this.setState({ pri3: false })}
									onMouseOver={() => this.setState({ pri3: true })}
									className={styles.frontier}
								>
									<Card type={"pricing"}>
										<div className={"home__packagesSection__packageCard"}>
											<div className={"home__packagesSection__packageCard__headerDiv"}>
												<div className={"home__packagesSection__packageCard__packageTitle"}>COMPETENCY</div>
												<div className={"home__packagesSection__packageCard__packagePrice"}>$12.49</div>
												<div className={"home__packagesSection__packageCard__packagePaymentDate"}>Per Report</div>
											</div>
											<div className={"home__packagesSection__packageCard__stroke"} />
											<div className={"home__packagesSection__packageCard__descriptionDiv"}>
												<div className={"home__packagesSection__packageCard__packageDescription"}>
													<div>Case Studies</div>
													<div data-toggle="tooltip" title="Interny Management System">İCCᵗᵐ</div>
													<div>Competency Report</div>
												</div>
												<Button
													v-if={this.state.pri3}
													type={"primary"}
													text={"Buy Now"}
													sizeName={"default"}
												/>
												<Button
													v-if={!this.state.pri3}
													type={"ghost"}
													text={"Buy Now"}
													sizeName={"default"}
												/>
											</div>
										</div>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FooterAlternative />
			</>
        );
    }
}

export default BusinessPage;
