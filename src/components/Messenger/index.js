import React, { Component, useEffect, useState } from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import styles from "./Messenger.scss";
import ToolbarButton from "../ToolbarButton";
import Toolbar from "../Toolbar";
import store from "../../store";
import Button from "../Button";
import messagesIcon from "../../assets/messages.svg";
import {getCookie} from "../../utils/cookie";

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
			<div className={"messengerContainer"}>
				<div class="container">
					<div className={"messengerContainer__messenger"}>
						<div class="row" style={{"margin":0,"height":"100%"}}>
							<div class="col-md-4" style={{padding:"0"}}>
								<div className={`${"messengerContainer__scrollable"} ${"messengerContainer__sidebar"}`}>
									<ConversationList
										getContact={this.getContact}
										contact={this.state.contact}
										user={this.props.user}
									/>
								</div>
							</div>
							<div class="col-md-8" style={{padding:"0"}}>
								<div className={`${"messengerContainer__scrollable"} ${"messengerContainer__content"}`}>
									<MessageList
										v-if={this.state.contact}
										contact={this.state.contact}
										getContacts={this.getContacts}
									/>
									<div className={"messengerContainer__noContent"} v-else>
										<img src={messagesIcon} alt={'messages'} />
										<div className={"messengerContainer__noContent__title"}>Welcome to Messages</div>
										<div v-if={getCookie('user') === 'intern'} className={"messengerContainer__noContent__subTitle"}>
											When an employer contacts you, you can reach messages here.
										</div>
										<div v-if={getCookie('user') === 'employer'} className={"messengerContainer__noContent__subTitle"}>
											You can contact with interns here.
										</div>
										<Button
											v-if={getCookie('user') === 'intern'}
											type={'primary'}
											text={'Find Jobs'}
											to={'/'}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
