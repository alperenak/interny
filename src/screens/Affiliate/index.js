import React, { Component } from "react";

/*** Styles ***/
import styles from "./style.scss";

/*** Components ***/
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Input from "../../components/Input";

/*** Assets ***/
import explore from "../../icons/explore.png";
import includeNetwork from "../../icons/include-network.png";
import makeMoney from "../../icons/make-money.png";
import affiliateBg from "../../assets/affiliateBg.png";
import { withNamespaces } from "react-i18next";

class Affiliate extends Component {
  render() {
    let { t } = this.props;
    let dummy_data = {
      intern: [
        {
          question: "What is an internship?",
          answer:
            "An internship refers to the period that a person spends working in different\n" +
            "departments of the company, in order to increase the professional knowledge\n" +
            "and improve the skills further. The main purpose of internship process is to\n" +
            "get experience in the business and to learn the practical equivalents of\n" +
            "theoretical knowledge.",
        },

        {
          question: "What is INTERNY?",
          answer:
            "INTERNY is the world's first global remote online internship platform. It allows\n" +
            "you to manage your internship process from searching for internships to\n" +
            "completing internship process. It allows you to do your internship in a\n" +
            "company anywhere in the world, wherever and whenever you want. All you\n" +
            "have to do is to apply for internships, get acceptance and complete the\n" +
            "assigned tasks perfectly.",
        },
        {
          question: "Why should I use INTERNY?",
          answer:
            "You can easily choose INTERNY to get experience, show yourself, develop\n" +
            "yourself with world-class companies beyond the possibilities of your region,\n" +
            "get a global vision, remove borders and create serious awareness in the\n" +
            "recruitment process.",
        },
        {
          question: "Who can use INTERNY?",
          answer:
            "INTERNY can be used by all university students and new graduates who want\n" +
            "to get experience in business.",
        },
      ],
    };
    return (
      <div style={{ background: "#f6f8fa" }}>
        <div class="affiliate__header">
          <div
            class="container headerBackground"
            style={{ "background-image": "url(" + affiliateBg + ")" }}
          >
            <p>{t("affiliate_title")}</p>
          </div>
        </div>
        <div class="affiliate__triple">
          <div class="container">
            <p style={{ textAlign: "center", marginBottom: 80 }}>
              {t("affiliate_join_intery")}
            </p>
            <div class="row">
              <div class="col-md-4">
                <div class="affiliate__tripleBox">
                  <img src={explore} alt="Explore" width="40"></img>
                  <span class="affiliate__tripleBox__title">
                    {t("affiliate_explore")}
                  </span>
                  <span class="affiliate__tripleBox__description">
                    {t("affiliate_explore_desc")}
                  </span>
                </div>
              </div>
              <div class="col-md-4">
                <div class="affiliate__tripleBox">
                  <img
                    src={includeNetwork}
                    alt="Include network"
                    width="40"
                  ></img>
                  <span class="affiliate__tripleBox__title">
                    {t("affiliate_include_network")}
                  </span>
                  <span class="affiliate__tripleBox__description">
                    {t("affiliate_include_network_desc")}
                  </span>
                </div>
              </div>
              <div class="col-md-4">
                <div class="affiliate__tripleBox">
                  <img src={makeMoney} alt="Make money" width="40"></img>
                  <span class="affiliate__tripleBox__title">
                    {t("affiliate_include_make_money")}
                  </span>
                  <span class="affiliate__tripleBox__description">
                    {t("affiliate_include_make_money_dec")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="affiliate__timeline">
          <div class="container">
            <div class="row">
              <div class="col-md-12" style={{ "text-align": "center" }}>
                <span class="affiliate__timeline__title">
                  {t("affiliate_how_will_you_earn")}
                </span>
              </div>
              <div class="col-md-12">
                <ul class="timeline">
                  <li>
                    <div class="timeline-badge primary">
                      <i class="glyphicon glyphicon-check"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-body">
                        <p>{t("affiliate_how_will_you_earn_path1")}</p>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-badge primary">
                      <i class="glyphicon glyphicon-credit-card"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-body">
                        <p>{t("affiliate_how_will_you_earn_path2")}</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="timeline-badge primary">
                      <i class="glyphicon glyphicon-credit-card"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-body">
                        <p>{t("affiliate_how_will_you_earn_path3")}</p>
                      </div>
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-badge primary">
                      <i class="glyphicon glyphicon-credit-card"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-body">
                        <p>{t("affiliate_how_will_you_earn_path4")}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={"faq"} style={{ display: "none" }}>
          <div class="container">
            <div class="row">
              <div
                class="col-md-12"
                style={{ "text-align": "center", "margin-bottom": "30px" }}
              >
                <span class="affiliate__timeline__title">
                  FAQ for the Affiliate Program
                </span>
              </div>
              <div class="col-md-12">
                <div id="accordion">
                  {dummy_data["intern"].map((data, index) => {
                    return (
                      <div class="card" style={{ width: "100%" }}>
                        <div class="card-header" id={"headingOne" + index}>
                          <button
                            class="btn"
                            data-toggle="collapse"
                            data-target={"#collapseOne" + index}
                            aria-expanded="true"
                            aria-controls={"collapseOne" + index}
                          >
                            {data.question}
                          </button>
                        </div>

                        <div
                          id={"collapseOne" + index}
                          class="collapse"
                          aria-labelledby={"headingOne" + index}
                          data-parent="#accordion"
                        >
                          <div class="card-body">{data.answer}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="affiliate__contact"
          style={{ "margin-bottom": "60px", "margin-top": "60px" }}
        >
          <div class="container">
            <div class="row">
              <div
                class="col-md-12"
                style={{ "text-align": "center", "margin-bottom": "30px" }}
              >
                <span class="affiliate__timeline__title">
                  {t("affiliate_ask_question")}
                </span>
              </div>
              <div class="col-md-6">
                <Input
                  type={"text"}
                  placeholder={t("affiliate_label_name_same_with_placeholder")}
                  size={"full"}
                  onChange={(value) => {
                    this.setState({ city: value });
                  }}
                  label={t("affiliate_label_name_same_with_placeholder")}
                />
              </div>
              <div class="col-md-6">
                <Input
                  type={"text"}
                  placeholder={t(
                    "affiliate_label_surname_same_with_placeholder"
                  )}
                  size={"full"}
                  onChange={(value) => {
                    this.setState({ city: value });
                  }}
                  label={t("affiliate_label_surname_same_with_placeholder")}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <Input
                  type={"text"}
                  placeholder={t("affiliate_label_email_same_with_placeholder")}
                  size={"full"}
                  onChange={(value) => {
                    this.setState({ city: value });
                  }}
                  label={t("affiliate_label_email_same_with_placeholder")}
                />
              </div>
              <div class="col-md-6">
                <Input
                  type={"text"}
                  placeholder={t("affiliate_label_phone_same_with_placeholder")}
                  size={"full"}
                  onChange={(value) => {
                    this.setState({ city: value });
                  }}
                  label={t("affiliate_label_phone_same_with_placeholder")}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <Input
                  type={"textarea"}
                  placeholder={t(
                    "affiliate_label_message_same_with_placeholder"
                  )}
                  size={"full"}
                  onChange={(value) => {
                    this.setState({ city: value });
                  }}
                  label={t("affiliate_label_message_same_with_placeholder")}
                />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type={"primary"}
                  text={t("affiliate_button_send")}
                  sizeName={"default"}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withNamespaces()(Affiliate);
