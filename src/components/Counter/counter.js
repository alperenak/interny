import { min } from "moment";
import React from "react";
import { useEffect, useState } from "react";
import "./counter.scss";

export default function Counter({ countDown }) {
  const [val, setVal] = useState("...");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [days, setDays] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function GetLeftDay() {
    var countDownDate = new Date(countDown).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
      setDays(days);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        setVal("expired");
      }
    }, 1000);
  }
  useEffect(() => {
    GetLeftDay();
  }, []);
  return (
    <div className="Counter">
      <div> {"Kampanyanın bitmesine kalan süre: \n"}</div>
      <div>
        <span>{days} gün </span>
        <span style={{ color: "#dd5454" }}> {hours} sa </span>
        <span style={{ color: "rgba(249,112,80,0.9)" }}> {minutes} dak </span>
        <span style={{ color: "rgb(105, 108, 255)" }}> {seconds} sn </span>
      </div>
    </div>
  );
}
