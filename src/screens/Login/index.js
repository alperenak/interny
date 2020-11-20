import React, { Component } from "react";
import styles from "./login.scss";
/*** Components ***/
import Card from "../../components/Card";

	class Login extends Component {
		render() {
			return (
				<div class="loginWrapper">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<Card type={"login"} {...this.props} />
						</div>
					</div>
				</div>
				</div>

			);
		}
	}

export default Login;
