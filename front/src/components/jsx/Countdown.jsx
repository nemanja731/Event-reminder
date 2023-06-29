import React, { useState, useEffect, useRef } from "react";
import "../css/Countdown.css";

const Countdown = (props) => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let interval = useRef();

  useEffect(() => {
    startTimer(props.dateTime);
    return () => clearInterval(interval.current);
  });
  const startTimer = (dateTime) => {
    const date = new Date(
      dateTime.substring(6, 10),
      parseInt(dateTime.substring(3, 5)) - 1,
      dateTime.substring(0, 2),
      dateTime.substring(11, 13),
      dateTime.substring(14, 16)
    ).getTime();
    interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = date - currentDate;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
        props.setAlert(true);
      } else {
        setDays(days < 10 ? `0${days}` : days);
        setHours(hours < 10 ? `0${hours}` : hours);
        setMinutes(minutes < 10 ? `0${minutes}` : minutes);
        setSeconds(seconds < 10 ? `0${seconds}` : seconds);
      }
    }, 1000);
  };

  return (
    <div className="countdown-container">
      <div className="countdown-header">
        <h1>Next event</h1>
      </div>
      <div className="countdown-body">
        {props.showNumAlarms > 0 ? (
          <h2>{props.title}</h2>
        ) : (
          <h2>There is no event</h2>
        )}
        <div className="countdown-values">
          <div className="countdown-value">
            <p className="big-text">{days}</p>
            <span>d</span>
          </div>
          <div className="countdown-value">
            <p className="big-text">{hours}</p>
            <span>h</span>
          </div>
          <div className="countdown-value">
            <p className="big-text">{minutes}</p>
            <span>m</span>
          </div>
          <div className="countdown-value">
            <p className="big-text">{seconds}</p>
            <span>s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
