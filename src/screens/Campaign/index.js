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
import i18n from "../../i18n";

import CountriesEN from "../../assets/countries.png";
import CountriesTR from "../../assets/ulke.png";
import SectorsEN from "../../assets/sectors.png";
import SectorsTR from "../../assets/sektor.png";
import InternshipEN from "../../assets/internships.png";
import InternshipTR from "../../assets/staj.png";
import CompaniesEN from "../../assets/companies.png";
import CompaniesTR from "../../assets/sirket.png";

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
    let ImagesCounter = [
      i18n.language !== "tr" ? CountriesEN : CountriesTR,
      i18n.language !== "tr" ? SectorsEN : SectorsTR,
      i18n.language !== "tr" ? CompaniesEN : CompaniesTR,
      i18n.language !== "tr" ? InternshipEN : InternshipTR,
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

            <div
              className="row align-items-start justify-content-start campaignRow"
              style={{ marginTop: 56, marginBottom: 56 }}
            >
              <div className="flexOne getPadding">
                {t("campaign_header_desc1")}
              </div>
              <div className="flexOne getPadding">
                {t("campaign_header_desc2")}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center imageCounter">
              {/* <div className="internyUseCounter">
                
              </div> */}
              {ImagesCounter.map((item) => {
                return <img src={item} width="200" alt="sad" />;
              })}
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
              {t("campaign_faqs_title")}
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
