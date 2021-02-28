import React, { useEffect, useState } from "react";
import CheckIcon from "../../icons/check-circle-fill.svg";
import XIcon from "../../icons/x-circle-fill.svg";
import "./index.scss";

export default class AlertBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
      alertData: this.props.alertData,
    };
    this.setIsActive = this.setIsActive.bind(this);
  }
  componentDidMount() {}

  setIsActive(boolVal) {
    this.setState({ isActive: boolVal });
  }

  render() {
    let { isActive, alertData } = this.state;
    console.log(isActive);
    return (
      <>
        {isActive ||
          (this.props.isActive && (
            <RenderAlertbox
              setIsActive={this.setIsActive}
              alertData={alertData}
            />
          ))}
      </>
    );
  }
}

export function RenderAlertbox({ setIsActive, alertData }) {
  const [activeAlert, setActiveAlert] = useState(true);
  useEffect(() => {
    setTimeout(() => setActiveAlert(false), 3000);
    setTimeout(() => setIsActive(false), 4300);
  }, []);
  return (
    <div className={"alertBoxWrapper"}>
      <div
        className={`alertboxContainer ${
          !activeAlert && "closeAlertboxContainer"
        } ${
          alertData?.type === "success"
            ? "alertboxContainerSuccess"
            : "alertboxContainerError"
        }`}
      >
        <div className={"alertbox"}>
          <div className={"alertMessage"}>
            {alertData?.type === "error" && (
              <div className={"alertMessageIcon"}>
                <img src={XIcon} className={"errorIcon"} />
              </div>
            )}
            {alertData?.type === "success" && (
              <div className={"alertMessageIcon"}>
                <img src={CheckIcon} className={"successIcon"} />
              </div>
            )}
            <div className={"alertMessageTitle"}>{alertData?.title}</div>
          </div>

          <div className={"alertProgressBar"} />
        </div>
      </div>
    </div>
  );
}
