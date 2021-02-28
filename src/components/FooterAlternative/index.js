import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withNamespaces } from 'react-i18next';

/*** Styles ***/
import styles from "./footerAlternative.scss";

/*** Utils ***/
import { getCookie } from "../../utils/cookie";

/*** Icons ***/
import internyLogo from "../../assets/interny-logo-white.png";
import facebook from "../../icons/facebook.svg";
import twitter from "../../icons/twitter.svg";
import linkedin from "../../icons/linkedin.svg";
import appStore from "../../icons/app-store-badge.svg";
import googlePlay from "../../icons/google-play-badge.svg";
import EarthGrid from "../../icons/earth-grid-symbol.svg";

class FooterAlternative extends Component {
	render() {
		const {t} = this.props;
		return (
			<div className={"footerSection2"}>
				<div class="container">
					<div class="row">
						<div class="col-md-4">
							<div className={"footerSection2__rights"}>
								2020 • INTERNY Inc. © {t('footer_all_rights_reserved')}
							</div>
						</div>
						<div class="col-md-8">


							<div className={"footerSection2__options"}>
								<ul className={"footerSection2__options__links"}>
									<li>
										<Link to="/aboutUs">{t('footer_about_us')}</Link>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<a href="https://www.linkedin.com/company/internynet">
											{t('footer_careers')}
										</a>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<Link to="/helpCenter">{t('footer_help_center')}</Link>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<Link to="/search/null/null">{t('footer_internships')}</Link>
									</li>
									<li>
									<span className={"dot"}></span>
									</li>
									<li>
										<Link to="/faq">{t('footer_faq')}</Link>
									</li>
								</ul>
							</div>


						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withNamespaces()(FooterAlternative);
