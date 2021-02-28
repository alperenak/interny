import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import { TagInput } from 'reactjs-tag-input'
import store from "../../store";
import {getCookie} from "../../utils/cookie";
import referralBg from "../../assets/referral_bg.png";
import "./style.scss";


class Referrals extends Component {
	constructor(props) {
	   super(props);
	   this.state = {
		   tags: [],
		   refLink:{},
		   copied:false,
		   page:0,
		   menu: [
	         {
	           key: 'Invite',
	           value: 'Invite',
	           selected: true,
	           to: '/referrals',
	           onChange: () => this.setState({ page: 0 }),
	         },
	         {
	           key: 'Referrals',
	           value: 'Referrals',
	           selected: false,
	           to: '/referrals',
	           onChange: () => this.setState({ page: 1 }),
	         },
	         {
	           key: 'Income',
	           value: 'Income',
	           selected: false,
	           to: '/referrals',
	           onChange: () => this.setState({ page: 2 }),
	         }
	       ],
	   }
	   this.onTagsChanged = this.onTagsChanged.bind(this);
    }
	async componentDidMount(){
		const userData = await this.props.getUser();
		var linkCode = await store.getLinkCode(userData.data.id);
		this.setState({
			refLink: linkCode.data
		});
	}
	onTagsChanged(tags) {
	  this.setState({tags:tags})
    }
	async sendEmail(){
		const self = this;
		var linkCode = await store.sendEmailRef(this.state.tags);
		if(linkCode.data == "OK"){
			this.setState({
				sendEmail: true
			});
			setTimeout(function(){
				self.setState({
					sendEmail: false
				});
			},1000)
		}
	}
	copyLink(){
		const self = this;
		var textField = document.createElement('textarea')
	   textField.innerText = this.state.refLink.link
	   document.body.appendChild(textField)
	   textField.select();
	   document.execCommand('copy')
	   textField.remove();
	   this.setState({
		   copied:true
	   });
	   setTimeout(function(){
		   self.setState({
			  copied:false
		  });
	   },1000);
	}
	withRequest(){
		this.props.createModal({
		  header: `Withdrawal Request`,
		  content: () => this.renderModalContentUni("University"),
		  buttons: this.renderModalButtons("university"),
		});
	}
	renderModalButtons = (key) => [
      {
        type: "ghost",
        text: "Cancel",
        sizeName: "default",
        onButtonClick: () => this.props.closeModal(),
      },
      {
        type: "primary",
        text: "SEND",
        sizeName: "default",
        onButtonClick: () => this.onUpdateClick(),
      },
    ];
	onUpdateClick(){
		this.props.closeModal();
		this.props.createModal({
          header: "Success",
          declaration: "Withdrawal request received successfully",
          buttons: [
            {
              type: "primary",
              text: "OK",
              sizeName: "default",
              onButtonClick: () => {
                this.props.closeModal();
              },
            },
          ],
        });
	}
	renderModalContentUni(title) {
	  return (
		  <>
			  <Input
				type={"text"}
				placeholder={`Name Surname`}
				size={"full"}
				onChange={(value) => this.setState({department:value})}
				defaultValue={this.state.department}
			  />
			  <Input
				type={"text"}
				placeholder={`IBAN`}
				size={"full"}
				onChange={(value) => this.setState({faculty:value})}
				defaultValue={this.state.faculty}
			  />
			  <Input
				type={"text"}
				placeholder={`Amount`}
				size={"full"}
				onChange={(value) => this.setState({studentNumber:value})}
				defaultValue={this.state.studentNumber}
			  />

		  </>

	  );
	}
    render() {
        return (
			<>

				<div class="referrals">
					<div class="container">
						<div class="row">
							<div class="col-md-3">
								<Card
									type={'list'}
									externalData={this.state.menu}
								/>
							</div>
							<div class="col-md-9">
								{this.state.page == 0 &&
									<div class="referrals__bg">
										<div class="row">
											<div class="col-md-12" style={{"text-align":"center"}}>
												<p class="referrals__title">Invite and get up 100% OFF</p>
												<p class="referrals__desc">Invite your friends and win discounts when they subscribe.When 5 of your friends subscribe your <b>subscription is free!</b></p>
											</div>
										</div>
										<div class="row" style={{"margin-top":"20px"}}>
											<div class="col-md-12" style={{"display":"flex","justify-content":"center"}}>
												<TagInput wrapperStyle={`width: 100%;background:white;`} inputStyle={`background:white;`} tags={this.state.tags} onTagsChanged={this.onTagsChanged} placeholder="Enter email addresses" />
												<div style={{"margin-top":"140px"}}>
													<Button
														type='primary'
														width={"100px"}
														text={this.state.sendEmail ? ('SENT'):('SEND')}
														onButtonClick={() => this.sendEmail()}
													/>
												</div>
											</div>

										</div>
										<div class="row" style={{"margin-top":"50px"}}>
											<div class="referrals__linkBox">
												<div class="row" style={{"align-items":"center"}}>
													<div class="col-md-9">
														<Input
															label={'Share Your Link'}
															type="text"
															size={'large'}
															placeholder="Share Your Link"
															disabled
															defaultValue={this.state.refLink.link}
															onChange={internLastName => this.setState({ internLastName })}
														/>
													</div>
													<div class="col-md-3">
														<div style={{"margin-top":"40px"}}>
															<Button
																type='primary'
																width={"100px"}
																text={this.state.copied ? ('COPIED!'):('COPY LINK')}
																onButtonClick={() =>this.copyLink()}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								}
								{this.state.page == 1 &&
									<div class="referrals__bg">
										<div class="row">
										<table class="table">
											<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">E-Mail</th>
											</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row">1</th>
													<td>Ekr......</td>
													<td>ekre.....@...com</td>
												</tr>
												<tr>
													<th scope="row">2</th>
													<td>Ekr......</td>
													<td>ekre.....@...com</td>
												</tr>
												<tr>
													<th scope="row">3</th>
													<td>Ekr......</td>
													<td>ekre.....@...com</td>
												</tr>
											</tbody>
										</table>
										</div>
									</div>
								}
								{this.state.page == 2 &&
									<div class="referrals__bg">
										<div class="row">
											<Button
												type='primary'

												text={'WITHDRAWAL REQUEST'}
												onButtonClick={() =>this.withRequest()}
											/>
										</div>
										<div class="row">
											<div class="col-md-4">
												<div class="referrals__infoBox">
													<span>GELİR</span>
													<span>40 $</span>
												</div>
											</div>
											<div class="col-md-4">
												<div class="referrals__infoBox">
													<span>SATILAN PAKET</span>
													<span>100</span>
												</div>
											</div>
											<div class="col-md-4">
												<div class="referrals__infoBox">
													<span>KULLANICI</span>
													<span>120</span>
												</div>
											</div>
										</div>
										<div class="row" style={{"margin-top":"50px"}}>
											<div class="col-md-12">
												<table class="table">
													<thead>
														<tr>
															<th scope="col">#</th>
															<th scope="col">Name</th>
															<th scope="col">E-Mail</th>
															<th scope="col">Earnings</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<th scope="row">1</th>
															<td>Ekr......</td>
															<td>ekre.....@...com</td>
															<td>1 $</td>
														</tr>
														<tr>
															<th scope="row">2</th>
															<td>Ekr......</td>
															<td>ekre.....@...com</td>
															<td>1 $</td>
														</tr>
														<tr>
															<th scope="row">3</th>
															<td>Ekr......</td>
															<td>ekre.....@...com</td>
															<td>1 $</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								}
							</div>
						</div>



					</div>
				</div>
				<Footer />
			</>
        );
    }
}

export default Referrals;
