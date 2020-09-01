import React, {useState, useEffect, Component} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import styles from './ConversationList.scss';
import store from "../../store";

export default class ConversationList extends Component {
    state = {
        conversations: []
    };

    async componentDidMount() {
        await this.getConversations();
    }

    getConversations = async () => {
        store.getContacts().then(response => {
            let newConversations = response.map(result => {
              return {
                id: result.id,
                photo: result.avatar,
                name: `${result.name}`,
                text: ''
              };
            });
            this.setState({conversations: [...this.state.conversations, ...newConversations]})
        });
    };

    render() {
        return (
          <div className={styles["conversation-list"]}>
            <Toolbar
              title="Messenger"
              leftItems={[
                <ToolbarButton key="cog" icon="ion-ios-cog" />
              ]}
              rightItems={[
                <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
              ]}
            />
            <ConversationSearch />
            {
              this.state.conversations.map(conversation =>
                <ConversationListItem
                  key={conversation.name}
                  data={conversation}
                  getContact={this.props.getContact}
                />
              )
            }
          </div>
        );
    }

}
