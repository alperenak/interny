import React, { Component } from 'react';
import './helpCenter.scss';

//Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import Divider from './divider';

// Assets
import helpCenterBg from '../../assets/helpCenterBg.png';
import application from '../../icons/application.png';
import company from '../../icons/company.png';
import competency from '../../icons/competency.png';
import eLearning from '../../icons/e-learning.png';
import intern from '../../icons/intern.png';
import language from '../../icons/language.png';
import other from '../../icons/other.png';
import packages from '../../icons/packages.png';
import task from '../../icons/task.png';
import university from '../../icons/university.png';
import wfaReferenceLetter from '../../icons/wfa-reference-letter.png';

// Util
import { getOffset } from '../../utils/offset';

const FIRST_STEP = [
	{ id: 'intern', title: 'Intern', icon: intern },
	{ id: 'company', title: 'Company', icon: company },
	{ id: 'university', title: 'University', icon: university },
];

const INTERN_RESULTS = [
	{ id: 'application', title: 'Application', icon: application },
	{ id: 'competency', title: 'Competency', icon: competency },
	{ id: 'language', title: 'Language', icon: language },
	{ id: 'task', title: 'Task', icon: task },
	{
		id: 'wfaReferenceLetter',
		title: 'WFA/Reference Letter',
		icon: wfaReferenceLetter,
	},
	{ id: 'other', title: 'Other', icon: other },
];

const COMPANY_RESULTS = [
	{ id: 'application', title: 'Application', icon: application },
	{ id: 'eLearning', title: 'E-Learning', icon: eLearning },
	{ id: 'language', title: 'Language', icon: language },
	{ id: 'task', title: 'Task', icon: task },
	{ id: 'packages', title: 'Packages', icon: packages },
	{ id: 'other', title: 'Other', icon: other },
];

const UNIVERSITY_RESULTS = [
	{ id: 'language', title: 'Language', icon: language },
	{ id: 'packages', title: 'Packages', icon: packages },
	{ id: 'other', title: 'Other', icon: other },
];

class HelpCenter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstOption: '',
			secondOption: '',
		};

		this.secondStepRef = React.createRef();
		this.contactFormRef = React.createRef();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.firstOption !== this.state.firstOption) {
			this.scrollToSecondStep();
		}

		if (prevState.secondOption !== this.state.secondOption) {
			this.scrollToContactForm();
		}
	}

	scrollToSecondStep = () => {
		const offset = getOffset(this.secondStepRef.current);
		window.scrollTo({
			top: offset.top - 100,
			left: offset.left,
			behavior: 'smooth',
		});
	};

	scrollToContactForm = () => {
		const offset = getOffset(this.contactFormRef.current);
		window.scrollTo({
			top: offset.top - 100,
			left: offset.left,
			behavior: 'smooth',
		});
	};

	setFirstOption = (event, value) => {
		this.setState({ firstOption: value });
	};

	setSecondOption = (event, value) => {
		this.setState({ secondOption: value });
	};

	renderFirstStep = () => {
		return FIRST_STEP.map((element, index) => {
			const className =
				this.state.firstOption === element.id
					? 'affiliate__tripleBox boxAnimationActive'
					: 'affiliate__tripleBox boxAnimation';
			return (
				<div class="col-md-4" key={`first-${element.id} ${index}`}>
					<div
						className={className}
						onClick={(event) => this.setFirstOption(event, element.id)}
						style={{ cursor: 'pointer' }}
					>
						<img src={element.icon} alt={element.title} />
						<span class="affiliate__tripleBox__title">
							{element.title.toUpperCase()}
						</span>
					</div>
				</div>
			);
		});
	};

	renderSecondStep = () => {
		let secondStepOptions = [];
		if (this.state.firstOption === 'intern') {
			secondStepOptions = INTERN_RESULTS;
		} else if (this.state.firstOption === 'company') {
			secondStepOptions = COMPANY_RESULTS;
		} else if (this.state.firstOption === 'university') {
			secondStepOptions = UNIVERSITY_RESULTS;
		}

		return secondStepOptions.map((element, index) => {
			const className =
				this.state.secondOption === element.id
					? 'affiliate__tripleBox boxAnimationActive'
					: 'affiliate__tripleBox boxAnimation';
			return (
				<div class="col-md-4" key={`second-${element.id} ${index}`}>
					<div
						class={className}
						onClick={(event) => this.setSecondOption(event, element.id)}
						style={{ cursor: 'pointer' }}
					>
						<img src={element.icon} alt={element.title} />
						<span class="affiliate__tripleBox__title">
							{element.title.toUpperCase()}
						</span>
					</div>
				</div>
			);
		});
	};

	renderContactForm = () => {
		return (
			<div class="col-lg-12">
				<ContactForm
					onBackClick={this.scrollToSecondStep}
					onSendClick={this.handleContactFormData}
				/>
			</div>
		);
	};

	handleContactFormData = (formData) => {
		console.log('Contact form data: ', formData);
	};

	render() {
		return (
			<div style={{ background: '#f6f8fa' }}>
				<div className={'helpCenter'}>
					<div class="affiliate__header">
						<div
							class="container headerBackground"
							style={{ 'background-image': 'url(' + helpCenterBg + ')' }}
						>
							<p>Help Center</p>
						</div>
					</div>
					<div className="helpCenter__search">
						<div class="container">
							<div class="row">
								<div class="col-md-12">
									<div class="helpCenter__title">
										<span>How Can We Help You?</span>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 helpCenter__searchInput">
									<Input
										type={'text'}
										placeholder={'Message'}
										size={'full'}
										label={'Search'}
									/>
								</div>
							</div>
							<div class="row" style={{ 'justify-content': 'center' }}>
								<div
									class="col-md-3"
									style={{ display: 'flex', 'justify-content': 'center' }}
								>
									<Button
										type={'primary'}
										text={'SEARCH'}
										sizeName={'default'}
										to={'/helpCenterDetail'}
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="affiliate__triple">
						<div class="container">
							<div class="helpCenter__title" style={{ margin: "40px 0"}}>
								<span>Who are you having problems as?</span>
							</div>
							<div class="row">{this.renderFirstStep()}</div>
							<div ref={this.secondStepRef}>
								{this.state.firstOption && (
									<div>
										<Divider />
										<div class="helpCenter__title" style={{ margin: "40px 0"}}>
											<span>In which area are you having problems?</span>
										</div>
										<div class="row">{this.renderSecondStep()}</div>
									</div>
								)}
							</div>
							<div ref={this.contactFormRef}>
								{this.state.secondOption && (
									<div>
										<Divider />
										<div class="helpCenter__title" style={{ margin: "40px 0"}}>
											<span>Can you share your problem with us?</span>
										</div>
										<div class="row">{this.renderContactForm()}</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default HelpCenter;
