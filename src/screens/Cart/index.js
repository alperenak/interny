import React, { useState, useEffect } from "react";
import styles from "./cart.scss";
import Card from "../../components/Card";
import store from "../../store";
import { getCookie } from "../../utils/cookie";
import { loadStripe } from "@stripe/stripe-js";

const index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [packages, setPackage] = useState(null);
  const [quant, setQuant] = useState(null);
  const [newData, setNewData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const stripePromise = loadStripe(
    "pk_test_51HbnvBEexm5jHOGxsnPBjTeexZZrnUKtEubUerAetv5O2Fljp44qfZrkAAhxrfjbZV5eQXXMu7MUFtRlGCOw1yYa00uN8yHFlW"
  );
  console.log(cartItems);
  const quantityButtons = [
    {
      type: "primary",
      text: "+1",
      sizeName: "small",
      width: "85px",
      onButtonClick: async () => {},
    },
  ];

  useEffect(() => {
    let packageId = JSON.parse(localStorage.getItem("cartItems"));
    const response = fetch(
      `https://interny-backend-prod.herokuapp.com/payment/package/${packageId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCartItems([data]);
      });
  }, []);
  useEffect(() => {
    // let getCartData = JSON.parse(localStorage.getItem("cartData"));
    // setCartData(getCartData);
    let userId = getCookie("user_id");
    // const response = await fetch(`https://7daa7d8bcc08.ngrok.io/payment/interny/${userId}`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     packages: items,
    //   }),
    // });
  }, []);

  const payButton = [
    {
      type: "primary",
      text: "Pay with stripe",
      sizeName: "large",
      width: "85px",
      onButtonClick: async () => {
        if (getCookie("user_id")) {
          let packageId = JSON.parse(localStorage.getItem("cartItems"));
          const stripe = await stripePromise;
          let userId = getCookie("user_id");
          let quantity = JSON.parse(localStorage.getItem("quantity"));
          const response = fetch(
            `https://interny-backend-prod.herokuapp.com/payment/intern/${userId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                packages: [
                  {
                    package: packageId,
                    quantity: quantity,
                  },
                ],
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              stripe.redirectToCheckout({
                sessionId: data.id,
              });
            });
          const session = await response.json();

          // When the customer clicks on the button, redirect them to Checkout.
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          console.log(result);
          if (result.error) {
            console.log("error");
          }
        } else window.location.href = "/signup";
      },
    },
  ];
  let quantity = localStorage.getItem("quantity");
  const paymentItems = [
    {
      id: 1,
      header: `Total:${
        localStorage.getItem("cartData") !== null
          ? (
              Number(
                JSON.parse(localStorage.getItem("cartData")).price.slice(1)
              ) * Number(quantity)
            ).toFixed(2)
          : ""
      } $`,
      buttons: payButton,
    },
  ];

  return (
    <div style={{ "background-color": "#f6f8fa", minHeight: "100vh" }}>
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Card
                header={{ text: "Cart Items", position: "center" }}
                type={"cartItem"}
                items={cartItems}
              />
            </div>
            <div className="col-md-4">
              <Card
                header={{ text: "Payment", position: "center" }}
                type={"cartItem"}
                items={paymentItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
