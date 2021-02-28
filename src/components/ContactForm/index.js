import React, { Component } from "react";
import "./style.scss";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import { withNamespaces } from "react-i18next";

class ContactForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
    };
  }

  render() {
    let { t } = this.props;
    const { onBackClick, onSendClick } = this.props;
    const formData = {
      ...this.state,
    };
    return (
      <div>
        <div class="container">
          <form action="mailto:help@interny.net" method="GET">
            <div class="row">
              <div class="col-md-6">
                <Input
                  type="text"
                  placeholder={t("affiliate_label_name_same_with_placeholder")}
                  size="full"
                  onChange={(value) => {
                    this.setState({ name: value });
                  }}
                  label={t("affiliate_label_name_same_with_placeholder")}
                />
              </div>
              <div class="col-md-6">
                <Input
                  type="text"
                  placeholder={t(
                    "affiliate_label_surname_same_with_placeholder"
                  )}
                  size="full"
                  onChange={(value) => {
                    this.setState({ surname: value });
                  }}
                  label={t("affiliate_label_surname_same_with_placeholder")}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <Input
                  type="text"
                  placeholder={t("affiliate_label_email_same_with_placeholder")}
                  size="full"
                  onChange={(value) => {
                    this.setState({ email: value });
                  }}
                  label={t("affiliate_label_email_same_with_placeholder")}
                />
              </div>
              <div class="col-md-6">
                <Input
                  type="text"
                  placeholder={t("affiliate_label_phone_same_with_placeholder")}
                  size="full"
                  onChange={(value) => {
                    this.setState({ phone: value });
                  }}
                  label={t("affiliate_label_phone_same_with_placeholder")}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <Input
                  type="textarea"
                  placeholder={t(
                    "affiliate_label_message_same_with_placeholder"
                  )}
                  size="full"
                  onChange={(value) => {
                    this.setState({ message: value });
                  }}
                  label={t("affiliate_label_message_same_with_placeholder")}
                />
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type="primary"
                  text={t("affiliate_button_send")}
                  sizeName="default"
                  onButtonClick={() => onSendClick(formData)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(ContactForm);
