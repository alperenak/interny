import React, { Component } from "react";
import styles from "./packages.scss";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
class Packages extends Component {
  state = {
    pri1: false,
    pri2: false,
    pri3: false,
  };

	render() {
		return (
			<>
				<div id={"packages-section"} className={"packagesSection"}>
					<div class="container">
						<div className={"packagesSection__packagesTitle"}>See the Intern Packages</div>
						<div className={"packagesSection__packagesSubTitle"}>
							Click to see detail of packages
						</div>
						<div class="row packagesSection__row">
							<div class="col-md-4">
								<div
									onMouseLeave={() => this.setState({ pri1: false })}
									onMouseOver={() => this.setState({ pri1: true })}
									className={styles.frontier}
								>
									<Card type={"pricing"}>
										<div className={"packagesSection__packageCard"}>
											<div className={"packagesSection__packageCard__headerDiv"}>
												<div className={"packagesSection__packageCard__packageTitle"}>FREEMIUM</div>
												<div className={"packagesSection__packageCard__packagePrice"}>$0.00</div>
												<div className={"packagesSection__packageCard__packagePaymentDate"}>Per Month</div>
											</div>
											<div className={"packagesSection__packageCard__stroke"} />
											<div className={"packagesSection__packageCard__descriptionDiv"}>
												<div className={"packagesSection__packageCard__packageDescription"}>
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
										<div className={"packagesSection__packageCardGuaranteed"}>
											<div className={"packagesSection__packageCardGuaranteed__headerDiv"}>
												<div className={"packagesSection__packageCardGuaranteed__packageTitle"}>INTERN</div>
												<div className={"packagesSection__packageCardGuaranteed__packagePrice"}>$24.99</div>
												<div className={"packagesSection__packageCardGuaranteed__packagePaymentDate"}>Per Month</div>
											</div>
											<div className={"packagesSection__packageCardGuaranteed__stroke"} />
											<div className={"packagesSection__packageCardGuaranteed__descriptionDiv"}>
												<div className={"packagesSection__packageCardGuaranteed__packageDescription"}>
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
										<div className={"packagesSection__packageCard"}>
											<div className={"packagesSection__packageCard__headerDiv"}>
												<div className={"packagesSection__packageCard__packageTitle"}>COMPETENCY</div>
												<div className={"packagesSection__packageCard__packagePrice"}>$12.49</div>
												<div className={"packagesSection__packageCard__packagePaymentDate"}>Per Report</div>
											</div>
											<div className={"packagesSection__packageCard__stroke"} />
											<div className={"packagesSection__packageCard__descriptionDiv"}>
												<div className={"packagesSection__packageCard__packageDescription"}>
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
				<Footer />
			</>
		);
	}
}

export default Packages;
