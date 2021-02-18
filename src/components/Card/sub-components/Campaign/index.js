import React from "react";
import styles from "./campaign.scss";

export default class CampaignCard extends React.Component {
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div className={styles.campaignCardContainer}>
        <div className={styles.campaignTitle}>SUMMER INTERNSHIP</div>
      </div>
    );
  }
}
