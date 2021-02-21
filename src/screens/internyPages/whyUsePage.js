import React, { Component } from "react";
import "./style.scss";

// Components
import Footer from "../../components/Footer";
import WhyUsePackages from "./whyUsePackages";

// Util
import { getOffset } from "../../utils/offset";

class WhyUsePage extends Component {
  constructor(props) {
    super(props);

    this.packagesRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.giftData) {
      this.scrollToPackages();
    }
  }

  componentDidUpdate() {
    if (this.props.giftData) {
      this.scrollToPackages();
    }
  }

  renderDescriptions = (descriptionList) => {
    return (
      <div class="row">
        <div class="col-md-12">
          {descriptionList.map((description, index) => {
            return (
              <p class="internyPage__why__desc" key={index}>
                {description}
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  renderTitle = (title) => {
    return (
      <div className="row">
        <div class="col-md-12">
          <div class="internyPage__why__title">
            <span>{title}</span>
          </div>
        </div>
      </div>
    );
  };

  renderSteps = (stepData) => {
    return stepData.map((step, index) => {
      const flexDirection = index % 2 === 0 ? "row" : "row-reverse";
      return (
        <div
          class="row internyPage__step"
          key={`${step.title}-${index}`}
          style={{ flexDirection }}
        >
          <div class="col-md-6">
            <img src={step.image} alt={step.title} style={{ width: "90%" }} />
          </div>
          <div class="col-md-6">
            <div class="internyPage__step__title">
              <span>{step.title}</span>
            </div>
            <p class="internyPage__step__p">{step.description}</p>
          </div>
        </div>
      );
    });
  };

  renderVideo = (videoEmbedLink) => {
    return (
      <div class="row">
        <div
          class="col-md-12"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* This is a dummy video. It will be replaced with another video. */}
          <iframe
            title="steps-video"
            style={{ width: "100%" }}
            height="500"
            src={videoEmbedLink}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    );
  };

  scrollToPackages = () => {
    const offset = getOffset(this.packagesRef.current);
    window.scrollTo({
      top: offset.top - 100,
      left: offset.left,
      behavior: "smooth",
    });
  };

  render() {
    const {
      headerBackground,
      header,
      descriptionList,
      title,
      stepData,
      videoEmbedLink,
      packagesTitle,
      packagesSubtitle,
      packagesData,
    } = this.props;
    return (
      <>
        <div class="internyPage">
          <div class="affiliate__header">
            <div
              class="container headerBackground"
              style={{ "background-image": "url(" + headerBackground + ")" }}
            >
              <p>{header}</p>
            </div>
          </div>
          <div class="internyPage__why">
            <div class="container">
              {this.renderDescriptions(descriptionList)}
            </div>
          </div>
          <div class="internyPage__steps">
            <div class="container">
              {this.renderTitle(title)}
              {this.renderSteps(stepData)}
              {this.renderVideo(videoEmbedLink)}
            </div>
          </div>
          <div ref={this.packagesRef}>
            <WhyUsePackages
              title={packagesTitle}
              subtitle={packagesSubtitle}
              packagesData={packagesData}
              type={this.props.type}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default WhyUsePage;
