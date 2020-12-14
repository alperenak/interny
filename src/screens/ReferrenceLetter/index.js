import React, { Component } from "react";
import "./referrenceLetter.scss";

// Components
import Input from "../../components/Input";
import LoadingModal from "../../components/LoadingModal";
import FooterAlternative from "../../components/FooterAlternative";
import Button from "../../components/Button";

// Assets
import referrenceLetter from "../../assets/referenceLetter.png";

class ReferrenceLetter extends Component {
	state = {
		value: "",
		processing: false
	};

	renderModalContent = () => {
		return <p>No records were found.</p>
	}

	handleDownloadClick = () => {
		this.props.createModal({
			header: `Referrence Letter`,
			content: this.renderModalContent
		  });
	}

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
										placeholder="Referrence Letter Code"
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
									<div className={"referrenceLetter__buttonWrapper"} >
										<Button
											type='secondary'
											text='Download'
											textClass='referrenceLetter__buttonWrapper__text'
											onButtonClick={this.handleDownloadClick}
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

export default ReferrenceLetter;
