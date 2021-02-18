import React from "react";
import Card from "../../components/Card";
import styles from "./campaign.scss";

export default class Campaign extends React.Component {
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div className={styles.campaing}>
        <Card type="campaign" />
      </div>
    );
  }
}
