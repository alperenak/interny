import React, { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import PaymentCancelImage from "../../icons/paymetCancel.svg";
const PaymentCancel = () => {
  return (
    <div style={{ "background-color": "#f6f8fa", minHeight: "100vh" }}>
      <div className="cart">
        <div className="container">
          <div className="d-flex align-item-center justify-content-center">
            <img width="400" src={PaymentCancelImage} />
          </div>
          <div
            className="d-flex align-item-center justify-content-center"
            style={{ margin: 25, fontSize: 20 }}
          >
            There was a problem while checking out
          </div>
          <div className="d-flex align-item-center justify-content-center">
            <Button
              to={"/"}
              type={"secondary"}
              width="100px"
              text={"Go Back Home"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
