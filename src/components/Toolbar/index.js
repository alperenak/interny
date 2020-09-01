import React from 'react';
import styles from './Toolbar.scss';

export default function Toolbar(props) {
    const { title, leftItems, rightItems } = props;
    return (
      <div className={styles["toolbar"]}>
        <div className={styles["left-items"]}>{ leftItems }</div>
        <h1 className={styles["toolbar-title"]}>{ title }</h1>
        <div className={styles["right-items"]}>{ rightItems }</div>
      </div>
    );
}
