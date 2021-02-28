import React, { Component, Fragment } from "react";

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from "./jobDetail.scss";
import { getCookie } from "../../../../utils/cookie";

class JobDetail extends Component {
  renderDetailButtons(buttons) {
    return (
      <div className={`${"postButton"}`}>
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              disabled={btn.disabled}
              hoverIcon={btn.hoverIcon}
              icon={btn.icon}
              iconAutoWidth={btn.iconAutoWidth}
              iconPosition={btn.iconPosition}
              onButtonClick={btn.onButtonClick}
              sizeName={btn.sizeName}
              text={btn.text}
              type={btn.type}
              width={btn.width}
              to={btn.to}
            />
          );
        })}
      </div>
    );
  }

  render() {
    let { posts } = this.props;
    return (
      <Fragment>
        {posts.map((pst, i) => {
          return (
            <div key={i} className={`${"jobDetail2"}`}>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-9">
                      <div className={"jobDetail2__postHeader"}>
                        {pst.position}
                      </div>
                      <div
                        v-if={pst.company}
                        className={"jobDetail2__postCompany"}
                      >
                        {pst.company}
                      </div>
                      <div
                        v-if={pst.city}
                        className={"jobDetail2__postCompany"}
                      >
                        {pst.city}
                      </div>
                    </div>
                    <div class="col-md-3 jobDetail2__postHeader__right">
                      <div className={"jobDetail2__postDate"}>{pst.date}</div>
                      {pst.buttons && this.renderDetailButtons(pst.buttons)}
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div className={"jobDetail2__postDescription"}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pst.description,
                      }}
                    ></div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div
                    v-if={pst.qualifications}
                    className={"jobDetail2__postDescription"}
                  >
                    Qualifications:
                  </div>
                  <div
                    v-if={pst.qualifications}
                    className={"jobDetail2__postNote"}
                  >
                    <div>{pst.qualifications}</div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div
                    v-if={pst.languages}
                    className={"jobDetail2__postDescription"}
                  >
                    Preferred Languages:
                  </div>
                  <div
                    v-if={pst.languages.length > 0}
                    className={"jobDetail2__postNote"}
                  >
                    <div
                      v-for={(language, i) in pst.languages}
                      key={i}
                    >{`${language}${
                      i + 1 === pst.languages.length ? "" : ","
                    } `}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    v-if={pst.internLevel}
                    className={"jobDetail2__postDescription"}
                  >
                    Preferred Intern Levels:
                  </div>
                  <div
                    v-if={pst.internLevel.length > 0}
                    className={"jobDetail2__postNote"}
                  >
                    {/* <div v-for={(language, i) in pst.internLevel} key={i}>{`${language}${i + 1 === pst.internLevel.length ? '' : ','} `}</div> */}
                    {pst.internLevel.map((item) => {
                      if (item === "newlyGraduate")
                        return <div>Newly Graduate</div>;
                      else if (item === "universityStudent")
                        return <div>University Student</div>;
                    })}
                  </div>
                </div>
                <div class="col-md-6">
                  <div v-if={pst.gpa} className={"jobDetail2__infoSection"}>
                    <div className={"jobDetail2__infoSection__title"}>
                      Minimum required GPA:
                    </div>
                    <div className={"jobDetail2__infoSection__value"}>
                      {pst.gpa}
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    v-if={pst.internQuota}
                    className={"jobDetail2__infoSection"}
                  >
                    <div className={"jobDetail2__infoSection__title"}>
                      Intern quota:
                    </div>
                    <div className={"jobDetail2__infoSection__value"}>
                      {pst.internQuota}
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    v-if={pst.internshipLength}
                    className={"jobDetail2__infoSection"}
                  >
                    <div className={"jobDetail2__infoSection__title"}>
                      Internship Length:
                    </div>
                    <div className={"jobDetail2__infoSection__value"}>
                      {pst.internshipLength} weeks
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    v-if={pst.minSalary && pst.maxSalary}
                    className={"jobDetail2__infoSection"}
                  >
                    <div className={"jobDetail2__infoSection__title"}>
                      Salary Interval:
                    </div>
                    <div
                      className={"jobDetail2__infoSection__value"}
                    >{`${pst.minSalary} - ${pst.maxSalary}`}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div
                    v-if={pst.startDate || pst.endDate}
                    className={"jobDetail2__infoSection"}
                  >
                    <div className={"jobDetail2__infoSection__title"}>
                      Begin Period
                    </div>
                    <div className={"jobDetail2__infoSection__value"}>
                      {pst?.startPeriod}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  }
}

export default JobDetail;
