import React, { Component } from "react";
import styles from "./style.scss";

// Components
import Button from "../../components/Button";
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative";

// Assets
import worldwide from "../../assets/worldwide.png";
import review_applicant from "../../assets/review-applicant.png";
import start_internship from "../../assets/start-internship.png";
import manage_program from "../../assets/manage-program.png";
import companyBg from "../../assets/companyBg.png";


const STEP_DATA = [
	{
		title: 'Join & Publish',
		description: 'You can create a company account to work with any interns anywhere in the world. After logging in with your verified account, you can post free advertisements for interns to apply to your company. You can start the internship process by determining the interns you want. You can also purchase one of the COMPANY or HIRING packages to see the Interny Internship Pool.',
		image: worldwide
	},
	{
		title: 'iMSTM',
		description: "You can follow your intern's internship process with whom you started to work on the Interny Management System (IMSTM). Using iMSTM, you can assign a task to your intern. When the assigned task for your intern is completed, it will be communicated to you via iMSTM. Also, you will always be able to communicate with your intern using the messaging service. At the end of the internship period, you will evaluate each other mutually and complete the internship.",
		image: review_applicant
	},
	{
		title: 'E-Learning',
		description: "You can support the improvement of your interns with E-Learning, a unique service offered to companies. When you purchase the E-Learning package, you will have the opportunity to share your company content or Interny E-Learning contents with your interns. You will follow all your interns' developments in this process with E-Learning Analytics created using artificial intelligence.",
		image: start_internship
	},
	{
		title: 'Confirm Reference Letter',
		description: 'The internship performance of the intern is evaluated using Workforce Analytics (WFA). At the end of the internship, a WFA report is prepared using artificial intelligence. Interns who are determined to have 60% or more success in the WFA report will be entitled to get a reference letter. The reference letter signed by you will be presented to your intern, who is entitled to the reference letter at the end of the internship.',
		image: manage_program
	},
]

class BusinessPage extends Component {
	state = {

	  pri1: false,
	  pri2: false,
	  pri3: false,

	};

	renderSteps = () => {
		return STEP_DATA.map((step, index) => {
			const flexDirection = index % 2 === 0 ? 'row' : 'row-reverse';
			return (
				<div class="row internyPage__step" key={`${step.title}-${index}`} style={{ flexDirection }}>
					<div class="col-md-6">
						<img src={step.image} alt={step.title} style={{"width":"90%"}}/>
					</div>
					<div class="col-md-6">
						<div class="internyPage__step__title">
							<span>{step.title}</span>
						</div>
						<p>
							{step.description}
						</p>
					</div>
				</div>
			)
		})
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
								<p class="internyPage__why__desc">
									Welcome to INTERNY, the world's first remote online internship platform. 
									You will find everything you need and more during the internship process on the platform. 
									It fulfills all your internship needs, and allows you to manage the internship process in detail. 
									It allows you to do a job with any intern you want anywhere in the world with task assignments. 
									All you have to do is to publish a detailed internship, choose any of the interns who apply to your 
									company and follow up the assignments on time with their explanations.
								</p>
								<p class="internyPage__why__desc">
									It is entirely FREE for companies to register to INTERNY, publish internships, 
									and manage the internship process in detail. You can use this unique platform more efficiently 
									by purchasing premium packages that you think are suitable for your company.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="internyPage__steps">
					<div class="container">
						<div className="row">
							<div class="col-md-12">
								<div class="internyPage__why__title">
									<span>How to Use the Platform as a Company?</span>
								</div>
							</div>
						</div>
						{ this.renderSteps() }
						<div class="row">
							<div class="col-md-12" style={{ display: 'flex', justifyContent: 'center'}}>
								{/* This is a dummy video. It will be replaced with another video. */}
								<iframe 
									title="steps-video"
									width="560" 
									height="315" 
									src="https://www.youtube.com/embed/bNpx7gpSqbY"
									frameborder="0" 
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
									allowfullscreen>
								</iframe>
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
													<div data-toggle="tooltip" title="Interny Management System">iMS™</div>
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
													<div data-toggle="tooltip" title="Interny Management System">iCC™</div>
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
