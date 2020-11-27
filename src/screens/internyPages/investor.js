import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative";
import styles from "./style.scss";
import handshake from "../../assets/handshake.jpg";
import worldwide from "../../assets/worldwide.png";
import review_applicant from "../../assets/review-applicant.png";
import start_internship from "../../assets/start-internship.png";
import manage_program from "../../assets/manage-program.png";
class InvestorPage extends Component {
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
				<div class="affiliate__header" style={{"background-image":"url("+handshake+")"}}>
					<div class="affiliate__mask"></div>
					<div class="container">
						<div class="row" style={{"justify-content":"center"}}>
							<div class="col-md-7">
								<div class="affiliate__content">
									<p>INVESTOR</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="internyPage__twoBox">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="internyPage__box">
									<span>Company Profile</span>
									<p>
										Opsens focuses mainly on the measure of FFR in interventional cardiology. Opsens offers an advanced optical-based pressure guidewire (OptoWire) that aims at improving the clinical outcome of patients with coronary artery disease. Opsens is also involved in industrial activities in developing, manufacturing and installing innovative fibre optic sensing solutions for critical applications.
									</p>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div class="internyPage__twoBox">
					<div class="container">
						<div class="row">
							<div class="col-md-6">
								<div class="internyPage__box">
									<span>Mission Statement</span>
									<p>
										Interny will produce superior financial returns for its shareowners by providing high value-added logistics, transportation and related business services through focused operating companies. Customer requirements will be met in the highest quality manner appropriate to each market segment served. FedEx will strive to develop mutually rewarding relationships with its team members, partners and suppliers. Safety will be the first consideration in all operations. Corporate activities will be conducted to the highest ethical and professional standards.
									</p>
								</div>
							</div>
							<div class="col-md-6">
								<div class="internyPage__box">
									<span>Why Invest</span>
									<p>
										Interny will produce superior financial returns for its shareowners by providing high value-added logistics, transportation and related business services through focused operating companies. Customer requirements will be met in the highest quality manner appropriate to each market segment served. FedEx will strive to develop mutually rewarding relationships with its team members, partners and suppliers. Safety will be the first consideration in all operations. Corporate activities will be conducted to the highest ethical and professional standards.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="affiliate__triple">
					<div class="container">
						<div class="row">
							<div class="col-md-12" style={{"text-align":"center","margin-bottom":"30px"}}>
								<span class="affiliate__timeline__title">FEATURES REPORTS</span>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4">
								<div class="affiliate__tripleBox">
									<span class="affiliate__tripleBox__title">
										Lorem ipsum dolor sit amet
									</span>
									<span class="affiliate__tripleBox__description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="affiliate__tripleBox">
									<span class="affiliate__tripleBox__title">
										Lorem ipsum dolor sit amet
									</span>
									<span class="affiliate__tripleBox__description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="affiliate__tripleBox">
									<span class="affiliate__tripleBox__title">
										Lorem ipsum dolor sit amet
									</span>
									<span class="affiliate__tripleBox__description">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="affiliate__contact">
					<div class="container">
						<div class="row">
							<div class="col-md-6">
								<Input
									type={"text"}
									placeholder={"Name"}
									size={"full"}

									onChange={(value) => {
									this.setState({ city: value });
									}}
									label={"Name"}
								/>
							</div>
							<div class="col-md-6">
								<Input
									type={"text"}
									placeholder={"Surname"}
									size={"full"}

									onChange={(value) => {
									this.setState({ city: value });
									}}
									label={"Surname"}
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<Input
									type={"text"}
									placeholder={"E-mail"}
									size={"full"}

									onChange={(value) => {
									this.setState({ city: value });
									}}
									label={"E-mail"}
								/>
							</div>
							<div class="col-md-6">
								<Input
									type={"text"}
									placeholder={"Phone"}
									size={"full"}

									onChange={(value) => {
									this.setState({ city: value });
									}}
									label={"Phone"}
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<Input
									type={"textarea"}
									placeholder={"Message"}
									size={"full"}

									onChange={(value) => {
									this.setState({ city: value });
									}}
									label={"Message"}
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<Button
									type={"primary"}
									text={"Send"}
									sizeName={"default"}
								/>

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

export default InvestorPage;
