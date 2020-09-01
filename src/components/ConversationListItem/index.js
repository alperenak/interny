import React, {Component, useEffect} from 'react';
import shave from 'shave';

import styles from './ConversationListItem.scss';

export default class ConversationListItem extends Component {

    componentDidMount() {
        shave('.conversation-snippet', 20);
    }

    render() {
        let { photo, name, text } = this.props.data;

        return (
          <div onClick={() => this.props.getContact(this.props.data)} className={styles["conversation-list-item"]}>
            <img className={styles["conversation-photo"]} src={photo} alt={"conversation"}/>
            <div className={styles["conversation-info"]}>
              <h1 className={styles["conversation-title"]}>{ name }</h1>
              <p className={styles["conversation-snippet"]}>{ text }</p>
            </div>
          </div>
        );
    }
}
