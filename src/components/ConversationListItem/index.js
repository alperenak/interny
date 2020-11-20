import React, { Component, useEffect } from "react";
import shave from "shave";

import styles from "./ConversationListItem.scss";

export default class ConversationListItem extends Component {
  componentDidMount() {
    shave(".conversationListItem__snippet", 20);
  }

	render() {
		let { photo, name, text } = this.props.data;

		return (
			<div onClick={() => this.props.getContact(this.props.data)} className={"conversationListItem"}>
				<img
					className={"conversationListItem__photo"}
					src={photo}
					alt={"conversation"}
				/>
				<div>
					<h1 className={"conversationListItem__title"}>{name}</h1>
					<p className={"conversationListItem__snippet"}>{text}</p>
				</div>
			</div>
		);
	}
}
