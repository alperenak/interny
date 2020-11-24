import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./referrenceLetter.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import store from "../../store";
import LoadingModal from "../../components/LoadingModal";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

class ReferrenceLetter extends Component {
	state = {
		value: "",
		processing: false
	};

	render() {
		return (
			<>
				<div className={"referrenceLetter"}>
					<LoadingModal text="Loading" v-if={this.state.processing} />
					<div class="container">
						<div className={"referrenceLetter__modal"}>
							<div class="row">
								<div class="col-md-12">
									<div className={"referrenceLetter__header"}>Referrence Letter</div>
									<div className={"referrenceLetter__description"}>
										Enter the Referrence Letter Code and Intern Last Name. Then you can see the Referrence Letter.
									</div>
								</div>
								<div class="col-md-6">
									<Input
										label={'Referrence Letter Code'}
										type="text"
										size={'large'}
										placeholder="Referrence Letter Coed"
										onChange={value => this.setState({ value })}
									/>
								</div>
								<div class="col-md-6">
									<Input
										label={'Intern Last Name'}
										type="text"
										size={'large'}
										placeholder="Intern Last Name"
										onChange={value => this.setState({ value })}
									/>
								</div>
								<div class="col-md-12">
									<div className={"referrenceLetter__button"}>
										<Link className={"referrenceButton"} to="/referrenceLetterLetter">Send</Link>

									</div>
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

export default ReferrenceLetter;
