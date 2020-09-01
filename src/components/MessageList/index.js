import React, {Component, useEffect, useState} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

import styles from'./MessageList.scss';
import store from "../../store";
import {getCookie} from "../../utils/cookie";

const MY_USER_ID = getCookie('user_id');

export default class MessageList extends Component {
    state = {
        messages: []
    };

    async componentDidMount() {
        await this.getMessages();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (!Object.is(prevProps.contact, this.props.contact)) {
            await this.getMessages();
            document.getElementById('message-list').scrollTo(0,document.getElementById('message-list').scrollHeight);
        }
    }

    getMessages = async () => {
      let {contact} = this.props;
      let res = await store.getMessage(contact.id);

      let tempMessages = res.map(msg => {
          return {
              id: msg.Sender.id,
              author: msg.Sender.name,
              message: msg.data,
              timestamp: msg.createdAt
          };
      });
      this.setState({messages: [...tempMessages]})
    };

    renderMessages = () => {
        let i = 0;
        let {messages} = this.state;
        let messageCount = messages.length;
        let tempMessages = [];

        while (i < messageCount) {
          let previous = messages[i - 1];
          let current = messages[i];
          let next = messages[i + 1];
          let isMine = current.id === MY_USER_ID;
          let currentMoment = moment(current.timestamp);
          let prevBySameAuthor = false;
          let nextBySameAuthor = false;
          let startsSequence = true;
          let endsSequence = true;
          let showTimestamp = true;

          if (previous) {
            let previousMoment = moment(previous.timestamp);
            let previousDuration = moment.duration(currentMoment.diff(previousMoment));
            prevBySameAuthor = previous.author === current.author;

            if (prevBySameAuthor && previousDuration.as('hours') < 1) {
              startsSequence = false;
            }

            if (previousDuration.as('hours') < 1) {
              showTimestamp = false;
            }
          }

          if (next) {
            let nextMoment = moment(next.timestamp);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            nextBySameAuthor = next.author === current.author;

            if (nextBySameAuthor && nextDuration.as('hours') < 1) {
              endsSequence = false;
            }
          }

          tempMessages.push(
            <Message
              key={i}
              isMine={isMine}
              startsSequence={startsSequence}
              endsSequence={endsSequence}
              showTimestamp={showTimestamp}
              data={current}
            />

          );

          // Proceed to the next message.
          i += 1;
    }

    return tempMessages;
    };
    render() {
        return(
          <div className={styles["message-list"]}>
            <Toolbar
              title="Conversation Title"
              rightItems={[
                <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
              ]}
            />

            <div id={'message-list'} className={styles["message-list-container"]}>{this.renderMessages()}</div>

            <Compose receiver={this.props.contact.id} getContacts={this.props.getContacts}/>
          </div>
        );
    }
}
