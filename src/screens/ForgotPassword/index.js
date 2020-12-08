import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";

import FooterAlternative from "../../components/FooterAlternative";
import LoadingModal from "../../components/LoadingModal";
import Input from "../../components/Input";
import Button from "../../components/Button";
import store from "../../store";
import handshake from "../../assets/gift-bg.jpg";
import discover from "../../icons/discover.svg";
import styles from './style.scss';
class ForgotPassword extends Component {
	state = {
		tab:"interny",
		processing:false,
		value:""
	}

    render() {
        return (
			<div class="forgotPasswordWrapper">

				<LoadingModal text="Loading" v-if={this.state.processing} />
				<div class="forgotPassword">
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div className={"forgotPassword__header"}>Forgot Password</div>
								<div className={"forgotPassword__description"}>
									Enter the e-mail address associated with your Interny account. We will send you a reset email so that you can reset your password.
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<Input
									label={'E-mail Address'}
									type="text"
									size={'large'}
									placeholder="Enter e-mail address"
									onChange={value => this.setState({ value })}
								/>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<Button text={'Send Password'} type={'secondary'} onButtonClick={async () => await this.onClick()} />
							</div>
						</div>
					</div>
				</div>


				<FooterAlternative />
			</div>
        );
    }
}

export default ForgotPassword;
