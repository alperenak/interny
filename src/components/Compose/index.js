import React, {Component} from 'react';
import styles from './Compose.scss';
import store from "../../store";
import Input from "../Input";

export default class Compose extends Component {
    state = {
      value: ''
    };
    render() {
        return (
          <div className={styles["compose"]}>
            <Input
              type="text"
              size={"large"}
              className={styles["compose-input"]}
              placeholder="Type a message"
              priorValue={this.state.value}
              priority={true}
              onKeyDown={async (event) => {
                  if (event.keyCode === 13) {
                      await store.createMessage(this.props.receiver, this.state.value);
                      this.setState({ value: '' });
                      await this.props.getContacts();
                  }
              }}
              onChange={(value) => this.setState({ value: value })}
            />
          </div>
        );
    }
}
