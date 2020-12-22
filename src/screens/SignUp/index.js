import React, { Component } from "react";
/*** Components ***/
import styles from "./signup.scss";
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative";
import store from "../../store";

class SignUp extends Component {
	async componentDidMount(){
		if(this.props.match.params.code != ""){
			var linkCode = await store.sendRefCode(this.props.match.params.code);
		}
	}
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
