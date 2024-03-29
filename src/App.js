import './App.css';
import React from 'react';

// const springs = useSprings(number, items.map(item => ({ opacity: item.opacity }))

import Timer from './Component/Timer/Timer';
import LoginCreate from './Component/LoginCreate/LoginCreate';
import JoinedPlayers from './Component/JoinedPlayers/JoinedPlayers';
import Notification from './Component/Notification/Notification';

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");


function App() {

  const [notificationsList, setNotificationsList] = React.useState([]);


  const [isLogin, setIsLogin] = React.useState(true);
  const [isJoinedPlayers, setIsJoinedPlayers] = React.useState(false);
  const [isTimerScreen, setIsTimerScreen] = React.useState(false);

  const [roomInputValue, setRoomInputValue] = React.useState("");
  // eslint-disable-next-line
  const [nickname, setNickname] = React.useState("");
  const [currentPuzzle, setCurrentPuzzle] = React.useState("3x3");

  const addNotification = (notificationType, notificationDesc) => {
    setNotificationsList([{ notificationType: notificationType, notificationDesc: notificationDesc }])
  }

  const notificationsListed = notificationsList.map((notif, i) => <Notification key={i} notificationDesc={notif.notificationDesc} notificationType={notif.notificationType} />)



  React.useEffect(() => {
    if (notificationsList.length !== 0) {
      let timeoutId;

      timeoutId = setTimeout(() => {
        setNotificationsList([]);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [notificationsList]);

  socket.on("startGame", (puzzle) => {
    setIsJoinedPlayers(false);
    setIsTimerScreen(true);
    setCurrentPuzzle(puzzle);
  });

  socket.on("joinedLeavedNotification", data => {
    if (!data.joined) addNotification("Warning!", data.nickname + " has left the room!");
  })


  return (
    <div className="App">
      <div className="top-notif">Website is in development stage. Bugs are expected!</div>
      {notificationsListed}
      {
        <LoginCreate
          socket={socket}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setRoomInputValue={setRoomInputValue}
          roomInputValue={roomInputValue}
          setNickname={setNickname}
          nickname={nickname}
          addNotification={addNotification}
          isJoinedPlayers={isJoinedPlayers}
          isTimerScreen={isTimerScreen}
        />}
      {
        < JoinedPlayers
          socket={socket}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setIsTimerScreen={setIsTimerScreen}
          roomInputValue={roomInputValue}
          nickname={nickname}
          isJoinedPlayers={isJoinedPlayers}
        />}
      <Timer
        socket={socket}
        nickname={nickname}
        roomInputValue={roomInputValue}
        currentPuzzle={currentPuzzle}
        addNotification={addNotification}
      />
    </div >
  );
}

export default App;

// <JoinedPlayers />