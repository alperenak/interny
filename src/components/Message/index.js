import React from 'react';
import moment from 'moment';
import styles from './Message.scss';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={`
        ${styles['message']} 
        ${isMine ? styles['mine'] : ''} 
        ${startsSequence ? styles['start'] : ''} 
        ${endsSequence ? styles['end'] : ''}`
      }>
        {
          showTimestamp &&
            <div className={styles["timestamp"]}>
              { friendlyTimestamp }
            </div>
        }

        <div className={styles["bubble-container"]}>
          <div className={styles["bubble"]} title={friendlyTimestamp}>
            { data.message }
          </div>
        </div>
      </div>
    );
}
