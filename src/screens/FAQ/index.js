import React, { Component, Fragment } from "react";

/*** Components ***/
import Accordion from "../../components/Accordion";
import Footer from "../../components/Footer";
/*** Store ***/
import store from "../../store";

/*** Styles ***/
import styles from "./faq.scss";
import Card from "../../components/Card";
import affiliateBg from "../../assets/faqBg.png";
import { withNamespaces } from "react-i18next";

// let dummy_data = {
//   intern: [
//     {
//       question: t("faqs_intern_question_what_internship"),
//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),
//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//   ],
//   employer: [
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },

//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//   ],
//   university: [
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//     {
//       question: this.props.t(''),

//       answer: this.props.t(''),
//     },
//   ],
// };

class FAQ extends Component {
  state = {
    dummy_data: {
      intern: [
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
      ],
      employer: [
        {
          question: this.props.t("faqs_company_question_what_interny"),

          answer: this.props.t("faqs_company_answer_what_interny"),
        },

        {
          question: this.props.t("faqs_company_question_why_use"),

          answer: this.props.t("faqs_company_answer_why_use"),
        },
        {
          question: this.props.t("faqs_company_question_which_companies"),

          answer: this.props.t("faqs_company_answer_which_companies"),
        },
        {
          question: this.props.t("faqs_company_question_how_use"),

          answer: this.props.t("faqs_company_answer_how_use"),
        },
        {
          question: this.props.t("faqs_company_question_how_many_interns"),

          answer: this.props.t("faqs_company_answer_how_many_interns"),
        },

        {
          question: this.props.t("faqs_company_question_what_time"),

          answer: this.props.t("faqs_company_answer_what_time"),
        },

        {
          question: this.props.t("faqs_company_question_paid"),

          answer: this.props.t("faqs_company_answer_paid"),
        },

        {
          question: this.props.t("faqs_company_question_approve_every"),

          answer: this.props.t("faqs_company_answer_approve_every"),
        },

        {
          question: this.props.t("faqs_company_questions_what_wfa"),

          answer: this.props.t("faqs_company_answer_what_wfa"),
        },

        {
          question: this.props.t("faqs_company_question_when_sign_reference"),

          answer: this.props.t("faqs_company_answer_when_sign_reference"),
        },
        {
          question: this.props.t("faqs_company_question_only_online"),

          answer: this.props.t("faqs_company_answer_only_online"),
        },
        {
          question: this.props.t("faqs_company_question_need_passport"),

          answer: this.props.t("faqs_company_answer_need_passport"),
        },
        {
          question: this.props.t("faqs_company_question_language_problem"),

          answer: this.props.t("faqs_company_answer_language_problem"),
        },

        {
          question: this.props.t("faqs_company_question_local_internship"),

          answer: this.props.t("faqs_company_answer_local_internship"),
        },

        {
          question: this.props.t("faqs_company_question_what_ims"),

          answer: this.props.t("faqs_company_answer_what_ims"),
        },
        {
          question: this.props.t("faqs_company_question_evaluate_intern"),

          answer: this.props.t("faqs_company_answer_evaluate_intern"),
        },
        {
          question: this.props.t("faqs_company_question_is_safe"),

          answer: this.props.t("faqs_company_answer_is_safe"),
        },
        {
          question: this.props.t("faqs_company_question_fullfilling_duties"),

          answer: this.props.t("faqs_company_answer_fullfilling_duties"),
        },
        {
          question: this.props.t("faqs_company_question_what_premium"),

          answer: this.props.t("faqs_company_answer_what_premium"),
        },
      ],
      university: [
        {
          question: this.props.t("faqs_universty_question_what_interny"),

          answer: this.props.t("faqs_universty_answer_what_interny"),
        },
        {
          question: this.props.t("faqs_universty_question_which_universities"),

          answer: this.props.t("faqs_universty_answer_which_universities"),
        },
        {
          question: this.props.t("faqs_universty_question_should_use"),

          answer: this.props.t("faqs_universty_answer_should_use"),
        },
        {
          question: this.props.t("faqs_universty_question_how_use"),

          answer: this.props.t("faqs_universty_answer_how_use"),
        },
        {
          question: this.props.t("faqs_universty_question_paid"),

          answer: this.props.t("faqs_universty_answer_paid"),
        },
        {
          question: this.props.t("faqs_universty_question_online_only"),

          answer: this.props.t("faqs_universty_answer_online_only"),
        },
        {
          question: this.props.t("faqs_universty_question_companies_exist"),

          answer: this.props.t("faqs_universty_answer_companies_exist"),
        },
        {
          question: this.props.t("faqs_universty_question_follow_students"),

          answer: this.props.t("faqs_universty_answer_follow_students"),
        },
        {
          question: this.props.t(
            "faqs_universty_question_every_internship_approved"
          ),

          answer: this.props.t(
            "faqs_universty_answer_every_internship_approved"
          ),
        },
        {
          question: this.props.t("faqs_universty_question_need_passport"),

          answer: this.props.t("faqs_universty_answer_need_passport"),
        },
        {
          question: this.props.t("faqs_universty_question_what_ims"),

          answer: this.props.t("faqs_universty_answer_what_ims"),
        },
        {
          question: this.props.t("faqs_universty_question_what_wfa"),

          answer: this.props.t("faqs_universty_answer_what_wfa"),
        },
        {
          question: this.props.t("faqs_universty_question_number_increased"),

          answer: this.props.t("faqs_universty_answer_number_increased"),
        },
        {
          question: this.props.t("faqs_universty_question_upper_limit"),

          answer: this.props.t("faqs_universty_answer_upper_limit"),
        },
        {
          question: this.props.t("faqs_universty_question_what_premium"),

          answer: this.props.t("faqs_universty_answer_what_premium"),
        },
      ],
    },
    question_type: "intern",
    data: {},
  };

  componentDidMount = async () => {
    let response = await store.faqData();
    if (response) {
      this.setState({ data: response.data });
    }
  };

  renderRightBar = () => {
    return (
      <div className="faq__questions">
        <Card>
          {this.state.dummy_data[this.state.question_type].map((data) => {
            return <Accordion title={data.question} content={data.answer} />;
          })}
        </Card>
      </div>
    );
  };

  renderLeftBar = () => {
    let { question_type } = this.state;
    let { t } = this.props;
    return (
      <Card
        type={"list"}
        externalData={[
          {
            key: "FAQ for Interns",
            value: t("faq_for_intern"),
            selected: question_type === "intern",
            onChange: () => this.setState({ question_type: "intern" }),
          },
          {
            key: "FAQ for Employers",
            value: t("faq_for_company"),
            selected: question_type === "employer",
            onChange: () => this.setState({ question_type: "employer" }),
          },
          {
            key: "FAQ for Universities",
            value: t("faq_for_univesty"),
            selected: question_type === "university",
            onChange: () => this.setState({ question_type: "university" }),
          },
        ]}
      />
    );
  };

  render() {
    console.log(this.state.dummy_data);
    let { t } = this.props;
    return (
      <div style={{ background: "#f6f8fa" }}>
        <div class="affiliate__header">
          <div
            class="container headerBackground"
            style={{ "background-image": "url(" + affiliateBg + ")" }}
          >
            <p>{t("faq_title")}</p>
          </div>
        </div>
        <div className={"faq"}>
          <div class="container">
            <div class="row">
              <div class="col-md-3">{this.renderLeftBar()}</div>
              <div class="col-md-9">
                <div id="accordion">
                  {this.state.dummy_data[this.state.question_type].map(
                    (data, index) => {
                      return (
                        <Accordion
                          title={data.question}
                          content={data.answer}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withNamespaces()(FAQ);
