import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./gift.scss";

// Components
import Input from "../../components/Input";
import LoadingModal from "../../components/LoadingModal";
import FooterAlternative from "../../components/FooterAlternative";
import Button from "../../components/Button";
import { withNamespaces } from "react-i18next";

// Assets
import gift from "../../assets/gift.png";

class Gift extends Component {
  state = {
    email: "",
    quantity: "",
    processing: false,
  };

  render() {
    let { t } = this.props;
    return (
      <div className="pageWrapper">
        <div className={"gift"}>
          <LoadingModal text="Loading" v-if={this.state.processing} />
          <div class="container">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className="gift__image" src={gift} alt="Referrence Letter" />
            </div>
            <div className={"gift__modal"}>
              <div class="row">
                <div class="col-md-12">
                  <div className={"gift__header"}>{t("gift_title")}</div>
                  <div className={"gift__description"}>
                    {t("gift_description")}{" "}
                  </div>
                </div>
                <div class="col-md-6">
                  <Input
                    label={t("gift_input_email")}
                    type="text"
                    size={"large"}
                    placeholder={t("gift_input_email")}
                    onChange={(email) => this.setState({ email })}
                  />
                </div>
                <div class="col-md-6">
                  <Input
                    label={t("gift_input_quantitiy")}
                    type="number"
                    size={"large"}
                    placeholder={t("gift_input_quantitiy")}
                    onChange={(quantity) => this.setState({ quantity })}
                  />
                </div>
                <div class="col-md-12">
                  <div className={"gift__buttonWrapper"}>
                    <Link
                      to={{
                        pathname: "/internyInterns",
                        state: {
                          from: "gift",
                          email: this.state.email,
                          quantity: this.state.quantity,
                        },
                      }}
                    >
                      <Button
                        type="secondary"
                        text={t("gift_input_send")}
                        textClass="gift__buttonWrapper__text"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterAlternative />
      </div>
    );
  }
}

export default withNamespaces()(Gift);
