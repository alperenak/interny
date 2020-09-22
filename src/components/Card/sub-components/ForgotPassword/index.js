import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./forgotPassword.scss";
import Input from "../../../Input";
import Button from "../../../Button";
import store from "../../../../store";
import LoadingModal from "../../../LoadingModal";

class ForgotPassword extends Component {
  state = {
    value: "",
    processing: false
  };

  onClick = async () => {
    this.setState({ processing: true });
    await store.sendForgot(this.props.userType, this.state.value);
    this.setState({ processing: false });
    window.location.pathname = '/';
  };

  render() {
    return ReactDOM.createPortal(
      <div className={styles.outer}>
        <LoadingModal v-if={this.state.processing} />
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
              onChange={value => this.setState({ value })}
            />
            <div className={styles.button}>
              <Button text={'Send Password'} type={'secondary'} onButtonClick={async () => await this.onClick()} />
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    );
  }
}

export default ForgotPassword;
