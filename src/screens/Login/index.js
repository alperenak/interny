import React, { Component } from "react";
import styles from "./login.scss";
/*** Components ***/
import Card from "../../components/Card";

class Login extends Component {
  render() {
    return (
      <div className={styles.login}>
        <Card type={"login"} {...this.props} />
      </div>
    );
  }
}

export default Login;
