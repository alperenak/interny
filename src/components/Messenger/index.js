import React, { Component, useEffect, useState } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import styles from "./Messenger.scss";
import ToolbarButton from "../ToolbarButton";
import Toolbar from "../Toolbar";
import store from "../../store";
import Button from "../Button";
import messagesIcon from "../../assets/messages.png";

export default class Messenger extends Component {
  state = {};

  async componentDidMount() {
    await this.getContacts();
  }

  getContact = (contactParam) => {
    this.setState({ contact: contactParam });
  };

  getContacts = async () => {
    let res = await store.getContacts();
    if (res && Array.isArray(res) && res.length > 0)
      this.setState({ contact: res[0] });
  };

  render() {
    return (
      <div className={styles["messenger__container"]}>
        <div className={styles["messenger"]}>
          <div className={`${styles["scrollable"]} ${styles["sidebar"]}`}>
            <ConversationList
              getContact={this.getContact}
              contact={this.state.contact}
              user={this.props.user}
            />
          </div>

          <div className={`${styles["scrollable"]} ${styles["content"]}`}>
            <MessageList
              v-if={this.state.contact}
              contact={this.state.contact}
              getContacts={this.getContacts}
            />
            <div className={styles.noContent} v-else>
              <img src={messagesIcon} alt={'messages'} />
              <div className={styles.title}>Welcome to Messages</div>
              <div className={styles.subTitle}>When a contact contacts you, you can reach messages here.</div>
              <Button
                type={'primary'}
                text={'Find Jobs'}
                to={'/'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
