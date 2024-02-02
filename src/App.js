import './App.css';
import React from 'react';

import Timer from './Component/Timer/Timer';
import LoginCreate from './Component/LoginCreate/LoginCreate';
import JoinedPlayers from './Component/JoinedPlayers/JoinedPlayers';

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");




function App() {

  const [isLogin, setIsLogin] = React.useState(true);
  const [isJoinedPlayers, setIsJoinedPlayers] = React.useState(false);
  const [isTimerScreen, setIsTimerScreen] = React.useState(false);

  const [roomInputValue, setRoomInputValue] = React.useState("");
  // eslint-disable-next-line
  const [nickname, setNickname] = React.useState("");


  socket.on("startGame", () => {
    setIsJoinedPlayers(false);
    setIsTimerScreen(true);
  })


  return (
    <div className="App">
      {!isJoinedPlayers && !isTimerScreen &&
        <LoginCreate
          socket={socket}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setRoomInputValue={setRoomInputValue}
          roomInputValue={roomInputValue}
          setNickname={setNickname}
          nickname={nickname}
        />}
      {isJoinedPlayers &&
        < JoinedPlayers
          socket={socket}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setIsTimerScreen={setIsTimerScreen}
          roomInputValue={roomInputValue}
          nickname={nickname}
        />}
      <Timer
        socket={socket}
        nickname={nickname}
        roomInputValue={roomInputValue}
      />
    </div>
  );
}

export default App;

// <JoinedPlayers />