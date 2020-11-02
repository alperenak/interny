import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Styles ***/
import styles from "./footerAlternative.scss";

/*** Utils ***/
import { getCookie } from "../../utils/cookie";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo-white.png";
import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import linkedin from "../../icons/linkedin.svg";
import appStore from "../../icons/app-store-badge.svg";
import googlePlay from "../../icons/google-play-badge.svg";
import EarthGrid from "../../icons/earth-grid-symbol.svg";

class FooterAlternative extends Component {
  render() {
    return (
      <div className={styles.footerSection}>
          <div className={styles.options}>
          <ul className={styles.links}>
            <li>
                <Link to="/faq">Hiring Lab</Link>
            </li>
            <li>
                <Link to="/faq">Career Advice</Link>
            </li>
            <li>
                <Link to="/referrenceLetter">Browse Jobs</Link>
            </li>
            <li>
                <Link to="/faq">Browse Companies</Link>
            </li>
            <li>
                <Link to="/faq">Employer Events</Link>
            </li>
            <li v-if={!getCookie("token")}>
                  <Link to="/signup">Careers</Link>
                </li>
            <li>
                <Link to="/faq">About</Link>
            </li>
            </ul>
          </div>

        <div className={styles.stroke} />
        <div className={styles.rights}>
          2020 • INTERNY Inc. © All rights reserved.
          <div className={styles.followUs}>
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
          </div>
        </div>
      </div>
    );
  }
}

export default FooterAlternative;
