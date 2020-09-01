import React from 'react';
import styles from './Compose.scss';

export default function Compose(props) {
    return (
      <div className={styles["compose"]}>
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />

        {
          props.rightItems
        }
      </div>
    );
}
