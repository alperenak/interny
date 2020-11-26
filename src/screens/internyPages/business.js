import React, { Component } from "react";
import ReactDOM, { Link } from "react-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FooterAlternative from "../../components/FooterAlternative";
import styles from "./style.scss";
import handshake from "../../assets/help-center.jpg";

class BusinessPage extends Component {

    render() {
		let dummy_data = {
			intern: [
				{ question: "What is an internship?", answer: "An internship refers to the period that a person spends working in different\n" +
				"departments of the company, in order to increase the professional knowledge\n" +
				"and improve the skills further. The main purpose of internship process is to\n" +
				"get experience in the business and to learn the practical equivalents of\n" +
				"theoretical knowledge." },

				{ question: "What is INTERNY?", answer: "INTERNY is the world's first global remote online internship platform. It allows\n" +
				"you to manage your internship process from searching for internships to\n" +
				"completing internship process. It allows you to do your internship in a\n" +
				"company anywhere in the world, wherever and whenever you want. All you\n" +
				"have to do is to apply for internships, get acceptance and complete the\n" +
				"assigned tasks perfectly." },
				{ question: "Why should I use INTERNY?", answer: "You can easily choose INTERNY to get experience, show yourself, develop\n" +
				"yourself with world-class companies beyond the possibilities of your region,\n" +
				"get a global vision, remove borders and create serious awareness in the\n" +
				"recruitment process." },
				{ question: "Who can use INTERNY?", answer: "INTERNY can be used by all university students and new graduates who want\n" + "to get experience in business." },
			],
		};
        return (
			<>
            <div class="internPage">
				<div class="affiliate__header" style={{"background-image":"url("+handshake+")"}}>
					<div class="affiliate__mask"></div>
					<div class="container">
						<div class="row" style={{"justify-content":"center"}}>
							<div class="col-md-7">
								<div class="affiliate__content">
									<p>INTERNY FOR BUSINESS</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<FooterAlternative />
			</>
        );
    }
}

export default BusinessPage;
