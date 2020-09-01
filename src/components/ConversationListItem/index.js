import React, {useEffect} from 'react';
import shave from 'shave';

import styles from './ConversationListItem.scss';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  });

    const { photo, name, text } = props.data;

    return (
      <div className={styles["conversation-list-item"]}>
        <img className={styles["conversation-photo"]} src={photo} alt={"conversation"}/>
        <div className={styles["conversation-info"]}>
          <h1 className={styles["conversation-title"]}>{ name }</h1>
          <p className={styles["conversation-snippet"]}>{ text }</p>
        </div>
      </div>
    );
}
