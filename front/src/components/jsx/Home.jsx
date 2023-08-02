import CreateEvent from "./CreateEvent";
import ListEvents from "./ListEvents";
import Calendar from "./Calendar";
import Countdown from "./Countdown";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Axios from "axios";
import "../css/Home.css";
import { setRef } from "@mui/material";

function Home(props) {
  const URL = "http://localhost:9090";
  const URLaddEvent = URL + "/add-event";
  const URLdeleteEvent = URL + "/delete-event";
  const URLgetFiveEvents = URL + "/events";
  const URLrefresh = URL + "/tokens/renew_access";

  console.log(props.accessToken, props.refreshToken);
  const [showList, setShowList] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [eventTitle, setEventTitle] = useState("Ucenje");
  const [showAlert, setShowAlert] = useState(false);
  const [showNumAlarms, setShowNumAlarms] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [accessToken, setAccessToken] = useState(props.accessToken);
  const [refreshToken, setRefreshToken] = useState(props.refreshToken);

  const settingAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
  };

  const settingOffset = (newOffset) => {
    setOffset(newOffset);
  };

  const setAlert = (newAlert) => {
    setShowAlert(newAlert);
  };

  const [list, setList] = useState([
    {
      id: 1,
      title: "Učenje",
      date: "Aug 29, 2023, 17:09h",
    },
    {
      id: 2,
      title: "Fudbal termin",
      date: "Sep 15, 2023, 04:35h",
    },
    {
      id: 3,
      title: "Šišanje",
      date: "Sep 17, 2023, 01:10h",
    },
    {
      id: 4,
      title: "Sastanak",
      date: "Nov 1, 2023, 09:34h",
    },
    {
      id: 5,
      title: "Zubar",
      date: "Dec 7, 2023, 19:25h",
    },
  ]);

  Axios.get(props.URLgetFiveEvents)
    .then((response) => {
      console.log(response.status, response.data);
      if (response.status == 202) {
        props.setList(response.newList);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const dateTime = "29/08/2023 05:51";
  const dateTime2 = list[0].date;

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
            limit={limit}
            offset={offset}
            settingOffset={settingOffset}
            title={eventTitle}
            accessToken={accessToken}
            settingAccessToken={settingAccessToken}
            refreshToken={refreshToken}
            URLdeleteEvent={URLdeleteEvent}
            URLgetFiveEvents={URLgetFiveEvents}
            URLrefresh={URLrefresh}
          />
        )}
        {showCard && (
          <CreateEvent
            changeStates={changeStates}
            list={list}
            setList={setList}
            limit={limit}
            offset={offset}
            settingOffset={settingOffset}
            accessToken={accessToken}
            settingAccessToken={settingAccessToken}
            refreshToken={refreshToken}
            URLaddEvent={URLaddEvent}
            URLgetFiveEvents={URLgetFiveEvents}
            URLrefresh={URLrefresh}
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
