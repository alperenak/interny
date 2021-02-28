import React from "react";

export const AlertboxContext = React.createContext();

export default class AlertBoxContexProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertboxIsActive: false,
      alertData: { type: "success", title: "" },
    };
    this.setAlertbox = this.setAlertbox.bind(this);
    this.activeAlertbox = this.activeAlertbox.bind(this);
  }

  setAlertbox(type, title) {
    this.setState({ alertData: { type: type, title: title } });
  }
  activeAlertbox() {
    this.setState({ alertboxIsActive: true });
    setTimeout(() => this.setState({ alertboxIsActive: false }), 4300);
  }

  render() {
    return (
      <AlertboxContext.Provider
        value={{
          alertboxIsActive: this.state.alertboxIsActive,
          setAlertbox: this.setAlertbox,
          activeAlertbox: this.activeAlertbox,
          alertData: this.state.alertData,
        }}
      >
        {this.props.children}
      </AlertboxContext.Provider>
    );
  }
}
