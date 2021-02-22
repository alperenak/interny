import React from "react";
import styles from "./campaign.scss";
import PackageBox from "../../../../assets/packagebox.png";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";

class CampaignCard extends React.Component {
  componentDidMount() {}

  render() {
    const { t } = this.props;
    console.log(this.props);
    const staticData = [
      t("campaign_package_card_campaign_details_item1"),
      t("campaign_package_card_campaign_details_item2"),
      t("campaign_package_card_campaign_details_item3"),
      t("campaign_package_card_campaign_details_item4"),
      t("campaign_package_card_campaign_details_item5"),
    ];
    return (
      <div className="campaignCardContainer">
        <img src={PackageBox} className="campaignPackageImage" />
        <div className="campaignTitle">{t("campaign_package_card_title")}</div>
        <div className="campaignDetailSection">
          <div className="campaignDiscountPart">
            <div className="campaignDiscountPercentSection">
              <div className="campaignDiscountPercent">
                <span>{t("campaign_package_card_discount_percent")}</span>{" "}
                {` \n ${t("campaign_package_card_discount_percent_text")} `}
              </div>
            </div>
            <div className="campaignDiscountCostSection">
              <div className="campaignDiscountCost">
                {t("campaign_package_card_discount_cost")}
              </div>
              <div className="campaignDiscountCostDetail">
                {t("campaign_package_card_discount_cost_detail")}
              </div>
            </div>
          </div>
          <div className="campaignDetailPart">
            {staticData.map((item) => (
              <div className="campaignDetailPartItem">{item}</div>
            ))}
          </div>
        </div>
        <div
          className="campaignBuyButton"
          onClick={() => {
            window.location.href = "/cart";
            localStorage.setItem(
              "cartData",
              JSON.stringify({ price: "$27.99" })
            );
            localStorage.setItem(
              "cartItems",
              JSON.stringify("prod_IzbtUye5fy9r8g")
            );
          }}
        >
          {t("campaign_package_card_discount_buy_button")}
        </div>
      </div>
    );
  }
}

export default withNamespaces()(CampaignCard);
