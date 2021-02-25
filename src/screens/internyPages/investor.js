import React, { Component } from "react";
import "./style.scss";

// Components
import Footer from "../../components/Footer";
import HighlightBox from "../../components/HighlightBox";
import ContactForm from "../../components/ContactForm";

// Assets
import investorBg from "../../assets/investorBg.png";
import saas from "../../assets/SaaS.png";
import firstplatform from "../../assets/The First Platform.png";
import worldwide from "../../assets/Worldwide2.png";
import genz from "../../assets/Generation Z.png";
import eastwest from "../../assets/East - West.png";
import artint from "../../assets/Artificial Intelligence.png";

import { withNamespaces } from "react-i18next";

class InvestorPage extends Component {
  state = {
    HIGHLIGHT_BOXES: [
      {
        title: this.props.t("investor_card_saas"),
        icon: saas,
      },
      {
        title: this.props.t("investor_card_first_platform"),
        icon: firstplatform,
      },
      {
        title: this.props.t("investor_card_world_wide"),
        icon: worldwide,
      },
      {
        title: this.props.t("investor_card_generation_z"),
        icon: genz,
      },
      {
        title: this.props.t("investor_card_east_west_bridge"),
        icon: eastwest,
      },
      {
        title: this.props.t("investor_card_ai"),
        icon: artint,
      },
    ],
  };
  renderBoxes = () => {
    return this.state.HIGHLIGHT_BOXES.map((element, index) => {
      return (
        <div class="col-md-4">
          <HighlightBox icon={element.icon} title={element.title} />
        </div>
      );
    });
  };

  handleContactFormData = (formData) => {
    console.log("Contact form data: ", formData);
  };

  render() {
    let { t } = this.props;
    return (
      <>
        <div class="internyPage">
          <div class="affiliate__header">
            <div
              class="container headerBackground"
              style={{ "background-image": "url(" + investorBg + ")" }}
            >
              <p>{t("investor_title")}</p>
            </div>
          </div>
          <div class="internyPage__twoBox">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="internyPage__box"
                    style={{ "text-align": "justify" }}
                  >
                    <span>{t("investor_subtitle_company_profile")}</span>
                    <p>{t("investor_description_company_profile")} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="internyPage__twoBox">
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div
                    class="internyPage__box"
                    style={{ "text-align": "justify" }}
                  >
                    <span>{t("investor_subtitle_mission")}</span>
                    <p>{t("investor_description_mission_statement")} </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    class="internyPage__box"
                    style={{ "text-align": "justify" }}
                  >
                    <span>{t("investor_subtitle_why_invest")}</span>
                    <p>{t("investor_description_why_invest")} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="affiliate__triple">
            <div class="container">
              <div class="row">
                <div
                  class="col-md-12"
                  style={{ "text-align": "center", "margin-bottom": "30px" }}
                >
                  <span class="affiliate__timeline__title">
                    {t("investor_why_interny")}
                  </span>
                </div>
              </div>
              <div class="row">{this.renderBoxes()}</div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div
                  class="col-md-12"
                  style={{ "text-align": "center", "margin-bottom": "30px" }}
                >
                  <span class="affiliate__timeline__title">
                    {t("investor_contact")}
                  </span>
                </div>
                <ContactForm onSendClick={this.handleContactFormData} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withNamespaces()(InvestorPage);
