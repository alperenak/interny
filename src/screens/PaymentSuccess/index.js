import React, { useState } from "react";
import styles from "./paymentsuccess.scss";
import Card from "../../components/Card";
import Button from "../../components/Button";
import paymentSuccessImage from "../../icons/paymentSuccess.svg";
const PaymentSuccess = () => {
  return (
    <div style={{ "background-color": "#f6f8fa", minHeight: "100vh" }}>
      <div className="cart">
        <div className="container">
          <div className="d-flex align-item-center justify-content-center">
            <img width="400" src={paymentSuccessImage} />
          </div>
          <div
            className="d-flex align-item-center justify-content-center"
            style={{ margin: 25, fontSize: 20 }}
          >
            Your have bought Your packages successfully
          </div>
          <div className="d-flex align-item-center justify-content-center">
            <Button
              to={"/"}
              type={"primary"}
              width="100px"
              text={"Go Back Home"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
