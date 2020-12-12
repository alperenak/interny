import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Components ***/
import Button from "../../components/Button";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import OwlCarousel from 'react-owl-carousel2';
/*** Styles ***/
import styles from "./home.scss";
import homeCurve from "../../assets/home-curve.svg";
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
import workingStudentImage from "../../assets/workingStudent.png";
import register from "../../icons/register.svg";
import comp from "../../icons/comp.svg";
import application from "../../icons/application.svg";
import duties from "../../icons/duties.svg";
import promotion from "../../icons/promotion.svg";
import rightArrow from "../../icons/right-arrow.svg";
import leftArrow from "../../icons/left-arrow.svg";

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
    pri3: false,
    slideCount: 0,
  };

  componentDidMount(){

  }
  render() {
	const options = {
	    items: 4,
	    nav: false,
		dots:false,
		autoplayTimeout:2500,
	    rewind: true,
	    autoplay: true,
		responsive:{
			0:{
				items:1
			},
			768 : {
    			items:4
    		}
		}
	};
    let { items } = this.state;
    return (
		<div className={"home"}>
			<div className={"home__popularSearchSection"}>
				<div className={"home__popularSearchTitle"}>Popular Searches</div>
				<ul className={"home__cities"}>
					{this.state.cities.map((city, i) => {
						return (
							<Link
							to={`/search/null/${city}`}
							key={"city" + i}
							className={"home__cities__city"}
							>
								{city}
							</Link>
						);
					})}
				</ul>
			</div>
			<div className={"home__postsSection"}>
				<div class="container">
					<div className={"home__postsSection__postsTitle"}>
						Find an Internship and Advance Your Career
					</div>
					<div className={"home__postsSection__postsSubTitle"}>
						Each month, thousands of students get career opportunities via Interny
					</div>
					<div className={"home__postsSection__cards"}>
						<div class="row">
							<Card
								v-for={(item, i) in items}
								type={"jobPost"}
								key={i}
								posts={[
									{
									location:"Istanbul/Turkey",
									date: "30 days ago",
									header:
									i === 0
									? "Siemens AG - Sector 1"
									: i === 1
									? "Nanodems Corp. - Sector 2"
									: "Fikrimuhal - Sector 3",
									company: "Software Development Engineer",
									image: i === 0 ? siemens : i === 1 ? nanodems : fikrimuhal,
									star: 5,
									startTime:i === 0
									? "May 4ᵗʰ Week"
									: i === 1
									? "April 5ᵗʰ Week"
									: "December 1ᵗʰ Week",
									buttons: [
									{
										type: "primary",
										text: i === 0
										? "4 Weeks Internship"
										: i === 1
										? "8 Weeks Internship"
										: "12 Weeks Internship",
										sizeName: "small",
										width: "120px",
										responsive: "post",
									},

									],

									},
								]}
							/>
						</div>

					</div>
					<div className={"home__postsSection__discoverBtn"}>
						<Button
							to={"/search"}
							type={"ghost"}
							text={"Discover"}
							sizeName={"large"}
						/>
					</div>
				</div>


			</div>

			<div className={"home__companiesSection"}>
				<div class="container">
					<div className={"home__companiesSection__companiesTitle"}>Outstanding Companies</div>
					<div className="home__companiesSection__companiesSubTitle">
						Each year, more than 400 million interns turn to INTERNY assearching for internships
					</div>

					<div className="home__companiesSection__companiesImages">
					<OwlCarousel ref="car" options={options}>
						<div class="item">
							<img
							  onClick={() => this.setState({ing: ingBankImage})}
							  onMouseOver={() => this.setState({ing: ingBankImage})}
							  onMouseLeave={() => this.setState({ing: ingBankGrayImage})}
							  height={38}
							  src={this.state.ing}
							  alt={"image"}
							/>
						</div>
						<div class="item">
							<img
							  onClick={() => this.setState({unilever: unileverImage})}
							  onMouseOver={() => this.setState({unilever: unileverImage})}
							  onMouseLeave={() => this.setState({unilever: unileverGrayImage})}
							  height={65}
							  src={this.state.unilever}
							  alt={"image"}
							/>
						</div>
						<div class="item">
							<img
							  onClick={() => this.setState({allianz: allianzImage})}
							  onMouseOver={() => this.setState({allianz: allianzImage})}
							  onMouseLeave={() => this.setState({allianz: allianzGrayImage})}
							  height={35}
							  src={this.state.allianz}
							  alt={"image"}
							/>
						</div>
						<div class="item">
							<img
							  onClick={() => this.setState({vodafone: vodafoneImage})}
							  onMouseOver={() => this.setState({vodafone: vodafoneImage})}
							  onMouseLeave={() => this.setState({vodafone: vodafoneGrayImage})}
							  height={62}
							  src={this.state.vodafone}
							  alt={"image"}
							/>
						</div>
						<div class="item">
							<img
							  onClick={() => this.setState({unilever: unileverImage})}
							  onMouseOver={() => this.setState({unilever: unileverImage})}
							  onMouseLeave={() => this.setState({unilever: unileverGrayImage})}
							  height={65}
							  src={this.state.unilever}
							  alt={"image"}
							/>
						</div>
						<div class="item">
							<img
							  onClick={() => this.setState({allianz: allianzImage})}
							  onMouseOver={() => this.setState({allianz: allianzImage})}
							  onMouseLeave={() => this.setState({allianz: allianzGrayImage})}
							  height={35}
							  src={this.state.allianz}
							  alt={"image"}
							/>
						</div>
						<div class="item">
							<img
							  onClick={() => this.setState({vodafone: vodafoneImage})}
							  onMouseOver={() => this.setState({vodafone: vodafoneImage})}
							  onMouseLeave={() => this.setState({vodafone: vodafoneGrayImage})}
							  height={62}
							  src={this.state.vodafone}
							  alt={"image"}
							/>
						</div>
					</OwlCarousel>

					</div>
				</div>
			</div>
			<div className={"home__browseJobsSection"} style={{"background-image":"url("+workingStudentImage+")"}}>
				<div class="container">
					<div class="row">
						<div className={"home__browseJobsSection__jobsTitle"}>
							<div>
								Apply here for any of the thousands of internships around the world.
							</div>
							<Link to={"signup"} className={"prepareCv"}>
								Sign up!
							</Link>
						</div>
					</div>
				</div>


			</div>
			<div className={"home__howItWorksSection"}>
				<div class="container">
					<div className={"home__howItWorksSection__howItWorksTitle"}>How It Works</div>
					<div className={"home__howItWorksSection__howItWorksSubTitle"}>
						Each year, more than 400 million interns turn to INTERNY as
						searching for internships, making over thousands applications every
						day.
					</div>
					<div class="row home__howItWorksSection__row">
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__icon"} src={register} />
								<div className={"home__howItWorksSection__division__title"}>Join & Apply</div>
								<div className={"home__howItWorksSection__division__description"}>
									Sign up and buy the requested package. Then apply for the internships for acceptance.
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__icon"} src={comp} />
								<div className={"home__howItWorksSection__division__title"}>Competency Analytics</div>
								<div className={"home__howItWorksSection__division__description"}>
									Prove your competency to be the primary candidate of the company
									you want to apply for. Use İCCᵗᵐ to determine and improve the
									competency level if necessary.
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__icon"} src={application} />
								<div className={"home__howItWorksSection__division__title"}>Project Management System</div>
								<div className={"home__howItWorksSection__division__description"}>
									Use İMSᵖᵐ to manage tasks assigned for the internship and to
									contact the company.
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__icon"} src={duties} />
								<div className={"home__howItWorksSection__division__title"}>Reference Letter</div>
								<div className={"home__howItWorksSection__division__description"}>
									Complete the internship process and take your WFA report. If
									you're over 60% successful according to the WFA, get your signed
									reference letter.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={"home__internsSaysSection"}>
				<div class="container">
					<div className={"home__internsSaysSection__internsSaysTitle"}>
						What Interns Say About Us
					</div>
					<div className={"home__internsSaysSection__internsSaysSubTitle"}>
						Thousands of university students and recent graduates easily found
						internships they deserve anywhere in the world
					</div>
					<div class="row home__internsSaysSection__row">
						<div class="col-md-4 boxAnimation2"><img src={steveAustin} alt={"image"} /></div>
						<div class="col-md-4 boxAnimation2"><img src={chaseBroke} alt={"image"} /></div>
						<div class="col-md-4 boxAnimation2"><img src={georgeBurgess} alt={"image"} /></div>
					</div>
				</div>
			</div>
			<div id={"packages-section"} className={"home__packagesSection"}>
				<div class="container">
					<div className={"home__packagesSection__packagesTitle"}>See the Intern Packages</div>
					<div className={"home__packagesSection__packagesSubTitle"}>
						Click to see detail of packages
					</div>
					<div class="row home__packagesSection__row">
						<div class="col-md-4">
							<div
								onMouseLeave={() => this.setState({ pri1: false })}
								onMouseOver={() => this.setState({ pri1: true })}
								className={styles.frontier}
							>
								<Card type={"pricing"}>
									<div className={"home__packagesSection__packageCard"}>
										<div className={"home__packagesSection__packageCard__headerDiv"}>
											<div className={"home__packagesSection__packageCard__packageTitle"}>FREEMIUM</div>
											<div className={"home__packagesSection__packageCard__packagePrice"}>$0.00</div>
											<div className={"home__packagesSection__packageCard__packagePaymentDate"}>Per Month</div>
										</div>
										<div className={"home__packagesSection__packageCard__stroke"} />
										<div className={"home__packagesSection__packageCard__descriptionDiv"}>
											<div className={"home__packagesSection__packageCard__packageDescription"}>
												<div>Sign up!</div>
												<div>Create CV</div>
												<div>Search Internships</div>
											</div>
											<Button
												v-if={this.state.pri1}
												type={"primary"}
												text={"Buy Now"}
												sizeName={"default"}
											/>
											<Button
												v-if={!this.state.pri1}
												type={"ghost"}
												text={"Buy Now"}
												sizeName={"default"}
											/>
										</div>
									</div>
								</Card>
							</div>
						</div>
						<div class="col-md-4">
							<div
								onMouseLeave={() => this.setState({ pri2: false })}
								onMouseOver={() => this.setState({ pri2: true })}
								className={styles.frontier}
							>
								<Card type={"pricing"}>
									<div className={"moneyGuarenteed"}>
									{/* Money Back Guarenteed */}
									</div>
									<div className={"home__packagesSection__packageCardGuaranteed"}>
										<div className={"home__packagesSection__packageCardGuaranteed__headerDiv"}>
											<div className={"home__packagesSection__packageCardGuaranteed__packageTitle"}>INTERN</div>
											<div className={"home__packagesSection__packageCardGuaranteed__packagePrice"}>$24.99</div>
											<div className={"home__packagesSection__packageCardGuaranteed__packagePaymentDate"}>Per Month</div>
										</div>
										<div className={"home__packagesSection__packageCardGuaranteed__stroke"} />
										<div className={"home__packagesSection__packageCardGuaranteed__descriptionDiv"}>
											<div className={"home__packagesSection__packageCardGuaranteed__packageDescription"}>
												<div>Apply for Internships</div>
												<div data-toggle="tooltip" title="Interny Management System">İMSᵖᵐ</div>
												<div data-toggle="tooltip" title="Workforce Analytics">WFA Report</div>
												<div>Reference Letter</div>
											</div>
											<Button
											v-if={this.state.pri2}
											type={"primary"}
											text={"Buy Now"}
											sizeName={"default"}
											/>
											<Button
											v-if={!this.state.pri2}
											type={"ghost"}
											text={"Buy Now"}
											sizeName={"default"}
											/>
										</div>
									</div>
								</Card>
							</div>
						</div>
						<div class="col-md-4">
							<div
								onMouseLeave={() => this.setState({ pri3: false })}
								onMouseOver={() => this.setState({ pri3: true })}
								className={styles.frontier}
							>
								<Card type={"pricing"}>
									<div className={"home__packagesSection__packageCard"}>
										<div className={"home__packagesSection__packageCard__headerDiv"}>
											<div className={"home__packagesSection__packageCard__packageTitle"}>COMPETENCY</div>
											<div className={"home__packagesSection__packageCard__packagePrice"}>$12.49</div>
											<div className={"home__packagesSection__packageCard__packagePaymentDate"}>Per Report</div>
										</div>
										<div className={"home__packagesSection__packageCard__stroke"} />
										<div className={"home__packagesSection__packageCard__descriptionDiv"}>
											<div className={"home__packagesSection__packageCard__packageDescription"}>
												<div data-toggle="tooltip" title="Interny Management System">İCCᵗᵐ</div>
												<div >Competenct Analytics</div>
												<div>Competency Report</div>
											</div>
											<Button
												v-if={this.state.pri3}
												type={"primary"}
												text={"Buy Now"}
												sizeName={"default"}
											/>
											<Button
												v-if={!this.state.pri3}
												type={"ghost"}
												text={"Buy Now"}
												sizeName={"default"}
											/>
										</div>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
        <Footer />

    </div>
    );
  }
}

export default Home;
