import React, { Component } from "react";
import "./style.scss";

// Components
import WhyUsePage from "./whyUsePage";

// Assets
import companyBg from "../../assets/companyBg.png";
import joinAddUser from "../../assets/joinAddUser.png";
import imsOrganizingProjects from "../../assets/imsOrganizingProjects.png";
import eLearningBlogPost from "../../assets/eLearningBlogPost.png";
import referrenceReccomendationLetter from "../../assets/referrenceReccomendationLetter.png";
import { withNamespaces } from "react-i18next";

class BusinessPage extends Component {
  renderData(type) {
    let { t } = this.props;
    if (type === "packages") {
      return [
        {
          id: "packageOne",
          title: t("howtouse_packages_company_e_learning_name"),
          price: "$29.99",
          payment: t("howtouse_packages_company_e_learning_payment"),
          highlights: [
            {
              heading: t("howtouse_packages_company_e_learning_detail1"),
              description:
                "You can share your e-learning content owned by your company with your interns by using INTERNY E-Learning infrastructure during the internship period.",
            },
            {
              heading: t("howtouse_packages_company_e_learning_detail2"),
              description:
                "You can support the development of your interns by using INTERNY E-Learning content.",
            },
            {
              heading: t("howtouse_packages_company_e_learning_detail3"),
              description:
                "INTERNY E-Learning contents are analyzed using artificial intelligence. With E-Learning Analytics, you can follow the progress of your interns and evaluate your interns in detail.",
            },
          ],
        },
        {
          id: "packageTwo",
          title: t("howtouse_packages_company_bussiness_name"),
          price: "$49.99",
          payment: t("howtouse_packages_company_bussiness_payment"),
          highlights: [
            {
              heading: t("howtouse_packages_company_bussiness_detail1"),
              description:
                "From INTERNY global intern pool, you can view detailed candidates who do not apply to you but think they are suitable for you.",
            },
            {
              heading: t("howtouse_packages_company_bussiness_detail2"),
              description:
                "In a detailed search, you can find the most potential candidates wherever they are in the world. Also, you observe the results of 15 core competencies that international organizations value the most now and for the future.",
            },
            {
              heading: t("howtouse_packages_company_bussiness_detail3"),
              description:
                "You can contact the intern candidates that you think are suitable for your company through INTERNY messaging service.",
            },
          ],
        },
        {
          id: "packageThree",
          title: t("howtouse_packages_company_hiring_name"),
          price: "$49.99",
          payment: t("howtouse_packages_company_hiring_payment"),
          highlights: [
            {
              heading: t("howtouse_packages_company_hiring_detail1"),
              description:
                "You can view detailed employee candidates from the Global Intern Pool who have not applied for you but that he/she can be suitable for you.",
            },
            {
              heading: t("howtouse_packages_company_hiring_detail2"),
              description:
                "By viewing the skills of doing business during the internship period in the detailed search, you can find the employee candidates with the highest potential anywhere in the world.",
            },
            {
              heading: t("howtouse_packages_company_hiring_detail3"),
              description:
                "You can find the most potential employee candidates wherever they are in the world in a detailed search. Besides, you observe the results of the 15 core competencies that international organizations value most now and for the future.",
            },
            {
              heading: t("howtouse_packages_company_hiring_detail4"),
              description:
                "You can contact employee candidates whom you think are suitable for your company through INTERNY messaging service.",
            },
          ],
        },
      ];
    } else if (type === "step") {
      return [
        {
          title: t("howtouse_steps_company_join_and_publish_title"),
          description: t("howtouse_steps_company_join_and_publish_description"),
          image: joinAddUser,
        },
        {
          title: t("howtouse_steps_company_ims_title"),
          description: t("howtouse_steps_company_ims_description"),
          image: imsOrganizingProjects,
        },
        {
          title: t("howtouse_steps_company_e_learning_title"),
          description: t("howtouse_steps_company_e_learning_description"),
          image: eLearningBlogPost,
        },
        {
          title: t("howtouse_steps_company_reference_letter_title"),
          description: t("howtouse_steps_company_reference_letter_description"),
          image: referrenceReccomendationLetter,
        },
      ];
    } else if (type === "description") {
      return [
        t("howtouse_company_welcome_to_interny"),
        t("howtouse_company_welcome_to_interny_paragraph2"),
      ];
    }
  }
  render() {
    let { t } = this.props;
    return (
      <WhyUsePage
        headerBackground={companyBg}
        header={t("howtouse_header_company_")}
        descriptionList={this.renderData("description")}
        title={t("howtouse_header_title_company_")}
        stepData={this.renderData("step")}
        videoEmbedLink="https://www.youtube.com/embed/HnTSDWNE9Hw"
        packagesTitle={t("howtouse_see_intern_packages_company_")}
        packagesSubtitle={t("howtouse_click_see_detail_packages_company_")}
        packagesData={this.renderData("packages")}
        type="company"
      />
    );
  }
}

export default withNamespaces()(BusinessPage);
