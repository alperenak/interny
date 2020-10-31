import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./referrenceLetter.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import store from "../../store";
import LoadingModal from "../../components/LoadingModal";
import { Link } from "react-router-dom";


class ReferrenceLetter extends Component {
  state = {
    value: "",
    processing: false
  };

  render() {
    return (
      <div className={styles.outer}>
        <LoadingModal text="Loading" v-if={this.state.processing} />
        <div className={styles.modal}>
          <div className={styles.header}>Referrence Letter</div>
          <div className={styles.description}>
            Enter the Referrence Letter Code and Intern Last Name. Then you can see the Referrence Letter. 
          </div>

          <div className={styles.input_wrapper}>
            <Input
              label={'Referrence Letter Code'}
              type="text"
              size={'large'}
              placeholder="Referrence Letter Coed"
              onChange={value => this.setState({ value })}
            />
            <Input
              label={'Intern Last Name'}
              type="text"
              size={'large'}
              placeholder="Intern Last Name"
              onChange={value => this.setState({ value })}
            />
            <div className={styles.button}>
                  <Link className={styles.referrenceButton} to="/referrenceLetterLetter">Send</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReferrenceLetter;
