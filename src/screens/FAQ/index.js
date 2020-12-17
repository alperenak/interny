import React, {Component, Fragment} from "react";

/*** Components ***/
import Accordion from "../../components/Accordion";
import Footer from "../../components/Footer";
/*** Store ***/
import store from "../../store";

/*** Styles ***/
import styles from "./faq.scss";
import Card from "../../components/Card";
import affiliateBg from "../../assets/affiliateBg.png";
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
    { question: "Who can use INTERNY?", answer: "INTERNY can be used by all university students and new graduates who want\n" +
          "to get experience in business." },
    { question: "How to use INTERNY?", answer: "First of all, you must be a member of INTERNY. After you become a member,\n" +
          "you can create your CV and apply for internships all over the world with the CV\n" +
          "you created. At this stage, you can get a competency report to prove the\n" +
          "competence determined by companies. If you have gotten acceptance for an\n" +
          "internship from any company, you can start your internship remotely and\n" +
          "online during the determined internship period. During the internship, you will\n" +
          "use the project management system (PMS) offered by INTERNY. You will carry\n" +
          "out your tasks follow-ups through PMS. If necessary, you will be able to use\n" +
          "the messaging service to reach the company. At the end of the internship, a\n" +
          "Workforce Analytics (WFA) report will be produced on your behalf according to\n" +
          "company feedback and INTERNY artificial intelligence analysis. As a result of\n" +
          "this report, you will be eligible to get a signed reference letter on your behalf\n" +
          "from the company you are doing your internship with." },

    { question: "Is it paid?", answer: "It is completely free to subscribe to INTERNY, create a CV and search for\n" +
          "internships. A payment of $19.99 is required to make internship applications,\n" +
          "to follow the internship process and to report. After the payment, you will be\n" +
          "able to apply to as many companies as you want. If the intern fails to get an\n" +
          "internship acceptance from any company within 1 month despite their\n" +
          "applications, the $19.99 paid by the intern will be refunded.\n\n" +
          "Some companies or universities cover this main payment. If the payment for\n" +
          "internship reporting has done, the $19.99 received from the intern will be\n" +
          "refunded to the intern upon commencement of the internship." },

    { question: "Is every internship approved?", answer: "This issue is one of the issues that INTERNY pays attention to the most. The\n" +
          "evaluation of the internship process is done in different ways and\n" +
          "meticulously. The internship is approved only if the internship process is\n" +
          "actually done and successful. Any other internship is not approved." },

    { question: "What is the WFA report?", answer: "With INTERNY artificial intelligence infrastructure, the intern's workforce\n" +
          "analysis is performed according to the feedbacks obtained from the company.\n" +
          "As a result, the WFA report showing the job status of the intern is presented.\n" +
          "This report allows you to evaluate the internship process in detail." },

    {question: "How can I get the reference letter?", answer: "An average success rate is obtained according to the WFA report. If this\n" +
          "success rate is over 60%, you will be able to obtain a reference letter signed by\n" +
          "the authorized person in the company. According to the WFA report, the higher\n" +
          "your success rate, the better the content of your reference letter." },

    { question: "Will I need a passport or any visa?", answer: "You do not need any passport or any visa as you can work from anywhere.\n" +
          "With INTERNY, all borders can no longer block you." },
    { question: "Do companies really exist?", answer: "INTERNY gets detailed information of all companies in its system and presents\n" +
          "it on its platform. All companies on the INTERNY platform are real. Each\n" +
          "company registered in the system is responsible for the accuracy of the\n" +
          "information it shares. If there is an error or fraud in the information obtained\n" +
          "about any company, please contact us." },
    { question: "Can I evaluate companies?", answer: "INTERNY conducts a survey to evaluate the company both after each task and\n" +
          "at the end of the internship. With this survey, the company is appropriately\n" +
          "evaluated and informed." },
    { question: "What is the task?", answer: "Everything that the company asks the intern to do as a job in the fields of\n" +
          "Research, Examination, Evaluation, Design, Application and Reporting is\n" +
          "expressed as a task. The company elaborates every task that needs to be done\n" +
          "during the internship process and sends it to the intern via PMS to complete\n" +
          "within a certain time frame. Task follow-ups are carried out for both the\n" +
          "company and the intern via PMS." },
    { question: "What time period is used?", answer: "INTERNY tracks internships according to GMT+0 time zone. Any assigned task\n" +
          "is forwarded to the intern at midnight at the end of the day of assignment." },
    { question: "What if I can't complete the tasks on time?", answer: "You can create a one-time extension request. If the company deems\n" +
          "appropriate, it extends your duty time as it wishes. However, if the company\n" +
          "does not deem your request appropriate, you will be evaluated as far as the\n" +
          "task completion report you have prepared." },
    { question: "What is a competency report?", answer: "The report, in which basic and functional competencies are measured, is called\n" +
          "the competence report. In basic competencies such as analytical thinking,\n" +
          "your basic competence tendencies are determined according to the answers\n" +
          "given in the simulation presented to the intern with case studies. In functional\n" +
          "competencies such as knowing the programming language, your functional\n" +
          "competence evaluations are made through online tests. Competency reports\n" +
          "also include advice on how to improve yourself." },
    { question: "Does the competency report have validity?", answer: "Each competency report is obtained by artificial intelligence, using case\n" +
          "studies or tests designed in accordance with your knowledge. Competency\n" +
          "reports are created in different global standards for each competency, thus\n" +
          "ensuring their validity and reliability. The norms and validity and reliability\n" +
          "studies in case studies in basic competencies are determined in accordance\n" +
          "with the internal dynamics of each country. In functional competencies, online\n" +
          "tests are created by experts and in accordance with scientific analysis\n" +
          "methods." },

    { question: "Can I re-create the competency report?", answer: "Yes. If you think you have developed yourself on the basis of competencies or\n" +
          "if you have benefited from INTERNY e-Learning trainings, you can re-create\n" +
          "your competency report. Your time to get a repeat report for each competency\n" +
          "is different, and you can create a competency report at least 2 weeks later." },

    { question: "Can I do my internship in the company?", answer: "INTERNY does not provide any service in this regard. If the company requests\n" +
          "it, the intern will be informed on this matter." },
    { question: "Will my internship be approved by my university?", answer: "INTERNY ensures that your internship process can be followed transparently\n" +
          "by your university. INTERNY does not take any responsibility in this regard, as\n" +
          "the internship approval process of each university or faculty proceeds\n" +
          "differently. Starting your internship in a company that will meet the\n" +
          "expectations of your university will advance this process more positively." },
    { question: "I am having a language problem. Can you help me?", answer: "INTERNY offers language support for $14.99 for some languages to overcome\n" +
          "the language problem. In this way, it is possible to get and deliver your tasks\n" +
          "in the language you prefer." },
    { question: "I need to do my internship urgently. Can you help me?", answer: "INTERNY offers an emergency internship service for $24.99 so that you can\n" +
          "start your internship in any country and field within 1 month. The purpose of\n" +
          "this service is to ensure that you only start the internship at the time you\n" +
          "specify, and the internship approval processes continue normally. The fact\n" +
          "that this service is purchased does not mean that your internship will be\n" +
          "approved exactly." },

  ],
  employer: [
    { question: "What is Interny?", answer: "INTERNY is the world's first global remote online internship platform. It meets your internship needs, from looking for an internship to following the intern in detail, and allows you to manage the internship process in every sense. It enables you to do a job with any internship you want anywhere in the world with task assignments. All you have to do is post a detailed advertisement, choose any of the interns who apply to you and assign the tasks on time with their explanations." },

    { question: "Why should I use it?", answer: "You can use the INTERNY platform to ease your workload, get rid of operational expenses, and expand your pool of interns globally. Besides, you can quickly increase business performance, bring a global vision, and choose the right candidate during the recruitment process by giving the same job to more than one intern." },
    { question: "Which companies can it use?", answer: "It can be easily used by every company, such as startups, SMEs, and corporate companies. It is possible to have internships in many departments of factories using the INTERNY platform." },
    { question: "How to use?", answer: "First of all, you must be a member. After you become a member, you can create your company profile and reach interns worldwide with detailed internship postings. At this stage, you can determine a core competency suitable for you and choose the right candidate. If you have accepted an internship application, you can start the internship remotely and online. During the internship, you will use the Interny Management System (iMS™). You will carry out your task assignments and internship management via iMS™. If necessary, you will be able to use the messaging service to reach the intern. According to your feedback and artificial intelligence analysis, a workforce analytics (WFA) report will be produced for the intern at the end of the internship. As a result of this report, you undertake to provide your intern with a reference letter signed by your company official, if you see fit." },
    { question: "How many interns can I employ?", answer: "You can post as many internship postings as you want. However, you can employ a maximum of 10 interns at the same time for any internship posting." },

    { question: "What time is used?", answer: "Internship follow-ups are made according to the time used by your company. Any assigned task is forwarded to the intern at 23.59 at the end of the day he is appointed." },

    { question: "Is it paid?", answer: "Being a member, creating a company profile, posting internships, and managing your interns are entirely free. The intern pays a certain fee to make internship applications, follow the internship process, and create reports. If you want, you can afford this fee as a company. You can also check out the premium packages to use the other unique features of the INTERNY platform." },

    { question: "Do we need to approve every internship?", answer: "This issue is given great importance. The evaluation of the internship process is done in different ways and meticulously. If the internship process is done and successful, the internship is approved. Any internships other than this are not approved. We even recommend that you be selective during your internship." },

    {question: "What is the Workforce Analytics (WFA) report?", answer: "A WFA report showing the intern's business status is created according to the feedbacks using artificial intelligence. This report allows the internship process to be analyzed in detail." },

    { question: "When do I have to sign the reference letter?", answer: "A success rate is achieved according to the Workforce Analytics (WFA) report. If this success rate is over 60%, a signed reference letter must be approved by the company's authorized person. According to the WFA report, the higher the success rate achieved, the better its reference letter. The reference letter is created automatically according to the WFA report. You can make changes to this report if you wish or choose to sign just this letter." },
    { question: "Is it online only?", answer: "INTERNY platform provides services only online. If the company requests a different working style, the intern will be informed separately about this." },
    { question: "Do you need a passport or visa?", answer: "There is no need for a passport or visa, as it is possible to work from anywhere. If you want, you can request more documents while posting the advertisement." },
    { question: "Do you have a solution to the language problem?", answer: "Language Support Service is provided for some languages to overcome the language problem. In this way, it is ensured that the tasks are assigned to the internship, translated on your behalf, and delivered to you." },

    { question: "Can it be used in local internships?", answer: "There is no distinction between local or global internships. If you want, you can publish your advertisements only for local admissions. You can also filter the interns who will choose you according to the countries you wish to." },

    { question: "What is the Interny Management System (iMS™)?", answer: "iMS™ manages internship tasks between the intern and the company. In the fields of Research, Examination, Evaluation, Design, Application, and Reporting, everything you want from the intern as a job can be called a task. As a company, you formulate every task that needs to be done in the internship process in detail and forward it to the internship via iMS™ for the intern to complete within a specific time frame. Task follow-ups are carried out on iMS™ for both the company and the intern." },
    { question: "How can I evaluate the intern?", answer: "During the internship, a survey is conducted to evaluate the intern after each task and at the end of the internship. With this survey, the intern is appropriately assessed and informed." },
    { question: "Is it safe?", answer: "INTERNY platform is protected by 256-bit encryption and is secure at international standards. Besides, before the internship starts, the job contents can be protected with a confidentiality agreement." },
    { question: "What should I do if the intern is not fulfilling the duties?", answer: "If you think that the duties are not done the way you want, you must first warn the intern. If the tasks are still not fulfilled as you wish after your warning, you can end the internship by sharing the problem." },
    { question: "What are the Premium Packages?", answer: "Companies have been offered three different premium packages: E-LEARNING, BUSINESS, and HIRING. You can visit here for details." },

  ],
  university: [
    { question: "What is INTERNY?", answer: "INTERNY is the world's first global remote online internship platform. It allows the internship process to be managed from the beginning to the end. It enables internships to be done in a company anywhere in the world, at any time and place. What needs to be done is to apply to the companies' advertisements, get acceptance from the company, and complete the intern's duties assigned by the company." },
    { question: "Which universities can be used?", answer: "It can be used easily in faculties and departments deemed appropriate by universities in every field. There is no section restriction." },
    { question: "Why should it be used?", answer: "You can use the INTERNY platform to give your students business experience and global vision. In this way, you can enable your students to work with companies worldwide and make it easier for them to create profound awareness in the recruitment process. Besides, you can easily choose the INTERNY platform to follow the internship processes from a single point in a reliable way." },
    { question: "How to use?", answer: "First of all, you must create an e-mail account with the interny username (such as interny@itu.edu) in the domain of your university website. You can then register using this e-mail address and log into your university tracking system. You can now follow all your students' internship status in your university on the INTERNY platform in detail." },
    { question: "Is it paid?", answer: "Using the INTERNY platform for university is entirely free." },
    { question: "Is it online only?", answer: "INTERNY platform provides services only online. If the company requests, the intern is also informed about this issue." },
    { question: "Do companies exist?", answer: "The information of all companies is gotten and presented in detail. Therefore, all companies on the INTERNY platform are real. Each company registered on the platform is responsible for the accuracy of the information it shares. If there is an error or fraud in the information obtained about any company, please contact us." },
    { question: "Can we follow our students enrolled in our university?", answer: "You can log into your university tracking system from the university login screen. After entering, you can follow all your students' internship status and achievements enrolled in your university through the INTERNY platform in detail." },
    { question: "Is every internship approved?", answer: "This issue is critical. The evaluation of the internship process is done in different ways and meticulously. Only if the internship is done and successful, the internship is approved. Any internships other than this are not approved." },
    { question: "Is a passport/visa needed?", answer: "There is no need for a passport or visa, as it is possible to work from anywhere. Companies may sometimes request additional documents." },
    { question: "What is the Interny Management System (iMS™)?", answer: "iMS™ manages internship tasks between the intern and the company. In the fields of Research, Examination, Evaluation, Design, Application, and Reporting, everything the company asks the intern to do as a job is expressed as a duty. The company elaborates every task that needs to be done during the internship process and transmits it to the intern via iMS™ to complete within a specific time. Task follow-ups are carried out on iMS™ for both the company and the intern." },
    { question: "What is the Workforce Analytics (WFA) report?", answer: "A WFA report containing the intern's job performance status is created according to the company's feedback using artificial intelligence. This report allows you to evaluate the internship process in detail." },
    { question: "Can the number of university accounts be increased?", answer: "One free account is given to each university. You can contact us for more account needs." },
    { question: "Is there an upper limit for the number of students?", answer: "There is no student number restriction." },
    { question: "What are the Premium Packages?", answer: "Universities 3 different premium packages have been offered: UNIVERSITY Essential, UNIVERSITY Standard, and UNIVERSITY Plus. You can visit here for details." },

  ],
};

class FAQ extends Component {
  state = { question_type: "intern", data: {} };

	componentDidMount = async () => {
		let response = await store.faqData();
		if (response) {
			this.setState({ data: response.data });
		}
	};

	renderRightBar = () => {
		return (
			<div className="faq__questions">
				<Card>
					{dummy_data[this.state.question_type].map((data) => {
						return <Accordion title={data.question} content={data.answer} />;
					})}
				</Card>
			</div>
		);
	};

	renderLeftBar = () => {
		let {question_type} = this.state;
		return (
			<Card type={'list'} externalData={[
				{
					key: 'FAQ for Interns',
					value: 'FAQ for Interns',
					selected: question_type === 'intern',
					onChange: () => this.setState({ question_type: "intern" })
				},
				{
					key: 'FAQ for Employers',
					value: 'FAQ for Employers',
					selected: question_type === 'employer',
					onChange: () => this.setState({ question_type: "employer" })
				},
				{
					key: 'FAQ for Universities',
					value: 'FAQ for Universities',
					selected: question_type === 'university',
					onChange: () => this.setState({ question_type: "university" })
				}
			]}/>
		);
	};

	render() {
		return (
			<div style={{"background":"#f6f8fa"}}>
			<div class="affiliate__header">
				<div class="container" style={{"background-image":"url("+affiliateBg+")"}}>
					<p>FAQ</p>
				</div>
			</div>
				<div className={"faq"}>
					<div class="container">
						<div class="row">
							<div class="col-md-3">
								{this.renderLeftBar()}
							</div>
							<div class="col-md-9">
								<div id="accordion">
									{dummy_data[this.state.question_type].map((data,index) => {
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
				<Footer />
			</div>
		);
	}
}

export default FAQ;
