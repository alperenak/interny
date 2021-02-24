import React, { Component } from "react";
import "./style.scss";

// Components
import WhyUsePage from "./whyUsePage";

// Assets
import universityBg from "../../assets/universityBg.png";

import join from "../../assets/join.png";
import learningLanguages from "../../assets/learningLanguages.png";
import management from "../../assets/management.png";
import { withNamespaces } from "react-i18next";

const DESCRIPTION_DATA = [
  `Welcome to INTERNY, the world's first remote online internship platform. You will find everything you need and more during the internship process on the platform. It enables the internship process to be managed from the beginning to the end of the internship. It enables the internship to be done in a company anywhere in the world, at any time and place. All that needs to apply to companies' applications as an intern. Get acceptance from the company, and complete the tasks assigned.`,
  `As a university, you can follow the entire internship process of your students completely FREE. You can manage your university's internship processes in the most detailed way by purchasing the premium packages. These packages are created for bulk sales for your students registered to your university and offer your students the unique features you want:`,
];

const STEP_DATA = [
  {
    title: "Join & Follow",
    description:
      "First of all, you need to create a user account for your university as interny@universitydomain. You can register on behalf of your university with the user account you have made. In this way, you can follow all your students' internship status and detail from the panel specially prepared for universities.",
    image: join,
  },
  {
    title: "E-Learning",
    description:
      "By joining the Interny E-Learning system, you can enable your students to access your E-Learning contents. E-Learning is a system with contents created for interns' development, whose contents are presented to interns within the platform. In addition, you can see in detail your students' progress with their E-Learning content. You can follow the progress of your students with E-Learning Analytics created using artificial intelligence.",
    image: learningLanguages,
  },
  {
    title: "Manage",
    description:
      "You can buy any of the premium packages specially prepared for universities. In this way, you can enable your students to do internships. Besides, you can check the internship processes of your students in detail. You can view your students' current status in their internships in detail by using the panel that will open when you log in with your university user account.",
    image: management,
  },
];

const PACKAGES_DATA = [
  {
    id: "packageOne",
    title: "UNIVERSITY Essential",
    price: "$7499",
    payment: "per 4 Weeks per 500 Interns",
    highlights: [
      {
        heading: "INTERN Package",
        description:
          "This package includes the ability to apply for internships anywhere in the world for your students. Also, it provides for the Interny Management System's use to follow the internship tasks between the internship and the company. Besides, you observe your students' workforce analytics and provide a reference letter to your students for completed internships.",
      },
    ],
  },
  {
    id: "packageTwo",
    title: "UNIVERSITY Standart",
    price: "$12499",
    payment: "per 4 Weeks per 500 Interns",
    highlights: [
      {
        heading: "UNIVERSITY Essential Package",
        description:
          "By purchasing the UNIVERSITY Standart package, you will also purchase all UNIVERSITY Essential package features.",
      },
      {
        heading: "COMPETENCY Package (1 Competency)",
        description:
          "You will have your students analyze 1 of the 15 core competencies that international organizations value most now and for the future.",
      },
      {
        heading: "Emergency Internship Service",
        description:
          "You do not need your students' acceptance phase; you can guarantee that they will start their internship.",
      },
    ],
  },
  {
    id: "packageThree",
    title: "UNIVERSITY Plus",
    price: "$17499",
    payment: "per 4 Weeks per 500 Interns",
    highlights: [
      {
        heading: "UNIVERSITY Standard Package",
        description:
          "By purchasing the UNIVERSITY Plus package, you will also purchase all UNIVERSITY Standard package features. ",
      },
      {
        heading: "COMPETENCY Package (All Competencies)",
        description:
          "You will have your students analyze all 15 core competencies that international organizations value most now and for the future.",
      },
      {
        heading: "Language Support Service",
        description:
          "You can evaluate the language support service to prevent your students from experiencing language problems during their international companies' internship.",
      },
    ],
  },
];

class UniversityPage extends Component {
  renderData(type) {
    let { t } = this.props;
    if (type === "packages") {
      return [
        {
          id: "packageOne",
          title: t("howtouse_packages_universty_universty_essential_name"),
          price: "$7499",
          payment: t("howtouse_packages_universty_universty_essential_payment"),
          highlights: [
            {
              heading: t(
                "howtouse_packages_universty_universty_essential_detail1"
              ),
              description:
                "This package includes the ability to apply for internships anywhere in the world for your students. Also, it provides for the Interny Management System's use to follow the internship tasks between the internship and the company. Besides, you observe your students' workforce analytics and provide a reference letter to your students for completed internships.",
            },
          ],
        },
        {
          id: "packageTwo",
          title: t("howtouse_packages_universty_universty_standart_name"),
          price: "$12499",
          payment: t("howtouse_packages_universty_universty_standart_payment"),
          highlights: [
            {
              heading: t(
                "howtouse_packages_universty_universty_standart_detail1"
              ),
              description:
                "By purchasing the UNIVERSITY Standart package, you will also purchase all UNIVERSITY Essential package features.",
            },
            {
              heading: t(
                "howtouse_packages_universty_universty_standart_detail2"
              ),
              description:
                "You will have your students analyze 1 of the 15 core competencies that international organizations value most now and for the future.",
            },
            {
              heading: t(
                "howtouse_packages_universty_universty_standart_detail3"
              ),
              description:
                "You do not need your students' acceptance phase; you can guarantee that they will start their internship.",
            },
          ],
        },
        {
          id: "packageThree",
          title: t("howtouse_packages_universty_hiring_name"),
          price: "$17499",
          payment: t("howtouse_packages_universty_hiring_payment"),
          highlights: [
            {
              heading: t("howtouse_packages_universty_hiring_detail1"),
              description:
                "By purchasing the UNIVERSITY Plus package, you will also purchase all UNIVERSITY Standard package features. ",
            },
            {
              heading: t("howtouse_packages_universty_hiring_detail2"),
              description:
                "You will have your students analyze all 15 core competencies that international organizations value most now and for the future.",
            },
            {
              heading: t("howtouse_packages_universty_hiring_detail3"),
              description:
                "You can evaluate the language support service to prevent your students from experiencing language problems during their international companies' internship.",
            },
          ],
        },
      ];
    } else if (type === "step") {
      return [
        {
          title: t("howtouse_steps_unviersty_join_and_follow_title"),
          description: t(
            "howtouse_steps_unviersty_join_and_follow_description"
          ),
          image: join,
        },
        {
          title: t("howtouse_steps_unviersty_e_learning_title"),
          description: t("howtouse_steps_unviersty_e_learning_description"),
          image: learningLanguages,
        },
        {
          title: t("howtouse_steps_unviersty_manage_title"),
          description: t("howtouse_steps_unviersty_manage_description"),
          image: management,
        },
      ];
    } else if (type === "description") {
      return [
        t("howtouse_universty_welcome_to_interny"),
        t("howtouse_universty_welcome_to_interny_paragraph2"),
      ];
    }
  }

  render() {
    let { t } = this.props;
    return (
      <WhyUsePage
        headerBackground={universityBg}
        header={t("howtouse_header_universty_")}
        descriptionList={this.renderData("description")}
        title={t("howtouse_header_title_universty_")}
        stepData={this.renderData("step")}
        videoEmbedLink="https://www.youtube.com/embed/2Nw6nkw6JCA"
        packagesTitle={t("howtouse_see_intern_packages_universty_")}
        packagesSubtitle={t("howtouse_click_see_detail_packages_universty_")}
        packagesData={this.renderData("packages")}
      />
    );
  }
}

export default withNamespaces()(UniversityPage);
