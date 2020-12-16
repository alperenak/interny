import React, { Component } from "react";
/*** Components ***/
import styles from "./signup.scss";
import http from "../../utils/httpHelper";
import config from "../../../appConfig";
const errorMessageBuilder = (response) => {
  return (response.errorData && response.errorData.code) || "0";
};
class Verification extends Component {
	async componentDidMount(){
		let baseUrl = config.baseUrl;
	    let tokenCookieName = "token";
	    let path = `/register/verification`;
	    const response = await http.makePostRequest(
			path,
			baseUrl,
			tokenCookieName,
			{
				verificationCode:this.props.match.params.code
			},
			errorMessageBuilder
	    );
		if(response.status == 200){
			this.props.createModal({
				header: "Success",
				declaration: "Your account has been approved.",
					buttons: [
					{
						type: "primary",
						text: "OK",
						sizeName: "default",
						onButtonClick: () => {
							this.props.closeModal();
							window.location.pathname = `/`;
						},
					},
				],
			});
		}else{
			this.props.createModal({
				header: "Error",
				declaration: "Your account was not approved.",
					buttons: [
					{
						type: "primary",
						text: "OK",
						sizeName: "default",
						onButtonClick: () => {
							this.props.closeModal();
							window.location.pathname = `/`;
						},
					},
				],
			});
		}
	}
	render() {
		return (
			<div style={{"background":"#f6f8fa"}}>

			</div>
		);
	}
}

export default Verification;
