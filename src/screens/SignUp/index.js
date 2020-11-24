import React, { Component } from "react";
/*** Components ***/
import styles from "./signup.scss";
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative";

class SignUp extends Component {
  render() {
    return (
		<>
		<div class="container">
  			<div class="row">
  				<div class="col-md-12">
        			<Card type={"auth"} {...this.props} />
      			</div>
			</div>
		</div>
		<FooterAlternative />
		</>
    );
  }
}

export default SignUp;
