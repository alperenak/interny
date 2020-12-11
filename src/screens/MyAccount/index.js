import React, { Component, Fragment } from "react";

/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";
import LoadingModal from '../../components/LoadingModal'
import Input from "../../components/Input";

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./myaccount.scss";

/*** Styles ***/
import addIcon from "../../icons/add-circular-outlined-white-button.svg";
import logo from "../../assets/interny-logo-white.png";

class myAccountWrapper extends Component {
  state = {
    items: [
      { key: "email", title: "E-mail Address" },
      { key: "password", title: "Password" },
      { key: "name", title: "Name" },
      { key: "accountName", title: "Account Name" },
      { key: "legalName", title: "Legal Name" },
      { key: "surname", title: "Surname" },
      { key: "membershipStatus", title: "Membership" },
      { key: "phone", title: "Phone" },
      { key: "location", title: "Location" },
	  { key: "gradStatus", title: "Graduation Status" },
	  { key: "linkedinUrl", title: "Linkedin Url" },
    ],
    value: "",
	country:"",
	city:"",
	user:{
		location:{},

		university:{}
	},
    processing: true
  };
	async componentDidMount(){
		const userData = await this.props.getUser();
		if(getCookie("user") == "intern"){
			this.setState({
				department:userData.data["university"].department,
				faculty:userData.data["university"].faculty,
				studentNumber:userData.data["university"].studentNumber,
				university:userData.data["university"].university,
				universityMail:userData.data["university"].universityMail,
				country:userData.data["location"].country,
				city:userData.data["location"].city,
				user:userData.data,
				processing:false
			});
		}else{
			this.setState({

				user:userData.data,
				processing:false
			});
		}

	}
  onFileUpload = async (files) => {
    let uploadData = await store.uploadImageType(files[0].type);
    let res = await store.uploadImage(uploadData.url, files[0]);
    if (res) {
      await store.uploadImageKey(uploadData.key);
    }
    const response = await this.props.getUser();
	 this.setState({ user:response.data,processing: false })
  };

  onChangeClick = (item,title = "",value={}) => {
    if (item !== "membershipStatus") {
		if(item == "location"){
			this.props.createModal({
			  header: `Update Location`,
			  content: () => this.renderModalContentLoc("Location"),
			  buttons: this.renderModalButtons("location"),
			});
		}
		else if(item == "university"){
			this.props.createModal({
			  header: `Update University`,
			  content: () => this.renderModalContentUni("University"),
			  buttons: this.renderModalButtons("university"),
			});
		}
		else if(item == "englishUsage"){
			this.props.createModal({
			  header: `English Usage`,
			  content: () => this.renderModalContentUsage("English Usage"),
			  buttons: this.renderModalButtons("englishUsage"),
			});
		}
		else if(item == "mainLanguage"){

			this.props.createModal({
			  header: `Main Language`,
			  content: () => this.renderModalContentMLanguage("Main Language"),
			  buttons: this.renderModalButtons("mainLanguage"),
			});
		}
		else if(item == "sectors"){

			this.props.createModal({
			  header: `Sectors`,
			  content: () => this.renderModalContentSectors("Sectors"),
			  buttons: this.renderModalButtons("sectors"),
			});
		}
		else{
			this.props.createModal({
			  header: `Update ${title}`,
			  content: () => this.renderModalContent(item,value),
			  buttons: this.renderModalButtons(item),
			});
		}

    }
  };
	renderModalContentUsage(title,value){
		return (
			<>
				<Input
					type={"select"}
					id={"englishUsage"}
					label={"English Usage"}
					size={"full"}
					labelDescription={"Choose one below"}

					onChange={(value, slValue) => {
						this.setState({ englishUsage: slValue.key });
					}}
					placeholder={"English Usage"}
					externalSource={[
						{ key: "true", value: "Yes" },
						{ key: "false", value: "No" },
					]}
				/>
			</>

	    );
	}
	renderModalContentMLanguage(title,value){
		return (
			<>
				<Input
					type={"select"}
					id={"mainLanguage"}
					label={"Main Language"}
					size={"full"}
					labelDescription={"Choose one below"}
					onChange={(value, slValue) => {
						this.setState({ mainLanguage: slValue.key });
					}}
					placeholder={"Main Language"}
					externalSource={[
						{ key: "tr", value: "Turkey" },
						{ key: "en", value: "English" },
						{ key: "it", value: "Italian" },
					]}
				/>
			</>

		);
	}
	renderModalContentSectors(title,value){
		return (
			<>
				<Input
					type={"select"}
					id={"sectors"}
					label={"Sectors"}
					size={"full"}
					labelDescription={"Choose one below"}
					onChange={(value, slValue) => {
						this.setState({ sectors: slValue.key });
					}}
					placeholder={"Sectors"}
					externalSource={[
						{ key: "energy", value: "Energy" },
						{ key: "it", value: "IT" },
						{ key: "agency", value: "Agency" },
					]}
				/>
			</>

		);
	}
  renderModalContent(title,value) {
    return (
      <Input
        type={"text"}
        placeholder={`Enter ${title}`}
        size={"full"}
		defaultValue={value}
        onChange={(value) => this.setState({ value })}
      />
    );
  }
  renderModalContentLoc(title) {
    return (
		<>
			<Input
			  type={"text"}
			  placeholder={`Country`}
			  size={"full"}
			  onChange={(value) => this.setState({country:value})}
			  defaultValue={this.state.country}
			/>
			<Input
			  type={"text"}
			  placeholder={`City`}
			  size={"full"}
			  onChange={(value) => this.setState({city:value})}
			  defaultValue={this.state.city}
			/>
		</>

    );
  }
  renderModalContentUni(title) {
    return (
		<>
			<Input
			  type={"text"}
			  placeholder={`department`}
			  size={"full"}
			  onChange={(value) => this.setState({department:value})}
			  defaultValue={this.state.department}
			/>
			<Input
			  type={"text"}
			  placeholder={`Faculty`}
			  size={"full"}
			  onChange={(value) => this.setState({faculty:value})}
			  defaultValue={this.state.faculty}
			/>
			<Input
			  type={"text"}
			  placeholder={`Student Number`}
			  size={"full"}
			  onChange={(value) => this.setState({studentNumber:value})}
			  defaultValue={this.state.studentNumber}
			/>
			<Input
			  type={"text"}
			  placeholder={`University`}
			  size={"full"}
			  onChange={(value) => this.setState({university:value})}
			  defaultValue={this.state.university}
			/>
			<Input
			  type={"text"}
			  placeholder={`University Mail`}
			  size={"full"}
			  onChange={(value) => this.setState({universityMail:value})}
			  defaultValue={this.state.universityMail}
			/>
		</>

    );
  }
  onUpdateClick = async (key) => {
    this.setState({ processing: true });
	var postData = {};

	if(key == "location"){
		postData =  {
			location:{
				city: this.state.city,
				country: this.state.country,
			}
		};
	}
	else if(key == "university"){
		postData =  {
			university:{
				department: this.state.department,
				faculty: this.state.faculty,
				studentNumber: this.state.studentNumber,
				university: this.state.university,
				universityMail: this.state.universityMail,
			}
		};
	}
	else if(key == "englishUsage"){
		postData = {
			englishUsage:this.state.englishUsage
		}
	}
	else if(key == "mainLanguage"){
		postData = {
			mainLanguage:this.state.mainLanguage
		}
	}
	else if(key == "sectors"){
		postData = {
			sectors:this.state.sectors
		}
	}
	else{
		postData[key] = this.state.value;
	}
    if (getCookie("user") === "intern") {

		await store.editIntern(this.props.user.id, key, postData);
    } else {
      await store.editEmployer(this.props.user.id,key,postData);
    }
    this.setState({ value: "" });
    let response = await this.props.getUser();

    if (response) {
      this.setState({ user:response.data,processing: false })
      this.props.closeModal();
    }
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
      text: "Update",
      sizeName: "default",
      onButtonClick: () => this.onUpdateClick(key),
    },
  ];
	render() {
		let { user } = this.props;
		let { items, processing } = this.state;

		let duration = (((user?.Internship?.duration - user?.Internship?.dayLeft) / user?.Internship?.duration) * 100);
		return (
			<>
				{processing && <LoadingModal text={"Loading..."} />}

				<div className={"myAccountWrapper"}>
					<div class="container">
						<div class="row">
							<div class="col-xl-3 col-lg-3 col-md-12">

								<div className={"myAccountWrapper__infoSection row"}>
									<div class="col-xl-12 col-lg-12 col-md-6 myAccountWrapper__photoMargin">
										<Card
											header={{ text: "Profile Photo", position: "start" }}
											type={"photo"}
										>
											<div className={"myAccountWrapper__profileImage"}>
												<div
													v-if={user.avatar || user.logo}
													className={"myAccountWrapper__profileImage__imageContainer"}
												>
													<img src={user.avatar || user.logo} alt={"profile photo"} />
												</div>
												<label
												className={
												user.avatar || user.logo
												? "myAccountWrapper__profileImage__statusCircle"
												: "myAccountWrapper__profileImage__fileInput"
												}
												htmlFor="fileInput"
												>
													<img src={addIcon} alt={"icon"} />
												</label>
												<input
													id={"fileInput"}
													hidden={true}
													accept={"image/*"}
													type={"file"}
													aria-label={""}
													onChange={(e) => this.onFileUpload(e.target.files)}
												/>
											</div>
										</Card>
										<div class="myAccountWrapper__spacer"></div>
									</div>
									<div class="col-xl-12 col-lg-12 col-md-6 myAccountWrapper__internship__margin myAccountWrapper__mobileMargin">
										<Card v-if={user?.Internship} type={'photo'}>
											<div className={"myAccountWrapper__internship"}>
												<div className={"myAccountWrapper__internship__internshipHeader"}>Internship</div>
												<div className={"myAccountWrapper__internship__internshipField"}>
													<span>Position: </span>
													<span className={"value"}>{user?.Internship?.position}</span>
												</div>
												<div className={"myAccountWrapper__internship__internshipField"}>
													<span>Start Date: </span>
													<span className={"value"}>{user?.Internship?.startDate}</span>
												</div>
												<div className={"myAccountWrapper__internship__internshipField"}>
													<span>End Date: </span>
													<span className={"value"}>{user?.Internship?.endDate}</span>
												</div>
												<div className={"myAccountWrapper__internship__internshipField"}>
													<span>Duration: </span>
													<div className={"bar"}>
														<div
														style={{width: duration+'%'}}
														className={"duration"}
														/>
													</div>
												</div>
												<div className={"myAccountWrapper__internship__internshipField"}>
													<span>Day(s) Left: </span>
													<span className={"value"}>{user?.Internship?.dayLeft}</span>
												</div>
												<div className={"myAccountWrapper__internship__internshipField"}>
													<span>Internship Length: </span>
													<span className={"value"}>{user?.Internship?.internshipLength}</span>
												</div>
												<div className={"myAccountWrapper__internship__internshipField"}>
													<span>Overall Score: </span>
													<span className="value">{user?.Internship?.overAllScore}</span>
												</div>
											</div>
										</Card>
									</div>


								</div>
							</div>
							<div class="col-xl-9 col-lg-9 col-md-12 myAccountWrapper__mobileMargin">

								<div class="row" style={{"height":"100%"}}>
									<div class="col-md-12">
										<Card
											type={"myAccount"}
										>
											<>
												<div class="col-md-12">
													<div class="cardHeader start">My Account</div>
												</div>
												<div class="col-md-12">
													<div className={"myAccountWrapperRow"}>
														<div className={"myAccountWrapperRow__title"}>E-mail Address</div>
															<div className={styles.text}>
																{this.state.user["email"]}
															</div>
															<Button
																type={"ghost"}
																sizeName={"small"}
																text={"Update"}
																onButtonClick={() => this.onChangeClick('email',"E-mail Address",this.state.user["email"])}
															/>
													</div>
												</div>
												<div class="col-md-12">
													<div className={"myAccountWrapperRow"}>
														<div className={"myAccountWrapperRow__title"}>Password</div>
															<div className={styles.text}>
																*************
															</div>
															<Button
																type={"ghost"}
																sizeName={"small"}
																text={"Update"}
																onButtonClick={() => this.onChangeClick('password',"Password","")}
															/>
													</div>
												</div>
												{getCookie("user") == "intern" ? (
													<>
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Name</div>
																<div className={styles.text}>
																	{this.state.user["name"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('name',"Name",this.state.user["name"])}
																/>
														</div>
													</div>

													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Surname</div>
																<div className={styles.text}>
																	{this.state.user["surname"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('surname','Surname',this.state.user["surname"])}
																/>
														</div>
													</div>
													</>
												):(null)}

												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Legal Name</div>
																<div className={styles.text}>
																	{this.state.user["legalName"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('legalName',"Legal Name",this.state.user["legalName"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Description</div>
																<div className={styles.text}>
																	{this.state.user["description"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('description','Description',this.state.user["description"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Employee Number</div>
																<div className={styles.text}>
																	{this.state.user["employeeNumber"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('employeeNumber','Employee Number',this.state.user["employeeNumber"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Main Language</div>
																<div className={styles.text}>
																	{this.state.user["mainLanguage"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('mainLanguage','Main Language',this.state.user["mainLanguage"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>English Usage</div>
																<div className={styles.text}>
																	{this.state.user["englishUsage"] ? ("Yes"):("No")}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('englishUsage','English Usage',this.state.user["englishUsage"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Sectors</div>
																<div className={styles.text}>
																	{this.state.user["sectors"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('sectors','Sectors',this.state.user["sectors"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Address</div>
																<div className={styles.text}>
																	{this.state.user["address"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('address','Address',this.state.user["address"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Vat Number</div>
																<div className={styles.text}>
																	{this.state.user["vatNumber"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('vatNumber','Vat Number',this.state.user["vatNumber"])}
																/>
														</div>
													</div>
												):(null)}
												{getCookie("user") == "employer" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Website</div>
																<div className={styles.text}>
																	{this.state.user["websiteUrl"]}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('websiteUrl','Website',this.state.user["websiteUrl"])}
																/>
														</div>
													</div>
												):(null)}
												<div class="col-md-12">
													<div className={"myAccountWrapperRow"}>
														<div className={"myAccountWrapperRow__title"}>Membership</div>
															<div className={styles.text}>
																{this.state.user["membershipStatus"]}
															</div>
															<Button
																type={"ghost"}
																sizeName={"small"}
																text={"Update"}
																onButtonClick={() => this.onChangeClick('membershipStatus')}
															/>
													</div>
												</div>
												<div class="col-md-12">
													<div className={"myAccountWrapperRow"}>
														<div className={"myAccountWrapperRow__title"}>Phone</div>
															<div className={styles.text}>
																{this.state.user["phone"]}
															</div>
															<Button
																type={"ghost"}
																sizeName={"small"}
																text={"Update"}
																onButtonClick={() => this.onChangeClick('phone','Phone',this.state.user["phone"])}
															/>
													</div>
												</div>
												{getCookie("user") == "intern" ? (
													<div class="col-md-12">
														<div className={"myAccountWrapperRow"}>
															<div className={"myAccountWrapperRow__title"}>Location</div>
																<div className={styles.text}>
																	{this.state.user["location"].country + "-"+ this.state.user["location"].city}
																</div>
																<Button
																	type={"ghost"}
																	sizeName={"small"}
																	text={"Update"}
																	onButtonClick={() => this.onChangeClick('location','Location',this.state.user["location"])}
																/>
														</div>
													</div>
												):(null)}

													{getCookie("user") == "intern" ? (
														<div class="col-md-12">
															<div className={"myAccountWrapperRow"}>
																<div className={"myAccountWrapperRow__title"}>University</div>
																	<div className={styles.text}>
																		{this.state.user["university"].university}
																	</div>
																	<Button
																		type={"ghost"}
																		sizeName={"small"}
																		text={"Update"}
																		onButtonClick={() => this.onChangeClick('university','University',this.state.user["university"])}
																	/>
															</div>
														</div>
													):(null)}
													{getCookie("user") == "intern" ? (
														<div class="col-md-12">
															<div className={"myAccountWrapperRow"}>
																<div className={"myAccountWrapperRow__title"}>Graduation Status</div>
																	<div className={styles.text}>
																		{this.state.user["gradStatus"]}
																	</div>
																	<Button
																		type={"ghost"}
																		sizeName={"small"}
																		text={"Update"}
																		onButtonClick={() => this.onChangeClick('gradStatus','Graduation Status',this.state.user["gradStatus"])}
																	/>
															</div>
														</div>
													):(null)}


												<div class="col-md-12">
													<div className={"myAccountWrapperRow"}>
														<div className={"myAccountWrapperRow__title"}>Linkedin</div>
															<div className={styles.text}>
																{this.state.user["linkedinUrl"]}
															</div>
															<Button
																type={"ghost"}
																sizeName={"small"}
																text={"Update"}
																onButtonClick={() => this.onChangeClick('linkedinUrl','Linkedin',this.state.user["linkedinUrl"])}
															/>
													</div>
												</div>
											</>
										</Card>
									</div>

								</div>

							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default myAccountWrapper;
