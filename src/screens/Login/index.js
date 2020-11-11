import React, { Component } from "react";
import styles from "./login.scss";
/*** Components ***/
import Card from "../../components/Card";
import FooterAlternative from "../../components/FooterAlternative"

class Login extends Component {
  render() {
    return (
      <div className={styles.login, styles.myFlex}>
        <Card type={"login"} {...this.props} />
        <FooterAlternative/>
      </div>
    );
  }
}

export default Login;
