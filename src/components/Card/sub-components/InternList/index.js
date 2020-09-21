import React, { Component, Fragment } from "react";
import styles from "./internList.scss";
class InternList extends Component {
  render() {
    let { item } = this.props;
    return (
      <Fragment>
        <div className={styles.InternListContainer}>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img width="100" src={item.avatar} />
            </div>
            <div className={styles.fullname}>
              {item.name + " " + item.surname}
            </div>
            <div className={styles.phone}>{item.phone}</div>
            <div className={styles.email}>{item.email}</div>
            <div className={styles.location}>
              {item.location.country + "," + item.location.city}
            </div>
          </div>
          <div className={styles.company}>
            <div className={styles.companyLogo}>
              <img src={item.Internship.Employer.logo} alt={"companyLogo"} />
            </div>
            <div className={styles.companyName}>
              {item.Internship.Employer.legalName}
            </div>
            <div className={styles.position}>{item.Internship.position}</div>
            <div className={styles.companyImage}></div>
            <div className={styles.companyImage}></div>
          </div>
          <div className={styles.program}>
            <div className={styles.startDate}>
              <article>Start Date : </article>
              &nbsp; {item.Internship.startDate}
            </div>
            <div className={styles.endDate}>
              <article>End Date : </article>
              &nbsp; {item.Internship.endDate}
            </div>

            <div className={styles.duration}>
              <article>Duration : </article>
              &nbsp; {item.Internship.duration}
            </div>
            <div className={styles.leftDay}>
              <article>Days Left : </article>
              &nbsp; {item.Internship.dayLeft}
            </div>
            <div className={styles.internshipLength}>
              <article>Internship Length : </article>
              &nbsp; {item.Internship.internshipLength}
            </div>
          </div>
          {item.Internship.status === "Completed" ? (
            <div className={styles[item.Internship.status]}>
              <article>Internship Status : </article> &nbsp;Completed
            </div>
          ) : (
            <div className={styles[item.Internship.status]}>
              <article>Internship Status : </article> &nbsp; On Going
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default InternList;
