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
      <div className={[
          styles['message'],
          styles[`${isMine ? 'mine' : ''}`],
          styles[`${startsSequence ? 'start' : ''}`],
          styles[`${endsSequence ? 'end' : ''}`]
      ].join(' ')}>
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
