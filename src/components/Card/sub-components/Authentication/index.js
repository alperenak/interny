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
    authButtons: [
      {
        text: "Log in with Google+",
        styles: "google",
      },
      {
        text: "Log in with Facebook",
        styles: "facebook",
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
          this.setState({ forgotPasswordMode: true });
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
          this.setState({ terms: true });
        },
      },
      {
        label: `By joining you agree to the`,
        type: "checkbox",
        sizeName: "full",
        clickable: " Privacy Policy",
        value: "checkboxStatus",
        onClick: () => {
          this.setState({ privacyPolicy: true });
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
      phone == "" ||
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
      phone,
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
      <div className={styles.advancedSearchDropdown}>
        <div
          className={styles.backButton}
          onClick={() => {
            this.setState({ getAdditionalInfo: false });
          }}
        >
          <img src={backIcon} alt="" />
        </div>
        <div
          className={styles.advancedSearchDropdown__inputs}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${styles.row} ${styles.big_header}`}>
            Complete Your Account
          </div>

          <div className={`${styles.row} ${styles.header}`}>
            University Information
          </div>

          <div className={styles.row}>
            <Input
              type={"text"}
              placeholder={"Ankara University"}
              size={"half"}
              defaultValue={university !== "null" ? university : ""}
              onChange={(value) => this.setState({ university: value })}
              label={"University"}
            />
          </div>

          <div className={styles.row}>
            <Input
              type={"text"}
              placeholder={"Engineering Faculty"}
              size={"half"}
              defaultValue={faculty !== "null" ? faculty : ""}
              onChange={(value) => this.setState({ faculty: value })}
              label={"Faculty"}
            />

            <Input
              type={"text"}
              placeholder={"Computer Science"}
              size={"half"}
              defaultValue={department !== "null" ? department : ""}
              onChange={(value) => this.setState({ department: value })}
              label={"Department"}
            />
          </div>

          <div className={styles.row}>
            <Input
              type={"text"}
              placeholder={"example@uni.edu.tr"}
              size={"half"}
              defaultValue={uni_mail !== "null" ? uni_mail : ""}
              onChange={(value) => this.setState({ uni_mail: value })}
              label={"University Mail"}
            />

            <Input
              type={"text"}
              placeholder={"18264155"}
              size={"half"}
              defaultValue={student_number !== "null" ? student_number : ""}
              onChange={(value) => {
                this.setState({ student_number: value });
              }}
              label={"Student Number"}
            />
          </div>

          <div className={`${styles.row} ${styles.header}`}>
            Personal Information
          </div>

          <div className={styles.row}>
            <div className={styles.phoneInput}>
              <label>Phone</label>
              <div className={styles.phoneInput__input}>
                <PhoneInput
                  defaultCountry="TR"
                  value={phone}
                  onChange={(value) => this.setState({ phone: value })}
                />
              </div>
            </div>

            <Input
              type={"select"}
              label={"Graduation Status"}
              onChange={(value, slValue) => {
                this.setState({ graduation_status: slValue.value });
              }}
              externalSource={[
                { key: "Student", value: "Student", selected: true },
                { key: "Newly Graduated", value: "Newly Graduated" },
              ]}
            />
          </div>

          <div className={styles.row}>
            <Input
              type={"text"}
              placeholder={"Turkey"}
              size={"half"}
              defaultValue={country !== "null" ? country : ""}
              onChange={(value) => this.setState({ country: value })}
              label={"Country"}
            />

            <Input
              type={"text"}
              placeholder={"Istanbul"}
              size={"half"}
              defaultValue={city !== "null" ? city : ""}
              onChange={(value) => {
                this.setState({ city: value });
              }}
              label={"City"}
            />
          </div>

          <div className={styles.row}>
            <div className={styles["advancedSearch__send-button"]}>
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
    let { page, buttons, authButtons, authInputs, loginInputs } = this.state;
    return (
      <div className={`${styles.auth} ${type === "login" ? styles.login : ""}`}>
        <div className={styles.inputs_container}>
          <div v-if={type === "auth"} className={styles.switchButtons}>
            <div
              onClick={() => page === "Employer" && this.onSwitchPage("Intern")}
              className={`${styles.switchButton} ${styles.internButton} ${
                page === "Intern" ? styles.activeButton : ""
              }`}
            >
              Intern
            </div>
            <div
              onClick={() => page === "Intern" && this.onSwitchPage("Employer")}
              className={`${styles.switchButton} ${styles.employerButton} ${
                page === "Employer" ? styles.activeButton : ""
              }`}
            >
              Company
            </div>
          </div>
          <div className={styles.authHeader}>
            <div className={styles.headerText}>
              {type === "auth"
                ? page === "Employer"
                  ? "Company"
                  : page
                : "Log In"}
            </div>
            <div v-if={type === "auth"} className={styles.description}>
              New to Interny? Create free account
            </div>
            <div v-if={type !== "auth"} className={styles.description}>
              Log in Interny as{" "}
              {this.props.match.params.user === "Employer"
                ? "Company"
                : this.props.match.params.user}
            </div>
          </div>
          <div
            v-if={type === "auth"}
            v-for={(btn, i) in authButtons}
            key={"authBtn" + i}
            className={styles.authButtonContainer}
          >
            <div
              onMouseOver={() => {
                if (btn.styles === "facebook")
                  this.setState({ facebookIcon: facebookWhiteIcon });
              }}
              onMouseLeave={() => {
                if (btn.styles === "facebook")
                  this.setState({ facebookIcon: facebookIcon });
              }}
              className={styles.authButton}
            >
              <img
                className={
                  btn.text?.includes("Google")
                    ? styles.facebookIcon
                    : styles.googleIcon
                }
                src={
                  btn.styles === "google"
                    ? this.state.googleIcon
                    : this.state.facebookIcon
                }
              />
              {btn.text}
            </div>
          </div>
          {type === "login"
            ? loginInputs.map((inp, i) => {
                if (inp.type === "link") {
                  return (
                    <div key={i} className={styles.inputsContainer}>
                      <Button
                        className={`${styles.inputsContainer}`}
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
                    className={`${styles.inputsContainer}`}
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
              })
            : authInputs.map((inp, i) => {
                return (
                  <Input
                    className={`${styles.inputsContainer}`}
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

          <div className={styles.saveButtonContainer}>
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
          <div
            v-for={(btn, i) in authButtons}
            key={"loginBtn" + i}
            v-if={type === "login"}
            className={styles.authButtonContainer}
          >
            <div
              onMouseEnter={() => {
                if (btn.styles === "facebook")
                  this.setState({ facebookIcon: facebookWhiteIcon });
              }}
              onMouseUp={() => {
                if (btn.styles === "facebook")
                  this.setState({ facebookIcon: facebookWhiteIcon });
              }}
              onMouseLeave={() => {
                if (btn.styles === "facebook")
                  this.setState({ facebookIcon: facebookIcon });
              }}
              className={`${styles.authButton} ${styles[btn.styles]} }`}
            >
              <img
                className={
                  btn.text?.includes("Google")
                    ? styles.facebookIcon
                    : styles.googleIcon
                }
                src={
                  btn.styles === "google"
                    ? this.state.googleIcon
                    : this.state.facebookIcon
                }
              />
              {btn.text}
            </div>
          </div>
        </div>
        <div v-if={type === "login"} className={styles.imgContainer}>
          <div className={styles.shadow}>
            <img
              v-if={
                type === "login" &&
                this.props.match.params.user.toLowerCase() === "intern"
              }
              src={loginImage}
              alt={"loginImage"}
            />
            <img
              v-if={
                type === "login" &&
                this.props.match.params.user.toLowerCase() === "employer"
              }
              src={loginEmpImage}
              alt={"loginImage"}
              className={styles.employerBackground}
            />
            <img
              v-if={
                type === "login" &&
                this.props.match.params.user.toLowerCase() === "university"
              }
              src={loginUniImage}
              className={styles.universtyBackground}
              alt={"loginImage"}
            />
          </div>
        </div>
        <div
          v-if={
            type === "login" &&
            this.props.match.params.user.toLowerCase() === "university"
          }
          className={styles.info}
        >
          <img src={infoIcon} alt={"icon"} />
          <div className={styles.mutedText}>
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
    );
  };

  renderTerms = () => {
    return (
      <div className={styles.modal_outer} onClick={this.onOutsideClickTerms}>
        <div className={styles.modal}>
          <div className={styles.closeModalButton}>
            <img src={closeIcon} alt="" />
          </div>
          <div className={styles.header}>Terms and Conditions</div>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
            fuga laboriosam corporis eveniet laudantium maiores inventore cum
            reprehenderit deleniti ad! Totam officia voluptatum possimus quis
            doloribus accusantium, laborum perferendis a. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Explicabo fuga laboriosam
            corporis eveniet laudantium maiores inventore cum reprehenderit
            deleniti ad! Totam officia voluptatum possimus quis doloribus
            accusantium, laborum perferendis a. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Explicabo fuga laboriosam corporis
            eveniet laudantium maiores inventore cum reprehenderit deleniti ad!
            Totam officia voluptatum possimus quis doloribus accusantium,
            laborum perferendis a. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Explicabo fuga laboriosam corporis eveniet
            laudantium maiores inventore cum reprehenderit deleniti ad! Totam
            officia voluptatum possimus quis doloribus accusantium, laborum
            perferendis a. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Explicabo fuga laboriosam corporis eveniet laudantium maiores
            inventore cum reprehenderit deleniti ad! Totam officia voluptatum
            possimus quis doloribus accusantium, laborum perferendis a. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga
            laboriosam corporis eveniet laudantium maiores inventore cum
            reprehenderit deleniti ad! Totam officia voluptatum possimus quis
            doloribus accusantium, laborum perferendis a. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Explicabo fuga laboriosam
            corporis eveniet laudantium maiores inventore cum reprehenderit
            deleniti ad! Totam officia voluptatum possimus quis doloribus
            accusantium, laborum perferendis a. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Explicabo fuga laboriosam corporis
            eveniet laudantium maiores inventore cum reprehenderit deleniti ad!
            Totam officia voluptatum possimus quis doloribus accusantium,
            laborum perferendis a. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Explicabo fuga laboriosam corporis eveniet
            laudantium maiores inventore cum reprehenderit deleniti ad! Totam
            officia voluptatum possimus quis doloribus accusantium, laborum
            perferendis a. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Explicabo fuga laboriosam corporis eveniet laudantium maiores
            inventore cum reprehenderit deleniti ad! Totam officia voluptatum
            possimus quis doloribus accusantium, laborum perferendis a. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga
            laboriosam corporis eveniet laudantium maiores inventore cum
            reprehenderit deleniti ad! Totam officia voluptatum possimus quis
            doloribus accusantium, laborum perferendis a. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Explicabo fuga laboriosam
            corporis eveniet laudantium maiores inventore cum reprehenderit
            deleniti ad! Totam officia voluptatum possimus quis doloribus
            accusantium, laborum perferendis a.
          </div>
        </div>
      </div>
    );
  };

  renderPrivacyPolicy = () => {
    return (
      <div className={styles.modal_outer} onClick={this.onOutsideClickPrivacyPolicy}>
        <div className={styles.modal}>
          <div className={styles.closeModalButton}>
            <img src={closeIcon} alt="" />
          </div>
          <div className={styles.header}>Privacy Policy</div>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
            fuga laboriosam corporis eveniet laudantium maiores inventore cum
            reprehenderit deleniti ad! Totam officia voluptatum possimus quis
            doloribus accusantium, laborum perferendis a. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Explicabo fuga laboriosam
            corporis eveniet laudantium maiores inventore cum reprehenderit
            deleniti ad! Totam officia voluptatum possimus quis doloribus
            accusantium, laborum perferendis a. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Explicabo fuga laboriosam corporis
            eveniet laudantium maiores inventore cum reprehenderit deleniti ad!
            Totam officia voluptatum possimus quis doloribus accusantium,
            laborum perferendis a. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Explicabo fuga laboriosam corporis eveniet
            laudantium maiores inventore cum reprehenderit deleniti ad! Totam
            officia voluptatum possimus quis doloribus accusantium, laborum
            perferendis a. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Explicabo fuga laboriosam corporis eveniet laudantium maiores
            inventore cum reprehenderit deleniti ad! Totam officia voluptatum
            possimus quis doloribus accusantium, laborum perferendis a. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga
            laboriosam corporis eveniet laudantium maiores inventore cum
            reprehenderit deleniti ad! Totam officia voluptatum possimus quis
            doloribus accusantium, laborum perferendis a. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Explicabo fuga laboriosam
            corporis eveniet laudantium maiores inventore cum reprehenderit
            deleniti ad! Totam officia voluptatum possimus quis doloribus
            accusantium, laborum perferendis a. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Explicabo fuga laboriosam corporis
            eveniet laudantium maiores inventore cum reprehenderit deleniti ad!
            Totam officia voluptatum possimus quis doloribus accusantium,
            laborum perferendis a. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Explicabo fuga laboriosam corporis eveniet
            laudantium maiores inventore cum reprehenderit deleniti ad! Totam
            officia voluptatum possimus quis doloribus accusantium, laborum
            perferendis a. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Explicabo fuga laboriosam corporis eveniet laudantium maiores
            inventore cum reprehenderit deleniti ad! Totam officia voluptatum
            possimus quis doloribus accusantium, laborum perferendis a. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Explicabo fuga
            laboriosam corporis eveniet laudantium maiores inventore cum
            reprehenderit deleniti ad! Totam officia voluptatum possimus quis
            doloribus accusantium, laborum perferendis a. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Explicabo fuga laboriosam
            corporis eveniet laudantium maiores inventore cum reprehenderit
            deleniti ad! Totam officia voluptatum possimus quis doloribus
            accusantium, laborum perferendis a.
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
