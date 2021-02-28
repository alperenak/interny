import React, { Component } from "react";
import "./style.scss";

// Components
import WhyUsePage from "./whyUsePage";

// Assets
import companyBg from "../../assets/howInternBg.png";
import joinAndApply from "../../assets/joinAndApply.png";
import iccTMPortfolio from "../../assets/iccTMPortfolio.png";
import imsTMWorkTime from "../../assets/imsTMWorkTime.png";
import referrenceReccomendationLetter from "../../assets/referrenceReccomendationLetter.png";
import { withNamespaces } from "react-i18next";

const DESCRIPTION_DATA = [
  `Welcome to INTERNY, the world's first remote online internship platform. You will find everything you need and more during the internship process on the platform. It allows you to do your internship at any company anywhere in the world, wherever and whenever you want. All you have to do is apply for internships, get acceptance, and complete the assigned tasks thoroughly.`,
  `It is entirely FREE for university students and recent graduates to register, create a CV and search for internships anywhere in the world. You can use this unique platform more efficiently by purchasing the premium packages below that you think are suitable for you.`,
];

const STEP_DATA = [
  {
    title: "Join & Apply",
    description:
      "You can log into your account by registering. You can attract the attention of companies looking for interns by editing your CV with your verified account. Now, you can start searching for the internship applications of companies. You have the opportunity to view company postings by filtering them as you wish. If you buy the INTERN package, you can apply to companies. You will start a new internship adventure at the company you have accepted.",
    image: joinAndApply,
  },
  {
    title: "iCC™",
    description:
      "You will solve the core competency case studies with Interny Competence Center (iCC™), where the interns' competencies are analyzed. By purchasing the Competency package, you will have the opportunity to see your level of 15 different core competencies. These competencies are evaluated using artificial intelligence and delivered to you as entirely reliable results. In this way, you will prove your competence both to the companies you apply to and yourself.",
    image: iccTMPortfolio,
  },
  {
    title: "iMS™",
    description:
      "INTERNY internship process is followed using Interny Management System (iMS™). You will be able to access the company's task assignments and share its completed tasks via iMS™. Besides,  you will always contact the company using the messaging service throughout the internship process. Also, at the end of your internship, you will evaluate each other with the company.",
    image: imsTMWorkTime,
  },
  {
    title: "Reference Letter",
    description:
      "Your performance in your internship is evaluated using Workforce Analytics (WFA). Moreover, you will have the opportunity to see your internship efficiency with the WFA report created using artificial intelligence. If you achieve a success rate of 60% or more, you will be eligible for the reference letter to be signed by the company. Therefore, you will have a verifiable reference letter from INTERNY that you can use when applying to companies for the rest of your business life.",
    image: referrenceReccomendationLetter,
  },
];

const PACKAGES_DATA = [
  {
    id: "freemium",
    title: "FREEMIUM",
    price: "$0",
    payment: "",
    highlights: [
      {
        heading: "Sign up!",
        description:
          "You can start using the new generation internship system by registering free of charge on the platform.",
      },
      {
        heading: "Create a CV",
        description:
          "You can create a CV that introduces yourself in detail to apply for internships.",
      },
      {
        heading: "Search Internships",
        description:
          "You can search for an internship anywhere in the world in the most detailed way.",
      },
    ],
  },
  {
    id: "intern",
    title: "INTERN",
    price: "$34.99",
    payment: "per 4 Weeks Internship",
    highlights: [
      {
        heading: "Apply for Internships",
        description:
          "Apply to thousands of companies around the world. If you are not accepted from any company within two months, your money will be refunded.",
      },
      {
        heading: "iMS™",
        description:
          "Use Interny Management System (iMS™) to manage tasks assigned for the internship and contact the company. Task assignments will be given to you to be completed at a specific time. The company and you will evaluate each other at the end of each task. ",
      },
      {
        heading: "WFA Report",
        description:
          "Workforce Analytics (WFA) Report is created due to all the data obtained according to company feedback and artificial intelligence during the internship process. This report evaluates in detail the success of the internship process. Your university can also follow the internship process with WFA.",
      },
      {
        heading: "Reference Letter",
        description:
          "Overall internship success is obtained as a result of the WFA Report. Suppose your WFA overall score is above 60%. In that case, you can get a Reference Letter signed by the company that summarizes what you have done during the internship process.",
      },
      {
        heading: "Additional Features:",
        description: "",
      },
      {
        heading: "Language Support Service (+$34.99)",
        description:
          "Suppose you have any language problems for global internships. In that case, you can request Language Support Service for some languages ​​by paying an additional $19.99 for the INTERN package to overcome the language problem. You can take and deliver your tasks in the language you prefer with the Language Support Service.",
      },
      {
        heading: "Emergency Internship Service (+$34.99)",
        description:
          "INTERNY offers an Emergency Internship Service for an additional $19.99 to the INTERN package so that you can start your internship in any country and sector within 30 days. This service aims to ensure that you only start the internship within 30 days, and the internship approval processes usually continue. The fact that this additional service is purchased does not mean that your internship will be approved exactly.",
      },
    ],
  },
  {
    id: "competency",
    title: "COMPETENCY",
    price: "$12.49",
    payment: "per Competency or $49.99 for All Competencies",
    highlights: [
      {
        heading: "iCC™",
        description:
          "Interny Competency Center (iCC™) includes a set of unique five different case studies just for you to measure the 15 core competencies that international organizations value the most now and for the future.",
      },
      {
        heading: "Competency Analytics",
        description:
          "Case studies are meticulously evaluated to determine your core competencies using artificial intelligence.",
      },
      {
        heading: "Competency Report",
        description:
          "Detailed competency report containing the data obtained from Competency Analytics, the meanings of competency results, and improvement suggestions.",
      },
    ],
  },
];

class InternPage extends Component {
  renderData(type) {
    let { t } = this.props;
    if (type === "packages") {
      return [
        {
          id: "freemium",
          title: t("howtouse_packages_intern_freemium_name"),
          price: "$0",
          payment: "",
          highlights: [
            {
              heading: t("howtouse_packages_intern_freemium_detail1"),
              description:
                "You can start using the new generation internship system by registering free of charge on the platform.",
            },
            {
              heading: t("howtouse_packages_intern_freemium_detail2"),
              description:
                "You can create a CV that introduces yourself in detail to apply for internships.",
            },
            {
              heading: t("howtouse_packages_intern_freemium_detail3"),
              description:
                "You can search for an internship anywhere in the world in the most detailed way.",
            },
          ],
        },
        {
          id: "intern",
          title: t("howtouse_packages_intern_intern_name"),
          price: "$34.99",
          payment: t("howtouse_packages_intern_intern_payment"),
          highlights: [
            {
              heading: t("howtouse_packages_intern_intern_detail1"),
              description:
                "Apply to thousands of companies around the world. If you are not accepted from any company within two months, your money will be refunded.",
            },
            {
              heading: t("howtouse_packages_intern_intern_detail2"),
              description:
                "Use Interny Management System (iMS™) to manage tasks assigned for the internship and contact the company. Task assignments will be given to you to be completed at a specific time. The company and you will evaluate each other at the end of each task. ",
            },
            {
              heading: t("howtouse_packages_intern_intern_detail3"),
              description:
                "Workforce Analytics (WFA) Report is created due to all the data obtained according to company feedback and artificial intelligence during the internship process. This report evaluates in detail the success of the internship process. Your university can also follow the internship process with WFA.",
            },
            {
              heading: t("howtouse_packages_intern_intern_detail4"),
              description:
                "Overall internship success is obtained as a result of the WFA Report. Suppose your WFA overall score is above 60%. In that case, you can get a Reference Letter signed by the company that summarizes what you have done during the internship process.",
            },
            {
              heading: t("howtouse_packages_intern_intern_detail5"),
              description: "",
            },
            {
              heading: t("howtouse_packages_intern_intern_detail6"),
              description:
                "Suppose you have any language problems for global internships. In that case, you can request Language Support Service for some languages ​​by paying an additional $19.99 for the INTERN package to overcome the language problem. You can take and deliver your tasks in the language you prefer with the Language Support Service.",
            },
            {
              heading: t("howtouse_packages_intern_intern_detail7"),
              description:
                "INTERNY offers an Emergency Internship Service for an additional $19.99 to the INTERN package so that you can start your internship in any country and sector within 30 days. This service aims to ensure that you only start the internship within 30 days, and the internship approval processes usually continue. The fact that this additional service is purchased does not mean that your internship will be approved exactly.",
            },
          ],
        },
        {
          id: "competency",
          title: t("howtouse_packages_intern_competency_name"),
          price: "$12.49",
          payment: t("howtouse_packages_intern_competency_payment"),
          highlights: [
            {
              heading: t("howtouse_packages_intern_competency_detail1"),
              description:
                "Interny Competency Center (iCC™) includes a set of unique five different case studies just for you to measure the 15 core competencies that international organizations value the most now and for the future.",
            },
            {
              heading: t("howtouse_packages_intern_competency_detail2"),
              description:
                "Case studies are meticulously evaluated to determine your core competencies using artificial intelligence.",
            },
            {
              heading: t("howtouse_packages_intern_competency_detail3"),
              description:
                "Detailed competency report containing the data obtained from Competency Analytics, the meanings of competency results, and improvement suggestions.",
            },
          ],
        },
      ];
    } else if (type === "step") {
      return [
        {
          title: t("howtouse_steps_join_and_apply_title"),
          description: t("howtouse_steps_join_and_apply_description"),
          image: joinAndApply,
        },
        {
          title: t("howtouse_steps_icc_title"),
          description: t("howtouse_steps_icc_description"),
          image: iccTMPortfolio,
        },
        {
          title: t("howtouse_steps_ims_title"),
          description: t("howtouse_steps_ims_description"),
          image: imsTMWorkTime,
        },
        {
          title: t("howtouse_steps_reference_letter_title"),
          description: t("howtouse_steps_reference_letter_description"),
          image: referrenceReccomendationLetter,
        },
      ];
    } else if (type === "description") {
      return [
        t("howtouse_intern_welcome_to_interny"),
        t("howtouse_intern_welcome_to_interny_paragraph2"),
      ];
    }
  }

  render() {
    const { location, t } = this.props;
    const isCameFromGift =
      location && location.state && location.state.from === "gift";
    const giftData = isCameFromGift ? location.state : undefined;

    return (
      <WhyUsePage
        headerBackground={companyBg}
        header={t("howtouse_header")}
        descriptionList={this.renderData("description")}
        title={t("howtouse_header_title")}
        stepData={this.renderData("step")}
        videoEmbedLink="https://www.youtube.com/embed/2Nw6nkw6JCA"
        packagesTitle={t("howtouse_see_intern_packages")}
        packagesSubtitle={t("howtouse_click_see_detail_packages")}
        packagesData={this.renderData("packages")}
        giftData={giftData}
        type={"intern"}
      />
    );
  }
}

export default withNamespaces()(InternPage);
