import React, { Component } from 'react';
import './style.scss';

// Components
import Footer from '../../components/Footer';
import HighlightBox from '../../components/HighlightBox';
import ContactForm from '../../components/ContactForm';

// Assets
import investorBg from '../../assets/investorBg.png';
import wfaReferenceLetter from '../../icons/wfa-reference-letter.png';

const HIGHLIGHT_BOXES = [
	{
		title: 'SaaS',
		icon: wfaReferenceLetter,
	},
	{
		title: 'The First Platform',
		icon: wfaReferenceLetter,
	},
	{
		title: 'Worldwide',
		icon: wfaReferenceLetter,
	},
	{
		title: 'Generation-Z',
		icon: wfaReferenceLetter,
	},
	{
		title: 'East-West Bridge',
		icon: wfaReferenceLetter,
	},
	{
		title: 'Artificial Intelligence',
		icon: wfaReferenceLetter,
	},
];

class InvestorPage extends Component {
	renderBoxes = () => {
		return HIGHLIGHT_BOXES.map((element, index) => {
			return (
				<div class="col-md-4">
					<HighlightBox icon={element.icon} title={element.title} />
				</div>
			);
		});
	};

	handleContactFormData = (formData) => {
		console.log('Contact form data: ', formData);
	};

	render() {
		return (
			<>
				<div class="internyPage">
					<div class="affiliate__header">
						<div
							class="container"
							style={{ 'background-image': 'url(' + investorBg + ')' }}
						>
							<p>INVESTOR</p>
						</div>
					</div>
					<div class="internyPage__twoBox">
						<div class="container">
							<div class="row">
								<div class="col-md-12">
									<div class="internyPage__box">
										<span>Company Profile</span>
										<p>
											INTERNY Inc. is the world's first remote online internship
											platform company, headquartered in Silicon Valley,
											California. It also has offices in Rotterdam, Istanbul,
											London, and Dubai. INTERNY Inc., which provides a global
											remote online internship opportunity in the globalized
											world, offers its investors the chance to high profit.
                    					</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="internyPage__twoBox">
						<div class="container">
							<div class="row">
								<div class="col-md-6">
									<div class="internyPage__box">
										<span>Mission Statement</span>
										<p>
											INTERNY aims to bring together interns and companies
											around the world and offers a remote online internship
											adventure. In this way, it brings together companies in
											developed countries and interns in developing countries,
											eliminates the borders between countries, and creates
											equal opportunities. Also, it offers a brand new
											internship experience for both companies, interns, and
											universities with its platforms that appeal to the more
											digitized Z generation.
                    					</p>
									</div>
								</div>
								<div class="col-md-6">
									<div class="internyPage__box">
										<span>Why Invest</span>
										<p>
											INTERNY Inc. offers the opportunity to find each other for
											all interns and companies and allows internships to be
											managed through the platform from beginning to the end of
											the internship. It is the first company in the world to
											have a remote online internship platform. INTERNY Inc.
											carries out its operations alone in a vast market.
											Moreover, it is a company that is open to growth and
											offers its investors the opportunity to profit with its
											team of expert and fully open mind people.
                    					</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="affiliate__triple">
						<div class="container">
							<div class="row">
								<div
									class="col-md-12"
									style={{ 'text-align': 'center', 'margin-bottom': '30px' }}
								>
									<span class="affiliate__timeline__title">Why Interny?</span>
								</div>
							</div>
							<div class="row">{this.renderBoxes()}</div>
						</div>
					</div>
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div
									class="col-md-12"
									style={{ 'text-align': 'center', 'margin-bottom': '30px' }}
								>
									<span class="affiliate__timeline__title">You can contact us with any questions.</span>
								</div>
								<ContactForm onSendClick={this.handleContactFormData} />
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default InvestorPage;
