import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./forgotPassword.scss";
import Input from "../../../Input";
import Button from "../../../Button";

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
            <Input
              label={'E-mail Address'}
              type="text"
              size={'large'}
              placeholder="Enter e-mail address"
              onChange={v => this.setState({ value: v })}
            />
            <div className={styles.button}>
              <Button text={'Send Password'} type={'secondary'} onButtonClick={this.props.onClick} />
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    );
  }
}

export default ForgotPassword;
