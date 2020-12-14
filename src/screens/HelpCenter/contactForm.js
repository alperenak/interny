import React, { Component } from 'react';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

class ContactForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: "",
			surname: "",
			email: "",
			phone: "",
			message: "",
		}
	}



	render() {
		const { onBackClick, onSendClick } = this.props;
		const formData = {
			...this.state
		};
		return (
			<div className="affiliate__contact helpCenter__contactForm">
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<Input
								type={'text'}
								placeholder={'Name'}
								size={'full'}
								onChange={(value) => {
									this.setState({ name: value });
								}}
								label={'Name'}
							/>
						</div>
						<div class="col-md-6">
							<Input
								type={'text'}
								placeholder={'Surname'}
								size={'full'}
								onChange={(value) => {
									this.setState({ surname: value });
								}}
								label={'Surname'}
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<Input
								type={'text'}
								placeholder={'E-mail'}
								size={'full'}
								onChange={(value) => {
									this.setState({ email: value });
								}}
								label={'E-mail'}
							/>
						</div>
						<div class="col-md-6">
							<Input
								type={'text'}
								placeholder={'Phone'}
								size={'full'}
								onChange={(value) => {
									this.setState({ phone: value });
								}}
								label={'Phone'}
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<Input
								type={'textarea'}
								placeholder={'Message'}
								size={'full'}
								onChange={(value) => {
									this.setState({ message: value });
								}}
								label={'Message'}
							/>
						</div>
					</div>
					<div class="row">
						<div
							class="col-md-12"
							style={{ display: 'flex', justifyContent: 'flex-end' }}
						>
							<Button
								type={'secondary'}
								text={'Back'}
								sizeName={'default'}
								onButtonClick={() => onBackClick()}
							/>
							<Button
								type={'primary'}
								text={'Send'}
								sizeName={'default'}
								onButtonClick={() => onSendClick(formData)}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ContactForm;
