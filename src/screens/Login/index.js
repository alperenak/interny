import React, { Component } from "react";
import styles from "./login.scss";
/*** Components ***/
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative";

class Login extends Component {
	render() {
		return (
			<div className="pageWrapper">
				<div className="loginWrapper">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<Card type={"login"} {...this.props} />
							</div>
						</div>
					</div>
				</div>
				<FooterAlternative />
			</div>
		);
	}
}

export default Login;
