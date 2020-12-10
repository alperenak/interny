import React, { Component } from "react";
/*** Components ***/
import styles from "./style.scss";
import FooterAlternative from "../../components/FooterAlternative";
import Button from "../../components/Button";
import Input from "../../components/Input";
import handshake from "../../assets/handshake.jpg";
import discover from "../../icons/discover.svg";
import affiliateBg from "../../assets/affiliateBg.png";
class Affiliate extends Component {
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
		<div style={{"background":"#f6f8fa"}}>
			<div class="affiliate__header">
				<div class="container" style={{"background-image":"url("+affiliateBg+")"}}>
					<p>AFFILIATE</p>
				</div>
			</div>
			<div class="affiliate__triple">
				<div class="container">
					<div class="row">
						<div class="col-md-4">
							<div class="affiliate__tripleBox">
								<img src={discover} />
								<span class="affiliate__tripleBox__title">
									Lorem ipsum dolor sit amet
								</span>
								<span class="affiliate__tripleBox__description">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</span>
							</div>
						</div>
						<div class="col-md-4">
							<div class="affiliate__tripleBox">
								<img src={discover} />
								<span class="affiliate__tripleBox__title">
									Lorem ipsum dolor sit amet
								</span>
								<span class="affiliate__tripleBox__description">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</span>
							</div>
						</div>
						<div class="col-md-4">
							<div class="affiliate__tripleBox">
								<img src={discover} />
								<span class="affiliate__tripleBox__title">
									Lorem ipsum dolor sit amet
								</span>
								<span class="affiliate__tripleBox__description">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="affiliate__timeline">
				<div class="container">
					<div class="row">
						<div class="col-md-12" style={{"text-align":"center"}}>
							<span class="affiliate__timeline__title">NASIL PARA KAZANILIR?</span>
						</div>
						<div class="col-md-12">
							<ul class="timeline">
								<li>
									<div class="timeline-badge primary"><i class="glyphicon glyphicon-check"></i></div>
									<div class="timeline-panel">
										<div class="timeline-heading">
											<h4 class="timeline-title">Mussum ipsum cacilds</h4>
											<p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> 11 hours ago via Twitter</small></p>
										</div>
										<div class="timeline-body">
											<p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.
											Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
										</div>
									</div>
								</li>
								<li class="timeline-inverted">
									<div class="timeline-badge primary"><i class="glyphicon glyphicon-credit-card"></i></div>
									<div class="timeline-panel">
										<div class="timeline-heading">
											<h4 class="timeline-title">Mussum ipsum cacilds</h4>
										</div>
										<div class="timeline-body">
											<p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.
											Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
											<p>Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere
											pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor sit amet, consectetur adipiscing
											elit. Etiam ac mauris lectus, non scelerisque augue. Aenean justo massa.</p>
										</div>
									</div>
								</li>
								<li>
									<div class="timeline-badge primary"><i class="glyphicon glyphicon-credit-card"></i></div>
										<div class="timeline-panel">
											<div class="timeline-heading">
												<h4 class="timeline-title">Mussum ipsum cacilds</h4>
											</div>
											<div class="timeline-body">
												<p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.
												Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
											</div>
									</div>
								</li>
								<li class="timeline-inverted">
									<div class="timeline-panel">
										<div class="timeline-heading">
											<h4 class="timeline-title">Mussum ipsum cacilds</h4>
										</div>
										<div class="timeline-body">
											<p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.
											Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className={"faq"}>
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<div id="accordion">
								{dummy_data["intern"].map((data,index) => {
									return(
										<div class="card" style={{"width":"100%"}}>
											<div class="card-header" id={"headingOne" + index}>
												<button class="btn" data-toggle="collapse" data-target={"#collapseOne" + index} aria-expanded="true" aria-controls={"collapseOne" + index}>
													{data.question}
												</button>
											</div>

											<div id={"collapseOne" + index} class="collapse" aria-labelledby={"headingOne" + index} data-parent="#accordion">
												<div class="card-body">
													{data.answer}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="affiliate__contact">
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<Input
								type={"text"}
								placeholder={"Name"}
								size={"full"}

								onChange={(value) => {
								this.setState({ city: value });
								}}
								label={"Name"}
							/>
						</div>
						<div class="col-md-6">
							<Input
								type={"text"}
								placeholder={"Surname"}
								size={"full"}

								onChange={(value) => {
								this.setState({ city: value });
								}}
								label={"Surname"}
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<Input
								type={"text"}
								placeholder={"E-mail"}
								size={"full"}

								onChange={(value) => {
								this.setState({ city: value });
								}}
								label={"E-mail"}
							/>
						</div>
						<div class="col-md-6">
							<Input
								type={"text"}
								placeholder={"Phone"}
								size={"full"}

								onChange={(value) => {
								this.setState({ city: value });
								}}
								label={"Phone"}
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<Input
								type={"textarea"}
								placeholder={"Message"}
								size={"full"}

								onChange={(value) => {
								this.setState({ city: value });
								}}
								label={"Message"}
							/>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<Button
								type={"primary"}
								text={"Send"}
								sizeName={"default"}
							/>

						</div>
					</div>
				</div>
			</div>
			<FooterAlternative />
		</div>
    );
  }
}

export default Affiliate;
