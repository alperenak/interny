import React from "react";
import styles from "./campaign.scss";
import PackageBox from "../../../../assets/packageBox.png";

export default class CampaignCard extends React.Component {
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div className="campaignCardContainer">
        <img src={PackageBox} className="campaignPackageImage" />
        <div className="campaignTitle">SUMMER INTERNSHIP</div>
        <div className="campaignDetailSection">
          <div className="campaignDiscountPart">
            <div className="campaignDiscountPercentSection">
              <div className="campaignDiscountPercent">
                <span>60%</span> {" \n Discount"}
              </div>
            </div>
            <div className="campaignDiscountCostSection">
              <div className="campaignDiscountCost">$27.99</div>
              <div className="campaignDiscountCostDetail">
                per 4 weeks intenship
              </div>
            </div>
          </div>
          <div className="campaignDetailPart">
            {staticData.map((item) => (
              <div className="campaignDetailPartItem">{item}</div>
            ))}
          </div>
        </div>
        <div className="campaignBuyButton">BUY NOW </div>
      </div>
    );
  }
}

const staticData = [
  "⦁ Internship Start Guarantee",
  "⦁ iMS™",
  "⦁ WFA Report",
  "⦁ Reference Letter",
  "⦁ Language Support Service \n (+ $19.99)",
];
