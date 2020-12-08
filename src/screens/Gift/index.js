import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import styles from "./gift.scss";
import handshake from "../../assets/gift-bg.jpg";
import discover from "../../icons/discover.svg";

class Gift extends Component {
	state = {
		tab:"interny"
	}
    render() {
        return (
			<div style={{"background":"#f6f8fa"}}>
				<div className={"giftPage"}>
					<div class="affiliate__header" style={{"background-image":"url("+handshake+")"}}>
						<div class="affiliate__mask"></div>
						<div class="container">
							<div class="row" style={{"justify-content":"center"}}>
								<div class="col-md-7">
									<div class="affiliate__content">
										<p>GIFT</p>
										<p>Her zaman faydalı, insanların daima isteyebileceği, hiçbir zaman modası geçmeyecek bir ürünü, yani yüzlerce kategoride yer alan binlerce online kursu tanıtın!</p>
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
										<span>Gift</span>
										<p>
											Opsens focuses mainly on the measure of FFR in interventional cardiology. Opsens offers an advanced optical-based pressure guidewire (OptoWire) that aims at improving the clinical outcome of patients with coronary artery disease. Opsens is also involved in industrial activities in developing, manufacturing and installing innovative fibre optic sensing solutions for critical applications.
										</p>
									</div>
								</div>

							</div>
						</div>
					</div>
					<div class="affiliate__triple">
						<div class="container">
							<div class="row">
								<div class="col-md-4">
									<div onClick={() => this.setState({tab:"interny"})} class={this.state.tab == "interny" ? ("affiliate__tripleBox boxAnimationActive"):("affiliate__tripleBox boxAnimation")}>
										<img src={discover} />
										<span class="affiliate__tripleBox__title">
											INTERN
										</span>
										<span class="affiliate__tripleBox__description">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										</span>
									</div>

								</div>
								<div class="col-md-4">
									<div onClick={() => this.setState({tab:"country"})} class={this.state.tab == "country" ? ("affiliate__tripleBox boxAnimationActive"):("affiliate__tripleBox boxAnimation")}>
										<img src={discover} />
										<span class="affiliate__tripleBox__title">
											COUNTRY
										</span>
										<span class="affiliate__tripleBox__description">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										</span>
									</div>
								</div>
								<div class="col-md-4">
									<div onClick={() => this.setState({tab:"university"})} class={this.state.tab == "university" ? ("affiliate__tripleBox boxAnimationActive"):("affiliate__tripleBox boxAnimation")}>
										<img src={discover} />
										<span class="affiliate__tripleBox__title">
											UNIVERSITY
										</span>
										<span class="affiliate__tripleBox__description">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="giftPage__paymentForm">
						<div class="container">
							<div class="row">
								{this.state.tab == "interny" ? (
									<div class="col-md-6">
										<Input
											type={"text"}
											placeholder={"Intern Email"}
											size={"full"}

											onChange={(value) => {
											this.setState({ city: value });
											}}
											label={"Intern Email"}
										/>
									</div>
								):(null)}
								{this.state.tab == "country" ? (
									<div class="col-md-6">
										<Input
											 type={"select"}
											 id={"internType"}
											 label={"Country"}
											 size={"full"}
											 labelDescription={"Choose one below"}

											 onChange={(value, slValue) => {
												 this.setState({ advanced_intern_type: slValue.value });
											 }}
											 placeholder={"Select Country"}
											 externalSource={[
												 { key: "Turkey", value: "Turkey", selected: true },
												 { key: "Germany", value: "Germany" },
											 ]}
										 />
									</div>
								):(null)}
								{this.state.tab == "university" ? (
									<div class="col-md-6">
									<Input
										 type={"select"}
										 id={"internType"}
										 label={"University"}
										 size={"full"}
										 labelDescription={"Choose one below"}

										 onChange={(value, slValue) => {
											 this.setState({ advanced_intern_type: slValue.value });
										 }}
										 placeholder={"Select University"}
										 externalSource={[
											 { key: "Uludağ Universitesi", value: "Uludağ Üniversitesi", selected: true },
											 { key: "Boğaziçi Üniversitesi", value: "Boğaziçi Üniversitesi" },
										 ]}
									 />
									</div>
								):(null)}
								<div class="col-md-6">
									<Input
										type={"text"}
										placeholder={"Quantity"}
										size={"full"}

										onChange={(value) => {
										this.setState({ city: value });
										}}
										label={"Quantity"}
									/>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<Input
										type={"text"}
										placeholder={"Card Holder Name"}
										size={"full"}

										onChange={(value) => {
										this.setState({ city: value });
										}}
										label={"Card Holder Name"}
									/>
								</div>
								<div class="col-md-6">
									<Input
										type={"text"}
										placeholder={"Card Number"}
										size={"full"}

										onChange={(value) => {
										this.setState({ city: value });
										}}
										label={"Card Number"}
									/>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<Input
										type={"text"}
										placeholder={"MM/YY"}
										size={"full"}

										onChange={(value) => {
										this.setState({ city: value });
										}}
										label={"Expiry Date"}
									/>
								</div>
								<div class="col-md-6">
									<Input
										type={"text"}
										placeholder={"CVC"}
										size={"full"}

										onChange={(value) => {
										this.setState({ city: value });
										}}
										label={"CVC"}
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
				<Footer />
			</div>
        );
    }
}

export default Gift;
