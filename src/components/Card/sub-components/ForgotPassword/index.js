import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./forgotPassword.scss";

class ForgotPassword extends Component {
  state = { value: "" };

  onChange = (e) => {
    let { onChange } = this.props;
    let { value } = this.state;
    this.setState({ value: e.target.value });
    onChange(value);
  };

  render() {
    return ReactDOM.createPortal(
      <div className={styles.outer}>
        <div className={styles.modal}>
          <div className={styles.header}>Forgot Password</div>
          <div className={styles.description}>
            Enter the e-mail address associated with your Interny account. We
            will send you a reset email so that you can reset your password.
          </div>

          <div className={styles.input_wrapper}>
            <label htmlFor="email" className={styles.label}>
              E-mail Address
            </label>

            <div className={styles.input_field_wrapper}>
              <input
                type="text"
                placeholder="Enter e-mail address"
                className={styles.input}
                onChange={this.onChange}
                value={this.state.value}
              />
            </div>
            <button className={styles.button} onClick={this.props.onClick}>
              Send Password
            </button>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    );
  }
}

export default ForgotPassword;
