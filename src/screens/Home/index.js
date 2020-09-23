import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Components ***/
import Button from "../../components/Button";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

/*** Styles ***/
import styles from "./home.scss";

/*** Icons ***/
import chaseBroke from "../../assets/chaseBroke.png";
import steveAustin from "../../assets/steveAustin.png";
import georgeBurgess from "../../assets/georgeBurgess.png";
import siemens from "../../assets/siemens.png";
import nanodems from "../../assets/nanodems.png";
import fikrimuhal from "../../assets/Fikrimuhal.png";
import vodafoneImage from "../../assets/vodafone.png";
import vodafoneGrayImage from "../../assets/vodafonegray.png";
import allianzImage from "../../assets/allianz.png";
import allianzGrayImage from "../../assets/allianzgray.png";
import ingBankImage from "../../assets/ing-bank.png";
import ingBankGrayImage from "../../assets/ing-bank gray.png";
import unileverImage from "../../assets/unilever.png";
import unileverGrayImage from "../../assets/unilevergray.png";
import workingStudentImage from "../../assets/workingStudent.jpg";
import register from "../../icons/register.svg";
import comp from "../../icons/comp.svg";
import application from "../../icons/application.svg";
import duties from "../../icons/duties.svg";
import promotion from "../../icons/promotion.svg";

class Home extends Component {
  state = {
    cities: [
      "Manchester",
      "London",
      "Oxford",
      "Newcastle",
      "Birmingham",
      "Norwich",
      "Bath",
      "Bristol",
      "Yorkshire",
      "Swindon",
      "Dover",
      "Bibury",
      "Southampton",
    ],
    items: [1, 2, 3],
    ing: ingBankGrayImage,
    unilever: unileverGrayImage,
    allianz: allianzGrayImage,
    vodafone: vodafoneGrayImage,
    pri1: false,
    pri2: false,
    pri3: false
  };

  render() {
    let { items } = this.state;
    return (
      <div className={styles.Home}>
        <div className={styles.popularSearchSection}>
          <div className={styles.popularSearchTitle}>Popular Searches</div>
          <ul className={styles.cities}>
            {this.state.cities.map((city, i) => {
              return (
                <Link
                  to={`/search/null/${city}`}
                  key={"city" + i}
                  className={styles.city}
                >
                  {city}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className={styles.postsSection}>
          <div className={styles.postsTitle}>
            Find an Internship and Advance Your Career
          </div>
          <div className={styles.postsSubTitle}>
            Each month, thousands of students get career opportunities via
            Interny
          </div>
          <div className={styles.cards}>
            <Card
              v-for={(item, i) in items}
              type={"jobPost"}
              key={i}
              posts={[
                {
                  date: "30 days ago",
                  header:
                    i === 0
                      ? "Siemens AG"
                      : i === 1
                      ? "Nanodems Corp."
                      : "Fikrimuhal",
                  company: "Software Development Engineer",
                  image: i === 0 ? siemens : i === 1 ? nanodems : fikrimuhal,
                  buttons: [
                    {
                      type: "primary",
                      text: "20 Days Internship",
                      sizeName: "small",
                      responsive: "post",
                    },
                  ],
                  note:
                    "Responsible for the design, coding, unit testing and documentation of software components and features. Build automation test framework. Work with the software engineering team to meet deliverables. ",
                },
              ]}
            />
          </div>
          <div className={styles.discoverBtn}>
            <Button
              to={"/search"}
              type={"ghost"}
              text={"Discover"}
              sizeName={"large"}
            />
          </div>
        </div>
        <div className={styles.companiesSection}>
          <div className={styles.companiesTitle}>Outstanding Companies</div>
          <div className={styles.companiesSubTitle}>
            Each year, more than 400 million interns turn to INTERNY as searching for internships
          </div>
          <div className={styles.companiesImages}>
            <img
                onClick={() => this.setState({ing: ingBankImage})}
                onMouseOver={() => this.setState({ing: ingBankImage})}
                onMouseLeave={() => this.setState({ing: ingBankGrayImage})}
                height={38}
                src={this.state.ing} alt={"image"}
            />
            <img
                onClick={() => this.setState({unilever: unileverImage})}
                onMouseOver={() => this.setState({unilever: unileverImage})}
                onMouseLeave={() => this.setState({unilever: unileverGrayImage})}
                height={65}
                src={this.state.unilever}
                alt={"image"}
            />
            <img
                onClick={() => this.setState({allianz: allianzImage})}
                onMouseOver={() => this.setState({allianz: allianzImage})}
                onMouseLeave={() => this.setState({allianz: allianzGrayImage})}
                height={35}
                src={this.state.allianz}
                alt={"image"}
            />
            <img
                onClick={() => this.setState({vodafone: vodafoneImage})}
                onMouseOver={() => this.setState({vodafone: vodafoneImage})}
                onMouseLeave={() => this.setState({vodafone: vodafoneGrayImage})}
                height={62}
                src={this.state.vodafone}
                alt={"image"}
            />
          </div>
        </div>
        <div className={styles.browseJobsSection}>
          <div className={styles.jobsTitle}>
            <div>Apply here for any of the thousands of internships around the world.</div>
            <Link to={"signup"} className={styles.prepareCv}>
              Sign up! <img src={promotion} alt={'promotion'} />
            </Link>
          </div>
          <img src={workingStudentImage} alt={"image"} />
        </div>
        <div className={styles.howItWorksSection}>
          <div className={styles.howItWorksTitle}>How It Works</div>
          <div className={styles.howItWorksSubTitle}>
            Each year, more than 400 million interns turn to INTERNY as searching for internships, making over thousands applications every day.
          </div>
          <div className={styles.divisions}>
            <div style={{marginTop: '0px'}} className={styles.division}>
              <img className={styles.icon} src={register} />
              <div className={styles.title}>Join & Apply</div>
              <div className={styles.description}>
                Sign up and buy the requested package. Then apply for the internships for acceptance.
              </div>
            </div>
            <div style={{marginTop: '15px'}} className={styles.division}>
              <img className={styles.icon} src={comp} />
              <div className={styles.title}>Competency Analytics</div>
              <div className={styles.description}>
                Prove your competency to be the primary candidate of the company you want to apply for.
                Use CA to determine and improve the competency level if necessary.
              </div>
            </div>
            <div style={{marginTop: '30px'}} className={styles.division}>
              <img className={styles.icon} src={application} />
              <div className={styles.title}>Project Management System</div>
              <div className={styles.description}>
                Use PMS to manage tasks assigned for the internship and to contact the company.
              </div>
            </div>
            <div style={{marginTop: '45px'}} className={styles.division}>
              <img className={styles.icon} src={duties} />
              <div className={styles.title}>Reference Letter</div>
              <div className={styles.description}>
                Complete the internship process and take your WFA report.
                If you're over 60% successful according to the WFA, get your signed reference letter.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.internsSaysSection}>
          <div className={styles.internsSaysTitle}>
            What Interns Say About Us
          </div>
          <div className={styles.internsSaysSubTitle}>
            Thousands of university students and recent graduates easily found internships they deserve anywhere in the world
          </div>
          <div className={styles.internsSaysImages}>
            <img height={297} src={steveAustin} alt={"image"} />
            <img
              height={296}
              className={styles.shadowed}
              src={chaseBroke}
              alt={"image"}
            />
            <img height={297} src={georgeBurgess} alt={"image"} />
          </div>
        </div>
        <div id={"packages-section"} className={styles.packagesSection}>
          <div className={styles.packagesTitle}>See the Intern Packages</div>
          <div className={styles.packagesSubTitle}>
            Click to see detail of packages
          </div>
          <div className={styles.packagesCards}>
            <div onMouseLeave={() => this.setState({ pri1: false })} onMouseOver={() => this.setState({ pri1: true })} className={styles.frontier}>
              <Card type={'pricing'}>
                <div className={styles.packageCard}>
                  <div className={styles.headerDiv}>
                    <div className={styles.packageTitle}>FREEMIUM</div>
                    <div className={styles.packagePrice}>$0.00</div>
                    <div className={styles.packagePaymentDate}>Per Month</div>
                  </div>
                  <div className={styles.stroke} />
                  <div className={styles.descriptionDiv}>
                    <div className={styles.packageDescription}>
                      <div>Sign up!</div>
                      <div>Create CV</div>
                      <div>Search Internships</div>
                    </div>
                    <Button v-if={this.state.pri1} type={'primary'} text={'Buy Now'} sizeName={'default'} />
                    <Button v-if={!this.state.pri1} type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                  </div>
                </div>
              </Card>
            </div>
            <div onMouseLeave={() => this.setState({ pri2: false })} onMouseOver={() => this.setState({ pri2: true })} className={styles.frontier}>
              <Card type={'pricing'}>
                <div className={styles.packageCard}>
                  <div className={styles.headerDiv}>
                    <div className={styles.packageTitle}>INTERN</div>
                    <div className={styles.packagePrice}>$19,99</div>
                    <div className={styles.packagePaymentDate}>Per Month</div>
                  </div>
                  <div className={styles.stroke} />
                  <div className={styles.descriptionDiv}>
                    <div className={styles.packageDescription}>
                      <div>Apply for Internships</div>
                      <div>PMS</div>
                      <div>WFA Report</div>
                      <div>Reference Letter</div>
                    </div>
                    <Button v-if={this.state.pri2} type={'primary'} text={'Buy Now'} sizeName={'default'} />
                    <Button v-if={!this.state.pri2} type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                  </div>
                </div>
              </Card>
            </div>
            <div onMouseLeave={() => this.setState({ pri3: false })} onMouseOver={() => this.setState({ pri3: true })} className={styles.frontier}>
              <Card type={'pricing'}>
                <div className={styles.packageCard}>
                  <div className={styles.headerDiv}>
                    <div className={styles.packageTitle}>COMPETENCY</div>
                    <div className={styles.packagePrice}>$9.99</div>
                    <div className={styles.packagePaymentDate}>Per Month</div>
                  </div>
                  <div className={styles.stroke} />
                  <div className={styles.descriptionDiv}>
                    <div className={styles.packageDescription}>
                      <div>Case Studies</div>
                      <div>Competency Analytics</div>
                      <div>Competency Report</div>
                    </div>
                    <Button v-if={this.state.pri3} type={'primary'} text={'Buy Now'} sizeName={'default'} />
                    <Button v-if={!this.state.pri3} type={'ghost'} text={'Buy Now'} sizeName={'default'} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
