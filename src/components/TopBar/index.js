import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
/*** Components ***/
import Card from "../Card";
import Button from "../Button";

/*** Utils ***/
import store from "../../store";
import { eraseCookie, getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./topBar.scss";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo.png";
import userIcon from "../../icons/02-User-Oultine.svg";
import mailIcon from "../../icons/email-closed-outlined-back-envelope-interface-symbol.svg";
import bellIcon from "../../icons/notification-bell-outline-interface-symbol.svg";
import coverLetterIcon from "../../icons/file-rounded-outlined-symbol.svg";
import CVIcon from "../../icons/file-rounded-empty-sheet.svg";
import jobIcon from "../../icons/monitor-outline.svg";
import taskIcon from "../../icons/clipboard-square-symbol.svg";
import logOutIcon from "../../icons/logout.svg";
import caret from "../../icons/selectbox-blue.svg";
import bookIcon from "../../icons/book-outline.svg";
import HamburgerMenuIcon from "../../icons/menu-three-filled-rounded-lines-symbol.svg";
import SideBar from "../SideBar";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.wrapperRefuser = React.createRef();
    this.wrapperRefmail = React.createRef();
    this.wrapperRefbell = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    mailDropDown: false,
    bellDropDown: false,
    userDropDown: false,
    loginDropDown: false,
    loginPages: [
      {
        key: "internLogin",
        value: "Login as Intern",
        selected: false,
        disabled: true,
        to: "/login/Intern",
      },
      {
        key: "employerLogin",
        value: "Login as Employer",
        selected: false,
        disabled: true,
        to: "/login/Employer",
      },
    ],
    mailSource: [],
    bellSource_temp: [],
    bellSource: [],
    internSource: [
      {
        key: "myAccount",
        value: "My Account",
        selected: false,
        icon: userIcon,
        to: "/myAccount",
      },
      {
        key: "coverLetter",
        value: "Cover Letter",
        selected: false,
        icon: coverLetterIcon,
        to: "/coverletters",
      },
      {
        key: "CVs",
        value: "CVs",
        selected: false,
        icon: CVIcon,
        to: "/CVs",
      },
      {
        key: "myMessages",
        value: "Messages",
        selected: false,
        icon: mailIcon,
        to: "/messages",
      },
      {
        key: "Log Out",
        value: "Log Out",
        selected: false,
        icon: logOutIcon,
        to: "/logout",
        onChange: () => {
          eraseCookie(["token", "user", "user_id"]);
          window.location.pathname = "/";
        },
      },
    ],
    employerSource: [
      {
        key: "myAccount",
        value: "My Account",
        selected: false,
        icon: userIcon,
        to: "/myAccount",
      },
      {
        key: "myJobs",
        value: "Jobs",
        selected: false,
        icon: CVIcon,
        to: "/myJobs",
      },
      {
        key: "myTasks",
        value: "Tasks",
        selected: false,
        icon: taskIcon,
        to: "/mytasks",
      },
      {
        key: "myCourses",
        value: "Courses",
        selected: false,
        icon: bookIcon,
        to: "/courses",
      },
      {
        key: "myMessages",
        value: "Messages",
        selected: false,
        icon: mailIcon,
        to: "/messages",
      },
      {
        key: "Log Out",
        value: "Log Out",
        selected: false,
        icon: logOutIcon,
        to: "/logout",
        onChange: () => {
          eraseCookie(["token", "user", "user_id"]);
          window.location.pathname = "/";
        },
      },
    ],
    icons: {
      userIcon,
      mailIcon,
      bellIcon,
    },
  };

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.setSelectedPage();
    if (getCookie("token")) {
      if (getCookie("user") === "intern") {
        this.getUserSource();
      }
      let res = await store.getNotifications();
      let jobNotifications = res
        .filter((e) => e.type === "job")
        .map((notif) => {
          return {
            key: notif.id,
            value: notif.message,
            title: notif.title,
            selected: false,
            icon: "",
            unRead: !notif.isRead,
            onChange: this.onNotificationItemClick,
          };
        });
      let mailNotifications = res
        .filter((e) => e.type === "message")
        .map((notif) => {
          return {
            key: notif.id,
            value: notif.message,
            title: notif.title,
            selected: false,
            icon: "",
            unRead: !notif.isRead,
            onChange: () => this.onMailItemClick(),
          };
        });
      if (jobNotifications.length === 0) {
        jobNotifications = [
          {
            key: "myAccount",
            value: "There is no notification",
            selected: false,
            disabled: true,
          },
        ];
      }
      if (mailNotifications.length === 0) {
        mailNotifications = [
          {
            key: "myAccount",
            value: "There is no mail",
            selected: false,
            disabled: true,
          },
        ];
      }
      this.setState({
        bellSource_temp: jobNotifications,
        mailSource: mailNotifications,
      });

      let data = this.state.bellSource_temp.filter((item, i) => {
            return i < 3;
      });

      this.setState({ bellSource: data });
    }
  }

  componentDidUpdate(prevProps) {
    if (!Object.is(prevProps.location.pathname, this.props.location.pathname)) {
      this.setSelectedPage();
    }
    if (prevProps.isInternshipBegun !== this.props.isInternshipBegun) {
      this.getUserSource();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef?.current &&
      !this.wrapperRef?.current.contains(event.target)
    ) {
      this.setState({
        mailDropDown: false,
        bellDropDown: false,
        userDropDown: false,
      });
    }
  };

  getUserSource = () => {
    this.setState((state) => {
      if (this.props.isInternshipBegun) {
        state.internSource = state.internSource.filter(
          (e) => e.key !== "myJobs" && e.key !== "myTasks"
        );
        state.internSource.splice(3, 0, {
          key: "myTasks",
          value: "My Tasks",
          selected: false,
          icon: taskIcon,
          to: "/mytasks",
        });
        state.internSource.splice(4, 0, {
          key: "myCourses",
          value: "e-Learning",
          selected: false,
          icon: bookIcon,
          to: "/courses",
        });
      } else {
        state.internSource = state.internSource.filter(
          (e) => e.key !== "myTasks" && e.key !== "myJobs"
        );
        state.internSource.splice(3, 0, {
          key: "myJobs",
          value: "My Jobs",
          selected: false,
          icon: jobIcon,
          to: "/myJobs",
        });
      }
      return state;
    });
  };

  renderIcon(iconName, position) {
    let { icons } = this.state;
    let userType = getCookie("user");
    let notificaionCount = 0;
    if (userType)
      notificaionCount =
        this.state[`${iconName === "user" ? userType : iconName}Source`]
          .length > 0
          ? this.state[
              `${iconName === "user" ? userType : iconName}Source`
            ].filter((e) => e?.unRead).length
          : 0;
    return (
      <div
        ref={this[`wrapperRef${iconName}`]}
        onClick={() => this.onIconClick(iconName)}
        className={styles.img}
      >
        <div v-if={notificaionCount > 0} className={styles.count}>
          {notificaionCount}
        </div>
        <img src={icons[`${iconName}Icon`]} alt={"icon"} />
        <div
          v-if={this.state[`${iconName}DropDown`]}
          className={`${styles.cardContainer} ${
            position ? styles[position] : ""
          }`}
        >
          <Card
            type={"dropDown"}
            externalData={[
              ...this.state[
                `${iconName === "user" ? userType : iconName}Source`
              ],
            ]}
          />
        </div>
      </div>
    );
  }

  setSelectedPage = () => {
    let userType = getCookie("user");
    if (userType) {
      this.state[`${userType}Source`].map(
        (e) => (e.selected = e.to === this.props.location.pathname)
      );
      this.state.loginPages.map(
        (e) => (e.selected = e.to === this.props.location.pathname)
      );
      this.setState({
        [`${userType}Source`]: this.state[`${userType}Source`],
        loginPages: this.state.loginPages,
      });
    }
  };

  onIconClick = (name) => {
    let { mailDropDown, bellDropDown, userDropDown } = this.state;
    this.setState((state) => {
      state.mailDropDown = name === "mail" ? !mailDropDown : false;
      state.bellDropDown = name === "bell" ? !bellDropDown : false;
      state.userDropDown = name === "user" ? !userDropDown : false;
      return state;
    });
  };

  onNotificationItemClick = async () => {
    await store.readNotifications();
    window.location.pathname = "/myJobs";
  };
  onMailItemClick = () => {
    store.readNotifications();
    window.location.pathname = "/messages";
  };

  isSreenMatch() {
    return window.matchMedia("(max-width: 576px)").matches;
  }
  openHamburgerMenu() {
    this.isSreenMatch()
      ? (document.getElementById("hamburger-menu").style.width = "100%")
      : (document.getElementById("hamburger-menu").style.width = "50%");
  }
  closeHamburgerMenu() {
    document.getElementById("hamburger-menu").style.width = "0";
  }
  render() {
    let { isAuthorized, user } = this.props;
    let { loginDropDown } = this.state;
    let userType = getCookie("user");
    return (
      <div className={`${styles.TopBar} ${styles.fullScreen}`}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <img src={internyLogo} alt={"logo"} />
          </Link>
        </div>

        {/*  Hamburger Menu */}
        <div className={styles.hamburgerMenu}>
          <img
            className={styles.hamburgerMenuIcon}
            onClick={() => this.openHamburgerMenu()}
            src={HamburgerMenuIcon}
            alt={"hamburgerMenu"}
          />
          <SideBar type={"hamburgerMenu"}>
            <Fragment v-if={!isAuthorized}>
              {/*<div><Link to={'/'}>Home</Link></div>*/}
              <div className={styles.hamburgerLinks}>
                <div>
                  <Link
                    onClick={() => this.closeHamburgerMenu()}
                    to={"/search"}
                  >
                    Browse Internships
                  </Link>
                </div>
                <div>
                  <Link
                    onClick={() => this.closeHamburgerMenu()}
                    to={"/packages"}
                  >
                    Our Packages
                  </Link>
                </div>
              </div>
              <div className={styles.hamburgerButtons}>
                <div
                  onClick={() =>
                    this.setState({ loginDropDown: !this.state.loginDropDown })
                  }
                  className={styles.dropdownContainer}
                >
                  <Button
                    type={"ghost"}
                    sizeName={"small"}
                    text={"Login"}
                    iconPosition={"left"}
                    responsive={"hamburger"}
                    icon={caret}
                  />
                  <div v-if={loginDropDown} className={styles.dropdown}>
                    <Card
                      onPress={() => {
                        this.closeHamburgerMenu();
                        this.setState({
                          loginDropDown: !this.state.loginDropDown,
                        });
                      }}
                      type={"dropDown"}
                      externalData={this.state.loginPages}
                    />
                  </div>
                </div>
                <Button
                  to="/signup"
                  type={"secondary"}
                  sizeName={"small"}
                  responsive={"hamburger"}
                  text={"Sign Up"}
                  onButtonClick={() => this.closeHamburgerMenu()}
                />
              </div>
            </Fragment>
            <Fragment v-else>
              <div
                className={styles.hamburgerAccountName}
                style={{ cursor: "default" }}
              >
                Welcome,{" "}
                <span className={styles.userName}>
                  {userType === "intern" ? user.name : user.accountName}{" "}
                  {userType === "intern" && user.surname}
                </span>
              </div>
              <div className={styles.hamburgerAccountTools}>
                {this.renderIcon("mail", "mail")}
                {this.renderIcon("bell", "bell")}
                {this.renderIcon("user", "user")}
              </div>
            </Fragment>
          </SideBar>
        </div>
        <div className={styles.links}>
          <Fragment v-if={!isAuthorized}>
            {/*<div><Link to={'/'}>Home</Link></div>*/}
            <div>
              <Link to={"/search"}>Browse Internships</Link>
            </div>
            <div>
              <Link to={"/packages"}>Our Packages</Link>
            </div>
            <div
              onMouseOver={() => this.setState({ loginDropDown: true })}
              onMouseLeave={() => this.setState({ loginDropDown: false })}
              className={styles.dropdownContainer}
            >
              <Button
                type={"ghost"}
                sizeName={"small"}
                text={"Login"}
                iconPosition={"left"}
                icon={caret}
              />
              <div v-if={loginDropDown} className={styles.dropdown}>
                <Card type={"dropDown"} externalData={this.state.loginPages} />
              </div>
            </div>
            <Button
              to="/signup"
              type={"secondary"}
              sizeName={"small"}
              text={"Sign Up"}
            />
          </Fragment>
          <Fragment v-else>
            <div style={{ cursor: "default" }}>
              Welcome,{" "}
              <span className={styles.userName}>
                {userType === "intern" ? user.name : user.accountName}{" "}
                {userType === "intern" && user.surname}
              </span>
            </div>
            {this.renderIcon("mail")}
            {this.renderIcon("bell")}
            {this.renderIcon("user")}
          </Fragment>
        </div>
      </div>
    );
  }
}

export default TopBar;
