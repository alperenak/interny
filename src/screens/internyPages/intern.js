import React, { Component } from 'react';
import './style.scss';

// Components
import WhyUsePage from './whyUsePage';

// Assets
import companyBg from '../../assets/howInternBg.png';
import joinAndApply from '../../assets/joinAndApply.png';
import iccTMPortfolio from '../../assets/iccTMPortfolio.png';
import imsTMWorkTime from '../../assets/imsTMWorkTime.png';
import referrenceReccomendationLetter from '../../assets/referrenceReccomendationLetter.png';


const DESCRIPTION_DATA = [
  `Welcome to INTERNY, the world's first remote online internship platform. You will find everything you need and more during the internship process on the platform. It allows you to do your internship at any company anywhere in the world, wherever and whenever you want. All you have to do is apply for internships, get acceptance, and complete the assigned tasks thoroughly.`,
  `It is entirely FREE for university students and recent graduates to register, create a CV and search for internships anywhere in the world. You can use this unique platform more efficiently by purchasing the premium packages below that you think are suitable for you.`,
];

const STEP_DATA = [
  {
    title: 'Join & Apply',
    description:
      'You can log into your account by registering. You can attract the attention of companies looking for interns by editing your CV with your verified account. Now, you can start searching for the internship applications of companies. You have the opportunity to view company postings by filtering them as you wish. If you buy the INTERN package, you can apply to companies. You will start a new internship adventure at the company you have accepted.',
    image: joinAndApply,
  },
  {
    title: 'iCC™',
    description:
      "You will solve the core competency case studies with Interny Competence Center (iCC™), where the interns' competencies are analyzed. By purchasing the Competency package, you will have the opportunity to see your level of 15 different core competencies. These competencies are evaluated using artificial intelligence and delivered to you as entirely reliable results. In this way, you will prove your competence both to the companies you apply to and yourself.",
    image: iccTMPortfolio,
  },
  {
    title: 'iMS™',
    description:
      "INTERNY internship process is followed using Interny Management System (iMS™). You will be able to access the company's task assignments and share its completed tasks via iMS™. Besides,  you will always contact the company using the messaging service throughout the internship process. Also, at the end of your internship, you will evaluate each other with the company.",
    image: imsTMWorkTime,
  },
  {
    title: 'Reference Letter',
    description:
      'Your performance in your internship is evaluated using Workforce Analytics (WFA). Moreover, you will have the opportunity to see your internship efficiency with the WFA report created using artificial intelligence. If you achieve a success rate of 60% or more, you will be eligible for the reference letter to be signed by the company. Therefore, you will have a verifiable reference letter from INTERNY that you can use when applying to companies for the rest of your business life.',
    image: referrenceReccomendationLetter,
  },
];

const PACKAGES_DATA = [
  {
    id: 'packageOne',
    title: 'FREEMIUM',
    price: '$0',
    payment: '',
    highlights: [
      {
        heading: 'Sign up!',
        description:
          'You can start using the new generation internship system by registering free of charge on the platform.',
      },
      {
        heading: 'Create a CV',
        description:
          'You can create a CV that introduces yourself in detail to apply for internships.',
      },
      {
        heading: 'Search Internships',
        description:
          'You can search for an internship anywhere in the world in the most detailed way.',
      },
    ],
  },
  {
    id: 'packageTwo',
    title: 'INTERN',
    price: '$24.99',
    payment: 'per 4 Weeks Internship',
    highlights: [
      {
        heading: 'Apply for Internships',
        description:
          'Apply to thousands of companies around the world. If you are not accepted from any company within two months, your money will be refunded.',
      },
      {
        heading: 'iMS™',
        description:
          'Use Interny Management System (iMS™) to manage tasks assigned for the internship and contact the company. Task assignments will be given to you to be completed at a specific time. The company and you will evaluate each other at the end of each task. ',
      },
      {
        heading: 'WFA Report',
        description:
          'Workforce Analytics (WFA) Report is created due to all the data obtained according to company feedback and artificial intelligence during the internship process. This report evaluates in detail the success of the internship process. Your university can also follow the internship process with WFA.',
      },
      {
        heading: 'Reference Letter',
        description:
          'Overall internship success is obtained as a result of the WFA Report. Suppose your WFA overall score is above 60%. In that case, you can get a Reference Letter signed by the company that summarizes what you have done during the internship process.',
      },
      {
        heading: 'Additional Features:',
        description:
          '',
      },
      {
        heading: 'Language Support Service (+$19.99)',
        description:
          'Suppose you have any language problems for global internships. In that case, you can request Language Support Service for some languages ​​by paying an additional $19.99 for the INTERN package to overcome the language problem. You can take and deliver your tasks in the language you prefer with the Language Support Service.',
      },
      {
        heading: 'Emergency Internship Service (+$19.99)',
        description:
          'INTERNY offers an Emergency Internship Service for an additional $19.99 to the INTERN package so that you can start your internship in any country and sector within 30 days. This service aims to ensure that you only start the internship within 30 days, and the internship approval processes usually continue. The fact that this additional service is purchased does not mean that your internship will be approved exactly.',
      },
    ],
  },
  {
    id: 'packageThree',
    title: 'COMPETENCY',
    price: '$12.49',
    payment: 'per Competency or $49.99 for All Competencies',
    highlights: [
      {
        heading: 'iCC™',
        description:
          'Interny Competency Center (iCC™) includes a set of unique five different case studies just for you to measure the 15 core competencies that international organizations value the most now and for the future.',
      },
      {
        heading: 'Competency Analytics',
        description:
          'Case studies are meticulously evaluated to determine your core competencies using artificial intelligence.',
      },
      {
        heading: 'Competency Report',
        description:
          'Detailed competency report containing the data obtained from Competency Analytics, the meanings of competency results, and improvement suggestions.',
      },
    ],
  },
];

class InternPage extends Component {
	render() {
		const { location } = this.props;
		const isCameFromGift = location && location.state && location.state.from === "gift";
		const giftData = isCameFromGift ? location.state : undefined;
		return (
			<WhyUsePage
				headerBackground={companyBg}
				header="How to Use?"
				descriptionList={DESCRIPTION_DATA}
				title="How to Use the Platform as an Intern?"
				stepData={STEP_DATA}
				videoEmbedLink="https://www.youtube.com/embed/2Nw6nkw6JCA"
				packagesTitle="See the Intern Packages"
				packagesSubtitle="Click to see detail of packages"
				packagesData={PACKAGES_DATA}
				giftData={giftData}
				type={"intern"}
			/>

		);
	}
}

export default InternPage;
