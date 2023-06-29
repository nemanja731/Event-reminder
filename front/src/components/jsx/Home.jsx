import EventCard from "./CreateEvent";
import ListEvents from "./ListEvents";
import Calendar from "./Calendar";
import Countdown from "./Countdown";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import "../css/Home.css";

function Home() {
  const [showList, setShowList] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [eventTitle, setEventTitle] = useState("Ucenje");
  const [showAlert, setShowAlert] = useState(false);
  const [showNumAlarms, setShowNumAlarms] = useState(1);

  const dateTime = "29/06/2023 05:51";

  const setAlert = (newAlert) => {
    setShowAlert(newAlert);
  };

  const [list, setList] = useState([
    {
      id: 1,
      title: "Učenje",
      date: "Jun 29, 2023, 17:09h",
    },
    {
      id: 2,
      title: "Fudbal termin",
      date: "Aug 15, 2023, 04:35h",
    },
    {
      id: 3,
      title: "Šišanje",
      date: "Aug 17, 2023, 01:10h",
    },
    {
      id: 4,
      title: "Sastanak",
      date: "Sep 1, 2023, 09:34h",
    },
    {
      id: 5,
      title: "Zubar",
      date: "Dec 7, 2023, 19:25h",
    },
  ]);

  const changeStates = (showCard, showList) => {
    setShowCard(showCard);
    setShowList(showList);
  };

  return (
    <>
      <div className="home-body">
        <Countdown
          title={eventTitle}
          setAlert={setAlert}
          dateTime={dateTime}
          showNumAlarms={showNumAlarms}
        />
        {showList && (
          <ListEvents
            changeStates={changeStates}
            list={list}
            setList={setList}
            title={eventTitle}
          />
        )}
        {showCard && (
          <EventCard
            changeStates={changeStates}
            list={list}
            setList={setList}
          />
        )}
        <Calendar />
      </div>
      {showAlert && showNumAlarms > 0 && (
        <Alert
          className="div-alert"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          Event "{eventTitle}" has appeared — check it out!
        </Alert>
      )}
    </>
  );
}

export default Home;
