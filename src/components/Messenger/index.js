import React, {Component, useEffect, useState} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import styles from './Messenger.scss';
import ToolbarButton from "../ToolbarButton";
import Toolbar from "../Toolbar";
import store from "../../store";
import {getCookie} from "../../utils/cookie";

export default class Messenger extends Component {
    state = {
    };

    async componentDidMount() {
        await this.getContacts();
        let io = require('socket.io-client');
        let user = getCookie('user_id');
        this.setState({...this.state, socket: io(`http://localhost:5000/ws-notifications?user=${user}`)})
    }

    getContact = (contactParam) => {
        this.setState({contact: contactParam});
    };

    getContacts = async () => {
        let res = await store.getContacts();
        if (res && Array.isArray(res) && res.length > 0)
            this.setState({contact: res[0]});
    };

    render() {
        return (
          <div className={styles["messenger"]}>
            <div className={`${styles["scrollable"]} ${styles["sidebar"]}`}>
              <ConversationList getContact={this.getContact} />
            </div>

            <div className={`${styles["scrollable"]} ${styles["content"]}`}>
              <MessageList v-if={this.state.contact} contact={this.state.contact} getContacts={this.getContacts} />
            </div>
          </div>
        );
    }
}
