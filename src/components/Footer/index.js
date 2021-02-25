import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Styles ***/
import styles from "./footer.scss";

/*** Utils ***/
import { getCookie } from "../../utils/cookie";
// the hoc
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";
/*** Icons ***/
import internyLogo from "../../assets/interny-logo-white.png";
import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import linkedin from "../../icons/linkedin.svg";
import appStore from "../../icons/app-store-badge.svg";
import googlePlay from "../../icons/google-play-badge.svg";
import location from "../../icons/location-white.svg";
import instagram from "../../icons/instagram.svg";
import youtube from "../../icons/youtube.svg";
import EarthGrid from "../../icons/earth-grid-symbol.svg";

class Footer extends Component {
  state = {
    options: [
      {
        name: "Turkish",
        value: "tr",
      },
      {
        name: "English",
        value: "en",
      },
    ],
    value: "tr",
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    localStorage.setItem("language", event.target.value);
    // i18n.changeLanguage(event.target.value);
    window.location.reload();
  };

  componentDidMount() {
    let language = localStorage.getItem("language");
    if (language) {
      this.setState({ value: language });
    }
  }

  render() {
    const { options, value } = this.state;
    const { t } = this.props;

    return (
      <div className={"footerSection"}>
        <div class="container" style={{ "max-width": "90%" }}>
          <div className={"footerSection__footerTop"}>
            <div class="row">
              <div class="col-xl-3 col-lg-12 col-12">
                <div className={"footerSection__companyDescription"}>
                  <img src={internyLogo} />
                  <div
                    style={{
                      fontStyle: "italic",
                      marginBottom: "17px",
                      fontSize: "17px",
                    }}
                    className={"footerSection__companyDescription__description"}
                  >
                    "The way to be a global intern"
                  </div>
                  <div
                    className={"footerSection__companyDescription__description"}
                  >
                    {t("footer_description")}
                  </div>
                </div>
              </div>
              <div class="col-xl-7 col-lg-12 col-12">
                <div className={"footerSection__options"}>
                  <div class="row">
                    <div class="col-md-4">
                      <div className={styles.knowUs}>
                        <ul>
                          <li>
                            <Link to="/aboutUs">{t("footer_about_us")}</Link>
                          </li>
                          <li>
                            <Link to="/helpCenter">
                              {t("footer_help_center")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/terms">{t("footer_terms")}</Link>
                          </li>
                          <li>
                            <Link to="/privacy">
                              {t("footer_privacy_policy")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/cookies">
                              {t("footer_cookies_policy")}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div className={styles.knowUs}>
                        <ul>
                          <li>
                            <Link to="/faq">{t("footer_faq")}</Link>
                          </li>
                          <li>
                            <span>{t("footer_blog")}</span>
                          </li>
                          <li>
                            <Link to="/referrenceLetter">
                              {t("footer_reference_letter")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/gift">{t("footer_gift")}</Link>
                          </li>
                          <li>
                            <a href="https://www.linkedin.com/company/internynet">
                              {t("footer_careers")}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div className={styles.knowUs}>
                        <ul>
                          <li v-if={!getCookie("token")}>
                            <span>{t("footer_sitemap")}</span>
                          </li>
                          <li>
                            <Link to="/affiliate">{t("footer_affiliate")}</Link>
                          </li>
                          <li>
                            <Link to="/investor">{t("footer_investor")}</Link>
                          </li>

                          <li>
                            <Link to="/howtocompany">
                              {t("footer_interny_for_business")}
                            </Link>
                          </li>
                          <li>
                            <Link to="/howtouniversity">
                              {t("footer_interny_for_university")}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-2 col-lg-12 col-12">
                <div className={"footerSection__rightSide"}>
                  <div className={"footerSection__languages"}>
                    <div className={"selectWrapper"}>
                      <img src={EarthGrid} />
                      <select onChange={this.handleChange} value={value}>
                        {options.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={"footerSection__stores"}>
                    <a
                      href={"/"}
                      className={"footerSection__stores__storePlay"}
                    >
                      <img src={googlePlay} alt={"store"} />
                    </a>
                    <a href={"/"} className={"footerSection__stores__store"}>
                      <img src={appStore} alt={"store"} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"footerSection__stroke"} />
          <div className={"footerSection__rights"}>
            2020 • INTERNY Inc. © {t("footer_all_rights_reserved")}
            <div className={"footerSection__rights__followUs"}>
              <a href={"https://www.facebook.com/internynet/"} target={"blank"}>
                <img src={facebook} alt={facebook} />
              </a>
              <a href={"https://twitter.com/internynet/"} target={"blank"}>
                <img src={twitter} alt={twitter} />
              </a>
              <a
                href={"https://www.linkedin.com/company/internynet/"}
                target={"blank"}
              >
                <img src={linkedin} alt={linkedin} />
              </a>
              <a
                href={"https://www.instagram.com/internyinc/"}
                target={"blank"}
              >
                <img src={instagram} alt={instagram} />
              </a>
              <a
                href={
                  "https://www.youtube.com/channel/UCG_eex16oz2W7hEKo1bAIzw/"
                }
                target={"blank"}
              >
                <img src={youtube} alt={youtube} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Footer);
