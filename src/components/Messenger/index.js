import React from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import styles from './Messenger.scss';

export default function Messenger(props) {
    return (
      <div className={styles["messenger"]}>
        {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

        {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

        <div className={styles["scrollable sidebar"]}>
          <ConversationList />
        </div>

        <div className={styles["scrollable content"]}>
          <MessageList />
        </div>
      </div>
    );
}
