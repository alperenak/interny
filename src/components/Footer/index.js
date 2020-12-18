import React, { Component } from "react";
import { Link } from "react-router-dom";

/*** Styles ***/
import styles from "./footer.scss";

/*** Utils ***/
import { getCookie } from "../../utils/cookie";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo-white.png";
import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import linkedin from "../../icons/linkedin.svg";
import appStore from "../../icons/app-store-badge.svg";
import googlePlay from "../../icons/google-play-badge.svg";
import location from "../../icons/location-white.svg";
import instagram from "../../icons/instagram.svg";
import youtube from "../../icons/youtube.svg";
import EarthGrid from "../../icons/earth-grid-symbol.svg";

class Footer extends Component {
	render() {
		return (
			<div className={"footerSection"}>
				<div class="container" style={{"max-width":"90%"}}>
					<div className={"footerSection__footerTop"}>
						<div class="row">
							<div class="col-xl-3 col-lg-12 col-12">
								<div className={"footerSection__companyDescription"}>
									<img src={internyLogo} />
									<div
									style={{
									fontStyle: "italic",
									marginBottom: "17px",
									fontSize: "17px",
									}}
									className={"footerSection__companyDescription__description"}
									>
										"The way to be a global intern"
									</div>
									<div className={"footerSection__companyDescription__description"}>
										Provides a complete online service for anyone looking for a new
										internship worldwide. We are not a recruitment agency. We are an
										online internship platform that supports the intern and the
										company from the beginning to the end of the internship process.
									</div>
								</div>
							</div>
							<div class="col-xl-7 col-lg-12 col-12">
								<div className={"footerSection__options"}>
									<div class="row">
										<div class="col-md-4">
											<div className={styles.knowUs}>
												<ul>
													<li>
													<Link to="/aboutUs">About Us</Link>
													</li>
													<li>
													<Link to="/helpCenter">Help Center</Link>
													</li>
													<li>
													<Link to="/terms">Terms</Link>
													</li>
													<li>
													<Link to="/privacy">Privacy Policy</Link>
													</li>
													<li>
													<Link to="/cookies">Cookies Policy</Link>
													</li>
												</ul>
											</div>
										</div>
										<div class="col-md-4">
											<div className={styles.knowUs}>
												<ul>
													<li>
													<Link to="/faq">FAQ</Link>
													</li>
													<li>
														<span>Blog</span>
													</li>
													<li>
													<Link to="/referrenceLetter">Reference Letter</Link>
													</li>
													<li>
													<Link to="/gift">Gift</Link>
													</li>
													<li>
													<a href="https://www.linkedin.com/company/internynet">
													Careers
													</a>
													</li>
												</ul>
											</div>
										</div>
										<div class="col-md-4">
											<div className={styles.knowUs}>
												<ul>
													<li v-if={!getCookie("token")}>
														<span>Sitemap</span>
													</li>
													<li>
													<Link to="/affiliate">Affiliate</Link>
													</li>
													<li>
													<Link to="/investor">Investor</Link>
													</li>

													<li>
													<Link to="/howtocompany">INTERNY for Bussiness</Link>
													</li>
													<li>
													<Link to="/howtouniversity">INTERNY for University</Link>
													</li>
												</ul>
											</div>
										</div>
									</div>



								</div>
							</div>
							<div class="col-xl-2 col-lg-12 col-12">
								<div className={"footerSection__rightSide"}>
									<div className={"footerSection__languages"}>
										<div className={"selectWrapper"}>
											<img src={EarthGrid} />
											<select>
												<option>English</option>
											</select>
										</div>
									</div>
									<div className={"footerSection__stores"}>
										<a href={"/"} className={"footerSection__stores__storePlay"}>
											<img src={googlePlay} alt={"store"} />
										</a>
										<a href={"/"} className={"footerSection__stores__store"}>
											<img src={appStore} alt={"store"} />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={"footerSection__stroke"} />
					<div className={"footerSection__rights"}>
						
						2020 • INTERNY Inc. © All rights reserved.
						<div className={"footerSection__rights__followUs"}>
							<a href={"https://www.facebook.com/internynet/"} target={"blank"}>
								<img src={facebook} alt={facebook} />
							</a>
							<a href={"https://twitter.com/internynet/"} target={"blank"}>
								<img src={twitter} alt={twitter} />
							</a>
							<a href={"https://www.linkedin.com/company/internynet/"} target={"blank"}>
								<img src={linkedin} alt={linkedin} />
							</a>
							<a href={"https://www.instagram.com/internyinc/"} target={"blank"}>
								<img src={instagram} alt={instagram} />
							</a>
							<a href={"https://www.youtube.com/channel/UCG_eex16oz2W7hEKo1bAIzw/"} target={"blank"}>
								<img src={youtube} alt={youtube} />
							</a>
						</div>
					</div>
				</div>



			</div>
		);
	}
}

export default Footer;
