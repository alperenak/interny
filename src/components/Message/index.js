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
        ${"message"}
        ${isMine ? "mine" : "not-mine"}
        ${startsSequence ? "start" : ""}
        ${endsSequence ? "end" : ""}`}
    >
      {showTimestamp && (
        <div className={"timestamp"}>{friendlyTimestamp}</div>
      )}

      <div className={"bubble-container"}>
        {!isMine && (
          <div>
            <img
              className={"message-avatar"}
              src={contact.avatar || contact.photo}
              alt="Sender Avatar"
            />
          </div>
        )}
        <div className={"bubble"} title={friendlyTimestamp}>
          {data.message}
          <div className={styles.tinyTime}>
            {hours}:{mins < 10 ? "0" + mins : mins}
          </div>
        </div>
      </div>
    </div>
  );
}
