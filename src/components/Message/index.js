import React from "react";
import moment from "moment";
import styles from "./Message.scss";

export default function Message(props) {
  const {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp,
    contact,
  } = props;

  const friendlyTimestamp = moment(data.timestamp).format("LLLL");
  let hours = new Date(friendlyTimestamp).getHours();
  let mins = new Date(friendlyTimestamp).getMinutes();
  return (
    <div
      className={`
        ${styles["message"]} 
        ${isMine ? styles["mine"] : styles["not-mine"]} 
        ${startsSequence ? styles["start"] : ""} 
        ${endsSequence ? styles["end"] : ""}`}
    >
      {showTimestamp && (
        <div className={styles["timestamp"]}>{friendlyTimestamp}</div>
      )}

      <div className={styles["bubble-container"]}>
        {!isMine && (
          <div>
            <img
              className={styles["message-avatar"]}
              src={contact.avatar || contact.photo}
              alt="Sender Avatar"
            />
          </div>
        )}
        <div className={styles["bubble"]} title={friendlyTimestamp}>
          {data.message}
          <div className={styles.tinyTime}>
            {hours}:{mins < 10 ? "0" + mins : mins}
          </div>
        </div>
      </div>
    </div>
  );
}
