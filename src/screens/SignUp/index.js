import React, { Component } from "react";
/*** Components ***/
import styles from "./signup.scss";
import Card from "../../components/Card";

class SignUp extends Component {
  render() {
    return (
      <div className={styles.signup}>
        <Card type={"auth"} {...this.props} />
      </div>
    );
  }
}

export default SignUp;
