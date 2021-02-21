import React, { Component, Fragment } from "react";

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from "./cartItemCard.scss";

/*** Icons ***/
import { Link } from "react-router-dom";
import { getCookie } from "../../../../utils/cookie";
import Input from "../../../Input";

class CartItems extends Component {
  renderPostButtons(buttons) {
    return (
      <div className={`${"postButton"}`}>
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              disabled={btn.disabled}
              hoverIcon={btn.hoverIcon}
              icon={btn.icon}
              loading={btn.loading}
              iconAutoWidth={btn.iconAutoWidth}
              iconPosition={btn.iconPosition}
              onButtonClick={btn.onButtonClick}
              sizeName={btn.sizeName}
              responsive={btn.responsive}
              text={btn.text}
              type={btn.type}
              width={btn.width}
              to={btn.to}
              hoverText={btn.hoverText ? btn.hoverText : null}
            />
          );
        })}
      </div>
    );
  }

  renderPost = (pst, multiple) => {
    const {
      selectJob,
      RedirectControl = (props) =>
        props.is === false ? props.children : <></>,
    } = this.props;
    let link = getCookie("token") ? `/postdetail/${pst.id}` : "signup";
    return (
      <Fragment>
        <div className={`${multiple ? "multiplePost" : "singlePost"}`}>
          <div class="row">
            <RedirectControl is={false}>
              {pst.image && (
                <div class="col-md-3">
                  <Link to={link} className={"itemImage"}>
                    <img src={pst.image ? pst.image : ""} alt={"image"} />
                  </Link>
                </div>
              )}
              <div class={pst.image ? "col-md-6" : "col-md-12"}>
                <Link to={link} className={"postHeaderWrapper"}>
                  <div className={"postHeader"}>{pst.header}</div>
                </Link>
                <Link to={link} className={"postCompany"}>
                  {pst.company}
                </Link>
                <a
                  href="#"
                  onClick={() => selectJob(pst.id)}
                  v-if={pst.location}
                  className={"postLocation"}
                >
                  <img src={locationIcon} alt={"location"} />
                  {pst.location}
                </a>
                <Link to={link} className={"postNote"}>
                  {pst.note}
                </Link>
              </div>
              <div
                class={pst.image ? "col-md-3" : "col-md-12"}
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                  "justify-content": "center",
                }}
              >
                {pst.buttons && !pst.image ? (
                  this.renderPostButtons(pst.buttons)
                ) : (
                  <Input
                    type={"text"}
                    id={"quantity"}
                    placeholder={"Quantity"}
                    size={"full"}
                    defaultValue="1"
                    onChange={(value) => {
                      localStorage.setItem("quantity", value);
                    }}
                    label={"Quantity"}
                  />
                )}
              </div>
            </RedirectControl>
          </div>
          <RedirectControl>
            <div class="row">
              <div class="col-md-3">
                <a
                  href="#"
                  onClick={() => selectJob(pst.id)}
                  className={"itemImage"}
                >
                  <img src={pst.image ? pst.image : ""} alt={"image"} />
                </a>
              </div>
              <div class="col-md-6">
                <a
                  href="#"
                  onClick={() => selectJob(pst.id)}
                  className={"postHeaderWrapper"}
                >
                  <div className={"postHeader"}>{pst.header}</div>
                </a>
                <a
                  href="#"
                  onClick={() => selectJob(pst.id)}
                  className={"postCompany"}
                >
                  {pst.company}
                </a>
                <a
                  href="#"
                  onClick={() => selectJob(pst.id)}
                  className={"postNote"}
                >
                  {pst.description}
                </a>
              </div>
            </div>
          </RedirectControl>
        </div>
      </Fragment>
    );
  };

  renderEmpty = () => {
    let { items } = this.props;

    if (items.length < 1) {
      return (
        <div className={"noItems"}>
          {" "}
          <span>Your cart is empty...</span>{" "}
        </div>
      );
    }
    return;
  };

  render() {
    let { items } = this.props;
    return (
      <Fragment>
        {items.map((item, i) => {
          return (
            <div class="col-md-12">
              <div key={i} className={`${"jobPost2"}`}>
                {this.renderPost(item, items.length > 1)}
              </div>
            </div>
          );
        })}
        {this.renderEmpty()}
      </Fragment>
    );
  }
}

export default CartItems;
