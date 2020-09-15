import React from "react";
import styles from "./ConversationSearch.scss";
import Input from "../Input";

export default function ConversationSearch(props) {
  return (
    <div className={styles["conversation-search"]}>
      <Input
        type={"text"}
        placeholder={"Search Messages"}
        size={"something"}
        onChange={props.onChange}
        className={props.className}
      />
    </div>
  );
}
