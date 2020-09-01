import React, {Component} from 'react';
import styles from './Compose.scss';
import store from "../../store";

export default class Compose extends Component {
    state = {
      value: ''
    };
    render() {
        return (
          <div className={styles["compose"]}>
            <input
              type="text"
              className={styles["compose-input"]}
              placeholder="Type a message"
              value={this.state.value}
              onKeyDown={async (event) => {
                  if (event.keyCode === 13) {
                      await store.createMessage(this.props.receiver, this.state.value);
                      this.setState({ value: '' });
                      await this.props.getContacts();
                  }
              }}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </div>
        );
    }
}
