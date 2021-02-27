import React, { Component } from "react";
import "./helpCenter.scss";

//Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import Divider from "./divider";

// Assets
import helpCenterBg from "../../assets/helpCenterBg.png";
import application from "../../icons/application.png";
import company from "../../icons/company.png";
import competency from "../../icons/competency.png";
import eLearning from "../../icons/e-learning.png";
import intern from "../../icons/intern.png";
import language from "../../icons/language.png";
import other from "../../icons/other.png";
import packages from "../../icons/packages.png";
import task from "../../icons/task.png";
import university from "../../icons/university.png";
import wfaReferenceLetter from "../../icons/wfa-reference-letter.png";
import { withNamespaces } from "react-i18next";

// Util
import { getOffset } from "../../utils/offset";

const FIRST_STEP = [
  { id: "intern", title: "Intern", icon: intern },
  { id: "company", title: "Company", icon: company },
  { id: "university", title: "University", icon: university },
];

const INTERN_RESULTS = [
  { id: "application", title: "Application", icon: application },
  { id: "competency", title: "Competency", icon: competency },
  { id: "language", title: "Language", icon: language },
  { id: "task", title: "Task", icon: task },
  {
    id: "wfaReferenceLetter",
    title: "WFA/Reference Letter",
    icon: wfaReferenceLetter,
  },
  { id: "other", title: "Other", icon: other },
];

const COMPANY_RESULTS = [
  { id: "application", title: "Application", icon: application },
  { id: "eLearning", title: "E-Learning", icon: eLearning },
  { id: "language", title: "Language", icon: language },
  { id: "task", title: "Task", icon: task },
  { id: "packages", title: "Packages", icon: packages },
  { id: "other", title: "Other", icon: other },
];

const UNIVERSITY_RESULTS = [
  { id: "language", title: "Language", icon: language },
  { id: "packages", title: "Packages", icon: packages },
  { id: "other", title: "Other", icon: other },
];

class HelpCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstOption: "",
      secondOption: "",
      FIRST_STEP: [
        {
          id: "intern",
          title: this.props.t("help_center_card_main_intern"),
          icon: intern,
        },
        {
          id: "company",
          title: this.props.t("help_center_card_main_company"),
          icon: company,
        },
        {
          id: "university",
          title: this.props.t("help_center_card_main_university"),
          icon: university,
        },
      ],
      INTERN_RESULTS: [
        {
          id: "application",
          title: this.props.t("help_center_card_intern_competency"),
          icon: application,
        },
        {
          id: "competency",
          title: this.props.t("help_center_card_intern_application"),
          icon: competency,
        },
        {
          id: "language",
          title: this.props.t("help_center_card_intern_language"),
          icon: language,
        },
        {
          id: "task",
          title: this.props.t("help_center_card_intern_task"),
          icon: task,
        },
        {
          id: "wfaReferenceLetter",
          title: this.props.t("help_center_card_intern_wfa"),
          icon: wfaReferenceLetter,
        },
        {
          id: "other",
          title: this.props.t("help_center_card_intern_other"),
          icon: other,
        },
      ],
      COMPANY_RESULTS: [
        {
          id: "application",
          title: this.props.t("help_center_card_company_application"),
          icon: application,
        },
        {
          id: "eLearning",
          title: this.props.t("help_center_card_company_e_learning"),
          icon: eLearning,
        },
        {
          id: "language",
          title: this.props.t("help_center_card_company_language"),
          icon: language,
        },
        {
          id: "task",
          title: this.props.t("help_center_card_company_task"),
          icon: task,
        },
        {
          id: "packages",
          title: this.props.t("help_center_card_company_packages"),
          icon: packages,
        },
        {
          id: "other",
          title: this.props.t("help_center_card_company_other"),
          icon: other,
        },
      ],
      UNIVERSITY_RESULTS: [
        {
          id: "language",
          title: this.props.t("help_center_card_university_language"),
          icon: language,
        },
        {
          id: "packages",
          title: this.props.t("help_center_card_university_packages"),
          icon: packages,
        },
        {
          id: "other",
          title: this.props.t("help_center_card_university_other"),
          icon: other,
        },
      ],
    };

    this.secondStepRef = React.createRef();
    this.contactFormRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.firstOption !== this.state.firstOption) {
      this.scrollToSecondStep();
    }

    if (prevState.secondOption !== this.state.secondOption) {
      this.scrollToContactForm();
    }
  }

  scrollToSecondStep = () => {
    const offset = getOffset(this.secondStepRef.current);
    window.scrollTo({
      top: offset.top - 100,
      left: offset.left,
      behavior: "smooth",
    });
  };

  scrollToContactForm = () => {
    const offset = getOffset(this.contactFormRef.current);
    window.scrollTo({
      top: offset.top - 100,
      left: offset.left,
      behavior: "smooth",
    });
  };

  setFirstOption = (event, value) => {
    this.setState({ firstOption: value });
  };

  setSecondOption = (event, value) => {
    this.setState({ secondOption: value });
  };

  renderFirstStep = () => {
    return this.state.FIRST_STEP.map((element, index) => {
      const className =
        this.state.firstOption === element.id
          ? "affiliate__tripleBox boxAnimationActive"
          : "affiliate__tripleBox boxAnimation";
      return (
        <div class="col-md-4" key={`first-${element.id} ${index}`}>
          <div
            className={className}
            onClick={(event) => this.setFirstOption(event, element.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={element.icon} alt={element.title} />
            <span class="affiliate__tripleBox__title">
              {element.title.toUpperCase()}
            </span>
          </div>
        </div>
      );
    });
  };

  renderSecondStep = () => {
    let secondStepOptions = [];
    if (this.state.firstOption === "intern") {
      secondStepOptions = this.state.INTERN_RESULTS;
    } else if (this.state.firstOption === "company") {
      secondStepOptions = this.state.COMPANY_RESULTS;
    } else if (this.state.firstOption === "university") {
      secondStepOptions = this.state.UNIVERSITY_RESULTS;
    }

    return secondStepOptions.map((element, index) => {
      const className =
        this.state.secondOption === element.id
          ? "affiliate__tripleBox boxAnimationActive"
          : "affiliate__tripleBox boxAnimation";
      return (
        <div class="col-md-4" key={`second-${element.id} ${index}`}>
          <div
            class={className}
            onClick={(event) => this.setSecondOption(event, element.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={element.icon} alt={element.title} />
            <span class="affiliate__tripleBox__title">
              {element.title.toUpperCase()}
            </span>
          </div>
        </div>
      );
    });
  };

  renderContactForm = () => {
    return (
      <div class="col-lg-12">
        <ContactForm
          onBackClick={this.scrollToSecondStep}
          onSendClick={this.handleContactFormData}
        />
      </div>
    );
  };

  handleContactFormData = (formData) => {
    console.log("Contact form data: ", formData);
    window.location.href = `mailto:help@interny.net?subject=Konuyu giriniz&body=Adı:${formData.name} Soyadı:${formData.surname} Numara:${formData.phone} \n Mesaj:${formData.message}`;
  };

  render() {
    let { t } = this.props;
    return (
      <div style={{ background: "#f6f8fa" }}>
        <div className={"helpCenter"}>
          <div class="affiliate__header">
            <div
              class="container headerBackground"
              style={{ "background-image": "url(" + helpCenterBg + ")" }}
            >
              <p>{t("help_center_title")}</p>
            </div>
          </div>
          <div className="helpCenter__search">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="helpCenter__title">
                    <span>{t("help_center_how_help")}</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 helpCenter__searchInput">
                  <Input
                    type={"text"}
                    placeholder={t("help_center_search")}
                    size={"full"}
                    label={t("help_center_search")}
                  />
                </div>
              </div>
              <div class="row" style={{ "justify-content": "center" }}>
                <div
                  class="col-md-3"
                  style={{ display: "flex", "justify-content": "center" }}
                >
                  <Button
                    type={"primary"}
                    text={t("help_center_search")}
                    sizeName={"default"}
                    to={"/helpCenterDetail"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="affiliate__triple">
            <div class="container">
              <div class="helpCenter__title" style={{ margin: "40px 0" }}>
                <span>{t("help_center_having_problems")}</span>
              </div>
              <div class="row">{this.renderFirstStep()}</div>
              <div ref={this.secondStepRef}>
                {this.state.firstOption && (
                  <div>
                    <Divider />
                    <div class="helpCenter__title" style={{ margin: "40px 0" }}>
                      <span>{t("help_center_which_area")}</span>
                    </div>
                    <div class="row">{this.renderSecondStep()}</div>
                  </div>
                )}
              </div>
              <div ref={this.contactFormRef}>
                {this.state.secondOption && (
                  <div>
                    <Divider />
                    <div class="helpCenter__title" style={{ margin: "40px 0" }}>
                      <span>{t("help_center_share_us")}</span>
                    </div>
                    <div class="row">{this.renderContactForm()}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withNamespaces()(HelpCenter);
