import React, { Component } from "react";
import styles from "./Compose.scss";
import store from "../../store";
import Input from "../Input";
import sendButton from "../../icons/send-outline.svg";

export default class Compose extends Component {
  state = {
    value: "",
  };
  render() {
    return (
      <div className={styles["compose"]}>
        <Input
          type="text"
          size={"compose"}
          className={styles["compose-input"]}
          placeholder="Type a message"
          priorValue={this.state.value}
          priority={true}
          onKeyDown={async (event) => {
            if (event.keyCode === 13) {
              await store.createMessage(this.props.receiver, this.state.value);
              this.setState({ value: "" });
              await this.props.getContacts();
            }
          }}
          onChange={(value) => this.setState({ value: value })}
        />
        <img
          onClick={async () => {
            await store.createMessage(this.props.receiver, this.state.value);
            this.setState({ value: "" });
            await this.props.getContacts();
          }}
          src={sendButton}
          alt="send-button"
        />
      </div>
    );
  }
}
