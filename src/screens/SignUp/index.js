import React, { Component } from "react";
/*** Components ***/
import styles from "./signup.scss";
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative";

class SignUp extends Component {
  render() {
    return (
		<div style={{"background":"#f6f8fa"}}>
		<div class="container">
  			<div class="row">
  				<div class="col-md-12">
        			<Card type={"auth"} {...this.props} />
      			</div>
			</div>
		</div>
		<FooterAlternative />
		</div>
    );
  }
}

export default SignUp;
