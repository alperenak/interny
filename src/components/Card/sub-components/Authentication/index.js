import React, { Component } from "react";
import { Redirect } from "react-router-dom";

/*** Components ***/
import Button from "../../../Button";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

/*** Styles ***/
import styles from "./authentication.scss";
import Input from "../../../Input";

/*** Icons ***/
import loginImage from "../../../../assets/login.png";
import backIcon from "../../../../icons/arrow-back-outline.svg";

/*** Utils ***/
import store from "../../../../store";
import { getCookie, setCookie } from "../../../../utils/cookie";

class Authentication extends Component {
  state = {
    getAdditionalInfo: false,
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
      },
      {
        text: "Log in with Facebook",
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
        onButtonClick: () =>
          this.props.createModal({
            header: "Forgot Password",
            declaration:
              "Enter your e-mail associated with the account, reset request will be emailed to the address.",
            content: this.renderForgotPasswordContent,
            buttons: this.renderForgotPasswordButtons(),
          }),
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
        label: "By joining you agree to the Terms, Privacy and Policy",
        type: "checkbox",
        sizeName: "full",
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
    user: null,
    user_id: null,
  };

  componentDidMount() {
    this.setInputChangeMethods();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Object.is(prevState.authInputs, this.state.authInputs)) {
      this.setInputChangeMethods();
    }
  }

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
    } else {
      res = await store.internLogin(this.state.submitObject);
    }
    if (res && res.data.token) {
      if (res.status) {
        this.setState({
          token: res.data.token,
          user: this.props.match.params.user.toLowerCase(),
          user_id: res.data.id,
        });

        if (res.data.user_type === "employer") {
          setCookie("token", res.data.token, {});
          setCookie("user", this.props.match.params.user.toLowerCase(), {});
          setCookie("user_id", res.data.id, {});
          window.location.pathname = `/`;
        } /* else if (res.data.isCompleted) {
          setCookie("token", res.data.token, {});
          setCookie("user", this.props.match.params.user.toLowerCase(), {});
          setCookie("user_id", res.data.id, {});
          window.location.pathname = `/`;
        } */ else if (
          res.data.isCompleted
        ) {
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
          name.key = "legalName";
          surname.key = "accountName";
          name.label = "Legal Name";
          surname.label = "Account Name";
          name.placeholder = "Enter Legal Name";
          surname.placeholder = "Enter Account Name";

          return state;
        });
      } else {
        this.setState((state) => {
          let name = state.authInputs.find((e) => e.key === "legalName");
          let surname = state.authInputs.find((e) => e.key === "accountName");
          name.key = "name";
          surname.key = "surname";
          name.label = "Name";
          surname.label = "Surname";
          name.placeholder = "Enter Name";
          surname.placeholder = "Enter Surname";

          return state;
        });
      }
    }
    this.setState({ page: page, submitObject: {} });
  };

  onInputChange = (key, value) => {
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
    let user_id = this.state.user_id;
    let response = await store.completeRegistration(user_id, payload);

    if (response) {
      this.setState({ getAdditionalInfo: false });
      window.location.pathname = `/`;
    }
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
            Employer
          </div>
        </div>
        <div className={styles.authHeader}>
          <div className={styles.headerText}>
            {type === "auth" ? page : "Log In"}
          </div>
          <div v-if={type === "auth"} className={styles.description}>
            New to Interny? Create free account
          </div>
          <div v-if={type !== "auth"} className={styles.description}>
            Log in Interny as {this.props.match.params.user}
          </div>
        </div>
        <div
          v-if={type === "auth"}
          v-for={(btn, i) in authButtons}
          key={"authBtn" + i}
          className={styles.authButtonContainer}
        >
          <div className={styles.authButton}>{btn.text}</div>
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
                  label={inp.label}
                  placeholder={inp.placeholder}
                  errorList={inp.errorList}
                  type={inp.type}
                  onChange={inp.onChange}
                />
              );
            })}
        <div className={styles.saveButtonContainer}>
          <Button
            v-for={(btn, i) in buttons}
            key={"btn" + i}
            type={btn.type}
            disabled={btn.disabled}
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
          <div className={styles.authButton}>{btn.text}</div>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.shadow}>
            <img v-if={type === "login"} src={loginImage} alt={"loginImage"} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.state.getAdditionalInfo && this.renderAdditionalInfo()}
        {!this.state.getAdditionalInfo && this.renderAuth()}
      </>
    );
  }
}

export default Authentication;
