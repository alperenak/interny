import React from 'react';
import styles from './ConversationSearch.scss';

export default function ConversationSearch() {
    return (
      <div className={styles["conversation-search"]}>
        <input
          type="search"
          className={styles["conversation-search-input"]}
          placeholder="Search Messages"
        />
      </div>
    );
}
