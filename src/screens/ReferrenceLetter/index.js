import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./referrenceLetter.scss";

// Components
import Input from "../../components/Input";
import LoadingModal from "../../components/LoadingModal";
import FooterAlternative from "../../components/FooterAlternative";

// Assets
import referrenceLetter from "../../assets/referenceLetter.png";


class ReferrenceLetter extends Component {
	state = {
		value: "",
		processing: false
	};

	render() {
		return (
			<div className="pageWrapper">
				<div className={"referrenceLetter"}>
					<LoadingModal text="Loading" v-if={this.state.processing} />
					<div class="container">
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<img className="referrenceLetter__image" src={referrenceLetter} alt="Referrence Letter" />
						</div>
						<div className={"referrenceLetter__modal"}>
							<div class="row">
								<div class="col-md-12">
									<div className={"referrenceLetter__header"}>Referrence Letter</div>
									<div className={"referrenceLetter__description"}>
										Enter the details below. Then you can check the Referrence Letter.
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
									<div className={"referrenceLetter__button"} style={{"margin-top":"30px"}}>
										<Link className={"referrenceButton"} to="/referrenceLetterLetter">Download</Link>

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

export default ReferrenceLetter;
