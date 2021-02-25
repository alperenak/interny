import React from "react";
import "./campaign.scss";
import GetIntery from "../../assets/getInterny.png";
import FindJob from "../../assets/findJob.png";
import Reference from "../../assets/reference.png";
import Remote from "../../assets/remote.png";
import Card from "../../components/Card";
import { withNamespaces } from "react-i18next";
import FooterAlternative from "../../components/FooterAlternative";

class Campaign extends React.Component {
  componentDidMount() {}

  render() {
    const { t } = this.props;
    return (
      <>
        <div className="Campaign">
          <div className="CampaignWrapper">
            <div className="CampaignBranding">
              <div className="CampaignBrandingTitle">
                {t("campaign_header_title")}
              </div>
            </div>

            <div className="row align-items-start justify-content-start campaignRow">
              <div className="flexOne getPadding">
                Welcome to INTERNY, the world's first remote online internship
                platform. You will find everything you need and more during the
                internship process on the platform. It allows you to do your
                internship at any company anywhere in the world, wherever and
                whenever you want. All you have to do is complete the assigned
                tasks thoroughly.
              </div>
              <div className="flexOne getPadding">
                You can benefit from a 60% discount with the Summer Internship
                campaign. With this campaign, you already guarantee to start
                your summer internship in June, July, or August. You don't need
                to look for a 2021 summer internship. It will be sufficient to
                choose any of the 18 countries and 11 main sectors.
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <h2 className="SummerIntershipTitle">
                {t("campaign_header_subtitle")}
              </h2>
            </div>
            <div className="row align-items-center campaignRow">
              <div className="flexOne getPadding">
                <img src={GetIntery} />
              </div>
              <div className="flexOne getPadding responsiveCenter">
                <h2 className="SummerIntershipTitle">
                  {t("campaign_summer_internship_part_title")}
                </h2>
                <p>{t("campaign_summer_internship_part_description")}</p>
                <div
                  onClick={() =>
                    (window.location.href = "#campaignDiscountCard")
                  }
                  className="SummerInternshipButton"
                >
                  {t("campaign_get_internship_package_button")}
                </div>
              </div>
            </div>
            <div className="row align-items-center campaignRow RowReverse">
              <div className="flexOne getPadding positionRight">
                <img src={FindJob} />
              </div>
              <div className="flexOne getPadding">
                <h2 className="SummerIntershipTitle">
                  {t("campaign_find_jobs_part_title")}
                </h2>
                <p>{t("campaign_find_jobs_part_description")}</p>
              </div>
            </div>
            <div className="row align-items-center campaignRow">
              <div className="flexOne getPadding">
                <img src={Remote} />
              </div>
              <div className="flexOne getPadding">
                <h2 className="SummerIntershipTitle">
                  {t("campaign_remote_working_part_title")}
                </h2>
                <p>{t("campaign_remote_working_part_description")}</p>
              </div>
            </div>
            <div className="row align-items-center campaignRow RowReverse">
              <div className="flexOne getPadding positionRight">
                <img src={Reference} />
              </div>
              <div className="flexOne getPadding">
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
        <FooterAlternative />
      </>
    );
  }
}
export default withNamespaces()(Campaign);
