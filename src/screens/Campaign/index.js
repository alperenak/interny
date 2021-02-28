import React from "react";
import "./campaign.scss";
import GetIntery from "../../assets/getInterny.png";
import FindJob from "../../assets/findJob.png";
import Reference from "../../assets/reference.png";
import Remote from "../../assets/remote.png";
import Card from "../../components/Card";
import { withNamespaces } from "react-i18next";
import FooterAlternative from "../../components/FooterAlternative";
import Accordion from "../../components/Accordion";
import Footer from "../../components/Footer";
class Campaign extends React.Component {
  componentDidMount() {}

  render() {
    const { t } = this.props;
    const intern = [
      {
        question: this.props.t("campaign_faqs_question_between_date"),
        answer: this.props.t("campaign_faqs_answer_between_date"),
      },

      {
        question: this.props.t("campaign_faqs_question_starting_guaranteed"),
        answer: this.props.t("campaign_faqs_answer_starting_guaranteed"),
      },
      {
        question: this.props.t("campaign_faqs_question_which_countries"),

        answer: this.props.t("campaign_faqs_answer_which_countries"),
      },
      {
        question: this.props.t("campaign_faqs_question_which_sectors"),

        answer: this.props.t("campaign_faqs_answer_which_sectors"),
      },
      {
        question: this.props.t("campaign_faqs_question_companies_remote"),

        answer: this.props.t("campaign_faqs_answer_companies_remote"),
      },

      {
        question: this.props.t("campaign_faqs_question_internship_period"),

        answer: this.props.t("campaign_faqs_answer_internship_period"),
      },

      {
        question: this.props.t("campaign_faqs_question_change_internship"),

        answer: this.props.t("campaign_faqs_answer_change_internship"),
      },

      {
        question: this.props.t("campaign_faqs_question_what_languages"),

        answer: this.props.t("campaign_faqs_answer_what_languages"),
      },

      {
        question: this.props.t("campaign_faqs_question_end_internship"),

        answer: this.props.t("campaign_faqs_answer_end_internship"),
      },
    ];
    return (
      <>
        <div className="Campaign">
          <div className="CampaignWrapper">
            <div className="CampaignBranding">
              <div className="CampaignBrandingTitle">
                {t("campaign_header_title")}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="internyUseCounter">
                18 <span>Ülke</span> 11
                <span style={{ color: "#dd5454" }}> Sektör</span> 3 Bin
                <span style={{ color: "rgba(249,112,80,0.9)" }}>
                  {" "}
                  Şirket
                </span>{" "}
                45 Bin
                <span style={{ color: "rgb(105, 108, 255)" }} className="pink">
                  {" "}
                  Staj
                </span>
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

            <div
              className="d-flex align-items-center justify-content-center"
              style={{ marginTop: 40, marginBottom: 40 }}
            >
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
            <h2
              className="SummerIntershipTitle"
              style={{ textAlign: "center", marginTop: 100 }}
            >
              {t("footer_faq")}
            </h2>
            <div className="accordion">
              {intern.map((data, index) => {
                return (
                  <Accordion title={data.question} content={data.answer} />
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default withNamespaces()(Campaign);
