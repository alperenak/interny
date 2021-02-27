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
class Campaign extends React.Component {
  componentDidMount() {}

  render() {
    const { t } = this.props;
    const intern = [
      {
        question: this.props.t("faqs_intern_question_what_internship"),
        answer: this.props.t("faqs_intern_answer_what_internship"),
      },

      {
        question: this.props.t("faqs_intern_question_what_interny"),
        answer: this.props.t("faqs_intern_answer_what_interny"),
      },
      {
        question: this.props.t("faqs_intern_question_what_should"),

        answer: this.props.t("faqs_intern_answer_what_should"),
      },
      {
        question: this.props.t("faqs_intern_question_who_use"),

        answer: this.props.t("faqs_intern_answer_who_use"),
      },
      {
        question: this.props.t("faqs_intern_question_paid"),

        answer: this.props.t("faqs_intern_answer_paid"),
      },

      {
        question: this.props.t("faqs_intern_question_faculty_restrictions"),

        answer: this.props.t("faqs_intern_answer_faculty_restrictions"),
      },

      {
        question: this.props.t("faqs_intern_question_internship_approved"),

        answer: this.props.t("faqs_intern_answer_internship_approved"),
      },

      {
        question: this.props.t("faqs_intern_question_what_wfa"),

        answer: this.props.t("faqs_intern_answer_what_wfa"),
      },

      {
        question: this.props.t("faqs_intern_question_reference_letter"),

        answer: this.props.t("faqs_intern_answer_reference_letter"),
      },

      {
        question: this.props.t("faqs_intern_question_need_passport"),

        answer: this.props.t("faqs_intern_answer_need_passport"),
      },
      {
        question: this.props.t("faqs_intern_question_really_exist"),

        answer: this.props.t("faqs_intern_answer_really_exist"),
      },
      {
        question: this.props.t("faqs_intern_question_evaluate_companies"),

        answer: this.props.t("faqs_intern_answer_evaluate_companies"),
      },
      {
        question: this.props.t("faqs_intern_question_what_ims"),

        answer: this.props.t("faqs_intern_answer_what_ims"),
      },
      {
        question: this.props.t("faqs_intern_question_cant_what_time"),

        answer: this.props.t("faqs_intern_answer_cant_what_time"),
      },
      {
        question: this.props.t("faqs_intern_question_cant_complete_task"),

        answer: this.props.t("faqs_intern_answer_cant_complete_task"),
      },
      {
        question: this.props.t("faqs_intern_question_competency_report"),

        answer: this.props.t("faqs_intern_answer_competency_report"),
      },
      {
        question: this.props.t(
          "faqs_intern_question_competency_report_validity"
        ),

        answer: this.props.t("faqs_intern_answer_competency_report_validity"),
      },

      {
        question: this.props.t(
          "faqs_intern_question_recreate_competency_report"
        ),

        answer: this.props.t("faqs_intern_answer_recreate_competency_report"),
      },

      {
        question: this.props.t("faqs_intern_question_internship_company"),

        answer: this.props.t("faqs_intern_answer_internship_company"),
      },
      {
        question: this.props.t("faqs_intern_question_approved_university"),

        answer: this.props.t("faqs_intern_answer_approved_university"),
      },
      {
        question: this.props.t("faqs_intern_question_language_problem"),

        answer: this.props.t("faqs_intern_answer_language_problem"),
      },
      {
        question: this.props.t("faqs_intern_question_help_me"),

        answer: this.props.t("faqs_intern_answer_help_me"),
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

        <FooterAlternative />
      </>
    );
  }
}
export default withNamespaces()(Campaign);
