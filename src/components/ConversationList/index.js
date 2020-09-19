import React, { useState, useEffect, Component } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import axios from "axios";
import ForwardIcon from "../../icons/arrow-forward-outline.svg";
import styles from "./ConversationList.scss";
import store from "../../store";

export default class ConversationList extends Component {
  state = {
    conversations: [],
    filteredConversations: [],
    searchText: "",
  };

  async componentDidMount() {
    await this.getConversations();
  }

  getConversations = async () => {
    store.getContacts().then((response) => {
      let newConversations = response.map((result) => {
        return {
          id: result.id,
          photo: result.avatar,
          name: `${result.name}`,
          text: "",
        };
      });
      this.setState({
        conversations: [...this.state.conversations, ...newConversations],
        filteredConversations: [
          ...this.state.conversations,
          ...newConversations,
        ],
      });
    });
  };

  onSearchTextChange = (value) => {
    this.setState((state) => {
      if (value) {
        state.filteredConversations = state.conversations.filter((el) =>
          el.name.includes(value)
        );
      } else {
        if (state.searchText) {
          state.filteredConversations = state.conversations;
        }
      }

      state.searchText = value;
      return state;
    });
  };

  render() {
    const { user } = this.props;

    const displayName = user.legalName
      ? user.legalName
      : user.name + " " + user.surname;

    return (
      <div className={styles["conversation-list"]}>
        <Toolbar
          title={
            user && (
              <div className={styles["toolbar__user-info"]}>
                <img
                  className={styles["toolbar__user-avatar"]}
                  src={
                    "https://www.click2houston.com/resizer/A0p2ChPTttB2rrVxAxVEN-XWzm4=/480x600/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/arc-anglerfish-arc2-prod-gmg.s3.amazonaws.com/public/PUD7JFA7QJCUJBFSTCO232DXTE.png"
                  }
                  alt="User Avatar"
                />
                {/* <img
                  className={styles["toolbar__forward-icon"]}
                  src={ForwardIcon}
                  alt={"forward-icon"}
                  onClick={}
                /> */}
                <div className={styles["toolbar__username"]}>{displayName}</div>
              </div>
            )
          }
        />
        <ConversationSearch
          onChange={this.onSearchTextChange}
          className="inputSearchBar"
        />
        <div className={styles["conversation-list__list"]}>
          {this.state.filteredConversations.map((conversation) => (
            <ConversationListItem
              key={conversation.name}
              data={conversation}
              getContact={this.props.getContact}
            />
          ))}
        </div>
      </div>
    );
  }
}
