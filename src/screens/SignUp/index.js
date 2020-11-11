import React, { Component } from "react";
/*** Components ***/
import styles from "./signup.scss";
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative"

class SignUp extends Component {
  render() {
    return (
      <div className={styles.signup, styles.myFlex}>
        <Card type={"auth"} {...this.props} />
        <FooterAlternative/>
      </div>
    );
  }
}

export default SignUp;
