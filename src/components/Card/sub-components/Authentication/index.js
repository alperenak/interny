import React, { Component } from "react";
import { Redirect } from "react-router-dom";

/*** Components ***/
import Button from "../../../Button";
import PhoneInput from "react-phone-number-input";
import ForgotPassword from "../ForgotPassword";

/*** Styles ***/
import styles from "./authentication.scss";
import Input from "../../../Input";

/*** Icons ***/
import loginImage from "../../../../assets/login.png";
import loginUniImage from "../../../../assets/university.jpg";
import loginEmpImage from "../../../../assets/company.jpg";
import backIcon from "../../../../icons/arrow-back-outline.svg";
import closeIcon from "../../../../icons/close-outline.svg";
import infoIcon from "../../../../icons/information.svg";
import googleIcon from "../../../../icons/google-icon.svg";
import facebookIcon from "../../../../icons/facebook-icon.svg";
import facebookWhiteIcon from "../../../../icons/facebook-icon-white.svg";

/*** Utils ***/
import store from "../../../../store";
import { getCookie, setCookie } from "../../../../utils/cookie";
import CourseDetail from "../../../../screens/CourseDetail";

class Authentication extends Component {
  state = {
    getAdditionalInfo: false,
    googleIcon: googleIcon,
    facebookIcon: facebookIcon,
    googleStyles: "google",
    facebookStyles: "facebook",
    page: "Intern",
    submitObject: {},
    buttons: [
      {
        disabled: false,
        sizeName: "default",
        text: this.props.type === "auth" ? "Create Account" : "Login",
        width: this.props.type === "auth" ? "120px" : "50px",
        loading: false,
        type: "secondary",
        onButtonClick: async () => this.onContinueClick(),
      },
    ],
    loginInputs: [
      {
        key: "email",
        label: "E-mail addrees",
        placeholder: "Enter e-mail address",
        errorList: [],
        type: "text",
        sizeName: "t-quarter",
      },
      {
        key: "password",
        label: "Password",
        placeholder: "Enter password",
        errorList: [],
        type: "password",
        sizeName: "t-quarter",
      },
      {
        disabled: false,
        sizeName: "small",
        text: "Forgot your password?",
        type: "link",
        onButtonClick: () => {
          window.location.href="/ForgotPassword";
        },
      },
    ],
    authInputs: [
      {
        key: "name",
        label: "Name",
        placeholder: "Enter name",
        errorList: [],
        type: "text",
        sizeName: "t-quarter",
        value: "",
      },
      {
        key: "surname",
        label: "Surname",
        placeholder: "Enter surname",
        errorList: [],
        type: "text",
        sizeName: "t-quarter",
        value: "",
      },
      {
        key: "email",
        label: "E-mail addrees",
        placeholder: "Enter e-mail address",
        disclaimer: "* University e-mail is preferred.",
        errorList: [],
        type: "text",
        sizeName: "t-quarter",
        value: "",
      },
      {
        key: "password",
        label: "Password",
        placeholder: "Enter password",
        errorList: [],
        type: "password",
        sizeName: "t-quarter",
        value: "",
      },
      {
        label: `By joining you agree to the`,
        type: "checkbox",
        sizeName: "full",
        clickable: " Terms and Conditions",
        value: "checkboxStatus",
        onClick: () => {
          window.location.href="/terms";
        },
      },
      {
        label: `By joining you agree to the`,
        type: "checkbox",
        sizeName: "full",
        clickable: " Privacy Policy",
        value: "checkboxStatus",
        onClick: () => {
          window.location.href="/privacy";
        },
      },
    ],
    university: "",
    faculty: "",
    department: "",
    uni_mail: "",
    student_number: "",
    phone: "",
    graduation_status: "",
    country: "",
    city: "",
    token: null,
    isInProgram: false,
    user: null,
    user_id: null,
    terms: false,
    privacyPolicy: false,
    checkboxStatus: false,
    forgotPasswordMode: false,
  };

  componentDidMount() {
    this.setInputChangeMethods();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Object.is(prevState.authInputs, this.state.authInputs)) {
      this.setInputChangeMethods();
    }
  }

  onClickTerms = () => {
    this.setState({ terms: true });
  };

  onClickPrivacyPolicy = () => {
    this.setState({ privacyPolicy: true });
  };

  onOutsideClickTerms = () => {
    this.setState({ terms: false });
  };

  onOutsideClickPrivacyPolicy = () => {
    this.setState({ privacyPolicy: false });
  };

  onContinueClick = async () => {
    this.setState((state) => {
      state.buttons.map((btn) => {
        btn.loading = true;
        return btn;
      });
      return state;
    });
    if (this.props.type === "auth") {
      if (this.state.page === "Employer") {
        await this.onCreateEmployer();
      } else await this.onCreateIntern();
    } else {
      await this.onLogin();
    }
  };

  onCreateIntern = async () => {
    let res = await store.internSignUp(this.state.submitObject);
    this.setState((state) => {
      state.buttons.map((btn) => {
        btn.loading = false;
        return btn;
      });
      return state;
    });
    if (res.status === 200) {
      this.props.createModal({
        header: "Success",
        declaration: "The account has been created successfully!",
        buttons: [
          {
            type: "primary",
            text: "OK",
            sizeName: "default",
            onButtonClick: () => {
              this.props.closeModal();
              window.location.pathname = `/login/${this.state.page.toLowerCase()}`;
            },
          },
        ],
      });
    }
  };

  onCreateEmployer = async () => {
    let res = await store.employerSignUp(this.state.submitObject);
    this.setState((state) => {
      state.buttons.map((btn) => {
        btn.loading = false;
        return btn;
      });
      return state;
    });
    if (res.status === 200) {
      this.props.createModal({
        header: "Success",
        declaration: "The account has been created successfully!",
        buttons: [
          {
            type: "primary",
            text: "OK",
            sizeName: "default",
            onButtonClick: () => {
              this.props.closeModal();
              window.location.pathname = `/login/${this.state.page.toLowerCase()}`;
            },
          },
        ],
      });
    }
  };

  onLogin = async () => {
    let res = {};
    if (this.props.match.params.user.toLowerCase() === "employer") {
      res = await store.employerLogin(this.state.submitObject);
    } else if (this.props.match.params.user.toLowerCase() === "intern") {
      res = await store.internLogin(this.state.submitObject);
    } else if (this.props.match.params.user.toLowerCase() === "university") {
      res = await store.universityLogin(this.state.submitObject);
    }
    if (res && res.data.token) {
      if (res.status) {
        this.setState((state) => {
          state.buttons.map((btn) => {
            btn.loading = false;
            return btn;
          });
          return state;
        });
        this.setState({
          token: res.data.token,
          user: this.props.match.params.user.toLowerCase(),
          user_id: res.data.id,
          isInProgram: !!res?.data?.Internship,
        });

        if (res.data.user_type === "employer") {
          setCookie("token", res.data.token, {});
          setCookie("user", this.props.match.params.user.toLowerCase(), {});
          setCookie("user_id", res.data.id, {});
          setCookie("isInProgram", !!res?.data?.Internship, {});
          window.location.pathname = `/`;
        } else if (res.data.isCompleted) {
          setCookie("token", res.data.token, {});
          setCookie("user", this.props.match.params.user.toLowerCase(), {});
          setCookie("user_id", res.data.id, {});
          setCookie("isInProgram", !!res?.data?.Internship, {});
          window.location.pathname = `/`;
        } else if (!res.data.isCompleted) {
          this.setState({ getAdditionalInfo: true });
        }
      }
    } else {
      this.props.createModal({
        header: res.data.title,
        declaration: res.data.message,
        buttons: [
          {
            type: "primary",
            text: "OK",
            sizeName: "default",
            onButtonClick: () => this.props.closeModal(),
          },
        ],
      });
      this.setState((state) => {
        state.buttons.map((btn) => {
          btn.loading = false;
          return btn;
        });
        return state;
      });
    }
  };

  onSwitchPage = (page) => {
    if (this.props.type === "auth") {
      if (page === "Employer") {
        this.setState((state) => {
          let name = state.authInputs.find((e) => e.key === "name");
          let surname = state.authInputs.find((e) => e.key === "surname");
          let email = state.authInputs.find((e) => e.key === "email");
          name.key = "legalName";
          surname.key = "accountName";
          name.label = "Legal Name";
          surname.label = "Account Name";
          name.placeholder = "Enter Legal Name";
          surname.placeholder = "Enter Account Name";
          email.disclaimer = null;

          return state;
        });
      } else {
        this.setState((state) => {
          let name = state.authInputs.find((e) => e.key === "legalName");
          let surname = state.authInputs.find((e) => e.key === "accountName");
          let email = state.authInputs.find((e) => e.key === "email");
          name.key = "name";
          surname.key = "surname";
          name.label = "Name";
          surname.label = "Surname";
          name.placeholder = "Enter Name";
          surname.placeholder = "Enter Surname";
          email.disclaimer = "* University e-mail is preferred.";

          return state;
        });
      }
    }
    this.setState({ page: page });
  };

  onInputChange = (key, value) => {
    if (value.hasOwnProperty("checkboxStatus")) {
      return this.setState({ checkboxStatus: value.checkboxStatus });
    }
    this.setState({
      submitObject: { ...this.state.submitObject, [key]: value },
    });
  };

  onCompleteAccount = async () => {
    let {
      university,
      faculty,
      department,
      uni_mail,
      student_number,
      phone,
      graduation_status,
      country,
      city,
    } = this.state;
    let valid = false;

    if (
      university == "" ||
      faculty == "" ||
      department == "" ||
      uni_mail == "" ||
      student_number == "" ||
      graduation_status == "" ||
      country == "" ||
      city == ""
    ) {
      valid = false;
    } else {
      valid = true;
    }

    if (!valid) {
      return this.props.createModal({
        header: "Error",
        declaration: "Please fill all the fields!",
        buttons: [
          {
            type: "primary",
            text: "OK",
            sizeName: "default",
            onButtonClick: () => this.props.closeModal(),
          },
        ],
      });
    }

    let payload = {
      university: {
        university,
        faculty,
        department,
        universityMail: uni_mail,
        studentNumber: student_number,
      },
      phoneCode:this.state.phoneCode,
	  phoneNumber:this.state.phoneNumber,
      gradStatus: graduation_status,
      location: {
        country,
        city,
      },
    };

    setCookie("token", this.state.token, {});
    setCookie("user", this.state.user, {});
    setCookie("user_id", this.state.user_id, {});
    setCookie("isInProgram", this.state.isInProgram, {});
    let user_id = this.state.user_id;
    let response = await store.completeRegistration(user_id, payload);

    if (response) {
      this.setState({ getAdditionalInfo: false });
      window.location.pathname = `/`;
    }
  };

  closeModal = () => {
    this.setState({ forgotPasswordMode: false });
  };
  setInputChangeMethods = () => {
    this.setState((state) => {
      state.loginInputs.map((e) => {
        e.onChange = (value) => this.onInputChange(e.key, value);
      });
      state.authInputs.map((e) => {
        e.onChange = (value) => this.onInputChange(e.key, value);
      });

      return state;
    });
  };

  renderForgotPasswordContent() {
    return (
      <Input
        type={"text"}
        label={"E-mail Address"}
        placeholder={`Enter e-mail address`}
        size={"t-quarter"}
        onChange={(value) => this.setState({ value })}
      />
    );
  }

  renderForgotPasswordButtons = () => [
    {
      type: "secondary",
      text: "Send password",
      sizeName: "small",
      onButtonClick: () => this.props.closeModal(),
    },
  ];

  renderAdditionalInfo = () => {
    let {
      university,
      faculty,
      department,
      uni_mail,
      student_number,
      phone,
      graduation_status,
      country,
      city,
    } = this.state;

		return (
			<div className={"advancedSearchDropdown"}>
				<div class="row">
					<div class="col-md-12">
						<div
							className={"backButton"}
							onClick={() => {
							this.setState({ getAdditionalInfo: false });
							}}
						>
							<img src={backIcon} alt="" />
						</div>
						<div className={`${"arow"} ${"big_header"}`}>
							Complete Your Account
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div className={`${"arow"} ${"header"}`}>
							University Information
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<Input
						type={"text"}
						placeholder={"Ankara University"}
						size={"full"}
						defaultValue={university !== "null" ? university : ""}
						onChange={(value) => this.setState({ university: value })}
						label={"University"}
						/>
					</div>
					<div class="col-md-4">
						<Input
						type={"text"}
						placeholder={"Engineering Faculty"}
						size={"full"}
						defaultValue={faculty !== "null" ? faculty : ""}
						onChange={(value) => this.setState({ faculty: value })}
						label={"Faculty"}
						/>
					</div>
					<div class="col-md-4">
						<Input
						type={"text"}
						placeholder={"Computer Science"}
						size={"full"}
						defaultValue={department !== "null" ? department : ""}
						onChange={(value) => this.setState({ department: value })}
						label={"Department"}
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<Input
						type={"text"}
						placeholder={"example@uni.edu.tr"}
						size={"full"}
						defaultValue={uni_mail !== "null" ? uni_mail : ""}
						onChange={(value) => this.setState({ uni_mail: value })}
						label={"University Mail"}
						/>
					</div>
					<div class="col-md-6">
						<Input
						type={"text"}
						placeholder={"18264155"}
						size={"full"}
						defaultValue={student_number !== "null" ? student_number : ""}
						onChange={(value) => {
						this.setState({ student_number: value });
						}}
						label={"Student Number"}
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div className={`${"arow"} ${"header"}`}>
						Personal Information
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="row">
							<div class="col-md-4">
								<Input
								  type={"text"}
								  placeholder={`Phone Code(+90)`}
								  size={"full"}
								  onChange={(value) => this.setState({phoneCode:value})}
								  defaultValue={this.state.phoneCode}
								/>
							</div>
							<div class="col-md-8">
								<Input
								  type={"text"}
								  placeholder={`Phone`}
								  size={"full"}
								  onChange={(value) => this.setState({phoneNumber:value})}
								  defaultValue={this.state.phoneNumber}
								/>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<Input
						type={"select"}
						label={"Graduation Status"}
						size={"full"}
						onChange={(value, slValue) => {
						this.setState({ graduation_status: slValue.value });
						}}
						externalSource={[
						{ key: "Student", value: "Student", selected: true },
						{ key: "Newly Graduated", value: "Newly Graduated" },
						]}
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<Input
						type={"text"}
						placeholder={"Turkey"}
						size={"full"}
						defaultValue={country !== "null" ? country : ""}
						onChange={(value) => this.setState({ country: value })}
						label={"Country"}
						/>
					</div>
					<div class="col-md-6">
						<Input
						type={"text"}
						placeholder={"Istanbul"}
						size={"full"}
						defaultValue={city !== "null" ? city : ""}
						onChange={(value) => {
						this.setState({ city: value });
						}}
						label={"City"}
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div className={"advancedSearch__send-button"}>
							<Button
								type={"secondary"}
								text={"Complete Account"}
								sizeName={"large"}
								onButtonClick={this.onCompleteAccount}
							/>
						</div>
					</div>
				</div>
			</div>
		);
  };

  renderAuth = () => {
    let { type } = this.props;
    let { page, buttons, authInputs, loginInputs } = this.state;
    return (
		<div class={"row authWrapper " + type}>
			<div class={"col-md-6"} style={{"padding-left":0}}>
				<div v-if={type === "login"} className={"imgContainer"}>
					<div className={"shadow " + this.props.match.params.user.toLowerCase()}>

					</div>
				</div>
				<div
					v-if={
						type === "login" &&
						this.props.match.params.user.toLowerCase() === "university"
					}
					className={"info"}
				>
					<img src={infoIcon} alt={"icon"} />
					<div className={"mutedText"}>
						Intern tracking accounts for all universities were created
						automatically as “interny@YOURUNIVERSITY.edu” or
						“interny@YOURUNIVERSITY.edu.YOURCOUNTRY”.
						<br />
						If you are going to login for the first time in INTERNY, you must
						first create an e-mail account in your university mail server as
						“interny@YOURUNIVERSITY.edu” or
						“interny@YOURUNIVERSITY.edu.YOURCOUNTRY”.
						<br />
						Afterwards, click on the “Forgot your password?” and send your
						interns' tracking account password to your university e-mail
						account.
					</div>
				</div>
			</div>
			<div class={type === "login" ? ("col-md-6"):("col-md-8")}>
				<div className="inputs_container">
					<div v-if={type === "auth"} className={"switchButtons"}>
						<div onClick={() => page === "Employer" && this.onSwitchPage("Intern")} className={`${"switchButton"} ${"internButton"} ${page === "Intern" ? "activeButton" : ""}`}>
							Intern
					  	</div>
					  	<div onClick={() => page === "Intern" && this.onSwitchPage("Employer")} className={`${"switchButton"} ${"employerButton"} ${page === "Employer" ? "activeButton" : ""}`}>
							Company
					    </div>
					</div>
					<div className={"authHeader"}>
						<div className={"headerText"}>
							{type === "auth" ? page === "Employer" ? "Company" : page : "Log In"}
						</div>
						<div v-if={type === "auth"} className={"description"}>
							New to Interny? Create free account
						</div>
						<div v-if={type !== "auth"} className={"description"}>
							Log in Interny as{" "}
							{this.props.match.params.user === "Employer"
							? "Company"
							: this.props.match.params.user}
						</div>
					</div>
					{type === "login" ? loginInputs.map((inp, i) => {
						if (inp.type === "link") {
							return (
								<div key={i} className={"inputsContainer"}>
									<Button
										className={`${"inputsContainer"}`}
										type={inp.type}
										width={inp.width}
										disabled={inp.disabled}
										sizeName={inp.sizeName}
										responsive={inp.responsive}
										text={inp.text}
										onButtonClick={inp.onButtonClick}
									/>
								</div>
						  	);
						}
						return (
							<Input
								className={`${"inputsContainer"}`}
								v-if={inp.type !== "link"}
								size={inp.sizeName}
								key={i}
								label={inp.label}
								onKeyDown={(e) => {
									if (e.keyCode === 13) this.onContinueClick();
								}}
								placeholder={inp.placeholder}
								errorList={inp.errorList}
								type={inp.type}
								onChange={inp.onChange}
							/>
						);
					}) : authInputs.map((inp, i) => {
						return (
							<Input
								className={`${"inputsContainer"}`}
								v-if={inp.type !== "link"}
								size={inp.sizeName}
								key={i}
								onKeyDown={(e) => {
									if (e.keyCode === 13) this.onContinueClick();
								}}
								label={inp.label}
								placeholder={inp.placeholder}
								errorList={inp.errorList}
								type={inp.type}
								onChange={inp.onChange}
								responsive={inp.responsive}
								disclaimer={inp.disclaimer}
								clickable={inp.clickable}
								onClick={inp.onClick}
								value={inp.value}
							/>
						);
					})}
					<div className={"saveButtonContainer"}>
						<Button
							v-for={(btn, i) in buttons}
							key={"btn" + i}
							type={btn.type}
							disabled={type === "auth" && !this.state.checkboxStatus}
							sizeName={btn.sizeName}
							width={btn.width}
							loading={btn.loading}
							text={btn.text}
							onButtonClick={btn.onButtonClick}
						/>
					</div>
        </div>
			</div>
		</div>
    );
  };

  renderTerms = () => {
    return (
      <div className={"modal_outer"} onClick={this.onOutsideClickTerms}>
        <div className={"modal"}>
          <div className={"closeModalButton"}>
            <img src={closeIcon} alt="" />
          </div>
          <div className={"header"}>Terms and Conditions</div>
          <div className={"content"}>
            <p className={"p1"}> Last updated: October 10, 2020</p>
            <p className={"p1"}>Please read these terms and conditions carefully before using Our Service.</p>
            <p className={"p2"}><span className={"s1"}>Interpretation and Definitions</span></p>
            <p className={"p3"}><strong>Interpretation</strong></p>
            <p className={"p1"}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <p className={"p3"}><strong>Definitions</strong></p>
            <p className={"p1"}>For the purposes of these Terms and Conditions:</p>
            <p className={"p4"}><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named INTERNY App</p>
            <p className={"p4"}><strong>Application Store</strong> means the digital distribution service operated and developed by Apple Inc. (Apple App Store) or Google Inc. (Google Play Store) in which the Application has been downloaded.</p>
            <p className={"p4"}><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
            <p className={"p4"}><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
            <p className={"p4"}><strong>Country</strong> refers to: California, United States</p>
            <p className={"p4"}><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to INTERNY INC., 350 Oakmead Pkwy, Sunnyvale, 94085, CA.</p>
            <p className={"p4"}><strong>Content</strong> refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.</p>
            <p className={"p4"}><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
            <p className={"p4"}><strong>Feedback</strong> means feedback, innovations or suggestions sent by You regarding the attributes, performance or features of our Service.</p>
            <p className={"p4"}><strong>Goods</strong> refer to the items offered for sale on the Service.</p>
            <p className={"p4"}><strong>In-app Purchase</strong> refers to the purchase of a product, item, service or Subscription made through the Application and subject to these Terms and Conditions and/or the Application Store&apos;s own terms and conditions.</p>
            <p className={"p4"}><strong>Orders</strong> mean a request by You to purchase Goods from Us.</p>
            <p className={"p4"}><strong>Promotions</strong> refer to contests, sweepstakes or other promotions offered through the Service.</p>
            <p className={"p4"}><strong>Service</strong> refers to the Application or the Website or both.</p>
            <p className={"p4"}><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</p>
            <p className={"p4"}><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.</p>
            <p className={"p4"}><strong>Website</strong> refers to INTERNY Website, accessible from <a href="https://www.interny.net">https://www.interny.net</a></p>
            <p className={"p4"}><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            <p className={"p2"}><span className={"s1"}>Acknowledgment</span></p>
            <p className={"p1"}>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
            <p className={"p1"}>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
            <p className={"p1"}>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>
            <p className={"p1"}>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>
            <p className={"p1"}>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>
            <p className={"p2"}><span className={"s1"}>Placing Orders for Goods</span></p>
            <p className={"p1"}>By placing an Order for Goods through the Service, You warrant that You are legally capable of entering into binding contracts.</p>
            <p className={"p3"}><strong>Your Information</strong></p>
            <p className={"p1"}>If You wish to place an Order for Goods available on the Service, You may be asked to supply certain information relevant to Your Order including, without limitation, Your name, Your email, Your phone number, Your credit card number, the expiration date of Your credit card, Your billing address, and Your shipping information.</p>
            <p className={"p1"}>You represent and warrant that: (i) You have the legal right to use any credit or debit card(s) or other payment method(s) in connection with any Order; and that (ii) the information You supply to us is true, correct and complete.</p>
            <p className={"p1"}>By submitting such information, You grant us the right to provide the information to payment processing third parties for purposes of facilitating the completion of Your Order.</p>
            <p className={"p3"}><strong>Order Cancellation</strong></p>
            <p className={"p1"}>We reserve the right to refuse or cancel Your Order at any time for certain reasons including but not limited to:</p>
            <ul className={"ul1"}>
              <li className={"li1"}>Goods availability</li>
              <li className={"li1"}>Errors in the description or prices for Goods</li>
              <li className={"li1"}>Errors in Your Order</li>
            </ul>
            <p className={"p1"}>We reserve the right to refuse or cancel Your Order if fraud or an unauthorized or illegal transaction is suspected.</p>
            <p className={"p5"}><strong>Your Order Cancellation Rights</strong></p>
            <p className={"p1"}>Any Goods you purchase can only be returned in accordance with these Terms and Conditions and Our Returns Policy.</p>
            <p className={"p1"}>Our Returns Policy forms a part of these Terms and Conditions. Please read our Returns Policy to learn more about your right to cancel Your Order.</p>
            <p className={"p1"}>Your right to cancel an Order only applies to Goods that are returned in the same condition as You received them. You should also include all of the products instructions, documents and wrappings. Goods that are damaged or not in the same condition as You received them or which are worn simply beyond opening the original packaging will not be refunded. You should therefore take reasonable care of the purchased Goods while they are in Your possession.</p>
            <p className={"p1"}>We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>
            <p className={"p1"}>You will not have any right to cancel an Order for the supply of any of the following Goods:</p>
            <ul className={"ul1"}>
              <li className={"li1"}>The supply of Goods made to Your specifications or clearly personalized.</li>
              <li className={"li1"}>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
              <li className={"li1"}>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
              <li className={"li1"}>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
              <li className={"li1"}>The supply of digital content which is not supplied on a tangible medium if the performance has begun with Your prior express consent and You have acknowledged Your loss of cancellation right.</li>
            </ul>
            <p className={"p3"}><strong>Availability, Errors and Inaccuracies</strong></p>
            <p className={"p1"}>We are constantly updating Our offerings of Goods on the Service. The Goods available on Our Service may be mispriced, described inaccurately, or unavailable, and We may experience delays in updating information regarding our Goods on the Service and in Our advertising on other websites.</p>
            <p className={"p1"}>We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.</p>
            <p className={"p3"}><strong>Prices Policy</strong></p>
            <p className={"p1"}>The Company reserves the right to revise its prices at any time prior to accepting an Order.</p>
            <p className={"p1"}>The prices quoted may be revised by the Company subsequent to accepting an Order in the event of any occurrence affecting delivery caused by government action, variation in customs duties, increased shipping charges, higher foreign exchange costs and any other matter beyond the control of the Company. In that event, You will have the right to cancel Your Order.</p>
            <p className={"p3"}><strong>Payments</strong></p>
            <p className={"p1"}>All Goods purchased are subject to a one-time payment. Payment can be made through various payment methods we have available, such as Visa, MasterCard, Affinity Card, American Express cards or online payment methods (PayPal, for example).</p>
            <p className={"p1"}>Payment cards (credit cards or debit cards) are subject to validation checks and authorization by Your card issuer. If we do not receive the required authorization, We will not be liable for any delay or non-delivery of Your Order.</p>
            <p className={"p2"}><span className={"s1"}>In-app Purchases</span></p>
            <p className={"p1"}>The Application may include In-app Purchases that allow you to buy products, services or Subscriptions.</p>
            <p className={"p1"}>More information about how you may be able to manage In-app Purchases using your Device may be set out in the Application Store&apos;s own terms and conditions or in your Device&apos;s Help settings.</p>
            <p className={"p1"}>In-app Purchases can only be consumed within the Application. If you make a In-app Purchase, that In-app Purchase cannot be cancelled after you have initiated its download. In-app Purchases cannot be redeemed for cash or other consideration or otherwise transferred.</p>
            <p className={"p1"}>If any In-app Purchase is not successfully downloaded or does not work once it has been successfully downloaded, we will, after becoming aware of the fault or being notified to the fault by You, investigate the reason for the fault. We will act reasonably in deciding whether to provide You with a replacement In-app Purchase or issue You with a patch to repair the fault. In no event will We charge You to replace or repair the In-app Purchase. In the unlikely event that we are unable to replace or repair the relevant In-app Purchase or are unable to do so within a reasonable period of time and without significant inconvenience to You, We will authorize the Application Store to refund You an amount up to the cost of the relevant In-app Purchase. Alternatively, if You wish to request a refund, You may do so by contacting the Application Store directly.</p>
            <p className={"p1"}>You acknowledge and agree that all billing and transaction processes are handled by the Application Store from where you downloaded the Application and are governed by that Application Store&apos;s own terms and conditions.</p>
            <p className={"p1"}>If you have any payment related issues with In-app Purchases, then you need to contact the Application Store directly.</p>
            <p className={"p2"}><span className={"s1"}>Promotions</span></p>
            <p className={"p1"}>Any Promotions made available through the Service may be governed by rules that are separate from these Terms.</p>
            <p className={"p1"}>If You participate in any Promotions, please review the applicable rules as well as our Privacy policy. If the rules for a Promotion conflict with these Terms, the Promotion rules will apply.</p>
            <p className={"p2"}><span className={"s1"}>User Accounts</span></p>
            <p className={"p1"}>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
            <p className={"p1"}>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.</p>
            <p className={"p1"}>You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.</p>
            <p className={"p1"}>You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.</p>
            <p className={"p2"}><span className={"s1"}>Content</span></p>
            <p className={"p3"}><strong>Your Right to Post Content</strong></p>
            <p className={"p1"}>Our Service allows You to post Content. You are responsible for the Content that You post to the Service, including its legality, reliability, and appropriateness.</p>
            <p className={"p1"}>By posting Content to the Service, You grant Us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of Your rights to any Content You submit, post or display on or through the Service and You are responsible for protecting those rights. You agree that this license includes the right for Us to make Your Content available to other users of the Service, who may also use Your Content subject to these Terms.</p>
            <p className={"p1"}>You represent and warrant that: (i) the Content is Yours (You own it) or You have the right to use it and grant Us the rights and license as provided in these Terms, and (ii) the posting of Your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</p>
            <p className={"p3"}><strong>Content Restrictions</strong></p>
            <p className={"p1"}>The Company is not responsible for the content of the Service&apos;s users. You expressly understand and agree that You are solely responsible for the Content and for all activity that occurs under your account, whether done so by You or any third person using Your account.</p>
            <p className={"p1"}>You may not transmit any Content that is unlawful, offensive, upsetting, intended to disgust, threatening, libelous, defamatory, obscene or otherwise objectionable. Examples of such objectionable Content include, but are not limited to, the following:</p>
            <ul className={"ul1"}>
              <li className={"li1"}>Unlawful or promoting unlawful activity.</li>
              <li className={"li1"}>Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups.</li>
              <li className={"li1"}>Spam, machine &ndash; or randomly &ndash; generated, constituting unauthorized or unsolicited advertising, chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling.</li>
              <li className={"li1"}>Containing or installing any viruses, worms, malware, trojan horses, or other content that is designed or intended to disrupt, damage, or limit the functioning of any software, hardware or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of a third person.</li>
              <li className={"li1"}>Infringing on any proprietary rights of any party, including patent, trademark, trade secret, copyright, right of publicity or other rights.</li>
              <li className={"li1"}>Impersonating any person or entity including the Company and its employees or representatives.</li>
              <li className={"li1"}>Violating the privacy of any third person.</li>
              <li className={"li1"}>False information and features.</li>
            </ul>
            <p className={"p1"}>The Company reserves the right, but not the obligation, to, in its sole discretion, determine whether or not any Content is appropriate and complies with this Terms, refuse or remove this Content. The Company further reserves the right to make formatting and edits and change the manner any Content. The Company can also limit or revoke the use of the Service if You post such objectionable Content. As the Company cannot control all content posted by users and/or third parties on the Service, you agree to use the Service at your own risk. You understand that by using the Service You may be exposed to content that You may find offensive, indecent, incorrect or objectionable, and You agree that under no circumstances will the Company be liable in any way for any content, including any errors or omissions in any content, or any loss or damage of any kind incurred as a result of your use of any content.</p>
            <p className={"p3"}><strong>Content Backups</strong></p>
            <p className={"p1"}>Although regular backups of Content are performed, the Company do not guarantee there will be no loss or corruption of data.</p>
            <p className={"p1"}>Corrupt or invalid backup points may be caused by, without limitation, Content that is corrupted prior to being backed up or that changes during the time a backup is performed.</p>
            <p className={"p1"}>The Company will provide support and attempt to troubleshoot any known or discovered issues that may affect the backups of Content. But You acknowledge that the Company has no liability related to the integrity of Content or the failure to successfully restore Content to a usable state.</p>
            <p className={"p1"}>You agree to maintain a complete and accurate copy of any Content in a location independent of the Service.</p>
            <p className={"p2"}><span className={"s1"}>Copyright Policy</span></p>
            <p className={"p3"}><strong>Intellectual Property Infringement</strong></p>
            <p className={"p1"}>We respect the intellectual property rights of others. It is Our policy to respond to any claim that Content posted on the Service infringes a copyright or other intellectual property infringement of any person.</p>
            <p className={"p1"}>If You are a copyright owner, or authorized on behalf of one, and You believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service, You must submit Your notice in writing to the attention of our copyright agent via email at info@interny.net and include in Your notice a detailed description of the alleged infringement.</p>
            <p className={"p1"}>You may be held accountable for damages (including costs and attorneys&apos; fees) for misrepresenting that any Content is infringing Your copyright.</p>
            <p className={"p3"}><strong>DMCA Notice and DMCA Procedure for Copyright Infringement Claims</strong></p>
            <p className={"p1"}>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
            <ul className={"ul1"}>
              <li className={"li1"}>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright&apos;s interest.</li>
              <li className={"li1"}>A description of the copyrighted work that You claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</li>
              <li className={"li1"}>Identification of the URL or other specific location on the Service where the material that You claim is infringing is located.</li>
              <li className={"li1"}>Your address, telephone number, and email address.</li>
              <li className={"li1"}>A statement by You that You have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
              <li className={"li1"}>A statement by You, made under penalty of perjury, that the above information in Your notice is accurate and that You are the copyright owner or authorized to act on the copyright owner&apos;s behalf.</li>
            </ul>
            <p className={"p1"}>You can contact our copyright agent via email at info@interny.net. Upon receipt of a notification, the Company will take whatever action, in its sole discretion, it deems appropriate, including removal of the challenged content from the Service.</p>
            <p className={"p2"}><span className={"s1"}>Intellectual Property</span></p>
            <p className={"p1"}>The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.</p>
            <p className={"p1"}>The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.</p>
            <p className={"p1"}>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.</p>
            <p className={"p2"}><span className={"s1"}>Your Feedback to Us</span></p>
            <p className={"p1"}>You assign all rights, title and interest in any Feedback You provide the Company. If for any reason such assignment is ineffective, You agree to grant the Company a non-exclusive, perpetual, irrevocable, royalty free, worldwide right and license to use, reproduce, disclose, sub-license, distribute, modify and exploit such Feedback without restriction.</p>
            <p className={"p2"}><span className={"s1"}>Links to Other Websites</span></p>
            <p className={"p1"}>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
            <p className={"p1"}>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
            <p className={"p1"}>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.</p>
            <p className={"p2"}><span className={"s1"}>Termination</span></p>
            <p className={"p1"}>We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
            <p className={"p1"}>Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.</p>
            <p className={"p2"}><span className={"s1"}>Limitation of Liability</span></p>
            <p className={"p1"}>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven&apos;t purchased anything through the Service.</p>
            <p className={"p1"}>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>
            <p className={"p1"}>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party&apos;s liability will be limited to the greatest extent permitted by law.</p>
            <p className={"p2"}><span className={"s1"}>&quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer</span></p>
            <p className={"p1"}>The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>
            <p className={"p1"}>Without limiting the foregoing, neither the Company nor any of the company&apos;s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>
            <p className={"p1"}>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>
            <p className={"p2"}><span className={"s1"}>Governing Law</span></p>
            <p className={"p1"}>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
            <p className={"p2"}><span className={"s1"}>Disputes Resolution</span></p>
            <p className={"p1"}>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>
            <p className={"p2"}><span className={"s1"}>For European Union (EU) Users</span></p>
            <p className={"p1"}>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.</p>
            <p className={"p2"}><span className={"s1"}>United States Legal Compliance</span></p>
            <p className={"p1"}>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>
            <p className={"p2"}><span className={"s1"}>Severability and Waiver</span></p>
            <p className={"p3"}><strong>Severability</strong></p>
            <p className={"p1"}>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>
            <p className={"p3"}><strong>Waiver</strong></p>
            <p className={"p1"}>Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party&apos;s ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.</p>
            <p className={"p2"}><span className={"s1"}>Translation Interpretation</span></p>
            <p className={"p1"}>These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.</p>
            <p className={"p2"}><span className={"s1"}>Changes to These Terms and Conditions</span></p>
            <p className={"p1"}>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
            <p className={"p1"}>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>
            <p className={"p2"}><span className={"s1"}>Contact Us</span></p>
            <p className={"p1"}>If you have any questions about these Terms and Conditions, You can contact us:</p>
            <p className={"p4"}>By email: info@interny.net</p>
            <p className={"p4"}>By visiting this page on our website: <a href="https://www.interny.net/help">https://www.interny.net/help</a></p>

          </div>
        </div>
      </div>
    );
  };

  renderPrivacyPolicy = () => {
    return (
      <div className={"modal_outer"} onClick={this.onOutsideClickPrivacyPolicy}>
        <div className={"modal"}>
          <div className={"closeModalButton"}>
            <img src={closeIcon} alt="" />
          </div>
          <div className="header">Privacy Policy</div>
          <div className="content">
            <p class={"p1"}>Last updated: October 10, 2020</p>
            <p class={"p1"}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p class={"p1"}>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
            <p class={"p2"}><span class={"s1"}>Interpretation and Definitions</span></p>
            <p class={"p3"}><strong>Interpretation</strong></p>
            <p class={"p1"}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
            <p class={"p3"}><strong>Definitions</strong></p>
            <p class={"p1"}>For the purposes of this Privacy Policy:</p>
            <p class={"p4"}><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
            <p class={"p4"}><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
            <p class={"p4"}><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named INTERNY App</p>
            <p class={"p4"}><strong>Business</strong>, for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers&apos; personal information and determines the purposes and means of the processing of Consumers&apos; personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers&apos; personal information, that does business in the State of California.</p>
            <p class={"p4"}><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to INTERNY INC., 350 Oakmead Pkwy, Sunnyvale, 94085, CA.</p>
            <p class={"p4"}>For the purpose of the GDPR, the Company is the Data Controller.</p>
            <p class={"p4"}><strong>Consumer</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.</p>
            <p class={"p4"}><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
            <p class={"p4"}><strong>Country</strong> refers to: California, United States</p>
            <p class={"p4"}><strong>Data Controller</strong>, for the purposes of the GDPR (General Data Protection Regulation), refers to the Company as the legal person which alone or jointly with others determines the purposes and means of the processing of Personal Data.</p>
            <p class={"p4"}><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
            <p class={"p4"}><strong>Do Not Track</strong> (DNT) is a concept that has been promoted by US regulatory authorities, in particular the U.S. Federal Trade Commission (FTC), for the Internet industry to develop and implement a mechanism for allowing internet users to control the tracking of their online activities across websites.</p>
            <p class={"p4"}><strong>Facebook Fan Page</strong> is a public profile named Interny Inc. specifically created by the Company on the Facebook social network, accessible from <a href="https://www.facebook.com/internynet/">https://www.facebook.com/internynet/</a></p>
            <p class={"p4"}><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
            <p class={"p4"}>For the purposes for GDPR, Personal Data means any information relating to You such as a name, an identification number, location data, online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity.</p>
            <p class={"p4"}>For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.</p>
            <p class={"p4"}><strong>Sale</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer&apos;s Personal information to another business or a third party for monetary or other valuable consideration.</p>
            <p class={"p4"}><strong>Service</strong> refers to the Application or the Website or both.</p>
            <p class={"p4"}><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used. For the purpose of the GDPR, Service Providers are considered Data Processors.</p>
            <p class={"p4"}><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>
            <p class={"p4"}><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
            <p class={"p4"}><strong>Website</strong> refers to INTERNY Website, accessible from <a href="https://www.interny.net">https://www.interny.net</a></p>
            <p class={"p4"}><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            <p class={"p4"}>Under GDPR (General Data Protection Regulation), You can be referred to as the Data Subject or as the User as you are the individual using the Service.</p>
            <p class={"p2"}><span class={"s1"}>Collecting and Using Your Personal Data</span></p>
            <p class={"p5"}><strong>Types of Data Collected</strong></p>
            <p class={"p6"}><strong>Personal Data</strong></p>
            <p class={"p1"}>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
            <ul class={"ul1"}>
              <li class={"li1"}>Email address</li>
              <li class={"li1"}>First name and last name</li>
              <li class={"li1"}>Phone number</li>
              <li class={"li1"}>Address, State, Province, ZIP/Postal code, City</li>
              <li class={"li1"}>Bank account information in order to pay for products and/or services within the Service</li>
              <li class={"li1"}>Usage Data</li>
            </ul>
            <p class={"p1"}>When You pay for a product and/or a service via bank transfer, We may ask You to provide information to facilitate this transaction and to verify Your identity. Such information may include, without limitation:</p>
            <ul class={"ul1"}>
              <li class={"li1"}>Date of birth</li>
              <li class={"li1"}>Passport or National ID card</li>
              <li class={"li1"}>Bank card statement</li>
              <li class={"li1"}>Other information linking You to an address</li>
            </ul>
            <p class={"p6"}><strong>Usage Data</strong></p>
            <p class={"p1"}>Usage Data is collected automatically when using the Service.</p>
            <p class={"p1"}>Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
            <p class={"p1"}>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
            <p class={"p1"}>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
            <p class={"p6"}><strong>Information from Third-Party Social Media Services</strong></p>
            <p class={"p1"}>The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:</p>
            <ul class={"ul1"}>
              <li class={"li1"}>Google</li>
              <li class={"li1"}>Facebook</li>
              <li class={"li1"}>Twitter</li>
            </ul>
            <p class={"p1"}>If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service&apos;s account, such as Your name, Your email address, Your activities or Your contact list associated with that account.</p>
            <p class={"p1"}>You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service&apos;s account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.</p>
            <p class={"p6"}><strong>Information Collected while Using the Application</strong></p>
            <p class={"p1"}>While using Our Application, in order to provide features of Our Application, We may collect, with your prior permission:</p>
            <ul class={"ul1"}>
              <li class={"li1"}>Information regarding your location</li>
              <li class={"li1"}>Information from your Device&apos;s phone book (contacts list)</li>
              <li class={"li1"}>Pictures and other information from your Device&apos;s camera and photo library</li>
            </ul>
            <p class={"p1"}>We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company&apos;s servers and/or a Service Provider&apos;s server or it be simply stored on Your device.</p>
            <p class={"p1"}>You can enable or disable access to this information at any time, through Your Device settings.</p>
            <p class={"p6"}><strong>Tracking Technologies and Cookies</strong></p>
            <p class={"p1"}>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.</p>
            <p class={"p1"}>You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.</p>
            <p class={"p1"}>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser. Learn more about cookies: <a href="https://www.termsfeed.com/blog/cookies/">All About Cookies</a>.</p>
            <p class={"p1"}>We use both session and persistent Cookies for the purposes set out below:</p>
            <p class={"p4"}><strong>Necessary / Essential Cookies</strong></p>
            <p class={"p4"}>Type: Session Cookies</p>
            <p class={"p4"}>Administered by: Us</p>
            <p class={"p4"}>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
            <p class={"p4"}><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
            <p class={"p4"}>Type: Persistent Cookies</p>
            <p class={"p4"}>Administered by: Us</p>
            <p class={"p4"}>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
            <p class={"p4"}><strong>Functionality Cookies</strong></p>
            <p class={"p4"}>Type: Persistent Cookies</p>
            <p class={"p4"}>Administered by: Us</p>
            <p class={"p4"}>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
            <p class={"p4"}><strong>Tracking and Performance Cookies</strong></p>
            <p class={"p4"}>Type: Persistent Cookies</p>
            <p class={"p4"}>Administered by: Third-Parties</p>
            <p class={"p4"}>Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new pages, features or new functionality of the Website to see how our users react to them.</p>
            <p class={"p1"}>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
            <p class={"p3"}><strong>Use of Your Personal Data</strong></p>
            <p class={"p1"}>The Company may use Personal Data for the following purposes:</p>
            <ul class={"ul1"}>
              <li class={"li1"}><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
              <li class={"li1"}><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
              <li class={"li1"}><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
              <li class={"li1"}><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&apos;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
              <li class={"li1"}><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
              <li class={"li1"}><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
            </ul>
            <p class={"p1"}>We may share your personal information in the following situations:</p>
            <ul class={"ul1"}>
              <li class={"li1"}><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to advertise on third party websites to You after You visited our Service, for payment processing, to contact You.</li>
              <li class={"li1"}><strong>For Business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              <li class={"li1"}><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
              <li class={"li1"}><strong>With Business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
              <li class={"li1"}><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
            </ul>
            <p class={"p3"}><strong>Retention of Your Personal Data</strong></p>
            <p class={"p1"}>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
            <p class={"p1"}>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
            <p class={"p3"}><strong>Transfer of Your Personal Data</strong></p>
            <p class={"p1"}>Your information, including Personal Data, is processed at the Company&apos;s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to &mdash; and maintained on &mdash; computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
            <p class={"p1"}>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
            <p class={"p1"}>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
            <p class={"p5"}><strong>Disclosure of Your Personal Data</strong></p>
            <p class={"p6"}><strong>Business Transactions</strong></p>
            <p class={"p1"}>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
            <p class={"p6"}><strong>Law enforcement</strong></p>
            <p class={"p1"}>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
            <p class={"p6"}><strong>Other legal requirements</strong></p>
            <p class={"p1"}>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul class={"ul1"}>
              <li class={"li1"}>Comply with a legal obligation</li>
              <li class={"li1"}>Protect and defend the rights or property of the Company</li>
              <li class={"li1"}>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li class={"li1"}>Protect the personal safety of Users of the Service or the public</li>
              <li class={"li1"}>Protect against legal liability</li>
            </ul>
            <p class={"p3"}><strong>Security of Your Personal Data</strong></p>
            <p class={"p1"}>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            <p class={"p2"}><span class={"s1"}>Detailed Information on the Processing of Your Personal Data</span></p>
            <p class={"p1"}>Service Providers have access to Your Personal Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any other purpose.</p>
            <p class={"p3"}><strong>Analytics</strong></p>
            <p class={"p1"}>We may use third-party Service providers to monitor and analyze the use of our Service.</p>
            <p class={"p4"}><strong>Google Analytics</strong></p>
            <p class={"p4"}>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</p>
            <p class={"p4"}>You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google Analytics about visits activity.</p>
            <p class={"p4"}>You may opt-out of certain Google Analytics features through your mobile device settings, such as your device advertising settings or by following the instructions provided by Google in their Privacy Policy: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
            <p class={"p4"}>For more information on the privacy practices of Google, please visit the Google Privacy &amp; Terms web page: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
            <p class={"p4"}><strong>Firebase</strong></p>
            <p class={"p4"}>Firebase is an analytics service provided by Google Inc.</p>
            <p class={"p4"}>You may opt-out of certain Firebase features through your mobile device settings, such as your device advertising settings or by following the instructions provided by Google in their Privacy Policy: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
            <p class={"p4"}>We also encourage you to review the Google&apos;s policy for safeguarding your data: <a href="https://support.google.com/analytics/answer/6004245">https://support.google.com/analytics/answer/6004245</a></p>
            <p class={"p4"}>For more information on what type of information Firebase collects, please visit the Google Privacy &amp; Terms web page: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
            <p class={"p4"}><strong>Facebook Pixel</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a></p>
            <p class={"p3"}><strong>Email Marketing</strong></p>
            <p class={"p1"}>We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt-out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send or by contacting Us.</p>
            <p class={"p1"}>We may use Email Marketing Service Providers to manage and send emails to You.</p>
            <p class={"p4"}><strong>Mailchimp</strong></p>
            <p class={"p4"}>Mailchimp is an email marketing sending service provided by The Rocket Science Group LLC.</p>
            <p class={"p4"}>For more information on the privacy practices of Mailchimp, please visit their Privacy policy: <a href="https://mailchimp.com/legal/privacy/">https://mailchimp.com/legal/privacy/</a></p>
            <p class={"p4"}><strong>GetResponse</strong></p>
            <p class={"p4"}>GetResponse is an email marketing sending service provided by GetResponse.</p>
            <p class={"p4"}>For more information on the privacy practices of GetResponse, please visit their Privacy policy: <a href="https://www.getresponse.com/legal/privacy.html">https://www.getresponse.com/legal/privacy.html</a></p>
            <p class={"p4"}><strong>Amazon Simple Email Service</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://aws.amazon.com/privacy">https://aws.amazon.com/privacy</a></p>
            <p class={"p3"}><strong>Payments</strong></p>
            <p class={"p1"}>We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).</p>
            <p class={"p1"}>We will not store or collect Your payment card details. That information is provided directly to Our third-party payment processors whose use of Your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
            <p class={"p4"}><strong>Apple Store In-App Payments</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.apple.com/legal/privacy/en-ww/">https://www.apple.com/legal/privacy/en-ww/</a></p>
            <p class={"p4"}><strong>Google Play In-App Payments</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.google.com/policies/privacy/">https://www.google.com/policies/privacy/</a></p>
            <p class={"p4"}><strong>Stripe</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a></p>
            <p class={"p1"}>When You use Our Service to pay a product and/or service via bank transfer, We may ask You to provide information to facilitate this transaction and to verify Your identity.</p>
            <p class={"p3"}><strong>Behavioral Remarketing</strong></p>
            <p class={"p1"}>The Company uses remarketing services to advertise on third party websites to You after You visited our Service. We and Our third-party vendors use cookies to inform, optimize and serve ads based on Your past visits to our Service.</p>
            <p class={"p4"}><strong>Google Ads (AdWords)</strong></p>
            <p class={"p4"}>Google Ads (AdWords) remarketing service is provided by Google Inc.</p>
            <p class={"p4"}>You can opt-out of Google Analytics for Display Advertising and customise the Google Display Network ads by visiting the Google Ads Settings page: <a href="http://www.google.com/settings/ads">http://www.google.com/settings/ads</a></p>
            <p class={"p4"}>Google also recommends installing the Google Analytics Opt-out Browser Add-on - <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a> - for your web browser. Google Analytics Opt-out Browser Add-on provides visitors with the ability to prevent their data from being collected and used by Google Analytics.</p>
            <p class={"p4"}>For more information on the privacy practices of Google, please visit the Google Privacy &amp; Terms web page: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
            <p class={"p4"}><strong>Twitter</strong></p>
            <p class={"p4"}>Twitter remarketing service is provided by Twitter Inc.</p>
            <p class={"p4"}>You can opt-out from Twitter&apos;s interest-based ads by following their instructions: <a href="https://support.twitter.com/articles/20170405">https://support.twitter.com/articles/20170405</a></p>
            <p class={"p4"}>You can learn more about the privacy practices and policies of Twitter by visiting their Privacy Policy page: <a href="https://twitter.com/privacy">https://twitter.com/privacy</a></p>
            <p class={"p4"}><strong>Facebook</strong></p>
            <p class={"p4"}>Facebook remarketing service is provided by Facebook Inc.</p>
            <p class={"p4"}>You can learn more about interest-based advertising from Facebook by visiting this page: <a href="https://www.facebook.com/help/164968693837950">https://www.facebook.com/help/164968693837950</a></p>
            <p class={"p4"}>To opt-out from Facebook&apos;s interest-based ads, follow these instructions from Facebook: <a href="https://www.facebook.com/help/568137493302217">https://www.facebook.com/help/568137493302217</a></p>
            <p class={"p4"}>Facebook adheres to the Self-Regulatory Principles for Online Behavioural Advertising established by the Digital Advertising Alliance. You can also opt-out from Facebook and other participating companies through the Digital Advertising Alliance in the USA <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a>, the Digital Advertising Alliance of Canada in Canada <a href="http://youradchoices.ca/">http://youradchoices.ca/</a> or the European Interactive Digital Advertising Alliance in Europe <a href="http://www.youronlinechoices.eu/">http://www.youronlinechoices.eu/</a>, or opt-out using your mobile device settings.</p>
            <p class={"p4"}>For more information on the privacy practices of Facebook, please visit Facebook&apos;s Data Policy: <a href="https://www.facebook.com/privacy/explanation">https://www.facebook.com/privacy/explanation</a></p>
            <p class={"p4"}><strong>Instagram</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a></p>
            <p class={"p4"}><strong>Linkedin</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://www.linkedin.com/legal/privacy-policy">https://www.linkedin.com/legal/privacy-policy</a></p>
            <p class={"p4"}><strong>Youtube</strong></p>
            <p class={"p4"}>Their Privacy Policy can be viewed at <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></p>
            <p class={"p3"}><strong>Usage, Performance and Miscellaneous</strong></p>
            <p class={"p1"}>We may use third-party Service Providers to provide better improvement of our Service.</p>
            <p class={"p4"}><strong>Invisible reCAPTCHA</strong></p>
            <p class={"p4"}>We use an invisible captcha service named reCAPTCHA. reCAPTCHA is operated by Google.</p>
            <p class={"p4"}>The reCAPTCHA service may collect information from You and from Your Device for security purposes.</p>
            <p class={"p4"}>The information gathered by reCAPTCHA is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/">https://www.google.com/intl/en/policies/privacy/</a></p>
            <p class={"p4"}><strong>Google Places</strong></p>
            <p class={"p4"}>Google Places is a service that returns information about places using HTTP requests. It is operated by Google</p>
            <p class={"p4"}>Google Places service may collect information from You and from Your Device for security purposes.</p>
            <p class={"p4"}>The information gathered by Google Places is held in accordance with the Privacy Policy of Google: <a href="https://www.google.com/intl/en/policies/privacy/">https://www.google.com/intl/en/policies/privacy/</a></p>
            <p class={"p2"}><span class={"s1"}>GDPR Privacy</span></p>
            <p class={"p3"}><strong>Legal Basis for Processing Personal Data under GDPR</strong></p>
            <p class={"p1"}>We may process Personal Data under the following conditions:</p>
            <ul class={"ul1"}>
              <li class={"li1"}><strong>Consent:</strong> You have given Your consent for processing Personal Data for one or more specific purposes.</li>
              <li class={"li1"}><strong>Performance of a contract:</strong> Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations thereof.</li>
              <li class={"li1"}><strong>Legal obligations:</strong> Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.</li>
              <li class={"li1"}><strong>Vital interests:</strong> Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.</li>
              <li class={"li1"}><strong>Public interests:</strong> Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Company.</li>
              <li class={"li1"}><strong>Legitimate interests:</strong> Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.</li>
            </ul>
            <p class={"p1"}>In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>
            <p class={"p3"}><strong>Your Rights under the GDPR</strong></p>
            <p class={"p1"}>The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.</p>
            <p class={"p1"}>You have the right under this Privacy Policy, and by law if You are within the EU, to:</p>
            <ul class={"ul1"}>
              <li class={"li1"}><strong>Request access to Your Personal Data.</strong> The right to access, update or delete the information We have on You. Whenever made possible, you can access, update or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist You. This also enables You to receive a copy of the Personal Data We hold about You.</li>
              <li class={"li1"}><strong>Request correction of the Personal Data that We hold about You.</strong> You have the right to to have any incomplete or inaccurate information We hold about You corrected.</li>
              <li class={"li1"}><strong>Object to processing of Your Personal Data.</strong> This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where We are processing Your Personal Data for direct marketing purposes.</li>
              <li class={"li1"}><strong>Request erasure of Your Personal Data.</strong> You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue processing it.</li>
              <li class={"li1"}><strong>Request the transfer of Your Personal Data.</strong> We will provide to You, or to a third-party You have chosen, Your Personal Data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the information to perform a contract with You.</li>
              <li class={"li1"}><strong>Withdraw Your consent.</strong> You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide You with access to certain specific functionalities of the Service.</li>
            </ul>
            <p class={"p3"}><strong>Exercising of Your GDPR Data Protection Rights</strong></p>
            <p class={"p1"}>You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding to such requests. If You make a request, We will try our best to respond to You as soon as possible.</p>
            <p class={"p1"}>You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic Area (EEA), please contact Your local data protection authority in the EEA.</p>
            <p class={"p2"}><span class={"s1"}>Facebook Fan Page</span></p>
            <p class={"p3"}><strong>Data Controller for the Facebook Fan Page</strong></p>
            <p class={"p1"}>The Company is the Data Controller of Your Personal Data collected while using the Service. As operator of the Facebook Fan Page <a href="https://www.facebook.com/internynet/">https://www.facebook.com/internynet/</a>, the Company and the operator of the social network Facebook are Joint Controllers.</p>
            <p class={"p1"}>The Company has entered into agreements with Facebook that define the terms for use of the Facebook Fan Page, among other things. These terms are mostly based on the Facebook Terms of Service: <a href="https://www.facebook.com/terms.php">https://www.facebook.com/terms.php</a></p>
            <p class={"p1"}>Visit the Facebook Privacy Policy <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a> for more information about how Facebook manages Personal data or contact Facebook online, or by mail: Facebook, Inc. ATTN, Privacy Operations, 1601 Willow Road, Menlo Park, CA 94025, United States.</p>
            <p class={"p3"}><strong>Facebook Insights</strong></p>
            <p class={"p1"}>We use the Facebook Insights function in connection with the operation of the Facebook Fan Page and on the basis of the GDPR, in order to obtain anonymized statistical data about Our users.</p>
            <p class={"p1"}>For this purpose, Facebook places a Cookie on the device of the user visiting Our Facebook Fan Page. Each Cookie contains a unique identifier code and remains active for a period of two years, except when it is deleted before the end of this period.</p>
            <p class={"p1"}>Facebook receives, records and processes the information stored in the Cookie, especially when the user visits the Facebook services, services that are provided by other members of the Facebook Fan Page and services by other companies that use Facebook services.</p>
            <p class={"p1"}>For more information on the privacy practices of Facebook, please visit Facebook Privacy Policy here: <a href="https://www.facebook.com/full_data_use_policy">https://www.facebook.com/full_data_use_policy</a></p>
            <p class={"p2"}><span class={"s1"}>CCPA Privacy</span></p>
            <p class={"p3"}><strong>Your Rights under the CCPA</strong></p>
            <p class={"p1"}>Under this Privacy Policy, and by law if You are a resident of California, You have the following rights:</p>
            <ul class={"ul1"}>
              <li class={"li1"}><strong>The right to notice.</strong> You must be properly notified which categories of Personal Data are being collected and the purposes for which the Personal Data is being used.</li>
              <li class={"li1"}><strong>The right to access / the right to request.</strong> The CCPA permits You to request and obtain from the Company information regarding the disclosure of Your Personal Data that has been collected in the past 12 months by the Company or its subsidiaries to a third-party for the third party&apos;s direct marketing purposes.</li>
              <li class={"li1"}><strong>The right to say no to the sale of Personal Data.</strong> You also have the right to ask the Company not to sell Your Personal Data to third parties. You can submit such a request by visiting our &quot;Do Not Sell My Personal Information&quot; section or web page.</li>
              <li class={"li1"}><strong>The right to know about Your Personal Data.</strong> You have the right to request and obtain from the Company information regarding the disclosure of the following:<span class="Apple-converted-space">&nbsp;</span></li>
              <li class={"li1"}>The categories of Personal Data collected</li>
              <li class={"li1"}>The sources from which the Personal Data was collected</li>
              <li class={"li1"}>The business or commercial purpose for collecting or selling the Personal Data</li>
              <li class={"li1"}>Categories of third parties with whom We share Personal Data</li>
              <li class={"li1"}>The specific pieces of Personal Data we collected about You</li>
              <li class={"li1"}><strong>The right to delete Personal Data.</strong> You also have the right to request the deletion of Your Personal Data that have been collected in the past 12 months.</li>
              <li class={"li1"}><strong>The right not to be discriminated against.</strong> You have the right not to be discriminated against for exercising any of Your Consumer&apos;s rights, including by:<span class="Apple-converted-space">&nbsp;</span></li>
              <li class={"li1"}>Denying goods or services to You</li>
              <li class={"li1"}>Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties</li>
              <li class={"li1"}>Providing a different level or quality of goods or services to You</li>
              <li class={"li1"}>Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services.</li>
            </ul>
            <p class={"p3"}><strong>Exercising Your CCPA Data Protection Rights</strong></p>
            <p class={"p1"}>In order to exercise any of Your rights under the CCPA, and if you are a California resident, You can email or call us or visit our &quot;Do Not Sell My Personal Information&quot; section or web page.</p>
            <p class={"p1"}>The Company will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information may be extended once by an additional 45 days when reasonable necessary and with prior notice.</p>
            <p class={"p3"}><strong>Do Not Sell My Personal Information</strong></p>
            <p class={"p1"}>We do not sell personal information. However, the Service Providers we partner with (for example, our advertising partners) may use technology on the Service that &quot;sells&quot; personal information as defined by the CCPA law.</p>
            <p class={"p1"}>If you wish to opt out of the use of your personal information for interest-based advertising purposes and these potential sales as defined under CCPA law, you may do so by following the instructions below.</p>
            <p class={"p1"}>Please note that any opt out is specific to the browser You use. You may need to opt out on every browser that you use.</p>
            <p class={"p6"}><strong>Website</strong></p>
            <p class={"p1"}>You can opt out of receiving ads that are personalized as served by our Service Providers by following our instructions presented on the Service:</p>
            <ul class={"ul1"}>
              <li class={"li1"}>From Our &quot;Cookie Consent&quot; notice banner</li>
              <li class={"li1"}>Or from Our &quot;CCPA Opt-out&quot; notice banner</li>
              <li class={"li1"}>Or from Our &quot;Do Not Sell My Personal Information&quot; notice banner</li>
              <li class={"li1"}>Or from Our &quot;Do Not Sell My Personal Information&quot; link</li>
            </ul>
            <p class={"p1"}>The opt out will place a cookie on Your computer that is unique to the browser You use to opt out. If you change browsers or delete the cookies saved by your browser, you will need to opt out again.</p>
            <p class={"p6"}><strong>Mobile Devices</strong></p>
            <p class={"p1"}>Your mobile device may give you the ability to opt out of the use of information about the apps you use in order to serve you ads that are targeted to your interests:</p>
            <ul class={"ul1"}>
              <li class={"li1"}>&quot;Opt out of Interest-Based Ads&quot; or &quot;Opt out of Ads Personalization&quot; on Android devices</li>
              <li class={"li1"}>&quot;Limit Ad Tracking&quot; on iOS devices</li>
            </ul>
            <p class={"p1"}>You can also stop the collection of location information from Your mobile device by changing the preferences on your mobile device.</p>
            <p class={"p2"}><span class={"s1"}>&quot;Do Not Track&quot; Policy as Required by California Online Privacy Protection Act (CalOPPA)</span></p>
            <p class={"p1"}>Our Service does not respond to Do Not Track signals.</p>
            <p class={"p1"}>However, some third party websites do keep track of Your browsing activities. If You are visiting such websites, You can set Your preferences in Your web browser to inform websites that You do not want to be tracked. You can enable or disable DNT by visiting the preferences or settings page of Your web browser.</p>
            <p class={"p2"}><span class={"s1"}>Your California Privacy Rights (California&apos;s Shine the Light law)</span></p>
            <p class={"p1"}>Under California Civil Code Section 1798 (California&apos;s Shine the Light law), California residents with an established business relationship with us can request information once a year about sharing their Personal Data with third parties for the third parties&apos; direct marketing purposes.</p>
            <p class={"p1"}>If you&apos;d like to request more information under the California Shine the Light law, and if you are a California resident, You can contact Us using the contact information provided below.</p>
            <p class={"p2"}><span class={"s1"}>California Privacy Rights for Minor Users (California Business and Professions Code Section 22581)</span></p>
            <p class={"p1"}>California Business and Professions Code section 22581 allow California residents under the age of 18 who are registered users of online sites, services or applications to request and obtain removal of content or information they have publicly posted.</p>
            <p class={"p1"}>To request removal of such data, and if you are a California resident, You can contact Us using the contact information provided below, and include the email address associated with Your account.</p>
            <p class={"p1"}>Be aware that Your request does not guarantee complete or comprehensive removal of content or information posted online and that the law may not permit or require removal in certain circumstances.</p>
            <p class={"p2"}><span class={"s1"}>Links to Other Websites</span></p>
            <p class={"p1"}>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&apos;s site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
            <p class={"p1"}>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
            <p class={"p2"}><span class={"s1"}>Changes to this Privacy Policy</span></p>
            <p class={"p1"}>We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
            <p class={"p1"}>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
            <p class={"p1"}>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            <p class={"p2"}><span class={"s1"}>Contact Us</span></p>
            <p class={"p1"}>If you have any questions about this Privacy Policy, You can contact us:</p>
            <p class={"p4"}>By email: info@interny.net</p>
            <p class={"p4"}>By visiting this page on our website: <a href="https://www.interny.net/help">https://www.interny.net/help</a></p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { forgotPasswordMode, getAdditionalInfo, terms, privacyPolicy } = this.state;
    return (
      <>
        {forgotPasswordMode && (
          //TODO: What happens onSubmit
          //TODO: What happens onChange
          <ForgotPassword
            closeModal={this.props.closeModal}
            createModal={this.props.createModal}
            userType={this.props.match.params.user.toLowerCase()}
          />
        )}
        {getAdditionalInfo && this.renderAdditionalInfo()}
        {!getAdditionalInfo && this.renderAuth()}
        {terms && this.renderTerms()}
        {privacyPolicy && this.renderPrivacyPolicy()}
      </>
    );
  }
}

export default Authentication;
