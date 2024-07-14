import './App.css';
import React from 'react';
// const springs = useSprings(number, items.map(item => ({ opacity: item.opacity }))

import Timer from './Component/Timer/Timer';
import LoginCreate from './Component/LoginCreate/LoginCreate';
import JoinedPlayers from './Component/JoinedPlayers/JoinedPlayers';
import Notification from './Component/Notification/Notification';
import RoomClosedScreen from './Component/RoomClosedScreen/RoomClosedScreen';

import io from "socket.io-client";
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const socket = io.connect(URL);


function App() {

  const [notificationsList, setNotificationsList] = React.useState([]);


  const [isLogin, setIsLogin] = React.useState(true); //default: true
  const [isJoinedPlayers, setIsJoinedPlayers] = React.useState(false);        
  const [isTimerScreen, setIsTimerScreen] = React.useState(false);          
  const [isRoomClosedScreen, setIsRoomClosedScreen] = React.useState(false); //default: false

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
  socket.on("serverError", (msg) => {
    addNotification("error", msg )
  });

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
          isRoomClosedScreen={isRoomClosedScreen}
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
      <RoomClosedScreen
        isRoomClosedScreen={isRoomClosedScreen}
        setIsRoomClosedScreen={setIsRoomClosedScreen}
        setIsLogin={setIsLogin}
        setIsTimerScreen={setIsTimerScreen}
        socket={socket}
        roomInputValue={roomInputValue}
      />
      <Timer
        socket={socket}
        nickname={nickname}
        roomInputValue={roomInputValue}
        currentPuzzle={currentPuzzle}
        addNotification={addNotification}
        setIsRoomClosedScreen={setIsRoomClosedScreen}
        setIsLogin={setIsLogin}
      />
    </div >
  );
}

export default App;

// <JoinedPlayers />