import React from "react";
import "./campaign.scss";
import GetIntery from "../../assets/getInterny.png";
import FindJob from "../../assets/findJob.png";
import Reference from "../../assets/reference.png";
import Remote from "../../assets/remote.png";
import Card from "../../components/Card";
import { withNamespaces } from "react-i18next";

class Campaign extends React.Component {
  componentDidMount() {}

  render() {
    const { t } = this.props;
    return (
      <div className="Campaign">
        <div className="CampaignWrapper">
          <div className="CampaignBranding">
            <div className="CampaignBrandingTitle">
              {t("campaign_header_title")}
            </div>
          </div>
          <div className="row align-items-center campaignRow">
            <div className="flexOne">
              <img src={GetIntery} />
            </div>
            <div className="flexOne responsiveCenter">
              <h2 className="SummerIntershipTitle">
                {t("campaign_summer_internship_part_title")}
              </h2>
              <p>{t("campaign_summer_internship_part_description")}</p>
              <div
                onClick={() => (window.location.href = "#campaignDiscountCard")}
                className="SummerInternshipButton"
              >
                {t("campaign_get_internship_package_button")}
              </div>
            </div>
          </div>
          <div className="row align-items-center campaignRow RowReverse">
            <div className="flexOne positionRight">
              <img src={FindJob} />
            </div>
            <div className="flexOne">
              <h2 className="SummerIntershipTitle">
                {t("campaign_find_jobs_part_title")}
              </h2>
              <p>{t("campaign_find_jobs_part_description")}</p>
            </div>
          </div>
          <div className="row align-items-center campaignRow">
            <div className="flexOne">
              <img src={Remote} />
            </div>
            <div className="flexOne">
              <h2 className="SummerIntershipTitle">
                {t("campaign_remote_working_part_title")}
              </h2>
              <p>{t("campaign_remote_working_part_description")}</p>
            </div>
          </div>
          <div className="row align-items-center campaignRow RowReverse">
            <div className="flexOne positionRight">
              <img src={Reference} />
            </div>
            <div className="flexOne">
              <h2 className="SummerIntershipTitle">
                {t("campaign_reference_letter_part_title")}
              </h2>
              <p>{t("campaign_reference_letter_part_decription")}</p>
            </div>
          </div>
          <div className="row align-items-center campaignRow">
            <div className="flexOne campaignCard" id="campaignDiscountCard">
              <Card type="campaign" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withNamespaces()(Campaign);
