import React, {Component, Fragment} from "react";

/*** Components ***/
import Accordion from "../../components/Accordion";

/*** Store ***/
import store from "../../store";

/*** Styles ***/
import styles from "./faq.scss";
import Card from "../../components/Card";

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
  university: [
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
      <div className={styles.questions}>
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
      <div className={styles.faq_container}>
        {this.renderLeftBar()}
        {this.renderRightBar()}
      </div>
    );
  }
}

export default FAQ;
