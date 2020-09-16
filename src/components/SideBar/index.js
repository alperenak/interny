import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../icons/close-filled.svg";
/*** Styles ***/
import styles from "./sideBar.scss";

/*** Icons ***/
import internyLogo from "../../assets/tinyLogo.png";

class SideBar extends Component {
  render() {
    let { type } = this.props;
    return (
      <Fragment>
        {/* sidebar */}

        <div v-if={!type} className={styles.SideBar}>
          <div className={styles.logo}>
            <Link to={"/"}>
              <img src={internyLogo} alt={"logo"} />
            </Link>
          </div>
        </div>

        {/* hamburger menu */}

        <div
          id="hamburger-menu"
          v-if={type === "hamburgerMenu"}
          className={styles.hamburgerMenu}
        >
          <img
            onClick={() =>
              (document.getElementById("hamburger-menu").style.display = "none")
            }
            src={CloseIcon}
            alt={"close"}
          />
        </div>
      </Fragment>
    );
  }
}

export default SideBar;
