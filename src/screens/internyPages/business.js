import React, { Component } from 'react';
import './style.scss';

// Components
import WhyUsePage from './whyUsePage';

// Assets
import worldwide from '../../assets/worldwide.png';
import review_applicant from '../../assets/review-applicant.png';
import start_internship from '../../assets/start-internship.png';
import manage_program from '../../assets/manage-program.png';
import companyBg from '../../assets/companyBg.png';

const DESCRIPTION_DATA = [
  `Welcome to INTERNY, the world's first remote online internship platform. 
    You will find everything you need and more during the internship process on the platform. 
    It fulfills all your internship needs, and allows you to manage the internship process in detail. 
	It allows you to do a job with any intern you want anywhere in the world with task assignments. 
	All you have to do is to publish a detailed internship, choose any of the interns who apply to your 
	company and follow up the assignments on time with their explanations.`,
  `It is entirely FREE for companies to register to INTERNY,
	publish internships, and manage the internship process in
	detail. You can use this unique platform more efficiently by
	purchasing premium packages that you think are suitable for
	your company.`,
];

const STEP_DATA = [
  {
    title: 'Join & Publish',
    description:
      'You can create a company account to work with any interns anywhere in the world. After logging in with your verified account, you can post free advertisements for interns to apply to your company. You can start the internship process by determining the interns you want. You can also purchase one of the COMPANY or HIRING packages to see the Interny Internship Pool.',
    image: worldwide,
  },
  {
    title: 'iMS™',
    description:
      "You can follow your intern's internship process with whom you started to work on the Interny Management System (iMS™). Using iMS™, you can assign a task to your intern. When the assigned task for your intern is completed, it will be communicated to you via iMS™. Also, you will always be able to communicate with your intern using the messaging service. At the end of the internship period, you will evaluate each other mutually and complete the internship.",
    image: review_applicant,
  },
  {
    title: 'E-Learning',
    description:
      "You can support the improvement of your interns with E-Learning, a unique service offered to companies. When you purchase the E-Learning package, you will have the opportunity to share your company content or Interny E-Learning contents with your interns. You will follow all your interns' developments in this process with E-Learning Analytics created using artificial intelligence.",
    image: start_internship,
  },
  {
    title: 'Confirm Reference Letter',
    description:
      'The internship performance of the intern is evaluated using Workforce Analytics (WFA). At the end of the internship, a WFA report is prepared using artificial intelligence. Interns who are determined to have 60% or more success in the WFA report will be entitled to get a reference letter. The reference letter signed by you will be presented to your intern, who is entitled to the reference letter at the end of the internship.',
    image: manage_program,
  },
];

const PACKAGES_DATA = [
  {
    id: 'packageOne',
    title: 'E-LEARNING',
    price: '$29.99',
    payment: 'per 4 Weeks per 10 Interns',
    highlights: [
      {
        heading: 'Company Content',
        description:
          'You can share your e-learning content owned by your company with your interns by using INTERNY E-Learning infrastructure during the internship period.',
      },
      {
        heading: 'INTERNY Content',
        description:
          'You can support the development of your interns by using INTERNY E-Learning content.',
      },
      {
        heading: 'E-Learning Analytics',
        description:
          'INTERNY E-Learning contents are analyzed using artificial intelligence. With E-Learning Analytics, you can follow the progress of your interns and evaluate your interns in detail.',
      },
    ],
  },
  {
    id: 'packageTwo',
    title: 'BUSINESS',
    price: '$49.99',
    payment: 'per 15 Interns',
    highlights: [
      {
        heading: 'Intern Pool',
        description:
          'From INTERNY global intern pool, you can view detailed candidates who do not apply to you but think they are suitable for you.',
      },
      {
        heading: 'Competency Analytics Results',
        description:
          'In a detailed search, you can find the most potential candidates wherever they are in the world. Also, you observe the results of 15 core competencies that international organizations value the most now and for the future.',
      },
      {
        heading: 'InMessage',
        description:
          'You can contact the intern candidates that you think are suitable for your company through INTERNY messaging service.',
      },
    ],
  },
  {
    id: 'packageThree',
    title: 'HIRING',
    price: '$49.99',
    payment: 'per 5 Interns',
    highlights: [
      {
        heading: 'Intern Pool',
        description:
          'You can view detailed employee candidates from the Global Intern Pool who have not applied for you but that he/she can be suitable for you.',
      },
      {
        heading: 'Workforce Analytics Results',
        description:
          'By viewing the skills of doing business during the internship period in the detailed search, you can find the employee candidates with the highest potential anywhere in the world.',
      },
      {
        heading: 'Competency Analytics Results',
        description:
          'You can find the most potential employee candidates wherever they are in the world in a detailed search. Besides, you observe the results of the 15 core competencies that international organizations value most now and for the future.',
      },
      {
        heading: 'InMessage',
        description:
          'You can contact employee candidates whom you think are suitable for your company through INTERNY messaging service.',
      },
    ],
  },
];

class BusinessPage extends Component {
  render() {
    return (
      <WhyUsePage
        headerBackground={companyBg}
        header="INTERNY FOR BUSINESS"
        descriptionList={DESCRIPTION_DATA}
        title="How to Use the Platform as a Company?"
        stepData={STEP_DATA}
        videoEmbedLink="https://www.youtube.com/embed/bNpx7gpSqbY"
        packagesData={PACKAGES_DATA}
      />
    );
  }
}

export default BusinessPage;
