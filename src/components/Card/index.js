import React, { Component } from "react";
import PropTypes from "prop-types";

/*** Components ***/
import List from "./sub-components/List";
import Task from "./sub-components/Task";
import Intern from "./sub-components/Intern";
import Section from "./sub-components/Section";
import JobPost from "./sub-components/JobPost";
import Profile from "./sub-components/Porfile";
import DropDown from "./sub-components/DropDown";
import JobDetail from "./sub-components/JobDetail";
import CoverLetter from "./sub-components/CoverLetter";
import CompanyProfile from "./sub-components/CompanyProfile";
import Authentication from "./sub-components/Authentication";
import Course from "./sub-components/Course";
import InternList from "./sub-components/InternList";

/*** Styles ***/
import styles from "./card.scss";

class Card extends Component {
  render() {
    let { type, header, children } = this.props;
    return (
      <div className={`${styles.Card} ${styles[type]}`}>
        <div
          v-if={header}
          className={`${styles.cardHeader} ${styles[header.position]}`}
        >
          {header.text}
        </div>
        <List v-if={type === "list"} {...this.props} />
        <Task v-if={type === "task"} {...this.props} />
        <Intern v-if={type === "intern"} {...this.props} />
        <Course v-if={type === "course"} {...this.props} />
        <Section v-if={type === "section"} {...this.props} />
        <JobPost v-if={type === "jobPost"} {...this.props} />
        <Profile v-if={type === "profile"} {...this.props} />
        <DropDown v-if={type === "dropDown"} {...this.props} />
        <JobDetail v-if={type === "jobDetail"} {...this.props} />
        <CoverLetter v-if={type === "coverLetter"} {...this.props} />
        <CompanyProfile v-if={type === "companyProfile"} {...this.props} />
        <InternList v-if={type === "internList"} {...this.props} />
        <Authentication
          v-if={type === "auth" || type === "login"}
          {...this.props}
        />
        {children}
      </div>
    );
  }
}

export default Card;

Card.propTypes = {
  type: PropTypes.string,
  externalData: PropTypes.array,
  posts: PropTypes.array,
  sections: PropTypes.array,
  profileObject: PropTypes.object,
  header: PropTypes.object,
  title: PropTypes.string,
};

Card.defaultProps = {
  type: "",
  posts: [],
  sections: [],
  externalData: [],
  title: "",
};
