import React, { Component } from "react";

/*** Components ***/
import Card from "../../components/Card";
import Button from "../../components/Button";

/*** Utils ***/
import store from "../../store";
import { getCookie } from "../../utils/cookie";

/*** Styles ***/
import styles from "./employerdashboard.scss";
import LoadingModal from "../../components/LoadingModal";

import WFA from "../../components/WFA";

import "../ReferrenceLetter/referrenceLetter.scss";

// Components
import Input from "../../components/Input";
import FooterAlternative from "../../components/FooterAlternative";

// Assets
import image from "../../assets/company-ims_wait.png";

class UniversityOpen extends Component {
  state = {
    courses: [],
    company: {},
    processing: false
  };

  async componentDidMount() {
    let courses = await store.getCourses();
    let resCompany = {};
    if (getCookie("user") === "employer") {
      resCompany = await store.getEmployer(getCookie("user_id"));
    } else {
      let job = await store.getPost(this.props.user.ApprovedJob);
      resCompany = await store.getEmployer(job.Employer.id);
    }
    let company = resCompany.data;
    this.setState({
      courses: courses,
      company: {
        logo: company.logo,
        header: company.legalName,
        location: `${""} - ${""}`,
        sector: "",
        jobType: "",
        empNum: company?.employeeNumber,
        description: "",
      },
    });

    if (resCompany)
      this.setState({ processing: false })
  }

  createCourse = () => {
    this.props.createModal({
      header: "Create Course",
    });
  };

  renderComingSoon = () => {
    return <div className={styles.comingSoon}> Coming soon... </div>;
  };
  render() {
    let userType = getCookie("user");
    let { courses, company, processing } = this.state;
    return (
		<div className="pageWrapper">
			<div className={"referrenceLetter"}>
				<LoadingModal text="Loading" v-if={this.state.processing} />
				<div class="container">
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img className="referrenceLetter__image" src={image} alt="Dashboard" />
					</div>
					<div className={"referrenceLetter__modal"}>
						<div class="row">
							<div class="col-md-12">
								<div className={"referrenceLetter__header"}>Dashboard </div>
								<div className={"referrenceLetter__description"}>
								Welcome to Interny Dashboard 
								</div>
							</div>
							<div class="col-md-12">
								<div className={"referrenceLetter__buttonWrapper"} >
									<Button
										type='secondary'
										text='Learn More'
										to={"/internyBusiness"} 
										textClass='referrenceLetter__buttonWrapper__text'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FooterAlternative />
		</div>
	);
    /* <div className={styles.MyCourses}>
        <div className={styles.cards}>
          <div className={styles.courses}>
            <Card
              type={"course"}
              course={course}
              v-for={(course, i) in courses}
              key={i}
            />
          </div>
          <div className={styles.profileSection}>
            <Card
              type={"companyProfile"}
              profileObject={company}
              getUser={this.getPost}
            />
            <Button
              v-if={userType === "employer"}
              text={"Create a course"}
              type={"primary"}
              sizeName={"default"}
              width={"105px"}
              onButtonClick={() => this.createCourse()}
            />
          </div>
        </div>
      </div> */
  }
}

export default UniversityOpen;
