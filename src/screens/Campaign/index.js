import React from "react";
import "./campaign.scss";
import GetIntery from "../../assets/getInterny.png";
import FindJob from "../../assets/findJob.png";
import Reference from "../../assets/reference.png";
import Remote from "../../assets/remote.png";
import Card from "../../components/Card";

export default class Campaign extends React.Component {
  componentDidMount() {}

  render() {
    const { title } = this.props;
    return (
      <div className="Campaign">
        <div className="CampaignWrapper">
          <div className="CampaignBranding">
            <div className="CampaignBrandingTitle">Summer Internship</div>
          </div>
          <div className="row align-items-center campaignRow">
            <div className="flexOne">
              <img src={GetIntery} />
            </div>
            <div className="flexOne responsiveCenter">
              <h2 className="SummerIntershipTitle">
                Get Summer Internship Package
              </h2>
              <p>
                Are you ready to do your 2021 summer internship globally,
                online, and remotely? Firstly, you need to purchase the 60%
                discounted Summer Internship package below. You can then do your
                summer internship at any time, in any country and sector you
                wish, by working remotely. Sharing your internship expectations
                in detail will enable us to determine the most suitable company
                for you. You can guarantee that you will definitely start your
                summer internship
              </p>
              <div
                onClick={() => (window.location.href = "#campaignDiscountCard")}
                className="SummerInternshipButton"
              >
                GET
              </div>
            </div>
          </div>
          <div className="row align-items-center campaignRow RowReverse">
            <div className="flexOne positionRight">
              <img src={FindJob} />
            </div>
            <div className="flexOne">
              <h2 className="SummerIntershipTitle">
                Let us Determine the Company
              </h2>
              <p>
                We will find the most suitable company for you in the country
                and sector of your choice. First of all, companies will be
                enabled to choose you by sharing your CV. If any company does
                not accept you, we will determine the company for you where you
                will start the internship. This company information will be
                shared with you four weeks before the internship start date. If
                you want to change the company designated for you, you will able
                to apply for open internship applications.
              </p>
            </div>
          </div>
          <div className="row align-items-center campaignRow">
            <div className="flexOne">
              <img src={Remote} />
            </div>
            <div className="flexOne">
              <h2 className="SummerIntershipTitle">
                Do the Internship by Working Remotely
              </h2>
              <p>
                You will start the 2021 summer internship on the date you set,
                globally, online, and remotely. Internship process is followed
                using Interny Management System (iMSTM). You will be able to
                access the company's task assignments and share its completed
                tasks via iMSTM. Besides, you will always contact the company
                using the messaging service throughout the internship process.
                Also, you will always evaluate each other with the company at
                the end of each task
              </p>
            </div>
          </div>
          <div className="row align-items-center campaignRow RowReverse">
            <div className="flexOne positionRight">
              <img src={Reference} />
            </div>
            <div className="flexOne">
              <h2 className="SummerIntershipTitle">
                Get the Signed Reference Letter
              </h2>
              <p>
                Your performance in your internship is evaluated using Workforce
                Analytics (WFA). Moreover, you will have the opportunity to see
                your internship efficiency with the WFA report created using
                artificial intelligence. If you achieve a success rate of 60% or
                more, you will be eligible for the reference letter to be signed
                by the company. Therefore, you will have a verifiable reference
                letter from INTERNY that you can use when applying to companies
                for the rest of your business life.
              </p>
            </div>
          </div>
          <div className="row align-items-center campaignRow">
            <div className="flexOne campaignCard" id="campaignDiscountCard">
              <Card type="campaign" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
