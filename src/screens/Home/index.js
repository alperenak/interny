import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Components ***/
import Button from "../../components/Button";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import OwlCarousel from 'react-owl-carousel2';
import InternComment from '../../components/InternComment';
/*** Styles ***/
import styles from "./home.scss";
import homeCurve from "../../assets/home-curve.svg";
/*** Icons ***/
import cenkAvatar from "../../assets/cenkAvatar.png";
import kateAvatar from "../../assets/kateAvatar.jpg";
import samanAvatar from "../../assets/samanAvatar.png";

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
import hiwOne from "../../icons/hiw-one.png";
import hiwTwo from "../../icons/hiw-two.png";
import hiwThree from "../../icons/hiw-three.png";
import hiwFour from "../../icons/hiw-four.png";
import { withNamespaces } from 'react-i18next';

const INTERN_COMMENTS = [
	{
		avatar: cenkAvatar,
		title: "CENK S.",
		subTitle: "TR",
		text: `I thought that I lost the opportunity to do an internship abroad due to the pandemic.
		However, I registered with INTERNY and got the opportunity to do an internship at a technology company in the Netherlands.
		Thank you.`
	},
	{
		avatar: kateAvatar,
		title: "KATE L.",
		subTitle: "USA",
		text: `After completing my education, I wanted to do an internship in Europe for my personal development.
		I completed my internship in the UK using INTERNY. Thanks to this, I gained experience outside the USA. I was very satisfied.`
	},
	{
		avatar: samanAvatar,
		title: "SAMAN bA",
		subTitle: "UAE",
		text: `I easily had the opportunity to work for a company in Germany without any visa problems with INTERNY.
		In this way, I had the opportunity to learn the working principles of German companies before going to Germany. Thank you so much.`
	}
]

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
  	const { t } = this.props;

	  return (
		<div className={"home"}>
			<div className={"home__popularSearchSection"}>
				<div className={"home__popularSearchTitle"}>{t('landing_popular_searches')}</div>
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
						{t('landing_internships_list_title')}
					</div>
					<div className={"home__postsSection__postsSubTitle"}>
						{t('landing_internships_list_definition')}
					</div>
					<div className={"home__postsSection__cards"}>
						<div class="row">
							<Card
								v-for={(item, i) in items}
								type={"jobPost"}
								key={i}
								posts={[
									{
									location:"California/USA",
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
									? "April 4ᵗʰ Week"
									: "December 1ᵗʰ Week",
									buttons: [
									{
										type: "primary",
										text: i === 0
										? "4 Weeks"
										: i === 1
										? "8 Weeks"
										: "12 Weeks",
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
							text={t('landing_internships_list_discover')}
							sizeName={"large"}
						/>
					</div>
				</div>


			</div>

			<div className={"home__companiesSection"}>
				<div class="container">
					<div className={"home__companiesSection__companiesTitle"}>{t('landing_outstanding_companies')}</div>
					<div className="home__companiesSection__companiesSubTitle">
						{t('landing_outstanding_companies_text')}
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
								{t('landing_on_image_text')}
							</div>
							<Link to={"signup"} className={"prepareCv"}>
								{t('landing_on_image_signup')}
							</Link>
						</div>
					</div>
				</div>


			</div>
			<div className={"home__howItWorksSection"}>
				<div class="container">
					<div className={"home__howItWorksSection__howItWorksTitle"}>{t('landing_how_it_works')}</div>
					<div className={"home__howItWorksSection__howItWorksSubTitle"}>
						{t('landing_how_it_works_definition')}
					</div>
					<div class="row home__howItWorksSection__row">
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__topLeftIcon"} src={hiwOne}></img>
								<div className={"home__howItWorksSection__division__title"}>{t('landing_how_it_works_card1_title')}</div>
								<div className={"home__howItWorksSection__division__description"}>
									{t('landing_how_it_works_card1_text')}
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__topLeftIcon"} src={hiwTwo}></img>
								<div className={"home__howItWorksSection__division__title"}>{t('landing_how_it_works_card2_title')}</div>
								<div className={"home__howItWorksSection__division__description"}>
									{t('landing_how_it_works_card2_text')}
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__topLeftIcon"} src={hiwThree}></img>
								<div className={"home__howItWorksSection__division__title"}>{t('landing_how_it_works_card3_title')}</div>
								<div className={"home__howItWorksSection__division__description"}>
									{t('landing_how_it_works_card3_text')}
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 col-md-6 col-12">
							<div className={"home__howItWorksSection__division boxAnimation2"}>
								<img className={"home__howItWorksSection__division__topLeftIcon"} src={hiwFour}></img>
								<div className={"home__howItWorksSection__division__title"}>{t('landing_how_it_works_card4_title')}</div>
								<div className={"home__howItWorksSection__division__description"}>
									{t('landing_how_it_works_card4_text')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={"home__internsSaysSection"}>
				<div class="container">
					<div className={"home__internsSaysSection__internsSaysTitle"}>
						{t('landing_what_interns_say_title')}
					</div>
					<div className={"home__internsSaysSection__internsSaysSubTitle"}>
						{t('landing_what_interns_say_text')}
					</div>
					<div class="row home__internsSaysSection__row">
						{
							INTERN_COMMENTS.map((comment, index) => {
								return(
									<div class="col-md-4 boxAnimation2" key={comment.title}>
										<InternComment
											card={index % 2 == 0}
											avatar={comment.avatar}
											title={comment.title}
											subTitle={comment.subTitle}
											text={comment.text}
										/>
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
			<div id={"packages-section"} className={"home__packagesSection"}>
				<div class="container">
					<div className={"home__packagesSection__packagesTitle"}>{t('landing_see_intern_packages_title')}</div>
					<div className={"home__packagesSection__packagesSubTitle"}>
						{t('landing_see_intern_packages_text')}
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
											<div className={"home__packagesSection__packageCard__packageTitle"}>{t('landing_packages_freemium_title')}</div>
											<div className={"home__packagesSection__packageCard__packagePrice"}>{t('landing_packages_freemium_price')}</div>
										</div>
										<div className={"home__packagesSection__packageCard__stroke"} />
										<div className={"home__packagesSection__packageCard__descriptionDiv"}>
											<div className={"home__packagesSection__packageCard__packageDescription"}>
												<div>{t('landing_packages_freemium_item1')}</div>
												<div>{t('landing_packages_freemium_item2')}</div>
												<div>{t('landing_packages_freemium_item3')}</div>
											</div>
											<Button
												v-if={this.state.pri1}
												type={"primary"}
												text={t('landing_packages_details')}
												sizeName={"default"}
											/>
											<Button
												v-if={!this.state.pri1}
												type={"ghost"}
												text={t('landing_packages_details')}
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
											<div className={"home__packagesSection__packageCardGuaranteed__packageTitle"}>{t('landing_packages_intern_title')}</div>
											<div className={"home__packagesSection__packageCardGuaranteed__packagePrice"}>{t('landing_packages_intern_price')}</div>
											<div className={"home__packagesSection__packageCardGuaranteed__packagePaymentDate"}>{t('landing_packages_intern_info')}</div>
										</div>
										<div className={"home__packagesSection__packageCardGuaranteed__stroke"} />
										<div className={"home__packagesSection__packageCardGuaranteed__descriptionDiv"}>
											<div className={"home__packagesSection__packageCardGuaranteed__packageDescription"}>
												<div>{t('landing_packages_intern_item1')}</div>
												<div class="bold" data-toggle="tooltip" title="Interny Management System">{t('landing_packages_intern_item2')}</div>
												<div data-toggle="tooltip" title="Workforce Analytics">{t('landing_packages_intern_item3')}</div>
												<div>{t('landing_packages_intern_item4')}</div>
											</div>
											<Button
											v-if={this.state.pri2}
											type={"primary"}
											text={t('landing_packages_details')}
											sizeName={"default"}
											/>
											<Button
											v-if={!this.state.pri2}
											type={"ghost"}
											text={t('landing_packages_details')}
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
											<div className={"home__packagesSection__packageCard__packageTitle"}>{t('landing_packages_competency_title')}</div>
											<div className={"home__packagesSection__packageCard__packagePrice"}>{t('landing_packages_competency_price')}</div>
											<div className={"home__packagesSection__packageCard__packagePaymentDate"}>{t('landing_packages_competency_info')}</div>
										</div>
										<div className={"home__packagesSection__packageCard__stroke"} />
										<div className={"home__packagesSection__packageCard__descriptionDiv"}>
											<div className={"home__packagesSection__packageCard__packageDescription"}>
												<div class="bold" data-toggle="tooltip" title="Interny Competency Center">{t('landing_packages_competency_item1')}</div>
												<div >{t('landing_packages_competency_item2')}</div>
												<div>{t('landing_packages_competency_item3')}</div>
											</div>
											<Button
												v-if={this.state.pri3}
												type={"primary"}
												text={t('landing_packages_details')}
												sizeName={"default"}
											/>
											<Button
												v-if={!this.state.pri3}
												type={"ghost"}
												text={t('landing_packages_details')}
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

export default withNamespaces()(Home);
