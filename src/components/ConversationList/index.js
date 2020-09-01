import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import styles from './ConversationList.scss';
import store from "../../store";
import {getCookie} from "../../utils/cookie";

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(async () => {
    await getConversations()
  },[])

 const getConversations = async () => {
      let user = getCookie('user_id')
      //let interns = await store.getInterns(user);
      //console.log(interns);

    axios.get('https://randomuser.me/api/?results=5').then(response => {
        console.log(response)
        let newConversations = response.data.results.map(result => {
          return {
            photo: result.picture.large,
            name: `${result.name.first} ${result.name.last}`,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });
        setConversations([...conversations, ...newConversations])
    });

  }

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
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
}
