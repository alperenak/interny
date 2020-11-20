import React, { Component, Fragment } from "react";
import styles from "./internList.scss";
class InternList extends Component {
  render() {
    let { item, history } = this.props;
    let duration =
      ((item.Internship.duration - item.Internship.dayLeft) /
        item.Internship.duration) *
      100;
    return (
      <Fragment>
        <div
          onClick={() => history.push(`/internDetail/${item.id}`)}
          className={"InternListContainer"}
        >
          <div className={"profile"}>
            <div className={"responsiveTitles"}>Student</div>
            <div className={"avatar"}>
              <img width="100" src={item.avatar} />
            </div>
            <div className={"fullname"}>
              {item.name + " " + item.surname}
            </div>
            <div className={"phone"}>{item.phone}</div>
            <div className={"email"}>{item.email}</div>
            <div className={"location"}>
              {item.location.country + "," + item.location.city}
            </div>
          </div>
          <div className={"company"}>
            <div className={"responsiveTitles"}>Company / Program</div>
            <div className={"companyLogo"}>
              <img src={item.Internship.Employer.logo} alt={"companyLogo"} />
            </div>
            <div className={"companyName"}>
              {item.Internship.Employer.legalName}
            </div>
            <div className={"position"}>{item.Internship.position}</div>
            <div className={"companyImage"}></div>
            <div className={"companyImage"}></div>
          </div>
          <div className={"program"}>
            <div className={"responsiveTitles"}>Internship Info</div>
            <div className={"startDate"}>
              <article>Start Date : </article>
              &nbsp; {item.Internship.startDate}
            </div>
            <div className={"endDate"}>
              <article>End Date : </article>
              &nbsp; {item.Internship.endDate}
            </div>

            <div className={"duration"}>
              <article>Duration :</article>
              &nbsp;
              <div className={"bar"}>
                <div
                  style={{ width: duration + "%" }}
                  className={"duration"}
                />
              </div>
            </div>
            <div className={"leftDay"}>
              <article>Days Left : </article>
              &nbsp; {item.Internship.dayLeft}
            </div>
            <div className={"internshipLength"}>
              <article>Internship Length : </article>
              &nbsp; {item.Internship.internshipLength}
            </div>
          </div>
          {item.Internship.status === "Completed" ? (
            <div className={item.Internship.status}>
              <article>Internship Status : </article> &nbsp;Completed
            </div>
          ) : (
            <div className={item.Internship.status}>
              <article>Internship Status : </article> &nbsp; On Going
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default InternList;
