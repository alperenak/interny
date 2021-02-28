import React from "react";
import styles from "./ConversationSearch.scss";
import Input from "../Input";

export default function ConversationSearch(props) {
	return (
		<div className={`${"conversationSearch"} ${props.type ? props.type : ""}`}>
			<Input
				type={"text"}
				placeholder={"Search"}
				size={"something"}
				onChange={props.onChange}
				className={props.className}
			/>
		</div>
	);
}
