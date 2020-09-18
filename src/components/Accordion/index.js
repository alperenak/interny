import React, { Component } from "react";
import styles from "./accordion.scss";
import plus_icon from "../../icons/add-outline.svg";

class Accordion extends Component {
  state = { className: "" };
  render() {
    return (
      <div className={styles.card}>
        <button
          className={styles.toggler}
          onClick={() =>
            this.setState({
              className: this.state.className == "" ? styles.active : "",
            })
          }
        >
          <div className={styles.button_title}>{this.props.title}</div>

          <img
            src={plus_icon}
            alt=""
            className={`${styles.button_icon} ${this.state.className}`}
          />
        </button>
        <div className={`${styles.content} ${this.state.className}`}>
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}

export default Accordion;
