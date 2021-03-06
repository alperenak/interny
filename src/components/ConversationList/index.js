import React, { useState, useEffect, Component } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import axios from "axios";
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
          photo: result.logo || result.avatar,
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
		const displayName = user.legalName ? user.legalName : user.name + " " + user.surname;
		return (
			<div className={"conversationList"}>
				{
					user && (
					<div className={"toolbarUserInfo"}>
						<img
						className={"toolbarUserInfo__avatar"}
						src={user.avatar || user.logo}
						alt="User Avatar"
						/>
						<div className={"toolbarUserInfo__username"}>{displayName}</div>
					</div>
					)
				}
				<ConversationSearch
					onChange={this.onSearchTextChange}
					className="inputSearchBar"
				/>
				<div className={"conversationList__list"}>
					<div class="row">
					{this.state.filteredConversations.map((conversation) => (
						<div class="col-md-12">
							<ConversationListItem
								key={conversation.name}
								data={conversation}
								getContact={this.props.getContact}
							/>
						</div>
					))}
					</div>

				</div>
			</div>
		);
	}
}
