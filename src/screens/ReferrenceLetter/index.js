import React, { Component } from "react";
import "./referrenceLetter.scss";
import { withNamespaces } from 'react-i18next';

// Components
import Input from "../../components/Input";
import LoadingModal from "../../components/LoadingModal";
import FooterAlternative from "../../components/FooterAlternative";
import Button from "../../components/Button";

// Assets
import referrenceLetter from "../../assets/referenceLetter.png";

class ReferrenceLetter extends Component {

	constructor(props) {
		super(props);

		this.state = {
			referrenceLetterCode: "",
			internLastName: "",
			processing: false
		};
	}

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
		const {t} = this.props;
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
									<div className={"referrenceLetter__header"}>{t('reference_letter_title')}</div>
									<div className={"referrenceLetter__description"}>
										{t('reference_letter_text')}
									</div>
								</div>
								<div class="col-md-6">
									<Input
										label={t('reference_letter_code')}
										type="text"
										size={'large'}
										placeholder="Referrence Letter Code"
										onChange={referrenceLetterCode => this.setState({ referrenceLetterCode })}
									/>
								</div>
								<div class="col-md-6">
									<Input
										label={t('reference_letter_intern_last_name')}
										type="text"
										size={'large'}
										placeholder="Intern Last Name"
										onChange={internLastName => this.setState({ internLastName })}
									/>
								</div>
								<div class="col-md-12">
									<div className={"referrenceLetter__buttonWrapper"} >
										<Button
											type='secondary'
											text={t('reference_letter_download')}
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

export default withNamespaces()(ReferrenceLetter);
